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
	try{
		printLog("::shadow div:"+$('::shadow div').length);
		if($('::shadow div').length>0){
			$('::shadow div').remove();
		}
	}catch(e){
		printLog("::shadow div:"+e);
	}
	try{
		printLog(".blank-frame"+$('.blank-frame').length);
		if($(".blank-frame").length>0){
			$(".blank-frame").remove();
		}
	}catch(e){
		printLog(".blank-frame:"+e);
	}
	try{
		printLog("#copyright.next"+$("#copyright").next());
		if($("#copyright").next().length>0){
			$("#copyright").next().remove();
		}
	}catch(e){
		printLog("copyright:"+e);
	}
	try{
		printLog("section.hint-fold-results-wrapper.hint-no-fold"+$('.blank-frame').length);
		if($("section.hint-fold-results-wrapper.hint-no-fold").length>0){
			$("section.hint-fold-results-wrapper.hint-no-fold").remove();
		}
	}catch(e){
		printLog("section.hint-fold-results-wrapper.hint-no-fold:"+e);
	}
	try{
		if($(".ec_wise_ad").length>0){
		   $(".ec_wise_ad").remove();
		}
	}catch(e){
		printLog(".ec_wise_ad:"+e);
	}
	try{
		if($(".close").length>0){
			$(".close").click();
		}
	}catch(e){
		printLog(".close:"+e);
	}
	printLog(".hint-fold-results-box--length"+$(".hint-fold-results-box").length);
    if($(".hint-fold-results-box").length>0){
		$(".hint-fold-results-box").remove();
		$("#page-relative").css("display","inline");
		$("#page-controller").css("display","inline");
	}
	printLog(".tab-news-content--length"+$(".tab-news-content").length);
    if($(".tab-news-content").length>0){
		$(".tab-news-content").closest(".blank-frame").remove();
	}
    setTimeout(removeAd,100);
}

function setConsolePanel(){
	if($("#consolePanel").length>0){
		return;
	}
	let pcBodyHeight=$(window).height() - 100;
	let mobileBodyHeight=$(window).height() - 100 - 146;
	let css=`
		body{
			position: fixed;
			padding-bottom: 100px;
		}
		#consolePanel{
			width: 100%;
			height: 100px;
			background: #fff;
			overflow-y: auto;
			border-top: 1px solid #ccc;
			display: flex;
			flex-wrap: wrap;
			line-height: 20px;
		}
		#consolePanel > div{
			width: 100%;
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