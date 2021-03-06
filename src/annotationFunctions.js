export default function(){
/**
 * GENERAL PURPOSE FUNCTIONALITY THAT IS TAKEN FROM THE prepPage CONTENT SCRIPT
 * I MIGHT NOT NEED THIS.
 */
"use strict";
let tabId = 0;          //dummy value
return {


createContextMenus: function(){
    let annotationText;
    let contextMenuProps = {
        type: 'normal',
        id: '1',
        contexts: ['selection'],
        title: 'ReMedia: annotate selection'
    };
    chrome.contextMenus.create(contextMenuProps);
},

// chrome.webNavigation.onCompleted.addListener((details) =>{
//     registerEvents();           //get events registered
// });



registerEvents: function() {
    //this logic needs to run after every page load
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {       //NOTE: I think this runs multiple times. would be nice to only run once
        //setup the modal window in content Script
        let tabIdPromise = new Promise((resolve, reject) => {
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {            //get tab, to refer to tab ID.      WILL BREAK IF NOT KEEPING TAB IN THE SELECTED STATE
                resolve(tabs[0].id);
            });
        });
        tabIdPromise.then(tabId => {
            tabId = tabId;
            chrome.tabs.sendMessage(tabId, {contentType: "create"}, response => {
                if (response) {
                    console.log(response);//indication that content script is rendering
                }
            });
        });
    });

    function clickEvent() {                                      //need response and url in the event registration. must therefore register for each page
        //annotationText = performAnnotate();
        //saveAnnotation(response, annotationText);
        preSaveAnnotation(null);                                //prepare the work necessary to begin saving annotations
    }
    chrome.contextMenus.onClicked.addListener(clickEvent);

    function highlightEvent() {
      generateTooltip();
    }
},


/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found
 */
getCurrentTabUrl: function() {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    let queryInfo = {
        active: true,
        currentWindow: true
    };
    return new Promise((resolve, reject) =>{
        chrome.tabs.query(queryInfo, (tabs) => {
            // chrome.tabs.query invokes the callback with a list of tabs that match the
            // query. When the popup is opened, there is certainly a window and at least
            // one tab, so we can safely assume that |tabs| is a non-empty array.
            // A window can only have one active tab at a time, so the array consists of
            // exactly one tab.
            let tab = tabs[0];
            // A tab is a plain object that provides information about the tab.
            // See https://developer.chrome.com/extensions/tabs#type-Tab
            let url = tab.url;
            // tab.url is only available if the "activeTab" permission is declared.
            // If you want to see the URL of other tabs (e.g. after removing active:true
            // from |queryInfo|), then the "tabs" permission is required to see their
            // "url" properties.
            console.assert(typeof url == 'string', 'tab.url should be a string');
            resolve(url);
            //callback();
            //annotationsList(url);
        });
    });
    // return aPromise.then(response =>{
    //    return response;
    // });
},


/**
 * Question: can/should this go in a contentScript
 * Loads the single selected quote in UI
 */
loadQuote: function() {
    //update the extension text
    return new Promise((resolve, reject) => {
        let script = 'document.getSelection().toString()';
        let annotation;
        // See https://developer.chrome.com/extensions/tabs#method-executeScript.
        // chrome.tabs.executeScript allows us to programmatically inject JavaScript
        // into a page. Since we omit the optional first argument "tabId", the script
        // is inserted into the active tab of the current window, which serves as the
        // default.
        let executeScriptPromise = chrome.tabs.executeScript({
            code: script
        }, function (response) {
            //document.getElementById("quoteText").innerHTML = response[0];
	    console.log(response[0]);
            resolve(response[0]);
        });
    });
},


/**
 * perform annotations on a single selected quote
 */
