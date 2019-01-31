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
eval("\n\nvar annotationsList = __webpack_require__(/*! ./annotations_list */ \"./src/annotations_list.js\").default;\n\nvar annotationsModal = __webpack_require__(/*! ./annotations_modal */ \"./src/annotations_modal.js\").default;\n\nvar annotationsMiniModal = __webpack_require__(/*! ./annotations_mini_modal */ \"./src/annotations_mini_modal.js\").default;\n\nvar ReactDOM = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar MediumEditor = __webpack_require__(/*! medium-editor */ \"./node_modules/medium-editor/dist/js/medium-editor.js\"); //listener for events\n\n\nchrome.extension.onMessage.addListener(function (request, sender, sendResponse) {\n  if (request.contentType === \"create\") {\n    sendResponse({\n      content: \"creating modal\"\n    });\n    var jQuery = document.createElement('script');\n    jQuery.type = 'text/javascript';\n    jQuery.src = \"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"; //const jQueryViewport = document.getElementById('body');\n    //jQueryViewport.prepend(jQuery);\n\n    var bootstrapHTML = document.createElement('link');\n    bootstrapHTML.rel = 'stylesheet';\n    bootstrapHTML.href = \"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"; //const bootstrapHTMLViewport = document.getElementById('body');\n    //bootstrapHTMLViewport.prepend(bootstrapHTML);\n\n    /*var bootstrapJS = document.createElement('script');\r\n    //bootstrapJS.type = 'text/javascript';\r\n    jQuery.setAttribute('src', \"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\");\r\n    document.head.appendChild(bootstrapJS); */\n\n    var bootstrapJS = document.createElement('script');\n    bootstrapJS.type = 'text/javascript';\n    bootstrapJS.src = \"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"; //const bootstrapJSViewport = document.getElementById('body');\n    //bootstrapJSViewport.prepend(bootstrapHTML);\n\n    var mediumEditor = document.createElement('script');\n    mediumEditor.type = 'text/javascript';\n    mediumEditor.src = '//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js';\n    var mediumStyle = document.createElement('link');\n    mediumStyle.rel = 'stylesheet';\n    mediumStyle.type = 'text/css';\n    mediumStyle.charset = 'utf-8';\n    mediumStyle.media = 'screen';\n    mediumStyle.href = '//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css';\n    document.head.appendChild(jQuery);\n    document.head.appendChild(bootstrapHTML);\n    document.head.appendChild(mediumStyle);\n    var miniModal = document.createElement('div');\n    miniModal.setAttribute('id', 'annotationMiniModal');\n    document.body.appendChild(miniModal);\n    annotationsMiniModal(request);\n    var modal = document.createElement('div');\n    modal.setAttribute('id', 'annotationModal');\n    document.body.appendChild(modal);\n    annotationsModal(request);\n\n    document.onselectionchange = function () {\n      var editor = new MediumEditor('.editable');\n      console.log(\"sel changed\");\n    };\n\n    return true;\n  } else if (request.contentType === \"triggerMiniModal\") {\n    sendResponse({\n      content: \"triggering mini modal\"\n    });\n    annotationsList(request.url); //render annotationList using content, after creating id's\n    //document.getElementById('quoteText').innerHTML = '\"' + request.quoteText + '\"';\n\n    var _modal = document.getElementById('parentMiniModal');\n\n    _modal.style.display = \"block\";\n    return true;\n  } else if (request.contentType === \"url\") {\n    //if request contains url, need to display\n    sendResponse({\n      content: \"displaying modal\"\n    }); //document.getElementById('annotationText').innerHTML = request.annotationText;\n\n    annotationsList(request.url); //render annotationList using content, after creating id's\n    //document.getElementById('quoteText').innerHTML = '\"' + request.quoteText + '\"';\n\n    var _modal2 = document.getElementById('parentModal');\n\n    _modal2.style.display = \"block\";\n    return true;\n  }\n});\n\n//# sourceURL=webpack:///./src/contentScript.js?");

/***/ })

})