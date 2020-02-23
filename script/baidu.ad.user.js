// ==UserScript==
// @name         去除百度搜索垃圾信息
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.baidu.com/*
// @match        *://m.baidu.com/*
// @match        *://baidu.com/*
// @grant        none
// ==/UserScript==
let isDebug=true;
let count=0;

$(function() {
    'use strict';
    removeAd();
})();

function removeAd(){
    count++;
	printLog("count"+count);
    if(count>=100){
        return;
    }
	tryCatch(function(){
		printLog("::shadow div:"+$('::shadow div').length);
		if($('::shadow div').length>0){
			$('::shadow div').remove();
		}
	});
	tryCatch(function(){
		printLog(".blank-frame"+$('.blank-frame').length);
		if($(".blank-frame").length>0){
			$(".blank-frame").remove();
		}
	});
	tryCatch(function(){
		printLog("#copyright.next"+$("#copyright").next().length);
		if($("#copyright").next().length>0){
			$("#copyright").next().remove();
		}
	});
	tryCatch(function(){
		printLog("section.hint-fold-results-wrapper.hint-no-fold"+$('.blank-frame').length);
		if($("section.hint-fold-results-wrapper.hint-no-fold").length>0){
			$("section.hint-fold-results-wrapper.hint-no-fold").remove();
		}
	});
	tryCatch(function(){
		if($(".ec_wise_ad").length>0){
		   $(".ec_wise_ad").remove();
		}
	});
	tryCatch(function(){
		if($(".close").length>0){
			$(".close").click();
		}
	});
	tryCatch(function(){
		printLog(".hint-fold-results-box--length"+$(".hint-fold-results-box").length);
		if($(".hint-fold-results-box").length>0){
			$(".hint-fold-results-box").remove();
			$("#page-relative").css("display","inline");
			$("#page-controller").css("display","inline");
		}
	});
	tryCatch(function(){
		printLog(".tab-news-content--length"+$(".tab-news-content").length);
		if($(".tab-news-content").length>0){
			$(".tab-news-content").closest(".blank-frame").remove();
		}
	});
    setTimeout(removeAd,100);
}

function tryCatch(fn){
	try{
		fn();
	}catch(e){
		printLog('<span style="color:red;">'+e+'</span>');
	}
}
function setConsolePanel(){
	if($("#consolePanel").length>0){
		return;
	}
	let css=`
		body{
			padding-bottom: 200px;
		}
		#consolePanel{
			width: 100%;
			height: 200px;
			background: #fff;
			overflow-y: auto;
			border-top: 1px solid #ccc;
			display: flex;
			flex-wrap: wrap;
			line-height: 20px;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 1000000000000;
		}
		#consolePanel > div{
			width: 100%;
			border-bottom: 1px solid #ccc;
		}
	`;
	$('<style>').html(css).appendTo($('head'));
	$("body").append('<div id="consolePanel"></div>');
}

function printLog(msg){
	if(isDebug){
		setConsolePanel();
		$("#consolePanel").append('<div>'+msg+'</div>');
	}
}