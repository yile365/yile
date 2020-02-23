// ==UserScript==
// @name         hub
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  try to take over the world!
// @author       You
// @match        https://www.mlrcn.com/main.html
// @grant        none
// ==/UserScript==
$("#moliao_connectButton").unbind("click");
(function($, window, undefined) {
    if (typeof $.signalR !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }
    var signalR = $.signalR;
    function makeProxyCallback(hub, callback) {
        return function() {
            callback.apply(hub, $.makeArray(arguments));
        };
    }
    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;
        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];
                if (!hub.hubName) {
                    continue;
                }
                if (shouldSubscribe) {
                    subscriptionMethod = hub.on;
                } else {
                    subscriptionMethod = hub.off;
                }
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];
                        if (!$.isFunction(memberValue)) {
                            continue;
                        }
                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }
    $.hubConnection.prototype.createHubProxies = function() {
        var proxies = {};
        this.starting(function() {
            registerHubProxies(proxies, true);
            this._registerSubscribedHubs();
        }).disconnected(function() {
            registerHubProxies(proxies, false);
        });
        proxies["chatHub"] = this.createHubProxy("chatHub");
        proxies["chatHub"].client = {};
        proxies["chatHub"].server = {
            adduser:function(userinfo, cmd, platform, pz) {
                return proxies["chatHub"].invoke.apply(proxies["chatHub"], $.merge([ "Adduser" ], $.makeArray(arguments)));
            },
            getonline:function() {
                return proxies["chatHub"].invoke.apply(proxies["chatHub"], $.merge([ "Getonline" ], $.makeArray(arguments)));
            },
            moliao:function(userinfo, zt) {
                return proxies["chatHub"].invoke.apply(proxies["chatHub"], $.merge([ "Moliao" ], $.makeArray(arguments)));
            },
            recall:function(userinfo, ouserinfo, message, thxx, type) {
                return proxies["chatHub"].invoke.apply(proxies["chatHub"], $.merge([ "Recall" ], $.makeArray(arguments)));
            },
            send:function(userinfo, ouserinfo, type, message) {
                return proxies["chatHub"].invoke.apply(proxies["chatHub"], $.merge([ "Send" ], $.makeArray(arguments)));
            },
            upqz:function(userinfo, pz) {
                return proxies["chatHub"].invoke.apply(proxies["chatHub"], $.merge([ "Upqz" ], $.makeArray(arguments)));
            },
            userstate:function(user) {
                return proxies["chatHub"].invoke.apply(proxies["chatHub"], $.merge([ "Userstate" ], $.makeArray(arguments)));
            },
            sendcount:function(userinfo, count) {
                return proxies["chatHub"].invoke.apply(proxies["chatHub"], $.merge([ "Sendcount" ], $.makeArray(arguments)));
            }
        };
        return proxies;
    };
    signalR.hub = $.hubConnection("https://www.quouyu.com/signalr", {
        useDefaultPath:false
    });
    $.extend(signalR, signalR.hub.createHubProxies());
})(window.jQuery, window);

$(window).load(function() {
    if (document.documentElement.clientWidth > 600) {
        $(".messagelist").css("height", document.documentElement.clientHeight - 185);
        $(".ifrcontent").css("height", document.documentElement.clientHeight - 65);
    } else {
        $(".messagelist").css("height", document.documentElement.clientHeight - 150);
        $(".ifrcontent").css("height", document.documentElement.clientHeight - 65);
    }
});

$(window).resize(function() {
    if (document.documentElement.clientWidth > 600) {
        $(".messagelist").css("height", document.documentElement.clientHeight - 185);
        $(".ifrcontent").css("height", document.documentElement.clientHeight - 65);
    } else {
        $(".messagelist").css("height", document.documentElement.clientHeight - 150);
        $(".ifrcontent").css("height", document.documentElement.clientHeight - 65);
    }
});

$(document).unbind("keyup");
$(document).bind("keyup", function(event) {
    if (event.keyCode == 13 && $("#moliao_sendButton").val() == "发送") {
        $("#moliao_sendButton").trigger("click");
    }
});

chatHub = null;
chatHub = $.connection.chatHub;