performAnnotate: function() {

    // //update the extension text
    //  let script = 'document.getSelection().toString()';
    //  let annotation;
    //  // See https://developer.chrome.com/extensions/tabs#method-executeScript.
    //  // chrome.tabs.executeScript allows us to programmatically inject JavaScript
    //  // into a page. Since we omit the optional first argument "tabId", the script
    //  // is inserted into the active tab of the current window, which serves as the
    //  // default.
    //  let executeScriptPromise = chrome.tabs.executeScript({
    //    code: script
    //  }, function (response){
    //     document.getElementById("quoteText").innerHTML=response[0];
    //     annotation = prompt("enter your annotation");
    //     document.getElementById("annotationText").innerHTML=annotation;
    //     return annotation;
    //  });

    let annotation = prompt("enter your annotation");
    //document.getElementById("annotationText").innerHTML = annotation;
    return annotation;

},


/**
 * Gets the saved annotation for url.
 *
 * @param {string} url URL whose annotations are to be retrieved.
 * @param {function(string)} callback called with the saved annotations for
 *     the given url on success, or a falsy value if no annotations are retrieved.
 */
getSavedAnnotations: function(url) {
    // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
    // for chrome.runtime.lastError to ensure correctness even when the API call
    // fails.
    // chrome.storage.sync.get(url, (items) => {
    //   callback(chrome.runtime.lastError ? null : items[url]);
    // });
    return new Promise((resolve, reject) =>{
        console.log(url);
        chrome.storage.sync.get(url, (urlObject) => {
				//console.log(urlObject.annotations);
				/*ANNOTATION STRUCTURE:
					"url":{
						"quote1": {//annotation + other data}
						"quote2": {//annotation + other data}
					}
				*/
            resolve(chrome.runtime.lastError ? null : urlObject[url]);
        });
    });
},

/**
 * Sets the annotations for url of current page.
 *
 * @param {string} url URL for page of which contains the annotations that are to be saved.
 * @param {string} quoteText The quote to be saved.
 * @param {string} annotationText The annotation to be saved
 */
// saveAnnotation: function (url, quoteText, annotationText) {
// //     if(!quoteText || !annotationText)   return;                 //don't do anything if annotation invalid
// // 		/*chrome.storage.sync.get(url, result => {
// //         let items = result;
// //
// //         let annotationObject = {                                //new Object representing annotation metadata to add to annotations
// //             quoteText: quoteText,
// //             annotationText: annotationText
// //         };
// // 	    let annotationsArray = [];
// // 	    annotationsArray.push(annotationObject);
// //         if(Object.values(items)[0])               //include previous annotations if they exist. the 0 property comes from chrome API--> adds an integer key to all thing u save
// // 	annotationsArray = annotationsArray.concat(Object.values(items)[]);
// // 	    //annotationsArray.push(annotationObject);                //include the new annotation
// //         items = {["" + url]: {                                  //"recreate" the key-value object to store in chrome storage (key is the url)
// //             annotations: annotationsArray
// //         }};
// //
// //         // console.log(items);
// //         chrome.storage.sync.set(items, ()=>{
// //
// //         });                         //save onto chrome storage
// // 	});*/
// // //	let items = {};
// // //	items[url] = [];
// // //	items[url][quoteText] = {};
// // //	items[url][quoteText].annotation = annotationText;
// // 	let item = {};
// // 	item.quote = quoteText;
// // 	item.annotation = annotationText;
// //
// //
// // 		/*	chrome.storage.sync.set(items[url][quoteText], ()=>{
// // 		annotationsList(url);
// // 	});*/
// // 	let obj = {
// // 		url: []
// // 	};
// // 	chrome.storage.sync.set();
// //
// // },


  save: function (quoteText, annotationText, channels) {
    if(!quoteText || !annotationText)   return;                 //don't do anything if annotation invalid
    // chrome.storage.sync.get(url, items=>{
    //   channels.map(channel=>{
    //     items[channel].push({quote: quoteText, annotation: annotationText});
    //   });
    //   chrome.storage.sync.set(items, result=>{console.log("saved")});
    // });
    let storageItem = {
      [quoteText]: {
        annotation: annotationText,
        channels: channels,
        quote: quoteText
      }
    };
    console.log(storageItem);
    chrome.storage.sync.set(storageItem);
  },

