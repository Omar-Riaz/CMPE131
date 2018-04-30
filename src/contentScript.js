"use strict";
const annotationsList = require('./annotations_list').default;
const annotationsModal = require('./annotations_modal').default;
const annotationsMiniModal = require('./annotations_mini_modal').default;
const ReactDOM = require('react-dom');
const React = require('react');

//listener for events
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    if(request.contentType === "create") {

        sendResponse({content: "creating modal"});

		//for testing purposes!
		// chrome.storage.sync.clear();
		// console.log("chrome storage cleared");
		
	   /* var jQuery = document.createElement('script');
	    //jQuery.type = 'text/javascript';
	    jQuery.setAttribute('src', "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
	    document.head.appendChild(jQuery); */


	    //include JS and HTML bootstrap
	    /*var bootstrapHTML = document.createElement('link');
	    bootstrapHTML.setAttribute('rel', 'stylesheet');
	    bootstrapHTML.setAttribute('href','https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
	    document.head.appendChild(bootstrapHTML); */
		


		var jQuery = document.createElement('script');
		jQuery.type = 'text/javascript';
		jQuery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
		//const jQueryViewport = document.getElementById('body');
		//jQueryViewport.prepend(jQuery);

		var bootstrapHTML = document.createElement('link');
		bootstrapHTML.rel = 'stylesheet';
		bootstrapHTML.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
		//const bootstrapHTMLViewport = document.getElementById('body');
		//bootstrapHTMLViewport.prepend(bootstrapHTML);


	    /*var bootstrapJS = document.createElement('script');
	    //bootstrapJS.type = 'text/javascript';
	    jQuery.setAttribute('src', "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
	    document.head.appendChild(bootstrapJS); */
		
		var bootstrapJS = document.createElement('script');
		bootstrapJS.type = 'text/javascript';
		bootstrapJS.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
		//const bootstrapJSViewport = document.getElementById('body');
		//bootstrapJSViewport.prepend(bootstrapHTML);

		document.getElementsByTagName('head')[0].appendChild(jQuery);
		document.getElementsByTagName('head')[0].appendChild(bootstrapHTML);
		//document.body.appendChild(bootstrapJS);
		
	    
	    //modal.style.display = "none";                                                    //set to no display by default
	    //        document.body.appendChild(modal);                   //add to HTML body of page

	    //setup listeners for closing the modal
	/*
        modalChildSpan.onclick = () => {           //close if press the x
            modal.style.display = "none";
	};*/
		let miniModal = document.createElement('div');
		miniModal.setAttribute('id', 'annotationMiniModal');
		document.body.appendChild(miniModal);
		annotationsMiniModal(request);

        let modal = document.createElement('div');
        modal.setAttribute('id', 'annotationModal');
		document.body.appendChild(modal);
		annotationsModal(request);


        return true;
    }

	else if(request.contentType === "triggerMiniModal"){
		
        sendResponse({content: "triggering mini modal"});
		
        annotationsList(request.url);                   //render annotationList using content, after creating id's
        //document.getElementById('quoteText').innerHTML = '"' + request.quoteText + '"';

		let modal = document.getElementById('parentMiniModal');	
		modal.style.display = "block";	

		return true;
	}
    
	else if(request.contentType === "url"){                 //if request contains url, need to display

        sendResponse({content: "displaying modal"});

	    //document.getElementById('annotationText').innerHTML = request.annotationText;
        annotationsList(request.url);                   //render annotationList using content, after creating id's
        //document.getElementById('quoteText').innerHTML = '"' + request.quoteText + '"';

        let modal = document.getElementById('parentModal');
        modal.style.display = "block";

        return true;
    }
});
