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
    if(count>=100){
        return;
    }
    if($('::shadow div').length>0){
        $('::shadow div').remove();
    }
    if($(".blank-frame").length>0){
        $(".blank-frame").remove();
    }
    if($("#copyright").next().length>0){
        $("#copyright").next().remove();
    }
    if($("section.hint-fold-results-wrapper.hint-no-fold").length>0){
        $("section.hint-fold-results-wrapper.hint-no-fold").remove();
    }
    if($(".ec_wise_ad").length>0){
       $(".ec_wise_ad").remove();
    }
	printLog("copyright-next-length"+$("#copyright").next().length);
    if($("#copyright").next().length>0){
		$("#copyright").next().remove();
    }
    if($(".close").length>0){
		$(".close").click();
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
			overflow: hidden;
		}
		#wrapper{
			overflow-y: auto;
			height: ${pcBodyHeight}px;
		}
		#page{
			overflow-y: auto;
			height: ${mobileBodyHeight}px;
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