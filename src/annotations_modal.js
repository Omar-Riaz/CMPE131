const React = require('react');
const ReactDOM = require('react-dom');
const annotationsList = require('./annotations_list');
const annotationFunctions = require('./annotationFunctions');

export default function (request) {

    class AnnotationModal extends React.Component {

        constructor(props) {
            super();
	    this.handleClickSpan = this.handleClickSpan.bind(this);
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
	

	handleClickSpan(){
		let modal = this.refs.parentModal;
		modal.style.display = "none";
	}

		    /*annotationChange(){
	    annotationsList(request.url);
	}*/

	    
        render() {               //rendering a single annotationObject for each element in annotationObjects
		const modalStyle = {
			display: "none"
		};

		const submitArrowStyle = {
			float: "right"
		};

		return(
		<div id="parentModal" refs="parentModal" className="modal" style={modalStyle}>
			<div className="modal-content">
				<span className='close">&times' onClick={this.handleClickSpan}></span>
				<div className="annotationList"></div>
			</div>
		</div>
		);
	}
    }
	
    ReactDOM.render(
        <AnnotationModal/>,
        document.getElementById('annotationModal')
    );
	

}
