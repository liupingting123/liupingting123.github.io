define('lib/common', ['lib/zepto', 'lib/makeUrl', 'lib/cookie', 'lib/url', 'lib/log', 'lib/template', 'model/token', 'config/url', 'lib/ga'], //
    function (undefined, makeUrl, cookie, url, log, template, modelToken, configUrl, ga) {
        /*设置母婴之家是否在App端 cookie onMyzjApp*/
        //window.IosMyzjApp = typeof (window.Myzj) != "undefined";  
        var userinfo = modelToken.getUserInfo();
        String.prototype.format = function () {
            var args = arguments;
            var reg = /\{(\d+)\}/g;
            return this.replace(reg, function (g0, g1) {
                return args[+g1];
            });
        };
        /**
         * make service url
         */
        $.makeUrl = makeUrl;
        /**
         *
         * cookie
         */
        $.cookie = cookie;
        if (typeof (window.Myzj) != "undefined" && !$.cookie.get("_onmyzjapp")) {
            $.cookie.add('_onmyzjapp', false, '/', 86400 * 365);
        }
        window.IsMyzjApp = $.cookie.get("_onmyzjapp") ? true : false;
        $.url = url;
        $.log = function (o, title) {
            if (window._debug_) {
                log.log.apply(this, arguments);
            }
        }
        window.Logger = log;
        $.scrollposition = function (PositionObj, ScrollDistance) {
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > ScrollDistance) {
                    $(PositionObj).css({
                        "position": "fixed",
                        "top": "0",
                        "z-index": "1000"
                    }).removeClass("paixuMskHide").addClass("paixuMskShow");
                } else {
                    $(PositionObj).css({ "position": "" }).removeClass("paixuMskHide").removeClass("paixuMskShow");
                }
            });
        }
        $.tpl = template;

        //判断是否在微信
        $.isWeiXin = function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }
        //分享  (新的桥接方法)
        $.setupWebViewJavascriptBridge = function (callback) {
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
        }
        //埋点
        $.bindClick = function () {
            $(".stats").click(function () {
                var position = $(this).data("position");
                var type = $(this).data("category");
                var id = $(this).attr("href");
                _gaq_push(position, type, id, 1);
                if (typeof ($.cookie.get("origdlid")) != 'undefined') {
                    //客户真实标签
                    _gaq.push(['_setCustomVar', 3, 'dlid', $.cookie.get("origdlid"), 2]);
                    //随机分配（浏览组） A | B
                    _gaq.push(['_setCustomVar', 4, 'visitgroup', $.cookie.get("VisitGroup"), 2]);
                }
            });
        }

        $.mix = function () {
            var re = {};
            for (var i = 0; i < arguments.length; i++) {
                var o = arguments[i];
                for (var p in o) {
                    if (p in re) {
                        if (o[p] != undefined) {
                            re[p] = o[p];
                        }
                    } else {
                        re[p] = o[p];
                    }
                }
            }
            return re;
        }

        /**
         * 把参数2,3...的所有不为undefined的key复制到参数1上
         */
        $.merge = function () {
            if (arguments.length > 0) {
                var re = arguments[0];
                for (var i = 1; i < arguments.length; i++) {
                    var o = arguments[i];
                    for (var p in o) {
                        if (o[p] != undefined) {
                            re[p] = o[p];
                        }
                    }
                }
                return re;
            }
            return undefined;
        }
        /**
         * 判断是否为空
         */
        $.isNull = function (o) {
            return o == undefined || o == "undefined" || o == null || o == '';
        }

        /**
         * jsonparse
         */
        $.parseJSON = function (str) {
            try {
                return JSON.parse(str);
            } catch (e) {
                //todo
                return undefined;
            }
        }

        /**
         * 节点替换成制定HTML
         */
        $.replaceHTML = function (element, html) {
            var div = document.createElement('div');
            div.innerHTML = html;
            for (var i = 0, a = div.childNodes; i < a.length;) {
                if (element.parentNode) {
                    element.parentNode.insertBefore(a[0], element);
                }
            }
            div = null;
            element.parentNode.removeChild(element);
        }
        $.insertHTML = function (element, html, pos) {
            var div = document.createElement('div');
            div.innerHTML = html;
            pos = pos || 'after';
            for (var i = 0, a = div.childNodes; i < a.length;) {
                switch (pos.toLowerCase()) {
                    case 'before':
                        element.parentNode.insertBefore(a[0], element);
                        break;
                    case 'after':
                        if (element.parentNode.lastChild == element) {
                            element.parentNode.appendChild(a[a.length - 1]);
                        } else {
                            element.parentNode.insertBefore(a[a.length - 1], element.nextSibling);
                        }
                        break;
                }
            }
            div = null;
        }

        $.tplRender = function (id, data, pos) {
            var el = $('#' + id);
            var rendered = $.tpl(id, data);
            if (typeof pos == 'undefined') {
                pos = el.attr('data-insert-pos');
            }
            if (pos == '') {
                pos = 'after';
            }
            if (pos == 'replace') {
                if (!$.isNull(el[0])) {
                    $.replaceHTML(el[0], rendered);
                }
            } else {
                $.insertHTML(el[0], rendered, pos);
            }
            //bindStaticAciton();
            //添加广告 icon
            var adContainer = [{
                "parentNode": ".benner",
                "NodePositon": "relative",
                "relative": "absolute",
                "bottom": "0.3rem",
                "right": "0.2rem",
                "zindex": '22'
            }, {
                "parentNode": ".pd_list li",
                "NodePositon": "relative",
                "relative": "absolute",
                "top": "0.1rem",
                "right": "0.2rem"
            }, {
                "parentNode": ".goAppImg",
                "NodePositon": "",
                "relative": "absolute",
                "bottom": "0.7rem",
                "right": "0.2rem"
            }, {
                "parentNode": ".today_title",
                "NodePositon": "",
                "relative": "",
                "float": 'right',
                "marginright": '0.2rem'
            }
            ];

            $.each(adContainer, function (i, list) {
                var html = [];
                var imgUrl = configUrl.LocalUrl + 'img/myzj_wap_small.png';
                //if (list.parentNode == '.goAppImg') {
                //    imgUrl = configUrl.LocalUrl + 'img/myzj_wap_circle.png';
                //} else {
                //    imgUrl = configUrl.LocalUrl + 'img/myzj_wap_small.png';
                //}
                //html.push('<img class="add_icon" style="width:auto; height:auto;z-index:2;position: ' + list.relative + ';top:' + list.top + '; bottom:' + list.bottom + '; right:' + list.right + '" src="' + imgUrl + '">');
                $.each($(list.parentNode), function (j, item) {
                    $(item).find('.add_icon').length > 0 ? $('.add_icon').remove() : '';
                    $(item).css('position', list.NodePositon);
                    $('.islider-dot-wrap').css('top', '6.8rem!important')
                    $(item).append('<span class="add_icon" style="margin-right:' + list.marginright + ';float:' + list.float + ';z-index:' + list.zindex + ';font-size:12px;margin-top:8px;color:#000;width:34px; height:16px;position: ' + list.relative + ';top:' + list.top + '; bottom:' + list.bottom + '; right:' + list.right + ';border-radius:4px;text-align:center;line-height:16px;color:#A5A5A5; border:1px solid #A5A5A5;background:#fff; display:inline-block">广告</span>');
                });

            });
        }
        $.gotoUrlAct = function (callback) {
            try {
                if (window.IsMyzjApp) {
                    if (Myzj != null || Myzj != undefined || Myzj.getUserId() != null || Myzj.getUserId() != undefined) {
                        var userId = Myzj.getUserId();
                    }
                    else {
                        var userId = $.url.getParam("userid");
                    }
                    if (userId <= 0) {
                        window.location.href = 'Myzj://login';
                    }
                }
                else {
                    var userinfo = modelToken.getUserInfo();
                    if (userinfo.UserId <= 0) {
                        var _url_par = {
                            gotourl: window.location.href
                        }
                        $.url.redirect($.url.getDomainUrl() + "Login?" + $.param(_url_par, true));
                    }
                }
            }
            catch (e) {
                callback && callback()

            }



        }
        //统一处理URl跳转,_url_par需要传递的URL参数
        $.gotoUrl = function () {
            $.cookie.add('sendState', 'has', '/', 86400 * 365);    //设置登录成功后是否自动领券条件 has/hasnot 
            if (window.IsMyzjApp) {
                UserId = window.Myzj.getUserId();
                if (UserId == 0) {
                    window.location.href = 'Myzj://login';
                }
            }
            else {
                var userinfo = modelToken.getUserInfo(); //首先判断服务器用户的状态
                if (userinfo.UserId == 0) {
                    var _url_par = {
                        gotourl: window.location.href
                    }
                    $.url.redirect($.url.getDomainUrl() + "Login?" + $.param(_url_par, true));
                }
            }
        }
        //统一处理跳转购物车
        $.gotoCart = function (specialType) {
            if (window.IsMyzjApp) {
                if (specialType) {
                    window.location.href = 'myzj://cart?type=1&specialtype=' + specialType + '';
                } else {
                    window.location.href = 'myzj://cart?type=1';
                }
            } else {
                $.url.redirect($.url.getDomainUrl() + "/shopping/cart");
            }
        }

        //检查跳转地址是否需要登录,跳转的前一个页面判断
        $.checkUserinfo = function (linkurl) {
            var userinfo = modelToken.getUserInfo(); //首先判断服务器用户的状态
            if (userinfo.UserId == 0) {
                if ($.isNull(linkurl)) {
                    $("[data-href]").on("click", function () {
                        var _url_par = {
                            gotourl: $(this).attr("data-href")
                        }
                        $.url.redirect($.url.getDomainUrl() + "Login?" + $.param(_url_par, true));
                    });
                } else {
                    var _url_par = {
                        gotourl: linkurl
                    }
                    $.url.redirect($.url.getDomainUrl() + "Login?" + $.param(_url_par, true));
                }
                return false;
            } else {
                $("[data-href]").on("click", function () {
                    $.url.redirect($(this).attr("data-href"));
                });
                return true;
            }
        }

        $.xsr = function () {
            var headers = {
                //withCredentials : true
            };
            var timeout = 50000;
            switch (arguments.length) {
                case 1:
                    //一个参数的时候
                    var mixedRequest = arguments[0];
                    if (typeof mixedRequest == 'string') {
                        $.get(mixedRequest);
                    } else if (typeof mixedRequest == 'object') {
                        $.ajax({
                            url: mixedRequest.url,
                            type: mixedRequest.method,
                            timeout: mixedRequest.timeout || timeout,
                            dataType: mixedRequest.dataType || 'json',
                            success: mixedRequest.success,
                            async: mixedRequest.async != undefined ? mixedRequest.async : true,
                            error: mixedRequest.error
                        });
                    } else {
                        //
                    }
                    break;
                case 2:
                    //两个参数的时候, 第2个参数一定是回到方法
                    var mixedRequest = arguments[0], callback = arguments[1];
                    if (typeof mixedRequest == 'string' && typeof callback == 'function') {
                        //get请求
                        $.ajax({
                            url: mixedRequest,
                            type: 'get',
                            timeout: timeout,
                            dataType: 'json',
                            async: mixedRequest.async != undefined ? mixedRequest.async : true,
                            success: callback,
                            error: function (xhr, type, error) {
                                callback({
                                    errorCode: type.toUpperCase()
                                });
                            }
                        });
                    } else if (typeof mixedRequest == 'object' && typeof callback == 'function') {
                        switch (mixedRequest.method) {
                            case 'jsonp':
                                $.ajax({
                                    type: 'get',
                                    dataType: mixedRequest.dataType || 'jsonp',
                                    url: mixedRequest.url,
                                    data: mixedRequest.postData,
                                    headers: mixedRequest.headers || headers,
                                    timeout: mixedRequest.timeout || timeout,
                                    success: callback,
                                    async: mixedRequest.async != undefined ? mixedRequest.async : true,
                                    error: function (xhr, type, error) {
                                        callback({
                                            errorCode: type.toUpperCase()
                                        });
                                    }
                                });
                                break;
                            case 'iframePost':
                                //$.iframePost.apply(this, arguments);
                                break;
                            case 'script':
                                var scriptDom = document.createElement('script');
                                document.body.appendChild(scriptDom);
                                var _timeout = setTimeout(function () {
                                    document.body.removeChild(scriptDom);
                                }, 10000);
                                scriptDom.onload = function () {
                                    clearTimeout(_timeout);
                                    try {
                                        callback();
                                    } catch (e) {

                                    } finally {
                                        document.body.removeChild(scriptDom);
                                    }
                                }
                                scriptDom.src = mixedRequest.url;
                                break;
                            default:
                                if (mixedRequest.urlEncodeCharset) {
                                    headers['urlEncodeCharset'] = mixedRequest.urlEncodeCharset;
                                }
                                if (mixedRequest.method == 'get') {
                                    $.ajax({
                                        type: 'get',
                                        url: mixedRequest.url,
                                        headers: mixedRequest.headers || headers,
                                        timeout: mixedRequest.timeout || timeout,
                                        dataType: mixedRequest.dataType || 'json',
                                        success: callback,
                                        async: mixedRequest.async != undefined ? mixedRequest.async : true,
                                        error: function (xhr, type, error) {
                                            callback({
                                                errorCode: type.toUpperCase()
                                            });
                                        },
                                        withCredentials: mixedRequest.cookie == false ? false : true
                                    });
                                } else {
                                    $.ajax({
                                        url: mixedRequest.url,
                                        type: 'post',
                                        data: mixedRequest.postData,
                                        headers: mixedRequest.headers || headers,
                                        timeout: mixedRequest.timeout || timeout,
                                        dataType: mixedRequest.dataType || 'json',
                                        success: callback,
                                        async: mixedRequest.async != undefined ? mixedRequest.async : true,
                                        error: function (xhr, type, error) {
                                            callback({
                                                errorCode: type.toUpperCase()
                                            });
                                        },
                                        withCredentials: mixedRequest.cookie == false ? false : true
                                    });
                                }
                        }

                    } else {
                        //
                    }
                    break;
                default:
                    //三个参数的时候

            }

        };

        $.iosDialog = function (options) {
            /** 仿ios弹框
             * 时间 2015-10-27
             * edit by potato
             * @param tips 弹框内容
             * @param okBtn 是否有确定按钮，并且点击确定会执行参数fun
             * @param okBtnHtml 确定按钮的文字，默认为‘确定’；
             * @param cancel 取消按钮，默认为true；
             * @param cancelHtml 取消按钮的文字，默认为‘取消’；
             * @param cancelFun 点击取消执行的函数，若不传则执行默认事件；
             * @param fun 点击确定执行的函数，只有在okBtn为true才能调用,若fun含有参数，则传递匿名函数；
             **/
            var $body = $("body");
            var defaults = {
                title: '提示',
                tips: options.tips,  //弹框内容
                okBtn: false,
                okBtnHtml: "确定",
                cancel: true,
                cancelHtml: "取消",
                autoColseTime: 0,
                cancelFun: options.cancelFun,//点击取消时间，默认是关闭浮层
                fun: options.fun //执行函数
            };
            var _options = $.extend(defaults, options);
            $body.find("#iosDialog").length > 0 && $body.find("#iosDialog").remove();
            var iosHtml = [];
            iosHtml.push(' <div class="popbg" id="iosDialog"><div class="popbox">' +
                '<div class="poptxt"><h2 class="poptitle">' + _options.title + '</h2>');
            iosHtml.push(_options.tips + '</div> <div class="popbtnbox">');
            if (_options.cancel) {
                iosHtml.push('<p id="close_popalert">' + _options.cancelHtml + '</p>');
            }
            if (_options.okBtn) {
                iosHtml.push('<p id="fun_popalert">' + _options.okBtnHtml + '</p>');
            }

            iosHtml.push('</div></div></div>');

            $body.append(iosHtml.join(""));
            var $dialogContent = $("#iosDialog");

            $("#close_popalert").click(function () {
                if (typeof _options.cancelFun === "function" && _options.cancelFun != "") {
                    _options.cancelFun();
                }
                $dialogContent.length > 0 ? $dialogContent.remove() : "";
            });
            if (_options.okBtn) {
                $("#fun_popalert").click(function () {
                    if (typeof _options.fun === "function") {
                        _options.fun();
                        $dialogContent.length > 0 ? $dialogContent.remove() : "";
                    }
                });
            }
            if (_options.autoColseTime > 0 && (typeof _options.autoColseTime === "number")) {
                setTimeout(function () {
                    $dialogContent.length > 0 ? $dialogContent.remove() : "";
                }, _options.autoColseTime);
            }
        };

        //防欺诈弹框
        $.alertDialog = function (options) {
            var $body = $("body");
            var defaults = {
                title: '提示',
                tips: options.tips,  //弹框内容
                okBtn: true,
                okBtnHtml: "确定",
                autoColseTime: 0,
                fun: options.fun //执行函数
            };
            var _options = $.extend(defaults, options);
            $body.find("#alertDialog").length > 0 && $body.find("#alertDialog").remove();
            var iosHtml = [];
            iosHtml.push(' <div class="alertBg" id="alertDialog"><div class="alertbox">' +
                '<div class="alerttxt"><h2 class="alerttitle"><span></span>' + _options.title + '</h2>');
            iosHtml.push(_options.tips + '</div> <div class="alertbtnbox">');
            if (_options.okBtn) {
                iosHtml.push('<p class="bd"><span></span></p><p id="fun_alert"><span>' + _options.okBtnHtml + '</span></p>');
            }

            iosHtml.push('</div></div></div>');

            $body.append(iosHtml.join(""));
            var $dialogContent = $("#alertDialog");

            $("#close_alert").click(function () {
                if (typeof _options.cancelFun === "function" && _options.cancelFun != "") {
                    _options.cancelFun();
                }
                $dialogContent.length > 0 ? $dialogContent.remove() : "";
            });
            if (_options.okBtn) {
                $("#fun_alert").click(function () {
                    $dialogContent.length > 0 ? $dialogContent.remove() : "";
                });
            }
            if (_options.autoColseTime > 0 && (typeof _options.autoColseTime === "number")) {
                setTimeout(function () {
                    $dialogContent.length > 0 ? $dialogContent.remove() : "";
                }, _options.autoColseTime);
            }
        };

        //桥接 2016.05.25
        //$.connectWebViewJavascriptBridge = function (callback) {
        //    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        //    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        //    window.WVJBCallbacks = [callback];
        //    var WVJBIframe = document.createElement('iframe');
        //    WVJBIframe.style.display = 'none';
        //    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        //    document.documentElement.appendChild(WVJBIframe);
        //    setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
        //    document.addEventListener('WebViewJavascriptBridgeReady', function () {
        //        callback(WebViewJavascriptBridge)
        //    }, false)
        //}

        //桥接 2016.05.31 修复专题页title
        $.connectWebViewJavascriptBridge = function (callback) {
            var ua = navigator.userAgent.toLowerCase();
            //排除MAC电脑
            if (ua.indexOf("macintosh") != -1) { return; }
            // ios4.0之后的版本使用新的流程
            if (ua.indexOf("ios") != -1 && ua.match(/\d+/g)[0] >= 4) {
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
                // document.addEventListener('WebViewJavascriptBridgeReady', function() {
                //     callback(WebViewJavascriptBridge)
                // }, false)
            } else {
                if (window.WebViewJavascriptBridge) {
                    callback(WebViewJavascriptBridge)
                } else {
                    document.addEventListener('WebViewJavascriptBridgeReady', function () {
                        callback(WebViewJavascriptBridge)
                    }, false)
                }
            }
        }
        //分享 回调
        //$.connectWebViewJavascriptBridge(function (bridge) {
        //    bridge.registerHandler('shareResult', function (data, responseCallback) {
        //        alert('app data = ' + data);
        //        var responseData = { 'Javascript Says': 'Right back atcha!' }
        //        responseCallback(responseData)
        //    })
        //})


        /** 封装app分享回调
         * 时间 2015-11-23
         * edit by potato
         * @param obj 点击分享事件对象
         * @param url 分享url，默认是当前url
         * @param title 分享title，默认是当前title
         * @param imgurl 分享图片路劲，默认是当前http://img.muyingzhijia.com/img/201511/20151123121611_1346_icon.png
         * @param shareType 分享类型，不传则是显示四个分享选项
         * @param callBackFun 分享回调函数，不传则不执行
        **/
        $.appShareCallBack = function (options) {
            var defaults = {
                obj: options.obj,
                url: window.location.href,
                title: document.title,
                desc: document.title,
                isHiddenAppShareBtn: false,
                imgurl: window.ThemesRoot + "images/defaultLogoForWap.png",
                shareType: options.shareType,
                callBackFun: options.callBackFun //执行函数
            };
            var options = $.extend(defaults, options);
            //唤醒app分享
            function connectWebViewJavascriptBridge(callback) {
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
                document.addEventListener('WebViewJavascriptBridgeReady', function () {
                    callback(WebViewJavascriptBridge)
                }, false)
            }
            connectWebViewJavascriptBridge(function (bridge) {
                options.obj.click(function () {
                    var data = {
                        url: encodeURI(options.url),
                        title: encodeURI(options.title),
                        desc: encodeURI(options.desc),
                        imgurl: options.imgurl,
                        shareType: options.shareType
                    };
                    bridge.callHandler('Myzj.callNativeShare', data, function (response) { });
                });
                function log(message, data) {
                    var log = document.getElementById('log')
                    var el = document.createElement('div')
                    el.className = 'logLine'
                    el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
                    if (log.children.length) { log.insertBefore(el, log.children[0]) }
                    else { log.appendChild(el) }
                }
                bridge.init(function (message, responseCallback) {
                    log('JS got a message', message)
                    var data = { 'Javascript Responds': 'Wee!' }
                    log('JS responding with', data)
                    responseCallback(data)
                })

                if (options.callBackFun != "" && typeof options.callBackFun === "function") {
                    bridge.registerHandler('shareResult', function (data, responseCallback) {
                        if (data['success']) {
                            options.callBackFun();
                        }
                    });
                }
                if (options.isHiddenAppShareBtn) {
                    bridge.callHandler('isHiddenAppShareBtn', '', function (response) {
                    })
                }
                /**设置title，3.2.0*/
                bridge.callHandler('setTitle', options.title, function (response) {
                    //alert(response)
                })
            });
        };

        //兼容老版本分享
        $.shareConfig = function (url, title, desc, imgurl) {
            if (window.IsMyzjApp && typeof Myzj.shareConfig != "undefined") {
                Myzj.shareConfig(url, title, desc, imgurl);
            }
        }


        $.tip = function (obj, callback) {
            var _init = {
                msg: "", //提示信息
                tip: "", //标题
                t: 2000, //显示时长
                iconCls: 'hide', //图标类(如果没有这个参数则设置为hide，将其隐藏，不要影响其他的布局)
                closeBtn: ""  //关闭按钮，默认没有
            };
            if (typeof obj == 'string') {
                obj = {
                    msg: obj
                }
            }
            $.merge(_init, obj);

            var _timeout = null;
            var html = '<div class="common-float-tip"><div class="float-tip-layout">' +
                '<div class="title">{0}</div><div class={1}>&nbsp;</div><div class="content">{2}</div></div></div>';
            html = html.format(_init.tip, _init.iconCls, _init.msg);
            $("body").append(html);

            if (_init.closeBtn) {
                $(_init.closeBtn).on("click", function () {
                    clearTimeout(_timeout);
                    $(".common-float-tip").remove();
                    callback && callback();
                });
            }

            if (_init.t >= 0) {
                _timeout = setTimeout(function () {
                    clearTimeout(_timeout);
                    try {
                        $(".common-float-tip").remove();
                        callback && callback();
                    } catch (e) {

                    }
                }, _init.t);
            }
        };

        $.alert = function (msg, callback, tip, t) {
            msg = msg || "";
            tip = tip || "提示";
            t = t || 3000;
            var _timeout = null;
            var html = '<div class="touchweb_mask"><div class="alert"><div class="alert_buttom"><i class="icon iconfont">&#xe626;</i></div><div class="alert_title">{0}</div><div class="alert_content">{1}</div></div></div>';
            html = html.format(tip, msg);
            $("body").append(html);
            $(".touchweb_mask").show();
            $(".alert_buttom i").on("click", function () {
                clearTimeout(_timeout);
                $(".touchweb_mask").remove();
                callback && callback();
            });
            if (t >= 0) {
                _timeout = setTimeout(function () {
                    clearTimeout(_timeout);
                    try {
                        $(".touchweb_mask").remove();
                        callback && callback();
                    } catch (e) {

                    }
                }, t);
            }
        }

        $.loading = function (bool) {
            var html = '<div class="touchweb_mask"><div class="loading" ><div class="gif_img"></div></div></div>';
            if (!bool) {
                $(".touchweb_mask").remove();
            } else {
                $("body").append(html);
                $(".touchweb_mask").show();
            }
        }

        $.confirm = function (msg, confirmclick, cancelclick, confirmBtn, CancelBtn) {
            var html = '<div class="touchweb_mask"><div class="confirm"><div class="confirm_content">{0}</div><div class="confirm_buttom"><a class="confirmclick">{1}</a><a class="cancelclick">{2}</a></div></div></div>';
            html = html.format(msg, confirmBtn || "确定", CancelBtn || "取消");
            $("body").append(html);
            $(".touchweb_mask").show();
            $(".confirmclick").on("click", function () {
                $(".touchweb_mask").remove();
                confirmclick && confirmclick();
            });
            $(".cancelclick").on("click", function () {
                $(".touchweb_mask").remove();
                cancelclick && cancelclick();
            });
        }

        $.modelToken = modelToken;
        $.getToken = function (successCallback, failCallback, isForce) {

            modelToken.getToken(function (data) {
                $.log(data);
                if (data.errorCode == 0) {
                    successCallback && successCallback();
                } else {
                    if (typeof failCallback == 'function') {
                        failCallback && failCallback(data);
                    } else {
                        $.alert('token获取失败,请检查您的网络！');
                    }

                }
            }, isForce);
        }

        $.footerNavEvent = function () {
            var
                D_footNav = $('#footNav'),      // 
                D_showBtmNav = $('#showBtmNav'),   // 
                D_hideBtmNav = $('#hideBtmNav');   //  

            //显示底部菜单
            D_showBtmNav.on('click', function () {
                D_footNav.animate({
                    left: 0
                }, 'fast');
                D_showBtmNav.hide();

            });
            //隐藏底部菜单
            D_hideBtmNav.on('click', function () {
                D_footNav.animate({
                    left: '-100%'
                }, 'fast', function () {
                    D_showBtmNav.show();
                });

            });
        }
        //倒计时
        $.fn.countTime = function () {
            var self = $(this);
            $.each(self, function () {
                var tm = $(this);
                var intDiff = parseInt(tm.data("time")) || 0;
                window.setInterval(function () {
                    var day = 0,
                        hour = 0,
                        minute = 0,
                        second = 0;//时间默认值
                    if (intDiff > 0) {
                        day = Math.floor(intDiff / (60 * 60 * 24));
                        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                    }
                    if (day <= 9) day = '0' + day;
                    if (hour <= 9) hour = '0' + hour;
                    if (minute <= 9) minute = '0' + minute;
                    if (second <= 9) second = '0' + second;
                    $(".day", tm).html(day);
                    $(".hour", tm).html(hour);
                    $(".minute", tm).html(minute);
                    $(".second", tm).html(second);
                    intDiff--;
                }, 1000);
            });
        };

        /*滑动插件---详细展示请参考 砍价团->活动详情页 或  砍价团->我要参团（邀请好友页面）*/

        $.fn.touchSlider = function (options) {
            return this.each(function () {
                /**
                 *
                 * @type {{
                 * outerContainer: string,   可滑动的块可视区域
                 * sliderList: string,       可滑动块
                 * item: string,             滑动块中的子项
                 * step_width: string,       单位偏移量
                 * duration: number          动画持续时长
                 * }}
                 * @private
                 */
                var _default = {
                    outerContainer: '.slider_content',
                    sliderList: ".slider_list",
                    item: '.slider_item',
                    step_width: '',
                    duration: 200
                };
                var options = $.extend(_default, options);
                var _this = $(this);
                var sliderContent = $(options.outerContainer, _this),
                    sliderList = sliderContent.find(options.sliderList),
                    sliderItem = sliderList.find(options.item),
                    items_length = sliderItem.length,  //滑动块子项数量
                    item_width = sliderItem.width(),  //滑动块子项宽度
                    sliderList_width = item_width * items_length,  //活动区域总宽
                    viewport_width = sliderContent.width(),   //可视区域宽

                    step_width = options.step_width ? options.step_width : item_width, //单位移动距离 ，默认为移动快子项距离

                    left = 0;   //滑动块左偏的位移

                //设置移动块的总宽:(items_length-1)预留空间，ios设备下，不至于被挤下去 原因未知
                sliderList.width(sliderList_width + (items_length - 1));

                sliderContent.swipeLeft(function () {
                    /*当滑动块的剩余宽度 （即 滑动块的宽减去向左滑动的距离 left+sliderList_width）,
                     小于或等于可视区域的宽 viewport_width时，停止向左滑动*/
                    if (left + sliderList_width <= viewport_width) {
                        return
                    }
                    left -= step_width;

                    sliderList.animate({ "margin-left": left }, options.duration)
                });
                sliderContent.swipeRight(function () {
                    /*如果滑动块里面的内容未超过可视区域，则阻止右滑动动作*/
                    if (sliderList_width <= viewport_width) {
                        return;
                    }

                    left += step_width;

                    if (left > 0) {
                        left = 0;
                    }
                    sliderList.animate({ "margin-left": left }, options.duration)
                });
            })
        };

        $(function () {
            var channel_edm_code = $.url.xss($.url.getParam('ref'));
            if (channel_edm_code) {
                $.cookie.addH5("channel_edm_code", channel_edm_code, "/", 86400 * 30, '.feiniu.com');
            }
            var channel_adr_id = $.url.xss($.url.getParam('adr_id'));
            if (channel_adr_id) {
                $.cookie.addH5("channel_adr_id", channel_adr_id, "/", 86400 * 30, '.feiniu.com');
            }
            $.footerNavEvent();
            $('.J_topback').click(function () {
                var _ref = document.referrer;
                if (_ref) {
                    if (_ref.indexOf('/login') > -1 || _ref.indexOf('/register') > -1) {
                        location.href = location.protocol + '//' + location.hostname;
                    } else {
                        history.go(-1);
                    }
                } else {
                    location.href = location.protocol + '//' + location.hostname;
                }
            });
            //底部购物车数量
            var cartNum = $.cookie.getH5('cartNum');
            if (!$.isNull(cartNum) && cartNum != "undefined" && cartNum != 0) {
                $(".J_navCartNumId").show();
                $(".J_navCartNumId").html(cartNum);
            }

        });

        $(".hd_back").on("click", function () {
            window.history.go(-1);
        });
        //跳转到APP页面
        $(".returnAPP").on("click", function () {
            $.url.redirect($.url.getDomainUrl() + "Login/APPDownload");
        });


        /**
         * 价格取整数部分和小数部分
         * @param {String} price 价格
         * @param {Int} format 1: 取整数部分，2: 取小数部分
         * @returns {String} 整数部分或者小数部分
         */
        $.tpl.helper("intDecimalPrice", function (price, format) {
            if (!$.isNull(price)) {
                if (price.toString() == 0) {
                    return price + ".00";
                } else {
                    return price.toFixed(2);
                }
            } else {
                return price + ".00";
            }
        });

        $.tpl.helper("replaceHttp", function (str) {
            var reg = new RegExp("http:", "g");
            return str.replace(reg, "");
        });

        $.tpl.helper("ProductImg", function (imgsrc, format) {
            if (imgsrc.indexOf(configUrl.imgDomain) < 0) {
                imgsrc = configUrl.imgDomain + imgsrc;
            }
            switch (format) {
                case 1:
                    return imgsrc.replace("http:", "").replace("{size}", "big").replace("{type}", "380x380").replace("{0}", "big");
                    break;
                case 2:
                    return imgsrc.replace("http:", "").replace("{size}", "normal").replace("{type}", "160x160").replace("{0}", "normal");
                    break;
                case 3:
                    return imgsrc.replace("http:", "").replace("{size}", "small").replace("{type}", "60x60").replace("{0}", "small");
                    break;
            }
        });

        var openId = $.url.getParam("openid");
        var sourceId = $.url.getParam("sourceid");
        if (!$.isNull(openId)) {
            $.cookie.add('openId', openId, '/', 86400 * 1);
        }
        if (!$.isNull(sourceId)) {
            $.cookie.add('sourceId', sourceId, '/', 86400 * 1);
        }
        /*
         *  用户标签
         */

        if ($.isNull($.cookie.get('_displaylabelids'))) {
            $.cookie.add('_displaylabelids', ["8"], '/', 86400 * 1);
        }
        $.displaylabelids = JSON.stringify($.cookie.get('_displaylabelids').split(","));


        ////母婴之家统计 
        //function bindMyzjStatiistics() {
        //    var pageIn = returnTime();
        //    //获取来源页url
        //    var referrer = document.referrer;
        //    //浏览器设备
        //    var userAgent = navigator.userAgent;

        //    $(".nav_menu li a").click(function () {
        //        alert(userAgent);
        //    });
        //}
        //获取地理位置
        $.getCurrentLocation = function (callbackfn) {
            (function () {
                var el = document.createElement("script");
                el.type = "text/javascript";
                el.async = true;
                el.src = "//webapi.amap.com/maps?v=1.3&key=6b8cf215379e9557e74f730b7d516862";
                document.body.appendChild(el);
            })();
            var obj = {
                "DoFlag": false,
                "res": "error"
            };
            setTimeout(function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        AMap.plugin('AMap.Geocoder', function () {
                            var geocoder = new AMap.Geocoder({
                                city: ""//城市，默认：“全国”
                            });
                            var lnglatXY = [pos.coords.longitude, pos.coords.latitude];//地图上所标点的坐标
                            setTimeout(function () {
                                geocoder.getAddress(lnglatXY, function (status, result) {
                                    if (status === 'complete' && result.info === 'OK') {
                                        //即，result.regeocode.formattedAddress
                                        obj.res = result.regeocode.formattedAddress;
                                        obj.DoFlag = true;
                                        if (typeof (callbackfn) == "function") {
                                            callbackfn(obj);
                                        }
                                    }
                                });
                            }, 2000)
                        });
                    }, function (err) {
                        $.loading(false);
                        //$.tip("抱歉！您的浏览器无法使用地位功能!");
                        if (typeof (callbackfn) == "function") {
                            callbackfn(obj);
                        }
                    }, {
                        enableHighAccuracy: false, // 是否获取高精度结果
                        timeout: 5000, //超时,毫秒
                        maximumAge: 0 //可以接受多少毫秒的缓存位置
                    });
                } else {
                    $.loading(false);
                    //$.tip('抱歉！您的浏览器无法使用地位功能!');
                    if (typeof (callbackfn) == "function") {
                        callbackfn(obj);
                    }
                }
            }, 500);
        };
        //url去除http:协议
        $.replaceHttp = function (str) {
            var reg = new RegExp("http:", "g");
            return str.replace(reg, "");
        };
        //提交sharekey  /InviteUserId 用户id   ShareState分享状态 分享链接被打开1， 用户注册2，用户登录3，用户下单4
        $.updateKey = function (InviteUserId, ShareState) {
            upData = {
                ShareState: ShareState,
                ShareKey: $.cookie.get("sharekey") != '' ? $.cookie.get("sharekey") : 0,
                InviteUserId: InviteUserId,
            }
            if (!$.isNull($.cookie.get("sharekey"))) {
                $.ajax({
                    type: "get",
                    data: upData,
                    dataType: 'jsonp',
                    jsonp: "callback",
                    jsonpCallback: "success_Callback",
                    url: configUrl.mkmsDomain + 'UpdateShareStateReq',
                    success: function (data) {
                        if (data.DoFlag) {
                            if (ShareState == 2) {
                                $.cookie.add("sharekey", '');
                            }
                        }
                    }
                });
            }
        };
        if (!$.isNull($.url.getParam("sharekey"))) {
            if ($.url.getParam("sharekey") != $.cookie.get("sharekey")) {
                $.cookie.add('sharekey', $.url.getParam("sharekey"), '/', 86400 * 10);
                $.updateKey(userinfo.UserId, 1);
            }
        }


        //设置分享内容
        $.setShareContent = function (shareTitle, url, desc, imgUrl) {
            if (imgUrl.indexOf("http:") <= -1) {
                imgUrl = "http:" + imgUrl
            }
            $.connectWebViewJavascriptBridge(function (bridge) {
                bridge.callHandler('Myzj.setShareConfig', { 'title': shareTitle, 'url': url, 'desc': desc, 'imgurl': imgUrl }, function (response) {
                })
            });
        };


        return $;
    });

