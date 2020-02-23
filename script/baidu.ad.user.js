// ==UserScript==
// @name         去除百度搜索垃圾信息
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        *://www.baidu.com/*
// @match        *://m.baidu.com/*
// @match        *://baidu.com/*
// @grant        none
// ==/UserScript==
var count=0;

(function() {
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
    if($("#copyright").next().length>0){
		$("#copyright").next().remove();
    }
    if($(".close").length>0){
		$(".close").click();
    }
    if($(".hint-fold-results-box").length>0){
		$(".hint-fold-results-box").remove();
		$("#page-relative").css("display","inline");
		$("#page-controller").css("display","inline");
	}
    if($(".tab-news-content").length>0){
		$(".tab-news-content").closest(".blank-frame").remove();
	}
    setTimeout(removeAd,100);
}