getAnnotationObjModel: function(url, quoteText, annotationText){
//	let items = {};
//	items[url] = {};
//	items[url][quoteText] = {};
//	items[url][quoteText].annotation = annotationText;
//
	let item = {};
	item.quote = quoteText;
	item.annotation= annotationText;
	return item;
},

setQuoteObj: function(){
	
},

//get all quotes that are associated with the given url
loadQuotes: function(url){
	chrome.storage.sync.get(null, quotes =>{
		let theQuotes = quotes.filter(quote=>{
			if(quote.url === url)	return quote;
		});
		return theQuotes;
	});
},

//save a quote --> used when making a new quote or editing an existing quote
//new --> simple, just set in storage
saveQuote: function(url, quote, annotation, channels){
	
	//make new key/value pair for data
	let quoteObj = {};
	quoteObj[quote] = {
		url: url,
		annotation: annotation,
		channels: channels
	};
	
	//Note: this approach overrides a pre-existing quote and the quoteObject it is associated with	
	//call to API to set storage
	chrome.storage.sync.set(quoteObj);
},

saveChannels: function(channels){
	
	//make new key/value pair for data
	let quoteObj = {};
	quoteObj['channels'] = {
		channels: channels
	};
	
	//Note: this approach overrides a pre-existing quote and the quoteObject it is associated with	
	//call to API to set storage
	chrome.storage.sync.set(quoteObj);
},


saveQuoteStateModel: function(url, quote, annotation){
	
	//make new key/value pair for data
	let quoteObj = {};
	quoteObj[quote] = {
		url: url,
		annotation: annotation
	};
	
	//Note: this approach overrides a pre-existing quote and the quoteObject it is associated with	
	//call to API to set storage
	return quoteObj;
},

		/*
function saveAnnotations(annotations) {
	annotationsArray = annotationsArray.concat(Object.values(items)[0].annotations);
	//annotationsArray.push(annotationObject);                //include the new annotation
	let items = 
	items = {["" + url]: {                                  //"recreate" the key-value object to store in chrome storage (key is the url)
		annotations: annotationsArray
	}};
	//console.log(items);
	chrome.storage.sync.set(items, ()=>{

	});                         //save onto chrome storage
}*/



// This extension loads the saved annotations for the current tab if one
// exists. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.

preSaveAnnotation: function() {
    // let quoteText = loadQuote();
    // let annotationText;
    // let annotations = [];
    // let url = getCurrentTabUrl();	
	// if(!previousAnnotation) quotePromise = loadQuote();
    let theQuote = "";
    let annotationText;
    let annotations = [];
    let urlPromise = getCurrentTabUrl();
    let theUrl;

    urlPromise.then(url => {            //get Url of current selected tab
        theUrl = url;
	    let quotePromise = loadQuote();
	    quotePromise.then(quote =>{
			theQuote = quote;
	    });
        getSavedAnnotations(theUrl);
    }).then(savedAnnotations => {               //ask for user input, save it as annotation and display the modal
	    // annotationText = performAnnotate();
	saveAnnotation(theUrl, theQuote, annotationText);
        console.log("about to render modal");
        let tabIdPromise = new Promise((resolve, reject) => {                           //Promise wrapper needed to force synch. behaviour
            chrome.tabs.query({active: true, currentWindow: true}, tabs => {            //get tab, to refer to tab ID.      WILL BREAK IF NOT KEEPING TAB IN THE SELECTED STATE
                resolve(tabs[0].id);
            });
        });
        tabIdPromise.then(tabId =>{
            chrome.tabs.sendMessage(tabId, {contentType: "url", quoteText: theQuote, url: theUrl}, response => {
                if (response) {
                    console.log(response);      //indication that content script is rendering
                }
            });
        });
    });
},

//Find an annotation by its quote, from the currently saved annotations 
findAnnotation: function(quoteText){
	let annotations = annotationFunctions.getSavedAnnotations();
        let theNewAnnotations = annotations.filter(annotation =>{
		if(annotation.quoteText === quoteText) return annotation; 
	});
        return theNewAnnotations[0];
}
};
}
