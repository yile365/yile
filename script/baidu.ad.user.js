// ==UserScript==
// @name         去除百度搜索垃圾信息
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.baidu.com/*
// @match        *://m.baidu.com/*
// @match        *://baidu.com/*
// @match        *://*.baidu.com/*
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
	tryCatch(function(){
		if($('::shadow div').length>0){
			$('::shadow div').remove();
		}
	});
	tryCatch(function(){
		if($(".blank-frame").length>0){
			$(".blank-frame").remove();
		}
	});
	tryCatch(function(){
		if($("#copyright").next().length>0){
			$("#copyright").next().remove();
		}
	});
	tryCatch(function(){
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
		if($(".hint-fold-results-box").length>0){
			$(".hint-fold-results-box").remove();
			$("#page-relative").css("display","inline");
			$("#page-controller").css("display","inline");
		}
	});
	tryCatch(function(){
		if($(".tab-news-content").length>0){
			$(".tab-news-content").closest(".blank-frame").remove();
		}
	});
	tryCatch(function(){
		if($(".ec_wise_ad").length>0){
			$(".ec_wise_ad").remove();
		}
	});
	tryCatch(function(){
		if($(".packupButton").length>0){
			$(".packupButton").remove()
		}
	});
	tryCatch(function(){
		if($(".mainContent").attr("style")!=""){
			$(".mainContent").attr("style","");
		}
	});
	tryCatch(function(){
		if($(".outmargin").length>0){
			$(".outmargin").remove()
		}
	});
	tryCatch(function(){
		if($(".newVersion").length>0){
			$(".newVersion").remove()
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
			border-top: 1px solid #ccc;
			line-height: 20px;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 1000000000000;
		}
		#consolePanel > div.title{
			background: #eee;
			font-weight: bold;
			font-size: 15px;
			display: flex;
			justify-content: space-between;
			padding: 3px 10px;
			border-bottom: 1px solid #ccc;
			height: 20px;
		}
		#consolePanel > div.title > div:last-child{
			display: flex;
		}
		#consolePanel > div.title > div:last-child > span{
			font-size: 25px;
		}
		#consolePanel > div.content {
			overflow-y: auto;
			height: calc(100% - 27px);
		}
		#consolePanel > div.content > div{
			border-bottom: 1px solid #ccc;
			text-align: left;
			padding: 2px 5px;
		}
	`;
	$('<style>').html(css).appendTo($('head'));
	$("body").append(`
		<div id="consolePanel">
			<div class="title">
				<div>控制台</div>
				<div onclick="javascript:$('#consolePanel > div.content').empty();">
					清空
				</div>
			</div>
			<div class="content">
			</div>
		</div>
	`);
}

function printLog(msg){
	if(isDebug){
		setConsolePanel();
		$("#consolePanel > div.content").append('<div>'+msg+'</div>');
	}
}