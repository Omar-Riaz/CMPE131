webpackHotUpdate("annotations_mini_modal",{

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
          className: "miniModal"
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
//# sourceMappingURL=annotations_mini_modal.818ab75842d188092e9a.hot-update.js.map