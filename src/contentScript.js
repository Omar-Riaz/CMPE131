"use strict";
const annotationsList = require('./annotations_list').default;
const annotationsModal = require('./annotations_modal').default;
const annotationsMiniModal = require('./annotations_mini_modal').default;
const ReactDOM = require('react-dom');
const React = require('react');
// const MediumEditor = require('medium-editor');

//listener for events
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if(request.contentType === "create") {

    sendResponse({content: "creating modal"});


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

    var mediumEditor = document.createElement('script');
    mediumEditor.src = '//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js';
    mediumEditor.onload = function() {
      var editorScript = document.createElement('script');
      editorScript.innerHTML = "var editor = new MediumEditor('.editable');";
      document.body.appendChild(editorScript);
    };

    var mediumStyle = document.createElement('link');
    mediumStyle.rel = 'stylesheet';
    mediumStyle.type = 'text/css';
    mediumStyle.charset = 'utf-8';
    mediumStyle.media = 'screen';
    mediumStyle.href = '//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css';
    document.body.appendChild(jQuery);
    document.body.appendChild(bootstrapHTML);
    document.body.appendChild(mediumEditor);
    document.body.appendChild(mediumStyle);

    let miniModal = document.createElement('div');
    miniModal.setAttribute('id', 'annotationMiniModal');
    document.body.appendChild(miniModal);
    annotationsMiniModal(request);

    let modal = document.createElement('div');
    modal.setAttribute('id', 'annotationModal');
    document.body.appendChild(modal);
    annotationsModal(request);

    // document.onselectionchange = function() {
    // };

    // console.log("selection changed");

    //wrap the body in a div to allow tooltip to work
    var editableWrap = document.createElement('div');
    editableWrap.className = 'editable';
    // Move the body's children into this wrapper
    while (document.body.firstChild)
    {
      editableWrap.appendChild(document.body.firstChild);
      console.log('cycle');
    }

// Append the wrapper to the body
    document.body.appendChild(editableWrap);


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
