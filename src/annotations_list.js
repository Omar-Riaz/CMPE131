const React = require('react');
const ReactDOM = require('react-dom');
const annotationFunctionsClass = require('./annotationFunctions').default;
const annotationModal = require('./annotations_modal.js');
// import annotationMap from './annotationMap';
import Autosuggest from 'react-autosuggest';

class annotationMap extends Map<String, Array> {
  constructor(obj){
    super(obj);
  }
  add(key:String, value){
    this.set(key, this.get(key) == null ? new Array(value) : this.get(key).concat(value));
  }
  deleteAnnotation(keys:Array, field:String){
    channels.map(channel=>{
      this.set(channel, this.valueOf(key).filter(elem=>elem.quote != field));
    });
  }
}

function isEmptyObject(obj){
  return obj == null || (Object.keys(obj).length === 0 && obj.constructor === Object)
}

//step 1: load the whole function --> goes through instantiation
//step 2: use the instants to deal with the information
export default function (urlArg) {
	
var url = urlArg; 
	
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}


class ChannelSearchBar extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
	
	//NEEDED STATE VARIABLES: value --> newAnnotationText, suggestions --> channels(unselected)  
	//dummy string needed to avoid bug
    this.state = {
		value: '',
		suggestions: []
	};
	this.getSuggestions = this.getSuggestions.bind(this);
	this.getSuggestionValue = this.getSuggestionValue.bind(this);
	this.renderSuggestion = this.renderSuggestion.bind(this);
	this.onChange = this.onChange.bind(this);
	this.updateState = this.updateState.bind(this);

  }

	
	// Teach Autosuggest how to calculate suggestions for any given input value.
	getSuggestions = (value)=>{
		const inputValue = value == undefined ? '' : value.trim().toLowerCase();
		const inputLength = inputValue.length;
		

		return inputLength === 0 ? [] : this.props.suggestions.filter(channel=>
			channel.toLowerCase().slice(0, inputLength) === inputValue
		);
	};
	
	// Use your imagination to render suggestions.
	renderSuggestion(suggestion){
		return(	
			<div>
				{suggestion}
			</div>
		);
	}
	
	
	// When suggestion is clicked, Autosuggest needs to populate the input
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	getSuggestionValue(suggestion){return suggestion;}
	

	onChange(event, obj){
	  //this.setState({
      //  value: newValue
	  //});
		this.updateState({
			value: obj.newValue
		});
		//		this.onSuggestionsFetchRequested(evt.target.value);
	};

	
	onSuggestionsFetchRequested = ({value}) =>{
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = ()=>{
		this.setState({
			suggestions: []
		});
  	};

  	//call updateState from the parent to update the ChannelSearchBar
  	updateState(newState){
  	  	//change parent State	
  	  	let oldState = Object.create(this.state);		//create new object to prevent overwritting the old state
  	  	Object.assign(oldState, newState);				//assign only what we want to change.
  	  	this.setState(oldState);
  	  }


  	render() {
		//this.getSuggestions(this.props.suggestions);
		const { value, suggestions } = this.state;
		  // Autosuggest will pass through all these props to the input.
  		  const inputProps = {
  		    placeholder: 'Type a channel', 
  		    value,
  		    onChange: this.onChange,
			onClick: evt=>{evt.target.select();}
  		  };
			
		//onClick={evt=>{evt.target.select();}}>
  		  // Finally, render it!
  		  return (
  		    <Autosuggest
  		      suggestions={suggestions}
  		      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
  		      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			  alwaysRenderSuggestions={true}
  		      getSuggestionValue={this.getSuggestionValue}
  		      renderSuggestion={this.renderSuggestion}
  		      inputProps={inputProps}
  		    />
  		  );
  	}
}


	const annotationFunctions = annotationFunctionsClass();

	const QuoteText = function(){
		return(<div ref={quote=>{this.quote=quote}} className="quotes">{document.getSelection().toString()}</div>);
	};
	//The annotation environment holds the mode that the application is in: normal or compact
	//Based on the mode, it then arranges the 
	class AnnotationEnvironment extends React.Component{
		constructor(props){
			super();
			//state contains current information
			//selected contains information of the selected quote(s) before the operation occured
			//selectedChannels contains all the channels that are currently asociasted with the annotation you are making/editing
			//newAnnotationChannels is a string that holds the value of the field for specifying channels to select
			//an entry from newAnnoationChannels is transferred over to selectedChannels upon approval of a new channel name/of an already exisitng channel
			this.state = {
				mode: "",
				url: url,
				annotationObjects: new annotationMap(),
				annotations: {},
				operation: "",
				newAnnotationText: "",	newAnnotationChannels: ["default"],
				quote: "",
				selectedChannels : ["default"]
			};
			this.submitAnnotationEdit = this.submitAnnotationEdit.bind(this);
			this.newAnnotation = this.newAnnotation.bind(this);	
			this.deleteAnnotation = this.deleteAnnotation.bind(this);
			this.editAnnotation = this.editAnnotation.bind(this);
			this.updateState = this.updateState.bind(this);
			this.switchAnnotationStyle = this.switchAnnotationStyle.bind(this);
			this.submitType = this.submitType.bind(this);

		}
		//wrapper for this.setState, which also updates the front-end in some ways such as passing down selection changes 
		updateState(newState){
			//change parent State	
			let oldState = Object.create(this.state);		//create new object to prevent overwritting the old state
			Object.assign(oldState, newState);				//assign only what we want to change.
			this.setState(oldState);
			//change child State indirectly, by passing down
				//if(this.state.selected)this.state.selected.undoSelection();			
				//if(this.selected)	this.selected = null;
		}
		
		switchAnnotationStyle(){
			if(this.selected.refs[this.selected.props.quote].style.background == "#c4c4c4")	this.selected.refs[this.selected.props.quote].style.background = "#FFFFFF";
			else	this.selected.refs[this.selected.props.quote].style.background = "#c4c4c4";
		}

		componentDidMount(){
			let annotationObjects = new annotationMap();
			chrome.storage.sync.clear(()=>{
				console.log("storage cleared");
			});
			//get all the annotations
      //STORAGE: aQuote: {obj containing annotation, channels, etc.}
			chrome.storage.sync.get(null, (storage) => {
			  if(isEmptyObject(storage)){
          Object.entries(storage).map(storageItem => {
            // storageItem.channels.map(channel => {
            //   annotationObjects.add(channel, storageItem);
            // });
            storageItem[1].channels.map(channel =>{
              annotationObjects.add(channel, storageItem[1])
            })
          });
        }
			});
			this.updateState({annotationObjects: annotationObjects});
			//the environment registers an event for selecting text
			document.addEventListener('mouseup', event=>{
				let selection = document.getSelection().toString().trim();
				if(selection !== this.state.quote && selection !== ""){
					this.updateState({quote: selection});
				}
			});
		}

		//optimizations and error fixes with regards to updating and rendering
		//PREVENTS BOTH RENDER AND BACKEND CHANGES FROM BEING MADE!!!
		shouldComponentUpdate(nextProps, nextState){
			return true;
		}	
		//whenever the state changes, we reflect the change in the backend (for now, the chrome API)
		componentDidUpdate(){
			let key = {};		
			if(this.state.operation == "" || this.selected == null) return;		//we need a defined operation to proceed
			let url = this.state.url;
			let annotation = this.selected.props.annotation;
			let quote = this.selected.props.quote;
			let channels = this.selected.props.channels;
			if(this.state.operation === "delete"){
				chrome.storage.sync.remove(quote);
			}else if(this.state.operation === "edit" || this.state.operation === "new"){
				annotationFunctions.save(quote, annotation, channels);		//save the annotation in storage API with specified properties
			}
		}

		//delete an annnotation, and return the deleted annotation
		deleteAnnotation(element){
      let newAnnotationMap = new annotationMap(this.state.annotationObjects);
      newAnnotationMap.deleteAnnotation(this.selected.props.channels, this.selected.props.quote);
			// this.updateState({
			// 	operation: "delete",
			// 	annotationObjects:
      // 			// });
      this.setState({
        operation: "delete",
        annotationObjects: newAnnotationMap
      });
		}

		//the annotationList's only responsibility is to select the quote to edit. remaining parts of task are deffered to the modal
		editAnnotation(element){
		  this.updateState({
				operation: "pre-edit"
			});
			this.switchAnnotationStyle();
		}


		newAnnotation(){
		  let newAnnotation = {
		    quote: this.state.quote,
        annotation: this.state.newAnnotationText,
		    channels: this.state.newAnnotationChannels,
      };
		  let newAnnotationMap = new annotationMap(this.state.annotationObjects).add();
      this.setState({
        operation: "new",
        annotationObjects: newAnnotationMap
      });
      console.log("new annotation added");
		}

		//submit an annotation edit
		submitAnnotationEdit(){
			//clear prior newAnnotationText HTML <input> field
			this.annotation.value = "";	
			let index = this.selected.props.index;
			let theChannels = this.state.annotationObjects[this.selected.props.channel];
			//update the annotation that is selected, by creating a new collection of annotations and modifying it
			//this.state.annotationObjects[index].annotation = this.state.newAnnotationText;
			let newAnnotationObjects = Object.create(theChannel);
			newAnnotationObjects[index].annotation = this.state.newAnnotationText;
			this.updateState({
				operation: "edit",
				annotationObjects: newAnnotationObjects
			});
			this.switchAnnotationStyle();
		}
		
		submitType(action){
			//operations that happen when submitting an annotation --> happens for making new Annotations and editing annotations
			if(this.state.quote === "" || this.state.newAnnotationText === "")  return;

			if(action == "new"){
				this.newAnnotation();
			  }else if(action == "pre-edit"){
				this.submitAnnotationEdit();
			  }
		};


  render() {
    // const { value, suggestions } = this.state;

    // // Autosuggest will pass through all these props to the input.
    // const inputProps = {
    //   placeholder: 'Type a programming language',
    //   value,
    //   onChange: this.onChange
    		const floatStyle={
				float: "right"
			};
	  /*
<!--<input className="annotation" onChange={evt=>{this.setState({newAnnotationChannels: evt.target.value})}} onKeyPress={evt=>{if(evt.key == "Enter") submitType();}} onClick={evt=>{evt.target.select();}} type="text"></input>-->
					<!--<div><input placeholder="Search for an annotation by channel" className="annotation" onChange={evt=>{this.performChannelSearch(evt.target.value);}} onKeyPress={evt=>{if(evt.key == "Enter") this.submitType();}} onClick={evt=>{evt.target.select();}} type="text"></input></div> -->
	  */
			return(
				<div className="annotationEnvironment">
					<div ref={quote=>{this.quote=quote}} className="quotes">{this.state.quote}</div>
					<div>Annotation Channels: </div>
					<ChannelSearchBar suggestions={new Array("Default", "Friends", "Family")} onKeyPress={evt=>{if(evt.key == "Enter") this.submitType("new");}}> </ChannelSearchBar>
					<div>Your Annotation: </div><input ref={annotation=>{this.annotation=annotation}} className="annotation" onChange={evt=>{this.setState({newAnnotationText: evt.target.value})}} onKeyPress={evt=>{if(evt.key == "Enter") this.submitType("new");}} onClick={evt=>{evt.target.select();}} type="text"></input>
					<AnnotationList deleteAnnotation={element=>{this.selected=element; this.deleteAnnotation(element);}} url={this.state.url} annotationObjects={this.state.annotationObjects} editAnnotation={element=>{this.selected=element; this.editAnnotation(element);}} key="annotationList"/>
				</div>
			);
		}
	}


    class AnnotationList extends React.Component {

        constructor(props) {
            super();
		    }

        render() {               //rendering a single annotationObject for each element in annotationObjects
          let annotationsToRender = [];
          console.log(this.props.annotationObjects);
          if(!isEmptyObject(this.props.annotationObjects) && this.props.annotationObjects.size > 0){
            this.props.annotationObjects.forEach((value, channel) => {
              console.log(value);
              value.map(annotation=>{
                annotationsToRender.push(<AnnotationElement key={annotation.quote} quote={annotation.quote} annotation={annotation.annotation} channels={annotation.channels}/>);
              });
            });
          }


          return (
            <div>
              {annotationsToRender}
            </div>
          );
        }
    }


    class AnnotationElement extends React.Component {

	  constructor() {
			super();
			this.editAnnotation = this.editAnnotation.bind(this);
			this.deleteAnnotation = this.deleteAnnotation.bind(this);
	  };
			/*shouldComponentUpdate(){
				if(this.state.selected == true)	return true;
				else return false;
		}*/
		//ref callbacks to assign the selected instance variable in parent. In future, need to make the ref in the div a callback
		editAnnotation(){
			this.props.editAnnotation(this);
		};
		deleteAnnotation(){
			this.props.deleteAnnotation(this);
		};
		
		render() {
            return (
					<div className="container" style={this.props.elementStyling} ref={this.props.quote}>
   						<div className="quotes">"{this.props.quote}"</div>
						<div className="annotations">&emsp;{this.props.annotation}</div>
						<div className="glyphicon glyphicon-trash" onClick={this.deleteAnnotation}></div>&emsp;
						<div className="glyphicon glyphicon-pencil" onClick={this.editAnnotation}></div>
						<div>#{this.props.channel}</div>
         	 	   </div>
            );
        }
    }
	
    ReactDOM.render(
		<AnnotationEnvironment/>,
        document.getElementsByClassName('annotationList')[0]
    );

};