// ==UserScript==
// @name         BGG YouTube Cookieizer
// @namespace    https://github.com/HolisticDeveloper/UserScripts
// @version      0.1
// @description  Enables YouTube cookies on BoardGameGeek (to get the Watch Later button)
// @author       HolisticDeveloper
// @match        https://*.boardgamegeek.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var xpath = `(
	//iframe[
		contains(@src, 'youtube-nocookie.com/embed/')
	]
)[not(ancestor::*[@id='YTLT-player'])]`;

var addCookies = function(node){

	var result = document.evaluate(
		xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var element = null;
	var i = 0, j;

	while ((element = result.snapshotItem(i++))) {
        element.src = element.src.replace("youtube-nocookie.com", "youtube.com");
	}
};

new MutationObserver(function(){
	if (document.body) {
		addCookies(document.body);
	}
}).observe(document, {
	childList: true,
	subtree: true
});

})();

