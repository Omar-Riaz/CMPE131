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

/***/ "./src/annotations_mini_modal.js":
/*!***************************************!*\
  !*** ./src/annotations_mini_modal.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-draggable */ "./node_modules/react-draggable/dist/react-draggable.js");
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var annotationsList = __webpack_require__(/*! ./annotations_list */ "./src/annotations_list.js");

var annotationFunctions = __webpack_require__(/*! ./annotationFunctions */ "./src/annotationFunctions.js");


/* harmony default export */ __webpack_exports__["default"] = (function (request) {
  var AnnotationMiniModal =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(AnnotationMiniModal, _React$Component);

    function AnnotationMiniModal(props) {
      var _this;

      _classCallCheck(this, AnnotationMiniModal);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AnnotationMiniModal).call(this));
      _this.handleClickSpan = _this.handleClickSpan.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }
    /*
     	//create modal --> ID and class
            et modal = document.createElement('div');
            modal.setAttribute('id', 'parentModal');
            modal.setAttribute('class', 'modal');
                let modalChild = document.createElement('div');
                modalChild.setAttribute('class', 'modal-content');
                    let modalChildSpan = document.createElement('span');
                    modalChildSpan.setAttribute('class', 'close">&times');
                    modalChild.appendChild(modalChildSpan);
                    let modalChildQuote = document.createElement('div');
                    modalChildQuote.setAttribute('id', 'quoteText');
                    modalChild.appendChild(modalChildQuote);
                    let modalChildAnnotation = document.createElement('div');
                    modalChildAnnotation.setAttribute('id', 'annotationText');
                    modalChild.appendChild(modalChildAnnotation);
                    let modalChildAnnotationList = document.createElement('div');
                    modalChildAnnotationList.setAttribute('id', 'annotationList');
                    modalChild.appendChild(modalChildAnnotationList);
    	modal.appendChild(modalChild);
    
            modalChildSpan.onclick = () => {           //close if press the x
                modal.style.display = "none";
    	};
            modal.style.display = "none";                                                    //set to no display by default
            document.body.appendChild(modal);                   //add to HTML body of page
    	
     */
    //Edit annotations by re-evoking the process of making an annotation, with the exception that the application doesn't flag a duplicate entry!


    _createClass(AnnotationMiniModal, [{
      key: "handleClickSpan",
      value: function handleClickSpan() {
        var modal = this.refs.parentModal;
        modal.style.display = "none";
      }
      /*annotationChange(){
      annotationsList(request.url);
      }*/

    }, {
      key: "render",
      value: function render() {
        //rendering a single annotationObject for each element in annotationObjects
        var modalStyle = {
          display: "none"
        };
        var miniModalListStyle = {
          overflowX: "none",
          overflowY: "none"
        };
        var margining = {
          margin: "15% auto",

          /* 15% from the top and centered */
          padding: "20px"
        };
        return React.createElement("div", null, React.createElement(react_draggable__WEBPACK_IMPORTED_MODULE_0___default.a, null, React.createElement("div", {
          id: "parentMiniModal",
          refs: "parentMiniModal",
          className: "miniModal",
          style: modalStyle
        }, React.createElement("div", {
          className: "miniModal-content"
        }, React.createElement("span", {
          onClick: this.handleClickSpan
        }), React.createElement("div", {
          className: "annotationList"
        })))));
      }
    }]);

    return AnnotationMiniModal;
  }(React.Component);

  ReactDOM.render(React.createElement(AnnotationMiniModal, null), document.getElementById('annotationMiniModal'));
});

/***/ })

})
//# sourceMappingURL=contentScript.295b32936b7829639213.hot-update.js.map