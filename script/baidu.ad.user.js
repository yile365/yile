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
var count=0;

$(function() {
    'use strict';
	setConsolePanel();
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
	aclert($("#consolePanel").length);
	$("body").after('<div id="consolePanel"></div>');
	$("body").css("overflow-y","auto");
	$("#consolePanel").css("height",100);
	$("#consolePanel").css("background","#fff");
	$("#consolePanel").css("overflow-y","auto");
	$("#consolePanel").css("border-top","1px solid #ccc");
	$("#consolePanel").css("display","flex");
	$("#consolePanel").css("flex-wrap","wrap");
	$(window).unbind("resize");
	$(window).bind("resize",function(){
		$("body").css("height",$(this).height() - 100);
	});
	$(window).trigger("resize");
	aclert(1);
}

function printLog(msg){
	$("#consolePanel").append('<div style="width:100%;">'+msg+'</div>');
}