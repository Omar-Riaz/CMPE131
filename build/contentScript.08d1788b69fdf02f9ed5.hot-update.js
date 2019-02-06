/* -------------------------------------------------- */

/*  Start of Webpack Chrome Hot Extension Middleware  */

/* ================================================== */

/*  This will be converted into a lodash templ., any  */

/*  external argument must be provided using it       */

/* -------------------------------------------------- */
(function (chrome, window) {
  var signals = JSON.parse('{"SIGN_CHANGE":"SIGN_CHANGE","SIGN_RELOAD":"SIGN_RELOAD","SIGN_RELOADED":"SIGN_RELOADED","SIGN_LOG":"SIGN_LOG","SIGN_CONNECT":"SIGN_CONNECT"}');
  var config = JSON.parse('{"RECONNECT_INTERVAL":2000,"SOCKET_ERR_CODE_REF":"https://tools.ietf.org/html/rfc6455#section-7.4.1"}');
  var reloadPage = "true" === "true";
  var wsHost = "ws://localhost:9090";
  var SIGN_CHANGE = signals.SIGN_CHANGE,
      SIGN_RELOAD = signals.SIGN_RELOAD,
      SIGN_RELOADED = signals.SIGN_RELOADED,
      SIGN_LOG = signals.SIGN_LOG,
      SIGN_CONNECT = signals.SIGN_CONNECT;
  var RECONNECT_INTERVAL = config.RECONNECT_INTERVAL,
      SOCKET_ERR_CODE_REF = config.SOCKET_ERR_CODE_REF;
  var runtime = chrome.runtime,
      tabs = chrome.tabs;
  var manifest = runtime.getManifest(); // =============================== Helper functions ======================================= //

  var formatter = function formatter(msg) {
    return "[ WCER: ".concat(msg, " ]");
  };

  var logger = function logger(msg) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "info";
    return console[level](formatter(msg));
  };

  var timeFormatter = function timeFormatter(date) {
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  }; // ========================== Called only on content scripts ============================== //


  function contentScriptWorker() {
    runtime.sendMessage({
      type: SIGN_CONNECT
    }, function (msg) {
      return console.info(msg);
    });
    runtime.onMessage.addListener(function (_ref) {
      var type = _ref.type,
          payload = _ref.payload;

      switch (type) {
        case SIGN_RELOAD:
          logger("Detected Changes. Reloading ...");
          reloadPage && window.location.reload();
          break;

        case SIGN_LOG:
          console.info(payload);
          break;
      }
    });
  } // ======================== Called only on background scripts ============================= //


  function backgroundWorker(socket) {
    runtime.onMessage.addListener(function (action, sender, sendResponse) {
      if (action.type === SIGN_CONNECT) {
        sendResponse(formatter("Connected to Chrome Extension Hot Reloader"));
      }
    });
    socket.addEventListener("message", function (_ref2) {
      var data = _ref2.data;

      var _JSON$parse = JSON.parse(data),
          type = _JSON$parse.type,
          payload = _JSON$parse.payload;

      if (type === SIGN_CHANGE) {
        tabs.query({
          status: "complete"
        }, function (loadedTabs) {
          loadedTabs.forEach(function (tab) {
            return tab.id && tabs.sendMessage(tab.id, {
              type: SIGN_RELOAD
            });
          });
          socket.send(JSON.stringify({
            type: SIGN_RELOADED,
            payload: formatter("".concat(timeFormatter(new Date()), " - ").concat(manifest.name, " successfully reloaded"))
          }));
          runtime.reload();
        });
      } else {
        runtime.sendMessage({
          type: type,
          payload: payload
        });
      }
    });
    socket.addEventListener("close", function (_ref3) {
      var code = _ref3.code;
      logger("Socket connection closed. Code ".concat(code, ". See more in ").concat(SOCKET_ERR_CODE_REF), "warn");
      var intId = setInterval(function () {
        logger("Attempting to reconnect (tip: Check if Webpack is running)");
        var ws = new WebSocket(wsHost);
        ws.addEventListener("open", function () {
          clearInterval(intId);
          logger("Reconnected. Reloading plugin");
          runtime.reload();
        });
      }, RECONNECT_INTERVAL);
    });
  } // ======================= Bootstraps the middleware =========================== //


  runtime.reload ? backgroundWorker(new WebSocket(wsHost)) : contentScriptWorker();
})(chrome, window);
/* ----------------------------------------------- */