$(document).ready(function() {
    $.fn.textFocus=function(v){
        var range,len,v=v===undefined?0:parseInt(v);
        this.each(function(){
            len=this.value.length;
            v===0?this.setSelectionRange(len,len):this.setSelectionRange(v,v);
            this.focus();
        });
        return this;
    }
    $("#checkbox-place").prop("checked", false);
    $(".xinban").css("font-size","20px");

    $(".menuButton").pageslide({
        direction:"right",
        modal:false
    });
    chatHub.client.UserConnect = UserConnect;
    chatHub.client.Stranger = Stranger;
    chatHub.client.StrangerOut = StrangerOut;
    chatHub.client.Welcome = Welcome;
    chatHub.client.ReCallMessage = ReCallMessage;
    chatHub.client.Message = Message;
    chatHub.client.SYSTS = Systs;
    chatHub.client.SYSMessage = SYSMessage;
    chatHub.client.SendType = SendType;
    var lastmessage = "";
    $.connection.hub.start().done(function() {
		$("#moliao_sendButton").unbind("click");
        $("#moliao_sendButton").click(function() {
            if ($(this).val() == "图片") {
                if ($(this).attr("cmd") == 0) {
                    layer.open({
                        content:"请先匹配，再发送!",
                        skin:"msg",
                        time:2
                    });
                } else {
					layer.open({
						title:[ "插入图片", "background-color: #FF4351; color:#fff;height:40px;line-height: 40px;margin: 0;" ],
						content:"<div style='height: 100px; max-width:400px;text-align:center;'><div id='tp-wl' style='display:inline-block;cursor: pointer;'><img style='width: 80px;' src='/image/panel/item/wltp.gif' /><p style='text-align:center;'>网络图片</p></div><div id='tp-bd' style='display:inline-block;margin-left: 20px;cursor: pointer;'><img style='width: 80px;' src='/image/panel/item/bdtp.gif' /><p style='text-align:center;'>本地图片</p></div><div id='tp-ls' style='display:inline-block;margin-left: 20px;cursor: pointer;'><img style='width: 80px;' src='/image/panel/item/lstp.gif' /><p style='text-align:center;'>历史图片</p></div></div>",
						style:"max-width:400px;",
						success:function(elem) {
							$(elem).find("#tp-wl").click(function() {
								var urlimg = null;
								layer.open({
									title:[ "发送网络图片", "background-color: #FF4351; color:#fff;height:40px;line-height: 40px;margin: 0;" ],
									content:"<input type='text' id='send_img_url'  style='width:100%;' placeholder='请输入网络图片地址(支持：JPG,BMP,PNG,GIF)' />",
									style:"background-color:white; color:black;overflow:auto;font-size:12px;font-weight: bold; border:none;",
									btn:[ "插入" ],
									yes:function(index) {
										var url = $(urlimg).val().toLowerCase();
										if (!isImageFile(url) || url.length > 200) {
											layer.open({
												content:"插入失败,不是合规的图片格式!",
												skin:"msg",
												time:2
											});
										} else {
											$("#TextBox_send").val("[photo:" + $(urlimg).val() + "]");
											$("#moliao_sendButton").val("发送");
											$("#moliao_sendButton").trigger("click");
											layer.close(index);
										}
									},
									success:function(elem) {
										urlimg = $(elem).find("#send_img_url");
									}
								});
							});
							$(elem).find("#tp-bd").click(function() {
								$("#photo_upload").click();
							});
							$(elem).find("#tp-ls").click(function() {
								$.get("/setimg.aspx", function(imgstr) {
									layer.open({
										title:[ "插入历史图片", "background-color: #FF4351; color:#fff;height:40px;line-height: 40px;margin: 0;" ],
										content:"<div style='max-width:400px;text-align:center;'>" + imgstr + "</div>",
										style:"max-width:400px;",
										success:function(elem) {
											$(elem).find(".ls-tp").click(function() {
												$("#TextBox_send").val("[photo:" + $(this.children[0]).attr("src") + "]");
												$("#moliao_sendButton").val("发送");
												$("#moliao_sendButton").trigger("click");
												layer.closeAll();
											});
										}
									});
								});
							});
						}
					});
                }
            } else {
                var cmd = $(this).attr("cmd");
                var send = $("#T1").val();
                var message = $("#TextBox_send").val().trim();
                if (message.length > 0 && cmd != 0) {
                    if (lastmessage == send + message) {
                        SYSMessage(1);
                        Stranger_clear();
                    } else {
                        lastmessage = send + message;
                        if (message.length > 100) {
                            message = message.substring(0, 100);
                        }
                        chatHub.server.send(send, cmd, 1, message).fail(function(err) {
                            SYSMessage(-1);
                        });
                        sendmessage();
                    }
                } else {
                    Stranger_clear();
                }
                $(this).val("图片");
            }
        });
    });
    $("#photo_image").cropper({
        strict:false,
        resizable:false,
        background:false,
        modal:false,
        guides:false,
        highlight:false,
        movable:false,
        autoCrop:true,
        autoCropArea:.9
    });
    function upsend() {
        var croppedCanvas = $("#photo_image").cropper("getCroppedCanvas", {
            width:600,
            height:0
        });
        var imgData = croppedCanvas.toDataURL("image/jpg", .8);
        $.ajax({
            url:"https://www.quouyu.com/Panel/UploadPhoto",
            data:{
                imgData:imgData
            },
            type:"POST",
            success:function(data) {
                if (data.status == 1) {
                    $("#TextBox_send").val(data.msg);
                    $("#moliao_sendButton").val("发送");
                    $("#moliao_sendButton").trigger("click");
                    layer.closeAll();
                }
            }
        });
    }
    function isImageFile(file) {
        return /\.(jpg|jpeg|png|bmp|gif)$/.test(file);
    }
    $("#photo_upload").change(function() {
        var $file = $(this);
        var fileObj = $file[0];
        if (isImageFile($(fileObj).val())) {
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $("#photo_image");
            if (fileObj && fileObj.files && fileObj.files[0]) {
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.attr("src", dataURL);
            } else {
                dataURL = $file.val();
                var imgObj = document.getElementById("preview");
                imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
            }
            layer.open({
                type:2,
                content:"正在发送图片...",
                time:30,
                shadeClose:false
            });
            $img.cropper("replace", dataURL);
            setTimeout(upsend, 1e3);
        } else {}
    });
    $("#TextBox_send").bind("input propertychange", function() {
        if ($(this).val().length > 0) {
            $("#moliao_sendButton").val("发送");
        } else {
            $("#moliao_sendButton").val("图片");
        }
    });
    window.setTimeout(function() {
        var pw = document.documentElement.clientWidth == 0 ? document.body.clientWidth :document.documentElement.clientWidth;
        if (pw < 600) {
            $(".chatbar").css("background-image", "url(/Image/Panel/Item/nmchat.png)");
            $(".bbsbar").css("background-image", "url(/Image/Panel/Item/nmbbs.png)");
        }
    }, 1e4);
    window.setInterval(isonline, 3e4);
    var outonlinenum = 0;
    function isonline() {
        if (chatHub.connection.state != 1) {
            outonlinenum++;
            if (outonlinenum > 2) {
                window.location.href = "https://www.mlrcn.com/main.html";
            }
        } else {
            if (chatHub.connection.state == 1) {
                outonlinenum = 0;
            }
        }
    }
    /*var discount = 10;
    window.setInterval(isdk, 1e3);
    function isdk() {
        if (discount > 1 && $("#moliao_sendButton").attr("cmd").toString().length > 1) {
            discount--;
            if ($("#moliao_connectButton").val().indexOf("断开") > -1) {
                $("#moliao_connectButton").val("断开(" + discount + ")");
            }
        } else {
            if ($("#moliao_connectButton").val().indexOf("断开(") > -1) {
                $("#moliao_connectButton").val("断开");
            }
        }
    }*/
    function UserConnect() {
        if (getCookie("NewUser") != null) {
            var urlimg = null;
            var urlcode = null;
            layer.open({
                title:[ "请输入验证码", "background-color:#2b89d1; color:#fff;height:40px;line-height: 40px;margin: 0;" ],
                content:'<img id="verify" src="/ValidateCode.aspx" alt="看不清？换一张" title="看不清？换一张" />' + "<input type='text' id='send_img_url'  style='width:100%;' placeholder='请输入6位验证码' value='mlrcn'/>",
                style:"background-color:white; color:black;overflow:auto;font-size:12px;font-weight: bold; border:none;",
                btn:[ "确定" ],
                shadeClose:false,
                yes:function(index) {
                    var code = $(urlimg).val();
                    if (code.length == 6) {
                        $("#send").attr({
                            disabled:"disabled"
                        });
                        var frmdata = {
                            code:code
                        };
                        $.post("/newuser.aspx", frmdata, function(date) {
                            if (date == "1") {
                                //systemstips();
								chatHub.server.adduser($("#T1").val(), $("#T2").val(), $("#T3").val(), $("#T4").val());
								$(".menuButton").trigger("click");
								layer.closeAll();
								moliao(true);
                            } else {
                                $("#send").removeAttr({
                                    disabled:"disabled"
                                });
                                $(urlimg).val("");
                                urlimg.focus();
                            }
                        });
                    } else {
                        $(urlimg).val("");
                        urlimg.focus();
                    }
                },
                success:function(elem) {
                    urlimg = $(elem).find("#send_img_url");
                    urlcode = $(elem).find("#verify");
                    $(urlcode).click(function() {
                        $(urlcode).attr("src", "/ValidateCode.aspx?rd=" + Math.random());
                    });
                }
            });
            $("#send_img_url").textFocus();
            $("#send_img_url").keydown(function(e){
                if(e.keyCode==13){
                    $(".layui-m-layerbtn > span").click();
                }
            });
        } else {
            if (jhhtml != "" || $("#T6").val() != "0") {
                chatHub.server.adduser($("#T1").val(), $("#T2").val(), $("#T3").val(), $("#T4").val().replace("chat", "chat") + getCookie("code"));
            } else {
                chatHub.server.adduser($("#T1").val(), $("#T2").val(), $("#T3").val(), $("#T4").val());
            }
        }
    }
    function Welcome(zt) {
        moliao(true);
    }
    function systemstips() {
        var djstime;
        var tstime = 10;
        layer.open({
            title:[ "聊天须知", "background-color:#2b89d1; color:#fff;margin: 0;" ],
            content:'<div class="gdt">陌路人坚持匿名聊天为准则，不会收集和使用您的个人信息。<br><span style="color:blue;">如果你是未成年用户，推荐你在系统设置里面开启清流模式！</span><br><span >请礼貌聊天，文明交友，理性讨论，遵守当地有关法律法规。</span><br><span>不要散播谣言，传播色情信息，以及发送垃圾信息干扰用户正常使用！</span><div id="djstime">【' + tstime + "】</div></div>",
            btn:[ "我已知晓" ],
            shadeClose:false,
            success:function(elem) {
                djstime = document.getElementById("djstime");
                setInterval(function() {
                    tstime--;
                    if (tstime > 0) {
                        djstime.innerText = "【" + tstime + "】";
                    } else {
                        djstime.style.display = "none";
                    }
                }, 1e3);
            },
            yes:function(index, sss) {
                if (tstime < 1) {
                    layer.close(index);
                    systemstipstow();
                }
            }
        });
    }
    function systemstipstow() {
        var djstime;
        var tstime = 10;
        layer.open({
            title:[ "系统提示", "background-color:#2b89d1; color:#fff;margin: 0;" ],
            content:'<div class="gdt">最近聊天过程中高发的垃圾信息类别：<br><span style="color:blue;">1：主动诱骗添加QQ/微信，以收费裸聊/语音/文爱等付费拉黑方式进行诈骗。</span><br><span style="color:blue;">2：主动诱骗添加QQ/微信，然后交给另一批人进行诈骗（俗称引流）。</span><br><span style="color:blue;">3：网络赚钱赌博博彩诈骗，切记网络赚钱赌博都是骗局，无一例外。</span><br><span>请各位擦亮双眼注意聊天过程中系统风险提示，谨防欺诈！</span><div id="djstime">【' + tstime + "】</div></div>",
            btn:[ "我已知晓" ],
            shadeClose:false,
            success:function(elem) {
                djstime = document.getElementById("djstime");
                setInterval(function() {
                    tstime--;
                    if (tstime > 0) {
                        djstime.innerText = "【" + tstime + "】";
                    } else {
                        djstime.style.display = "none";
                    }
                }, 1e3);
            },
            yes:function(index, sss) {
                if (tstime < 1) {
                    chatHub.server.adduser($("#T1").val(), $("#T2").val(), $("#T3").val(), $("#T4").val());
                    $(".menuButton").trigger("click");
                    layer.closeAll();
                    moliao(true);
                }
            }
        });
    }
    function moliao(action) {
        if (action) {
            chatHub.server.moliao($("#T1").val(), 0);
        } else {
            chatHub.server.moliao($("#T1").val(), 1);
        }
        mlcount = 0;
        discount = 10;
    }
    if (getCookie("code") != null && $("#T6").val() == "0") {
        code();
    }
    var sytime;
	var get_type=0;
    function Stranger(cmd, city, sex) {
        $("#moliao_sendButton").attr("cmd", cmd);
        $("#Stranger_message_warp").html($("#Stranger_message_warp").html().replace("10", "0").replace('src="/image/hub/loading.gif">', "><em>√</em>"));
        var sys = "";
        var pd = "";
        if (city != "0") {
            pd = "来自<b>【" + city + "】</b>的";
        }
        if (sex != "0") {
            pd += "<b>【" + sex + "性】</b>";
        }
        if ($("#checkbox-sound").is(":checked")) {
            sys += "<p class='connectSuccessMessage'><img width='12px' src='/image/hub/system/x3.bmp'>&nbsp;&nbsp;当前模式：清流模式，全程关键字屏蔽，多次违规直接封号！</p>";
        } else {
            sys += "<p class='connectSuccessMessage'><img width='12px' src='/image/hub/system/x3.bmp'>&nbsp;&nbsp;您已经和一个" + pd + "陌生朋友连接上，问个好吧!</p>";
        }
        sys += '<p class="conversation_divider">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>';
        sys += '<p class="systemMessage"><span class="systemName">系统公告：</span>礼貌聊天，文明交友。请遵守当地有关法律法规，不要散播谣言，传播色情信息，以及发送垃圾信息干扰用户正常使用！</p>';
        Stranger_Message(sys);
        getlastmessage(cmd);
        if (cmd == "2A14AC1E97430202C79CF1A47805471E56C12EC8CBF61D194BB30BBD3E807500") {
            var sysj = Math.floor(Math.random() * 10 + 1) + 5;
            sytime = setTimeout(function() {
                chatHub.server.moliao($("#T1").val(), 2);
                StrangerOut();
            }, sysj * 1e3);
        }
        $("#moliao_connectButton").val("断开");
        layer.close(dklayerindex);
        dklayerindex = -1;
		get_type=0;
        if(sex=='女'){
			get_type=1;
            $(".xinban").html("匹配成功");
        }else{
            $("#moliao_connectButton").trigger("click");
            $("#moliao_connectButton").trigger("click");
        }
    }
    function getlastmessage(cmd) {
        var frmdata = {
            cmd:cmd
        };
        $.post("/getlastmessage.aspx", frmdata, function(date) {
            if (date != null) {
                Stranger_Message(date);
            }
        });
    }
    $("#moliao,#manliao,#miliao").click(function() {
        $("#moliao,#manliao,#miliao").removeClass("current");
        $("#moliaochat,#manliaochat,#miliaochat").hide();
        $(this).addClass("current");
        $("#" + $(this).attr("id") + "chat").show();
        if ($(this).attr("id") == "manliao" && $("#ifrchat").attr("src") == "") {
            if ($("input[name='sex']:checked").val() == "false") {
                $("#ifrchat").attr("src", "https://www.uplt.cn/tieba/room/0");
            } else {
                $("#ifrchat").attr("src", "https://www.uplt.cn/tieba/room/1");
            }
        }
        if ($(this).attr("id") == "miliao" && $("#ifrbbs").attr("src") == "") {
            $("#ifrbbs").attr("src", "https://www.uplt.cn/tieba/list");
        }
    });
    $("#checkbox-sound,#checkbox-place,input[name='sex']").change(function() {
        var fdate = {
            set:$("#checkbox-sound").is(":checked").toString() + "," + $("#checkbox-place").is(":checked").toString() + "," + $("input[name='sex']:checked").val() + ",chat"
        };
        $.post("/setchat.aspx", fdate, function(date) {
            $("#T4").val(encodeURI($("#checkbox-sound").is(":checked").toString() + "," + $("#checkbox-place").is(":checked").toString() + "," + $("input[name='sex']:checked").val() + ",chat"));
            if (jhhtml != "" || $("#T6").val() != "0") {
                chatHub.server.upqz($("#T1").val(), $("#T4").val().replace("chat", "chat") + getCookie("code"));
            } else {
                chatHub.server.upqz($("#T1").val(), $("#T4").val());
            }
        });
        $("#ifrchat").attr("src", "");
        $("#ifrbbs").attr("src", "");
    });
    function StrangerOut() {
        clearTimeout(sytime);
        var sys = "";
        sys += '<p class="conversation_divider">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>';
        sys += "<p class='disconnectMessage'><img width='12px' src='/image/hub/system/x4.bmp'>&nbsp;&nbsp;对方已经断开连接,你可以<b onclick='cxlj()'>点击左下角重新连接</b></p>";
        sys += "<p class='disconnectMessage'><img width='12px' src='/image/hub/system/x4.bmp'>&nbsp;&nbsp;如果对方掉线，你可以<b onclick='nmlt()'>点击进入社区寻人</b></p>";
        sys += "<p class='disconnectMessage'><img width='12px' src='/image/hub/system/x5.bmp'>&nbsp;&nbsp;对方有任何违规情况，你可以<b class='jubao' cmd='" + $("#moliao_sendButton").attr("cmd") + "'>点击此处进行举报！</b></p>";
        $("#moliao_connectButton").val("连接");
        Stranger_Message(sys);
        $("#moliao_sendButton").attr("cmd", "0");
        discount = 10;
    }
    var mlcount = 0;
    function Message(send, cmd, type, name, img, message) {
        if (type == 1 && $("#moliao_sendButton").attr("cmd") != "0") {
            Stranger_Message(othermessage.replace("@message", messageaction(message)).replace("@time", new Date().toLocaleString()), 1);
        }
    }
    $("#TextBox_send").on("input propertychange", function() {
        var count = $(this).val().length;
        if (count > 2) {
            var y = $("#T1").val();
            chatHub.server.sendcount(y, count);
        }
    });
    function SendType(count) {
        var x = "对方正在输入...（" + count + "）";
        var sys = '<img width="12px" src="/image/hub/system/x6.bmp">  &nbsp;&nbsp;' + x;
        Stranger_stips(sys);
    }
    function f5() {
        window.location.href = "https://www.mlrcn.com/main.html";
    }
    function Systs(msg, type) {
        if (type == 1) {
            layer.open({
                content:'<div><span style="color:yellow;" >系统消息</span><br><br>' + msg + "</div>",
                style:"overflow:hidden;line-height: 30px; background-color: #393D49; color: #fff; font-weight: 300;",
                btn:"关闭提示",
                shadeClose:false,
                yes:function() {
                    layer.closeAll();
                }
            });
        } else {
            if (type == 2) {
                eval(msg);
            } else {
                layer.open({
                    content:msg,
                    skin:"msg",
                    time:3
                });
            }
        }
    }
    function SYSMessage(type) {
        if (type == -100) {
            var sys = '<img width="12px" src="/image/hub/system/x5.bmp">  &nbsp;&nbsp;系统消息：不要发送违禁关键字！';
            Stranger_stips(sys);
        } else {
            if (type == -6) {
                var sys = '<img width="12px" src="/image/hub/system/x5.bmp">  &nbsp;&nbsp;系统提示：撤回失败,只能撤回三分钟内发送的消息！';
                $("#chat_textarea").val("").focus();
                Stranger_stips(sys);
            } else {
                if (type == -5) {
                    var sys = '<img width="12px" src="/image/hub/system/x5.bmp">  &nbsp;&nbsp;系统提示：对方掉线重连成功！';
                    $("#chat_textarea").val("").focus();
                    Stranger_stips(sys);
                } else {
                    if (type == -4) {
                        var sys = '<img width="12px" src="/image/hub/system/x5.bmp">  &nbsp;&nbsp;系统提示：对方掉线，请等待对方30秒重新连接！';
                        $("#chat_textarea").val("").focus();
                        Stranger_stips(sys);
                    } else {
                        if (type == -1) {
                            var sys = '<img width="12px" src="/image/hub/system/x5.bmp">  &nbsp;&nbsp;系统提示：信息发送失败！';
                            $("#chat_textarea").val("").focus();
                            Stranger_stips(sys);
                            window.setTimeout(f5, 2e3);
                        } else {
                            if (type == 1) {
                                var sys = '<img width="12px" src="/image/hub/system/x5.bmp">  &nbsp;&nbsp;反垃圾系统提示：请勿发送重复信息！';
                                $("#chat_textarea").val("").focus();
                                Stranger_stips(sys);
                            } else {
                                if (type == 2) {
                                    var sys = "<p class='connectsystemMessage'><img width='12px'src='/image/hub/system/x1.bmp'>&nbsp;&nbsp;系统正在初始化,请稍后。</p>";
                                    sys += "<p class='connectsystemMessage'><img width='12px' src='/image/hub/system/x2.bmp'>&nbsp;&nbsp;系统正在为你匹配聊天对象&nbsp;&nbsp;<img height='10px' src='/image/hub/loading.gif'></p>";
                                    $("#Stranger_message_warp").html(sys);
                                } else {
                                    if (type == 3) {
                                        clearTimeout(sytime);
                                        var sys = "";
                                        sys += '<p class="conversation_divider">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>';
                                        sys += "<p class='disconnectMessage'><img width='12px' src='/image/hub/system/x4.bmp'>&nbsp;&nbsp;<b style='color:red;' onclick='vip()' >点击购买VIP代码</b>，只匹配异性聊天！";
                                        sys += "<p class='disconnectMessage'><img width='12px' src='/image/hub/system/x4.bmp'>&nbsp;&nbsp;你已经断开连接,你可以<b>点击左下角重新连接！</b></p>";
                                        if ($("#moliao_sendButton").attr("cmd") != "0") {
                                            sys += "<p class='disconnectMessage'><img width='12px' src='/image/hub/system/x5.bmp'>&nbsp;&nbsp;对方有任何违规情况，你可以<b class='jubao' cmd='" + $("#moliao_sendButton").attr("cmd") + "'>点击此处进行举报！</b></p>";
                                        }
                                        $("#moliao_sendButton").attr("cmd", "0");
                                        $("#Stranger_message_warp").html($("#Stranger_message_warp").html().replace("10", "0").replace('src="/image/hub/loading.gif">', "><em>×</em>"));
                                        Stranger_Message(sys);
                                    } else {
                                        if (type == 11) {
                                            recallmsg();
                                            return;
                                        } else {
                                            if (type == 100) {
                                                layer.open({
                                                    content:'<div><span style="color:yellow;" >系统提示</span><br><br>系统拒绝为你提供服务！</div>',
                                                    style:"overflow:hidden;line-height: 30px; background-color: #393D49; color: #fff; font-weight: 300;",
                                                    btn:"立即退出！",
                                                    shadeClose:false,
                                                    time:10,
                                                    yes:function() {
                                                        window.location.href = "https://www.mlrcn.com/exit.aspx";
                                                    },
                                                    end:function() {
                                                        window.location.href = "https://www.mlrcn.com/exit.aspx";
                                                    }
                                                });
                                            } else {
                                                if (type == 101) {
                                                    layer.open({
                                                        content:'<div><span style="color:yellow;" >系统提示</span><br><br>你还没有登录，请先登录再使用！</div>',
                                                        style:"overflow:hidden;line-height: 30px; background-color: #393D49; color: #fff; font-weight: 300;",
                                                        btn:"立即登录！",
                                                        shadeClose:false,
                                                        time:10,
                                                        yes:function() {
                                                            window.location.href = "https://www.mlrcn.com/login.html";
                                                        },
                                                        end:function() {
                                                            window.location.href = "https://www.mlrcn.com/login.html";
                                                        }
                                                    });
                                                } else {
                                                    if (type == 102) {
                                                        moliao(false);
                                                        $("#moliao_connectButton").val("连接");
                                                        Stranger_stips("你处于见习模式，请稍后匹配！");
                                                        if (getCookie("code") == null) {
                                                            layer.open({
                                                                content:'<div><span style="color:yellow;" >你现在处于见习模式</span><br><br>见习模式有助于我们抵御垃圾广告信息，提高陌生人聊天质量，请勿清空浏览器缓存。<br>在等待期间你可以尝试去【群聊】或者【论坛】，如果你不想等待，可以注册或者购买VIP。<br>请文明聊天，礼貌交友，谢谢你的理解！<br>你还需要 <span style="color:yellow;" >' + arguments[1] + "分钟</span> 才能使用！</div>",
                                                                style:"overflow:hidden;line-height: 30px; background-color: #393D49; color: #fff; font-weight: 300;",
                                                                btn:"确定",
                                                                shadeClose:false,
                                                                yes:function(index) {
                                                                    $("#manliao").trigger("click");
                                                                    layer.close(index);
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $("#Stranger_message_warp").on("click", ".jubao", function() {
        var tempyhm = "陌生人";
        var tempcmd = $(this).attr("cmd");
        if (tempcmd == "0") {
            layer.open({
                content:"未获取到举报对象!",
                skin:"msg",
                time:2
            });
        } else {
            var jbmsg = $(this).attr("cmd");
            layer.open({
                content:"<iframe id='htmljubao' src='/jubao.aspx' width='100%'  height='100%'></iframe>",
                anim:"up",
                style:"max-width: 560px;-webkit-animation-duration: .5s; animation-duration: .5s;",
                success:function(elem) {
                    var game = $(elem).find("#htmljubao");
                    game.height($(game).parent().parent().height() + 120);
                    var layerindex = $(elem).attr("index");
                    $(game).on("load", function(event) {
                        var ds = $('input[name="jubao"]', this.contentDocument);
                        var tmsg = $("#jbmsg", this.contentDocument);
                        $("#jbyh", this.contentDocument).html("(" + tempyhm + ")");
                        $("#jubaogo", this.contentDocument).click(function() {
                            var jbtp = ds.filter(":checked").val();
                            var msg = tmsg.val();
                            if (msg != null && msg.length > 10) {
                                var frmdata = {
                                    cmd:tempcmd,
                                    type:1,
                                    jbtp:jbtp,
                                    msg:msg,
                                    jbmsg:jbmsg
                                };
                                $.post("/jubao.aspx", frmdata, function(date) {
                                    if (date != null) {
                                        layer.open({
                                            content:"举报成功!",
                                            skin:"msg",
                                            time:2
                                        });
                                    }
                                });
                            } else {
                                tmsg.focus();
                            }
                        });
                    });
                }
            });
        }
    });
    function ReCallMessage(cmd, msg, msg2) {
        /*
		$($("#Stranger_message_warp >.pairChatMessage").toArray().reverse()).each(function(index, obj) {
            if ($(obj).find(".onlymessage").html().replace("https://www.quouyu.com", "").replace(/&amp;/gi, "&").replace(/['" \/]/g, "").indexOf(msg2) > -1) {
                $(obj).find(".onlymessage").text("已撤回");
                return false;
            }
        });
		*/
    }
    var dklayerindex = -1;
    var cs = 0;
    $("#moliao_connectButton").click(function() {
        if ($("#moliao_connectButton").val() == "断开") {
			moliao(false);
			$("#moliao_connectButton").val("连接");
			cs = 0;
        } else {
            if ($("#moliao_connectButton").val() == "连接") {
                $(".xinban").html("匹配中…………");
                $("#moliao_connectButton").val("断开");
                moliao(true);
            }
        }
    });
    var sml;
    function Stranger_stips(tips) {
        $("#stips").html(tips);
        sml = window.setTimeout(tipclear, 2e3);
    }
    function tipclear() {
        $("#stips").html("&nbsp;");
        window.clearTimeout(sml);
    }
    function Stranger_clear() {
        $("#TextBox_send").val("");
        $("#TextBox_send").focus();
    }
    function messageaction(message) {
        if (message.indexOf("[hongbao:") != -1) {
            return "对方给你发送一个【红包】,请登录到新版领取！";
        } else {
            if (message.indexOf("[photo:") != -1) {
                var bq = "<img class='largerimg' src='@photo'  width='150px'/>";
                var zt = message.replace("[", "").replace("]", "").split("o:");
                if (zt[0] == "phot" && isImageFile(zt[1])) {
					var img=zt[1].toLowerCase().indexOf("http") > -1 ? zt[1] :"https://www.quouyu.com" + zt[1];
                    message = '<a href="'+img+'" target="_blank">'+bq.replace("@photo", img)+"</a>";
                }
                //return message + "<br><b onclick='qhxb()'>系统提示：高清大图请切换到新版查看！</b>";
                return message + "";
            } else {
                if (message.indexOf("[yuyin:") != -1) {
                    return "对方给你发送一段【语音】,请切换到新版查看！";
                } else {
                    return message;
                }
            }
        }
    }
    function Stranger_Message(message) {
		if(get_type>0){
			if(get_type>1){
				if(!$("#moliao").hasClass("current") && message.search("【男性】")<0){
					layer.open({
						content: "您有新消息:"+message,
						skin:"msg",
						time: 5
					});
				}
			}else{
				layer.open({
					content: "匹配成功",
					skin:"msg",
					time: 3
				});
				get_type=2;
			}
		}
        $("#Stranger_message_warp").append(message);
        var div = document.getElementById("Stranger_message_warp");
        div.scrollTop = div.scrollHeight;
    }
    var selfmessage = '<p class="selfChatMessage"><span class="slefName">你：</span><span class="onlymessage">@message</span><span class="messageTime">(@time)</span></p>';
    var othermessage = '<p class="pairChatMessage"><span class="pairChatName">陌生人：</span><span class="onlymessage">@message</span><span class="messageTime">(@time)</span></p>';
    function sendmessage() {
        if ($("#TextBox_send").val() != "") {
            if ($("#TextBox_send").val().indexOf("[photo:") != -1) {
                var frmdata = {
                    img:$("#TextBox_send").val()
                };
                $.post("/setimg.aspx", frmdata, function(date) {});
            }
            Stranger_Message(selfmessage.replace("@message", messageaction($("#TextBox_send").val())).replace("@time", new Date().toLocaleString()));
            Stranger_clear();
        }
    }
});

function qhxb() {
    layer.open({
        content:"你是否要切换到新版,切换新版将要断开当前连接？",
        btn:[ "切换", "取消" ],
        skin:"footer",
        yes:function(index) {
            window.location.href = "https://www.mlrcn.com/login.html";
        }
    });
}

function nmlt() {
    $("#miliao").trigger("click");
}

function cxlj() {
    $("#moliao_connectButton").trigger("click");
}

function gopay() {
    var frmdata = {
        code:$("#T5").val()
    };
    $.post("/code.aspx", frmdata, function(date) {
        if (date != null) {
            chatHub.server.upqz($("#T1").val(), $("#T4").val().replace("chat", "chat") + getCookie("code"));
            window.location.href = "https://www.mlrcn.com/main.html";
        }
    });
}

function app() {
    layer.open({
        title:[ "陌路人APP下载", "background-color:#2b89d1; color:#fff;" ],
        content:'请用安卓手机点击或者扫描二维码下载！<br/><a href="https://www.quouyu.com/app/mlrcn.apk" target="_blank"><img src="/image/qr.png"/></a>',
        btn:[ "关闭" ]
    });
}

function about() {
    layer.open({
        title:[ "关于我们", "background-color:#2b89d1; color:#fff;" ],
        content:$(".right").html(),
        btn:[ "关闭" ]
    });
}

function yijian() {
    layer.open({
        type:1,
        title:[ "意见建议", "background-color:#2b89d1; color:#fff;" ],
        content:"<div><textarea id='TextBox_yijian' maxlength='1000' placeholder='请在此处输入你的意见或者建议!' style=' width:100%; height: 300px;'></textarea></div><div style='text-align:center;margin-top: 5px;'><input id='button_save' style='padding: 8px 25px; color:#fff;background-color:#ff0000;border-radius:20px;' type='button'  value='提交'/></div>",
        anim:"up",
        style:"position:fixed; bottom:0; left:0; width: 100%; height:410px;border:none;",
        success:function(elem) {
            var tmsg = $(elem).find("#TextBox_yijian");
            var tempcmd = $("#T1").val();
            $("#button_save", this.contentDocument).click(function() {
                var msg = tmsg.val();
                if (msg != null && msg.length > 10) {
                    var frmdata = {
                        cmd:tempcmd,
                        type:0,
                        jbtp:0,
                        msg:msg,
                        jbmsg:"意见建议"
                    };
                    $.post("/jubao.aspx", frmdata, function(date) {
                        if (date != null) {
                            layer.closeAll();
                            layer.open({
                                content:"提交成功!",
                                skin:"msg",
                                time:2
                            });
                        }
                    });
                } else {
                    tmsg.focus();
                }
            });
        }
    });
}

function vip() {
    layer.open({
        content:"<iframe id='bbsds' src='/vip.html' width='100%'  height='100%'></iframe>",
        anim:"up",
        style:"max-width: 320px;height:240px;-webkit-animation-duration: .5s; animation-duration: .5s;",
        success:function(elem) {
            var game = $(elem).find("#bbsds");
            game.height($(game).parent().parent().height());
            var layerindex = $(elem).attr("index");
            $(game).on("load", function(event) {
                var ds = $('input[name="ds"]', this.contentDocument);
                $("#pay", this.contentDocument).click(function() {
                    var type = ds.filter(":checked").val();
                    if (navigator.userAgent == "quouyu") {
                        window.location.href = "quouyu://alipay//" + $("#T5").val() + "-" + type;
                    } else {
                        var pw = document.body.clientWidth;
                        var cs = 0;
                        if (pw > 500) {
                            cs = 1;
                        }
                        var el = document.createElement("a");
                        el.href = "https://www.quouyu.com/panel/m_pay/" + cs + "/" + $("#T5").val() + "-" + type;
                        el.click();
                    }
                });
            });
        }
    });
}

var jhhtml = "";

function code() {
    layer.open({
        content:"<iframe id='bbsds' src='/code.html' width='100%'  height='100%'></iframe>",
        anim:"up",
        style:"max-width: 320px;height:240px;-webkit-animation-duration: .5s; animation-duration: .5s;",
        success:function(elem) {
            var game = $(elem).find("#bbsds");
            game.height($(game).parent().parent().height());
            var layerindex = $(elem).attr("index");
            $(game).on("load", function(event) {
                var ds = $("#jhcode", this.contentDocument);
                var dt = $("#jhsj", this.contentDocument);
                var bt = $("#pay", this.contentDocument);
                var codehtml = this.contentDocument.documentElement;
                ds.val(getCookie("code"));
                if (jhhtml != "" || $("#T6").val() != "0") {
                    dt.css("display", "block");
                    dt.text(jhhtml == "" ? $("#T6").val() :jhhtml);
                    $(bt).text("已激活");
                    $(bt).css("background-color", "#8c6767");
                    $(ds).attr("readonly", true);
                    chatHub.server.upqz($("#T1").val(), $("#T4").val().replace("chat", "chat") + getCookie("code"));
                } else {
                    $("#pay", this.contentDocument).click(function() {
                        if (ds.val().length > 10 && $(bt).text().indexOf("已激活") < 0) {
                            var frmdata = {
                                code:ds.val()
                            };
                            $.post("/code.aspx", frmdata, function(date) {
                                if (date != null) {
                                    dt.css("display", "block");
                                    dt.text(date);
                                    if (date.indexOf("时间") > 0) {
                                        $(bt).text("已激活");
                                        $(bt).css("background-color", "#8c6767");
                                        $(ds).attr("readonly", true);
                                        jhhtml = date;
                                        chatHub.server.upqz($("#T1").val(), $("#T4").val().replace("chat", "chat") + getCookie("code"));
                                    }
                                } else {
                                    ds.focus();
                                }
                            });
                        } else {
                            ds.focus();
                        }
                    });
                }
            });
        }
    });
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}