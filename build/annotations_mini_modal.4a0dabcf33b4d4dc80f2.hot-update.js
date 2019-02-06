webpackHotUpdate("annotations_mini_modal",{

/***/ "./src/annotations_list.js":
/*!*********************************!*\
  !*** ./src/annotations_list.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_structs_annotationMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data_structs/annotationMap */ "./src/data_structs/annotationMap.js");
/* harmony import */ var react_autosuggest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-autosuggest */ "./node_modules/react-autosuggest/dist/index.js");
/* harmony import */ var react_autosuggest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_autosuggest__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var ReactDOM = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var annotationFunctionsClass = __webpack_require__(/*! ./annotationFunctions */ "./src/annotationFunctions.js").default;

var annotationModal = __webpack_require__(/*! ./annotations_modal.js */ "./src/annotations_modal.js");



Object(_data_structs_annotationMap__WEBPACK_IMPORTED_MODULE_0__["default"])();

function isEmptyObject(obj) {
  return obj == null || Object.keys(obj).length === 0 && obj.constructor === Object;
} //step 1: load the whole function --> goes through instantiation
//step 2: use the instants to deal with the information


/* harmony default export */ __webpack_exports__["default"] = (function (urlArg) {
  var url = urlArg;

  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }

  var ChannelSearchBar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ChannelSearchBar, _React$Component);

    function ChannelSearchBar() {
      var _this;

      _classCallCheck(this, ChannelSearchBar);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ChannelSearchBar).call(this)); // Autosuggest is a controlled component.
      // This means that you need to provide an input value
      // and an onChange handler that updates this value (see below).
      // Suggestions also need to be provided to the Autosuggest,
      // and they are initially empty because the Autosuggest is closed.
      //NEEDED STATE VARIABLES: value --> newAnnotationText, suggestions --> channels(unselected)  
      //dummy string needed to avoid bug

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSuggestions", function (value) {
        var inputValue = value == undefined ? '' : value.trim().toLowerCase();
        var inputLength = inputValue.length;
        return inputLength === 0 ? [] : _this.props.suggestions.filter(function (channel) {
          return channel.toLowerCase().slice(0, inputLength) === inputValue;
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSuggestionsFetchRequested", function (_ref) {
        var value = _ref.value;

        _this.setState({
          suggestions: _this.getSuggestions(value)
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSuggestionsClearRequested", function () {
        _this.setState({
          suggestions: []
        });
      });

      _this.state = {
        value: '',
        suggestions: []
      };
      _this.getSuggestions = _this.getSuggestions.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getSuggestionValue = _this.getSuggestionValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderSuggestion = _this.renderSuggestion.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.updateState = _this.updateState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    } // Teach Autosuggest how to calculate suggestions for any given input value.


    _createClass(ChannelSearchBar, [{
      key: "renderSuggestion",
      // Use your imagination to render suggestions.
      value: function renderSuggestion(suggestion) {
        return React.createElement("div", {
          className: "list-group-item"
        }, suggestion);
      } // When suggestion is clicked, Autosuggest needs to populate the input
      // based on the clicked suggestion. Teach Autosuggest how to calculate the
      // input value for every given suggestion.

    }, {
      key: "getSuggestionValue",
      value: function getSuggestionValue(suggestion) {
        return suggestion;
      }
    }, {
      key: "onChange",
      value: function onChange(event, obj) {
        this.updateState({
          value: obj.newValue
        });
        this.props.onChange(event); //call any onChange event that was passed as a prop.
      }
    }, {
      key: "updateState",
      //call updateState from the parent to update the ChannelSearchBar
      value: function updateState(newState) {
        //change parent State	
        var oldState = Object.create(this.state); //create new object to prevent overwritting the old state

        Object.assign(oldState, newState); //assign only what we want to change.

        this.setState(oldState);
      }
    }, {
      key: "render",
      value: function render() {
        //this.getSuggestions(this.props.suggestions);
        var _this$state = this.state,
            value = _this$state.value,
            suggestions = _this$state.suggestions; // Autosuggest will pass through all these props to the input.

        var inputProps = {
          placeholder: 'Type a channel',
          value: value,
          onChange: this.onChange,
          onClick: function onClick(evt) {
            evt.target.select();
          }
        }; //onClick={evt=>{evt.target.select();}}>
        // Finally, render it!

        return React.createElement(react_autosuggest__WEBPACK_IMPORTED_MODULE_1___default.a, {
          suggestions: suggestions,
          onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
          onSuggestionsClearRequested: this.onSuggestionsClearRequested,
          alwaysRenderSuggestions: true,
          getSuggestionValue: this.getSuggestionValue,
          renderSuggestion: this.renderSuggestion,
          inputProps: inputProps
        });
      }
    }]);

    return ChannelSearchBar;
  }(React.Component);

  var annotationFunctions = annotationFunctionsClass();

  var QuoteText = function QuoteText() {
    var _this2 = this;

    return React.createElement("div", {
      ref: function ref(quote) {
        _this2.quote = quote;
      },
      className: "quotes"
    }, document.getSelection().toString());
  }; //The annotation environment holds the mode that the application is in: normal or compact
  //Based on the mode, it then arranges the 


  var AnnotationEnvironment =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(AnnotationEnvironment, _React$Component2);

    function AnnotationEnvironment(props) {
      var _this3;

      _classCallCheck(this, AnnotationEnvironment);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(AnnotationEnvironment).call(this)); //state contains current information
      //selected contains information of the selected quote(s) before the operation occured
      //selectedChannels contains all the channels that are currently asociasted with the annotation you are making/editing
      //newAnnotationChannels is a string that holds the value of the field for specifying channels to select
      //an entry from newAnnoationChannels is transferred over to selectedChannels upon approval of a new channel name/of an already exisitng channel

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "keyPress", function (evt) {
        if (evt.key == "Enter") _this3.submitType(_this3.operation);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "searchBarChange", function (evt) {
        var val = evt.target.value;
        _this3.newAnnotationChannels = val.split(/,\s*/).filter(function (elem) {
          return elem.length > 0;
        });
      });

      _this3.state = {
        mode: "",
        annotationObjects: new _data_structs_annotationMap__WEBPACK_IMPORTED_MODULE_0__["default"](),
        selectedChannels: ["default"],
        quote: ""
      }; // this.quote = "";
      // this.newAnnotationText = "";

      _this3.newAnnotationChannels = [];
      _this3.url = url;
      _this3.prevOperation = "";
      _this3.operation = "";
      _this3.submitAnnotationEdit = _this3.submitAnnotationEdit.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
      _this3.newAnnotation = _this3.newAnnotation.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
      _this3.deleteAnnotation = _this3.deleteAnnotation.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
      _this3.editAnnotation = _this3.editAnnotation.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
      _this3.updateState = _this3.updateState.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
      _this3.switchAnnotationStyle = _this3.switchAnnotationStyle.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
      _this3.submitType = _this3.submitType.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
      return _this3;
    } //wrapper for this.setState, which also updates the front-end in some ways such as passing down selection changes 


    _createClass(AnnotationEnvironment, [{
      key: "updateState",
      value: function updateState(newState) {
        //change parent State	
        var oldState = Object.create(this.state); //create new object to prevent overwritting the old state

        Object.assign(oldState, newState); //assign only what we want to change.

        this.setState(oldState); //change child State indirectly, by passing down
        //if(this.state.selected)this.state.selected.undoSelection();			
        //if(this.selected)	this.selected = null;
      }
    }, {
      key: "switchAnnotationStyle",
      value: function switchAnnotationStyle() {
        if (this.selected.refs[this.selected.props.quote].style.background == "#c4c4c4") this.selected.refs[this.selected.props.quote].style.background = "#FFFFFF";else this.selected.refs[this.selected.props.quote].style.background = "#c4c4c4";
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this4 = this;

        var annotationObjects = new _data_structs_annotationMap__WEBPACK_IMPORTED_MODULE_0__["default"](); //get all the annotations
        //STORAGE: aQuote: {obj containing annotation, channels, etc.}
        // chrome.storage.sync.clear();

        chrome.storage.sync.get(null, function (storage) {
          if (!isEmptyObject(storage)) {
            Object.entries(storage).map(function (storageItem) {
              console.log(storageItem); // storageItem.channels.map(channel => {
              //   annotationObjects.add(channel, storageItem);
              // });
              // storageItem[1].channels.map(channel =>{							//[1] to access the values of the [key,val] array element
              //   annotationObjects.add(channel, storageItem[1])
              // })

              annotationObjects.add(storageItem[1].channels, storageItem[1]); //[1] to access the values of the [key,val] array element
            });
          }

          _this4.updateState({
            annotationObjects: annotationObjects
          });

          _this4.operation = "new";
        }); // annotationObjects.add(["Family", "Friends"], {quote: "list", annotation: "cool3", channels: ["Family", "Friends"]});
        // this.updateState({annotationObjects: annotationObjects, operation: "new"});
        //the environment registers an event for selecting text

        document.addEventListener('mouseup', function (event) {
          var selection = document.getSelection().toString().trim();

          if (selection !== _this4.state.quote && selection !== "") {
            _this4.updateState({
              quote: selection
            });
          }
        });
      } //optimizations and error fixes with regards to updating and rendering
      //PREVENTS BOTH RENDER AND BACKEND CHANGES FROM BEING MADE!!!

    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return true;
      } //whenever the state changes, we reflect the change in the backend (for now, the chrome API)

    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var key = {};
        if (this.operation === "" || this.selected == null) return; //we need a defined operation to proceed, and an annotation to perform said operation on

        var url = this.url;
        var annotation = this.selected.props.annotation;
        var quote = this.selected.props.quote;
        var channels = this.selected.props.channels;

        if (this.operation === "delete") {
          chrome.storage.sync.remove(quote);
        } else if (this.operation === "edit" || this.operation === "new") {
          annotationFunctions.save(quote, annotation, channels); //save the annotation in storage API with specified properties
        }

        this.operation = this.prevOperation;
      } //delete an annnotation, and return the deleted annotation

    }, {
      key: "deleteAnnotation",
      value: function deleteAnnotation(element) {
        var newAnnotationMap = new _data_structs_annotationMap__WEBPACK_IMPORTED_MODULE_0__["default"](this.state.annotationObjects).deleteAnnotation(this.selected.props.channels, this.selected.props.quote);
        ; // this.updateState({
        // 	operation: "delete",
        // 	annotationObjects:
        // 			// });

        this.prevOperation = this.operation;
        this.operation = "delete";
        this.setState({
          annotationObjects: newAnnotationMap
        });
      } //the annotationList's only responsibility is to select the quote to edit. remaining parts of task are deffered to the modal

    }, {
      key: "editAnnotation",
      value: function editAnnotation(element) {
        //clear prior newAnnotationText HTML <input> field
        this.annotation.innerHTML = "";
        this.prevOperation = this.operation;
        this.operation = "pre-edit";
        this.switchAnnotationStyle();
      } //in future, props can be created by invoking AnnotationList method for converting annotation to rendered annotation?.

    }, {
      key: "newAnnotation",
      value: function newAnnotation() {
        var newAnnotation = {
          quote: this.state.quote,
          annotation: this.annotation.value,
          channels: this.newAnnotationChannels
        };
        var newAnnotationMap = new _data_structs_annotationMap__WEBPACK_IMPORTED_MODULE_0__["default"](this.state.annotationObjects).add(newAnnotation.channels, newAnnotation);
        this.selected = {
          props: newAnnotation
        };
        console.log("newAnnotationMap: " + newAnnotationMap);
        this.setState({
          annotationObjects: newAnnotationMap
        });
        this.newAnnotationChannels = newAnnotationMap.keysAsArray();
        this.prevOperation = this.operation;
        this.operation = "new";
        console.log("new annotation added");
      } //submit an annotation edit

    }, {
      key: "submitAnnotationEdit",
      value: function submitAnnotationEdit() {
        // let index = this.selected.props.index;
        // let theChannels = this.state.annotationObjects[this.selected.props.channel];
        // //update the annotation that is selected, by creating a new collection of annotations and modifying it
        // //this.state.annotationObjects[index].annotation = this.newAnnotationText
        //;
        // let newAnnotationObjects = Object.create(theChannel);
        // newAnnotationObjects[index].annotation = this.newAnnotationText
        //;
        var newAnnotationMap = new _data_structs_annotationMap__WEBPACK_IMPORTED_MODULE_0__["default"](this.state.annotationObjects).editAnnotation(this.selected.props.channels, this.selected.props.quote, this.annotation.value);
        this.updateState({
          annotationObjects: newAnnotationMap
        });
        this.newAnnotationChannels = newAnnotationMap.keysAsArray();
        this.prevOperation = this.operation;
        this.operation = "edit";
        this.switchAnnotationStyle();
      }
    }, {
      key: "submitType",
      value: function submitType(action) {
        //operations that happen when submitting an annotation --> happens for making new Annotations and editing annotations
        if (this.state.quote === "" || this.annotation.value === "") return;

        if (action == "new") {
          this.newAnnotation();
        } else if (action == "pre-edit") {
          this.submitAnnotationEdit();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this5 = this;

        var floatStyle = {
          float: "right"
        };
        console.log(this.state.annotationObjects);
        console.log(this.state.quote);
        return React.createElement("div", {
          className: "annotationEnvironment"
        }, React.createElement("div", {
          className: "quotes"
        }, this.state.quote), React.createElement("div", null, "Annotation Channels: "), React.createElement(ChannelSearchBar, {
          suggestions: this.state.annotationObjects.keysAsArray(),
          onKeyPress: this.keyPress,
          onChange: this.searchBarChange
        }), React.createElement("div", null, "Your Annotation: "), React.createElement("input", {
          ref: function ref(annotation) {
            _this5.annotation = annotation;
          },
          className: "annotation",
          onKeyPress: this.keyPress,
          onClick: function onClick(evt) {
            evt.target.select();
          },
          type: "text"
        }), React.createElement(AnnotationList, {
          deleteAnnotation: function deleteAnnotation(element) {
            _this5.selected = element;

            _this5.deleteAnnotation(element);
          },
          url: this.url,
          annotationObjects: this.state.annotationObjects,
          editAnnotation: function editAnnotation(element) {
            _this5.selected = element;

            _this5.editAnnotation(element);
          },
          key: "annotationList"
        }));
      }
    }]);

    return AnnotationEnvironment;
  }(React.Component);

  var AnnotationList =
  /*#__PURE__*/
  function (_React$Component3) {
    _inherits(AnnotationList, _React$Component3);

    function AnnotationList(props) {
      _classCallCheck(this, AnnotationList);

      return _possibleConstructorReturn(this, _getPrototypeOf(AnnotationList).call(this));
    }

    _createClass(AnnotationList, [{
      key: "render",
      value: function render() {
        var _this6 = this;

        //rendering a single annotationObject for each element in annotationObjects
        var annotationsToRender = [];

        if (!isEmptyObject(this.props.annotationObjects) && this.props.annotationObjects.size > 0) {
          var keys = new Set(); //for rendering only one annotation if there are multiple channels specified

          this.props.annotationObjects.forEach(function (value, channel) {
            value.map(function (annotation) {
              if (!keys.has(annotation.quote)) {
                annotationsToRender.push(React.createElement(AnnotationElement, {
                  editAnnotation: function editAnnotation(element) {
                    _this6.props.editAnnotation(element);
                  },
                  deleteAnnotation: function deleteAnnotation(element) {
                    _this6.props.deleteAnnotation(element);
                  },
                  key: annotation.quote,
                  quote: annotation.quote,
                  annotation: annotation.annotation,
                  channels: annotation.channels
                }));
                keys.add(annotation.quote);
              }
            });
          });
        }

        return React.createElement("div", null, annotationsToRender);
      }
    }]);

    return AnnotationList;
  }(React.Component);

  var AnnotationElement =
  /*#__PURE__*/
  function (_React$Component4) {
    _inherits(AnnotationElement, _React$Component4);

    function AnnotationElement() {
      var _this7;

      _classCallCheck(this, AnnotationElement);

      _this7 = _possibleConstructorReturn(this, _getPrototypeOf(AnnotationElement).call(this));
      _this7.editAnnotation = _this7.editAnnotation.bind(_assertThisInitialized(_assertThisInitialized(_this7)));
      _this7.deleteAnnotation = _this7.deleteAnnotation.bind(_assertThisInitialized(_assertThisInitialized(_this7)));
      return _this7;
    }

    _createClass(AnnotationElement, [{
      key: "editAnnotation",

      /*shouldComponentUpdate(){
      	if(this.state.selected == true)	return true;
      	else return false;
      }*/
      //ref callbacks to assign the selected instance variable in parent. In future, need to make the ref in the div a callback
      value: function editAnnotation() {
        this.props.editAnnotation(this);
      }
    }, {
      key: "deleteAnnotation",
      value: function deleteAnnotation() {
        this.props.deleteAnnotation(this);
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("div", {
          className: "container",
          style: this.props.elementStyling,
          ref: this.props.quote
        }, React.createElement("div", {
          className: "quotes"
        }, "\"", this.props.quote, "\""), React.createElement("div", {
          className: "annotations"
        }, "\u2003", this.props.annotation), React.createElement("button", {
          type: "button",
          className: "btn btn-default",
          onClick: this.deleteAnnotation
        }, React.createElement("span", {
          className: "glyphicon glyphicon-trash"
        }), " Delete"), "\u2003", React.createElement("button", {
          type: "button",
          className: "btn btn-default",
          onClick: this.editAnnotation
        }, React.createElement("span", {
          className: "glyphicon glyphicon-pencil"
        }), " Edit"), React.createElement("div", {
          className: "channels"
        }, "#", this.props.channels.map(function (channel) {
          return React.createElement("span", {
            className: "channel"
          }, channel);
        })));
      }
    }]);

    return AnnotationElement;
  }(React.Component);

  ReactDOM.render(React.createElement(AnnotationEnvironment, null), document.getElementsByClassName('annotationList')[0]);
});
;

/***/ })

})
//# sourceMappingURL=annotations_mini_modal.4a0dabcf33b4d4dc80f2.hot-update.js.map