/* End of Webpack Chrome Hot Extension Middleware  */

/* ----------------------------------------------- */webpackHotUpdate("contentScript",{

/***/ "./src/contentScript.js":
/*!******************************!*\
  !*** ./src/contentScript.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var annotationsList = __webpack_require__(/*! ./annotations_list */ "./src/annotations_list.js").default;

var annotationsModal = __webpack_require__(/*! ./annotations_modal */ "./src/annotations_modal.js").default;

var annotationsMiniModal = __webpack_require__(/*! ./annotations_mini_modal */ "./src/annotations_mini_modal.js").default;

var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var React = __webpack_require__(/*! react */ "./node_modules/react/index.js"); // const MediumEditor = require('medium-editor');
//listener for events


chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentType === "create") {
    sendResponse({
      content: "creating modal"
    }); // var jQuery = document.createElement('script');
    // jQuery.type = 'text/javascript';
    // jQuery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
    // var bootstrapHTML = document.createElement('link');
    // bootstrapHTML.rel = 'stylesheet';
    // bootstrapHTML.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    //
    //
    // var bootstrapJS = document.createElement('script');
    // bootstrapJS.type = 'text/javascript';
    // bootstrapJS.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";

    var mediumEditor = document.createElement('script');
    mediumEditor.src = '//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js';

    mediumEditor.onload = function () {
      var editorScript = document.createElement('script');
      editorScript.innerHTML = "var editor = new MediumEditor('.editable');";
      document.body.appendChild(editorScript);
    };

    var mediumStyle = document.createElement('link');
    mediumStyle.rel = 'stylesheet';
    mediumStyle.type = 'text/css';
    mediumStyle.charset = 'utf-8';
    mediumStyle.media = 'screen';
    mediumStyle.href = '//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css'; // document.body.appendChild(jQuery);
    // document.body.appendChild(bootstrapHTML);

    document.body.appendChild(mediumEditor);
    document.body.appendChild(mediumStyle);
    var miniModal = document.createElement('div');
    miniModal.setAttribute('id', 'annotationMiniModal');
    document.body.appendChild(miniModal);
    annotationsMiniModal(request);
    var modal = document.createElement('div');
    modal.setAttribute('id', 'annotationModal');
    document.body.appendChild(modal);
    annotationsModal(request); //load the scripts into this iframe

    var aFrame = document.createElement('iframe');
    aFrame.id = "script-loading-frame"; // aFrame.appendChild(jQuery);
    // aFrame.appendChild(bootstrapHTML);
    // aFrame.appendChild(mediumEditor);
    //  aFrame.appendChild(mediumStyle);
    //  document.body.appendChild(aFrame);
    //allow medium editor to be used on the page

    document.body.className += " editable";
    return true;
  } else if (request.contentType === "triggerMiniModal") {
    sendResponse({
      content: "triggering mini modal"
    });
    annotationsList(request.url); //render annotationList using content, after creating id's
    //document.getElementById('quoteText').innerHTML = '"' + request.quoteText + '"';

    var _modal = document.getElementById('parentMiniModal');

    _modal.style.display = "block";
    return true;
  } else if (request.contentType === "url") {
    //if request contains url, need to display
    sendResponse({
      content: "displaying modal"
    }); //document.getElementById('annotationText').innerHTML = request.annotationText;

    annotationsList(request.url); //render annotationList using content, after creating id's
    //document.getElementById('quoteText').innerHTML = '"' + request.quoteText + '"';

    var _modal2 = document.getElementById('parentModal');

    _modal2.style.display = "block";
    return true;
  }
});

/***/ })

})
//# sourceMappingURL=contentScript.08d1788b69fdf02f9ed5.hot-update.js.map