/**
 * Created by naxiaoguang on 5/18/16.
 */

var API_CHANGE_PERSONAL_BG = '/v1/user/portal_banner/save';//修改个人主页背景图片
var API_UPLOAD_PICS = '/v1/image/addimages';//批量上传图片
var API_ARTICLE_SAVE = '/v1/article/save/';//文章保存
var API_BOOK_ARTICLE_SAVE = '/v1/book/article/save';//文章保存

var API_BOOK_DELETE_ARTICLE = '/v1/book/contents/delete/';
var API_BOOK_FILTERS = '/v1/book/query_state';
var API_BOOK_CHANGE_STATE = '/v1/book/change_state/';

var API_BOOK_CREATIVE_GETTIME = '/v1/book/create_time/get';
var API_BOOK_CREATIVE_SETTIME = '/v1/book/create_time/set';
var API_BOOK_TITLE_GETIMG = '/v1/book/author_avatar/get';
var API_BOOK_TITLE_SETIMG = '/v1/book/author_avatar/set';


var ua = navigator.userAgent.toLocaleLowerCase();
var ua_ios_pattern = "com.shiqichuban.client.ios";
var ua_android_pattern = "com.shiqichuban.android";

var DEVICE_PC = "device_pc";
var DEVICE_APP = "device_app";
var DEVICE_MOBILE = "device_mobile";

var MOUSE_CLICK = isPC() ? 'click' : 'touchstart';
var MOUSE_ENTER = isPC() ? 'mouseenter' : 'touchstart';
var MOUSE_LEAVE = isPC() ? 'mouseleave' : 'touchend';
var TOUCHE_END = isPC() ? 'mouseup' : 'touchend';
var MOUSE_DOWN = isPC() ? 'mousedown' : 'touchstart';
var MOUSE_MOVE = isPC() ? 'mousemove' : 'mousemove';
var EVENT_SCROLL = 'scroll';

var setIntervalNum = 0;
var STATIC_DOMAIN = "https://static." + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1) + 1);

function getCurrentAPIDomain() {
    return 'https://api.' + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1) + 1);
}
function getCurrentStaticDomain() {
    return 'https://static.' + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1) + 1);
}
function getCurrentWWWDomain() {
    return 'https://www.' + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1) + 1);
}
function getSocialServerDomain() {
    return (location.href.indexOf('www.uchuban.com') > -1 || location.href.indexOf('debug') > -1) ? "https://social.shiqichuban.com" : "https://social.shiqichuban.com";
}

function getResServerDomain() {
    return (location.href.indexOf('www.uchuban.com') > -1 || location.href.indexOf('debug') > -1) ? "https://res.shiqichuban.com" : "https://res.shiqichuban.com";
}

function getDomain() {
    return '.www.' + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1) + 1);
}

function getBookApiDomain() {
    return 'https://book.' + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1) + 1);
}

function getUrlKey(name){
    return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}

function loadHtmlView(parentSelector,viewURL,callback){
    $(parent).load(viewURL, function (responseText, statusText, xhr) {
        if (statusText === "success")
            callback();
        if (statusText === "error")
            console.log("MainContainer load error")
    });
}


var cookie = {
    set: function (key, value) {
        var date = new Date(); //获取当前时间
        var expiresDays = 366;  //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + value + ";expires=" + date.toGMTString() + ";domain=" + getDomain() + ";path=/";  //设置cookie
    },
    get: function (key) {//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";");  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    },
    del: function (key) {
        var date = new Date(); //获取当前时间
        var expiresDays = 366;  //将date设置为n天以后的时间
        date.setTime(date.getTime() - expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        var value = cookie.get(key);
        console.log(value);
        document.cookie = key + "=" + value + ";expires=" + date.toGMTString() + ";domain=" + getDomain() + ";path=/";   //设置cookie
    }
};


if (navigator.userAgent.indexOf("MSIE") > 0) {
    //是否是IE浏览器
    if (navigator.userAgent.indexOf("MSIE 6.0") > 0 ||
        navigator.userAgent.indexOf("MSIE 7.0") > 0 ||
        navigator.userAgent.indexOf("MSIE 8.0") > 0 ||
        navigator.userAgent.indexOf("MSIE 9.0") > 0

    ) {

        var truthBeTold = window.confirm("您的浏览器版本过低!\n这将导致拾柒网站,写文章、电子书制作等部分功能无法实现。\n推荐您下载谷歌浏览器!");
        // if (truthBeTold) {
        //     location.href("http://www.firefox.com.cn/download/");
        // }
    }
}

if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function (fileData) {
        var binary = "";
        var pt = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);

            }
            //pt.result  - readonly so assign binary
            pt.content = binary;
            $(pt).trigger('onload');
        };
        reader.readAsArrayBuffer(fileData);
    }
}

isPrintingBook();

function loadFontFaceFile(){
    if(detectPlatform() !== DEVICE_APP){
        var link = document.createElement('link') ;
        link.href = "https://static.shiqichuban.com/assets/css/font.css?t=1545187458";
        link.setAttribute('rel','stylesheet');
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(link);
    }
}

function setTempleteReady() {
    var mouse_click;
    if (isPC()) {
        mouse_click = 'click';
    } else {
        mouse_click = 'touchstart';
    }
    $('.article').css('min-height', $(window).height());

    $('#my_seting').on('mouseover', function () {
        $('#setting_ul').show();
        setArrowAction($(this).find(".my_icon_img"),"down");
    }).on("mouseleave",function(){
        $('#setting_ul').hide();
        setArrowAction($(this).find(".my_icon_img"),"up");
    });

    $('#my_shiqi').on('mouseover', function () {
        $('#my_list').show();
        setArrowAction($(this).find(".my_icon_img"),"down");
    }).on('mouseleave', function () {
        $('#my_list').hide();
        setArrowAction($(this).find(".my_icon_img"),"up");
    });

    function setArrowAction(selector,action){
        if(action === "down"){
            selector.addClass('rote_v1');
            selector.css({
                'transform': 'rotate(90deg)',
                '-webkit-transform': 'rotate(90deg)',
                '-ms-transform': 'rotate(90deg)',
                '-moz-transform': 'rotate(90deg)',
                '-o-transform': 'rotate(90deg)',
            })
        }else if(action === "up"){
            selector.removeClass('rote_v1');
            selector.css({
                'transform': 'rotate(0)',
                '-webkit-transform': 'rotate(0)',
                '-ms-transform': 'rotate(0)',
                '-moz-transform': 'rotate(0)',
                '-o-transform': 'rotate(0)',
            })
        }
    }

    $('.setting_item').on('mouseover', function () {
        $(this).css('background-color', "#ccc");
    }).on('mouseout', function () {
        $(this).css('background-color', "#fff");
    });

    $('.hdUser').css('visibility', 'hidden');

    $('#logout_btn').on('click', function () {
        cookie.del('author_id');
        location.href = getCurrentWWWDomain() + '/user/logout';
    });

    getMessageStatus();
    $('#messagebox').on(mouse_click, function () {

        if (getMessageStatus()) {
            sendData({
                is_api: true,
                url: "/v1/message/set_status",
                method: 'get',
                data: {
                    type: 'messagebox'
                },
                callback: function (data) {
                    $('.noMessageTips').hide();

                },
                errorFun: function (data) {
                    isStatus = 'errorFun';
                    console.log(data, 'errorFun')
                }
            });
        }
        location.href = '/messagebox/list';
    })
}


/**
 * 查询用户书籍制作状态
 */
function isPrintingBook(callback) {

    if (cookie.get('author_id') && setIntervalNum == 0) {
        setIntervalNum = setInterval(function () {
            var str = cookie.get('author_id');
            // var author_id = str.substr(str.length - 3);
            var author_id = str;
            sendData({
                is_api: true,
                url: '/v1/thirdparty/process_status/' + author_id,
                method: 'get',
                callback: function (data) {
                    if (parseInt(data.status) > 90) {
                        clear();
                        showConfirm('您的微信书制作完成,点击确定查看微信书', null, null, function () {
                            location.href = getCurrentWWWDomain() + '/book/preview/' + data.book_id + '#page/1';
                        }, null, 'ok|cancel');
                    } else if ((parseInt(data.status) > 10 && parseInt(data.status) < 90)) {
                        clear();
                        showConfirm(data.msg, null, null, null, null, 'ok');
                    }
                    if (callback)
                        callback();
                },
                errorFun: function (data) {
                    clear();
                    if (data.msg)
                        showConfirm(data.msg, null, null, null, null, 'ok');
                }
            })
        }, 10000)
    } else {
        console.log('no author_id')
    }

    function clear() {
        clearInterval(setIntervalNum);
        setIntervalNum = 0;
        cookie.del('author_id');
        $('#wechat_loading').hide();
        removeConfirm();
        $('#book_confirm_mask').remove();
    }
}


/**
 * 发送ajsx数据
 * @param is_api
 * @param url
 * @param data
 * @param callback
 * @param method
 */
function sendData(options) {
    Fetcher.fetchDataByJson(options)
}


function getMessageStatus() {
    if ($('#setting').length == 0) {
        return;
    }
    var isStatus;
    sendData({
        is_api: true,
        url: "/v1/message/status",
        method: 'get',
        async: false,
        callback: function (data) {
            if (data.err_code == 0) {

                if (data.status.length > 0) {
                    $('.noMessageTips').show();
                    isStatus = true;
                } else {
                    isStatus = false;
                    $('.noMessageTips').hide();
                }
            }

        },
        errorFun: function (data) {
            isStatus = 'errorFun';
        }
    });
    return isStatus;
}

function showAlert(message) {
    var alert_pan =
        '<div class="alert-pan" style="position:absolute;left:50%;margin-left:-150px;width:300px;z-index:99999999;top:' + $(window).height() + 'px;opacity:0;border-radius:5px;border:1px solid #ccc ;background-color: white;padding:10px 10px !important">' +
        '<div  style="width:100%;color:black;font-size: 16px;text-align: center;word-break: break-all">' +
        message +
        '</div>' +
        '</div>';
    $(document.body).append(alert_pan);
    $('.alert-pan').animate({top: $(window).height() - 200 + 'px', opacity: 1}, 400);
    $('.alert-pan').animate({top: $(window).height() - 200 + 'px', opacity: 1}, 1000, function () {
        $(this).remove();
    });
}

function removeConfirm() {
    $('#confirm_mask').remove();
}

function showConfirm(message, action_url, method, okfun, cancelfun, tag, subDiv, tagDes) {
    var submit_Des;
    if (tagDes)
        submit_Des = tagDes[0];
    else
        submit_Des = "确定";

    if (!isPC()) {
        showMobileConfirm(message, action_url, method, okfun, cancelfun, tag, subDiv, tagDes);
    } else {
        $('#confirm_mask').remove();

        var alert_pan =
            '<div class="col-xs-12 col-sm-12" id="confirm_mask" style="z-index:99999999;position:fixed;top:0;left:0;background-color: rgba(0,0,0,0.5);height:' + $(document).height() + 'px ">' +
            '<form class="confirm_form " action="' + action_url + '" method="' + method + '">' +
            '<div class="confirm_pan col-xs-6 col-xs-offset-3" style="margin-top:' + (($(window).height() - 350) * 0.5) + 'px;padding:10px;border-radius:5px;background-color: white">' +
            '<div style="padding:20px;border-radius:5px;background-color: white">' +
            '<p style="margin:0 25px 20px 25px;color:#565656;font-size: 16px;text-align: center">' +
            '<span style="margin-bottom:6px;display: inline-block;width: 30px;height: 1px;background-color: #ccc"></span>' +
            ' ⦁  &nbsp' + message + ' ⦁ &nbsp' +
            '<span style="margin-bottom:6px;display: inline-block;width: 30px;height: 1px;background-color: #ccc"></span>' +
            '</p>';
        if (subDiv)
            alert_pan += "<div>" + subDiv + "</div>";
        alert_pan += '<div style="text-align: center;margin-bottom: 10px">';

        if (tag.indexOf('cancel') > -1)
            alert_pan += '<a class="sq_btn sq_btn_gray confirm_pan_cancel_btn" style="margin-right: 20px">取消</a>';
        if (tag.indexOf('ok') > -1)
            alert_pan += '<a class="sq_btn sq_btn_black confirm_pan_submit_btn" >' + submit_Des + '</a>';
        alert_pan +=
            '</div>' +
            '</div>' +
            '</div>' +
            '</form>' +
            '</div>';

        $(document.body).append(alert_pan);

        if (tag.indexOf('cancel') > -1) {
            $(document).on(TOUCHE_END, '.confirm_pan_cancel_btn', function (e) {
                e.stopPropagation();
                var self = this ;
                var toSetNum = setTimeout(function () {
                    $(document).off(TOUCHE_END, '.confirm_pan_cancel_btn');
                    $(document).off(TOUCHE_END, '.confirm_pan_submit_btn');
                    if (cancelfun)
                        cancelfun();

                    $(self).parents('#confirm_mask').remove();
                    clearTimeout(toSetNum);
                }, 100);
            });
        }

        if (tag.indexOf('ok') > -1) {
            $(document).on(TOUCHE_END, '.confirm_pan_submit_btn', function (e) {
                var self = this ;
                e.stopPropagation();
                var toSetNum = setTimeout(function () {
                    if (okfun)
                        okfun();
                    $(document).off(TOUCHE_END, '.confirm_pan_cancel_btn');
                    $(document).off(TOUCHE_END, '.confirm_pan_submit_btn');

                    if (action_url)
                        $('.confirm_form').submit();
                    else
                        $(self).parents('#confirm_mask').remove();
                    clearTimeout(toSetNum);
                }, 100);
            })
        }
    }
}
function setShowConfirm(message, action_url, method, okfun, cancelfun, tag) {

        $('#confirm_mask').remove();
        var alert_pan =
            '<div class="col-xs-12 col-sm-12" id="confirm_mask" style="z-index:99999999;position:fixed;top:0;left:0;background-color: rgba(0,0,0,0.5);height:' + $(document).height() + 'px ">' +
            '<form class="confirm_form " action="' + action_url + '" method="' + method + '">' +
            '<div class="confirm_pan col-xs-6 col-xs-offset-3" style="margin-top:' + (($(window).height() - 350) * 0.5) + 'px;padding:10px;border-radius:5px;background-color: white">' +
            '<div style="padding:20px;border-radius:5px;background-color: white">' +
            '<p style="margin:0 25px 20px 25px;color:#565656;font-size: 16px;text-align: center">' +
            '<span style="margin-bottom:6px;display: inline-block;width: 30px;height: 1px;background-color: #ccc"></span>' +
            ' ⦁  &nbsp' + message + ' ⦁ &nbsp' +
            '<span style="margin-bottom:6px;display: inline-block;width: 30px;height: 1px;background-color: #ccc"></span>' +
            '</p>';
        
        alert_pan += '<div style="text-align: center;margin-bottom: 10px">';

        if (tag.split('|')[1]=='cancel'){
            alert_pan += '<a class="sq_btn sq_btn_gray confirm_pan_cancel_btn" style="margin-right: 20px">取消</a>';
        }else{
            
            alert_pan += '<a class="sq_btn sq_btn_gray confirm_pan_cancel_btn" style="margin-right: 20px">'+tag.split('|')[1]+'</a>';
        }
            
         if (tag.split('|')[0]=='ok'){
            alert_pan += '<a class="sq_btn sq_btn_black confirm_pan_submit_btn" >确定</a>';
        }else{
            alert_pan += '<a class="sq_btn sq_btn_black confirm_pan_submit_btn" >'+tag.split('|')[0]+'</a>';
        }
        alert_pan +=
            '</div>' +
            '</div>' +
            '</div>' +
            '</form>' +
            '</div>';

        $(document.body).append(alert_pan);
        
        $(document).on(TOUCHE_END, '.confirm_pan_cancel_btn', function (e) {
            e.stopPropagation();
            var self = this ;
            var toSetNum = setTimeout(function () {
                $(document).off(TOUCHE_END, '.confirm_pan_cancel_btn');
                $(document).off(TOUCHE_END, '.confirm_pan_submit_btn');
                if (cancelfun)
                    cancelfun();

                $(self).parents('#confirm_mask').remove();
                clearTimeout(toSetNum);
            }, 100);
        });
   

   
        $(document).on(TOUCHE_END, '.confirm_pan_submit_btn', function (e) {
            var self = this ;
            e.stopPropagation();
            var toSetNum = setTimeout(function () {
                if (okfun)
                    okfun();
                $(document).off(TOUCHE_END, '.confirm_pan_cancel_btn');
                $(document).off(TOUCHE_END, '.confirm_pan_submit_btn');

                if (action_url)
                    $('.confirm_form').submit();
                else
                    $(self).parents('#confirm_mask').remove();
                clearTimeout(toSetNum);
            }, 100);
        })
        
   
}

function showMobileConfirm(message, action_url, method, okfun, cancelfun, tag, subDiv, tagDes) {

    var submit_Des;
    if (tagDes)
        submit_Des = tagDes[0];
    else
        submit_Des = "确定";


    $('#confirm_mask').remove();

    var alert_pan =
        '<div id="confirm_mask" class="container-fluid" style="width:100%;z-index:99999999;position:fixed;top:0;left:0;background-color: rgba(0,0,0,0.5);height:' + $(document).height() + 'px ">' +
        '<form class="confirm_form " action="' + action_url + '" method="' + method + '">' +
        '<div class="confirm_pan col-xs-10 col-xs-offset-1" style="margin-top:' + (($(window).height() - 350) * 0.5) + 'px;padding:10px;border-radius:5px;background-color: white;">' +
        '<div style="padding-top:20px;border-radius:5px;background-color: white">' +
        '<p style="color:#565656;font-size: 16px;text-align: center">'
         + message +
        '</p>';
    if (subDiv)
        alert_pan += "<div>" + subDiv + "</div>";
    alert_pan += '<div class="sq_btn_container" style="text-align: center;font-size: 16px;line-height: 60px">';

    if (tag.indexOf('cancel') > -1)
        alert_pan += '<a class="sq_btn sq_btn_gray confirm_pan_cancel_btn" style="margin-right: 20px">取消</a>';
    if (tag.indexOf('ok') > -1)
        alert_pan += '<a class="sq_btn sq_btn_black confirm_pan_submit_btn" >' + submit_Des + '</a>';
    alert_pan +=
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>';

    $(document.body).append(alert_pan);

    if (tag.indexOf('cancel') > -1) {
        $(document).on(TOUCHE_END, '.confirm_pan_cancel_btn', function (e) {
            e.stopPropagation();
            var toSetNum = setTimeout(function () {
                $(document).off(TOUCHE_END, '.confirm_pan_cancel_btn');
                $(document).off(TOUCHE_END, '.confirm_pan_submit_btn');
                if (cancelfun)
                    cancelfun();
                $('#confirm_mask').remove();
                clearTimeout(toSetNum);
            }, 100)
        });
    }

    if (tag.indexOf('ok') > -1) {
        $(document).on(TOUCHE_END, '.confirm_pan_submit_btn', function (e) {
            e.stopPropagation();
            var toSetNum = setTimeout(function () {
                if (okfun)
                    okfun();
                $(document).off(TOUCHE_END, '.confirm_pan_cancel_btn');
                $(document).off(TOUCHE_END, '.confirm_pan_submit_btn');
                if (action_url)
                    $('.confirm_form').submit();
                else
                    $('#confirm_mask').remove();
                clearTimeout(toSetNum);
            }, 100)
        })
    }
}

/**
 * 显示loading
 * @param message
 * @param show
 */
function showLoading(message, show) {
    if (navigator.userAgent.indexOf('com.shiqichuban.client') > -1)
        return;
    if (show == true) {
        var mask = $(document).children('.loading_mask').length;
        if (mask != 0) {
            $('#loadingTxt').html(message);
            $(document).find('.loading_mask').remove();
        } else {
            var loading_layout =
                "<div class='loading_mask' style='width:100%;height:"+ $(window).height() +"px;padding-top:"+ ($(window).height() * 0.3 ) +"px;text-align: center;position:fixed;top:0;left:0;background-color: rgba(0,0,0,0.5);z-index:"+ Number.MAX_SAFE_INTEGER +"'>" +
                '   <img src="https://static.shiqichuban.com/assets/img/loading.gif" style="width: 50px;"/>' +
                '   <div id="loadingTxt" style="font-size: 16px;color: #fff;margin-top: 10px">' + message + '</div>' +
                "</div>";
            $(document.body).append(loading_layout);
        }
    } else {
        $(document).find('.loading_mask').remove();
    }
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}


function detectPlatform() {

    var platform = DEVICE_PC;
    if (ua.indexOf("com.shiqichuban.client") > -1)
        platform = DEVICE_APP;
    else if (ua.match(/mobile|iphone|ipad|ipod|android|symbianos|windows phone/))
        platform = DEVICE_MOBILE;
    return platform;
}

function getAppVersion() {
    var pattern;

    if (ua.indexOf(ua_ios_pattern) > -1) {
        pattern = new RegExp("com\\.shiqichuban\\.client\\.ios\\/([\\d\\.]+)");
    } else if (ua.indexOf(ua_android_pattern) > -1) {
        pattern = new RegExp('com\\.shiqichuban\\.android\\/([\\d\\.]+)');
    }

    var data = pattern.exec(navigator.userAgent)[0];
    var app_version = data.split("/")[1];
    return app_version;
}

/**
 * 判断操作系统
 * @returns {*}
 */
function detectOS() {

    var bIsAndroid = ua.indexOf('android') > -1;
    if (bIsAndroid) return "Android";

    var bIsIpad = ua.indexOf('ipad') > -1;
    var bIsIphoneOs = ua.indexOf('iphone') > -1;

    if (bIsIpad || bIsIphoneOs)
        return 'Iphone';

    return "other";
}


function isPC() {

    if (ua.indexOf('iphone') > -1) return false;
    if (ua.indexOf('ipad') > -1) return false;
    if (ua.indexOf('ipod') > -1) return false;
    if (ua.indexOf('android') > -1) return false;
    if (ua.indexOf('windows phone') > -1) return false;
    if (ua.indexOf('symbianos') > -1) return false;

    return true;
}


function getBrowserType() {
    var isOpera = ua.indexOf("opera") > -1;
    if (isOpera) {
        return "opera"
    }
    //判断是否Opera浏览器
    if (ua.indexOf("firefox") > -1) {
        return "firefox";
    } //判断是否Firefox浏览器
    if (ua.indexOf("chrome") > -1) {
        return "chrome";
    }
    if (ua.indexOf("safari") > -1) {
        return "safari";
    } //判断是否Safari浏览器
    if (ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1 && !isOpera) {
        return "ie";
    }
    //判断是否IE浏览器
}

function getCurrentDate(onlyDay) {

    var date = new Date();
    var month = date.getMonth();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    var day = date.getDate();

    if (month < 9) {
        month = '0' + (month + 1);
    } else {
        month = month + 1;
    }

    if (day < 10) {
        day = '0' + day;
    }

    if (minute < 10) {
        minute = '0' + minute;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }

    if (onlyDay)
        return ('' + date.getFullYear() + '-' + month + '-' + day);

    var time = '' + date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
    return time;
}

function readFileAsBinary(file, callback) {

    if (window.File && window.FileList && window.FileReader && window.Blob) {
        var type = file.type;
        var reader = new FileReader();
        reader.onloadend = function () {
            var binary_string = reader.result;
            var base64_url = "data:" + type + ";base64," + window.btoa(binary_string);
            callback(binary_string, base64_url, type);

        };
        //读取文件内容
        reader.readAsBinaryString(file);
    } else {
        callback(null);
    }
}


function toBlob(base64_data, type) {

    var data = atob(base64_data);

    var ab = new ArrayBuffer(data.length);

    var u8arr = new Uint8Array(ab);

    var n = data.length;

    while (n--) {

        u8arr[n] = data.charCodeAt(n);
    }

    return new Blob([u8arr], {type: "image/" + type});
}

function noticeJsonToApp(data, callback) {

    if (is_weixin()) return;
    if (isPC()) return;
    if (detectPlatform() !== DEVICE_APP) return;

    var os = detectOS();
    try {
        if (os === 'Android') {
            return window.JsBridge.noticeJsonToApp(data);
        } else if (os === 'Iphone') {
            var url = "noticeJsonToApp:" + data;
            window.document.location = url;
        }
    } catch (e) {
        if (callback)
            callback(e);
    }
}

/**
 * 向APP发送数据
 * @param type
 * @param data  'a,b,c,d'字符串,用逗号隔开
 */
function noticeToApp(type, data, callback, oldVersion) {

    if (is_weixin()) return;
    if (isPC()) return;
    if (detectPlatform() !== DEVICE_APP) return;

    var os = detectOS();
    try {

        if (os === 'Android') {
            if (oldVersion)
                window.JsBridge.jsTo(type, data);
            else {
                return window.JsBridge.noticeToApp(type, data);
            }

        } else if (os === 'Iphone') {
            var url;
            if (oldVersion)
                url = "JsIOSBridge:" + type + ',' + data;
            else
                url = "noticeToApp:" + type + ',' + data;
            window.document.location = url;
        }

    } catch (e) {

        if (callback)
            callback(e);
    }
}

/*
 验证是否为QQ号
 * */
function isQQ(aQQ) {
    var bValidate = RegExp(/^[1-9][0-9]{4,9}$/).test(aQQ);
    if (bValidate) {
        return true;
    }
    else
        return false;
}

/*
 验证是否为微信浏览器
 * */
function is_weixin() {
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}


//数组去重

function unique(arr) {
    var res = [];
    var json = {};

    for (var i = 0; i < arr.length; i++) {

        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }

    }

    return res;

}

function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype); //创建父类原型的一个副本 等同于使用Object.create(superType.prototype)
    prototype.constructor = subType;   //为副本添加constructor属性,弥补重写原型而失去的constructor属性
    subType.prototype = prototype; //将创建的对象(副本)赋值给子类的原型
}

/**
 * 对 html标签进行转译
 */

String.prototype.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;

String.prototype.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;

String.prototype.REGX_TRIM = /(^\s*)|(\s*$)/g;

String.prototype.HTML_DECODE = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&nbsp;": " ",
    "&quot;": "\"",
    "©": ""
};

String.prototype.encodeHtml = function (s) {
    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
        s.replace(String.prototype.REGX_HTML_ENCODE,
            function ($0) {
                var c = $0.charCodeAt(0), r = ["&#"];
                c = (c == 0x20) ? 0xA0 : c;
                r.push(c);
                r.push(";");
                return r.join("");
            });
};

String.prototype.decodeHtml = function (s) {
    var HTML_DECODE = String.prototype.HTML_DECODE;

    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
        s.replace(String.prototype.REGX_HTML_DECODE,
            function ($0, $1) {
                var c = HTML_DECODE[$0];
                if (c == undefined) {
                    // Maybe is Entity Number
                    if (!isNaN($1)) {
                        c = String.fromCharCode(($1 == 160) ? 32 : $1);
                    } else {
                        c = $0;
                    }
                }
                return c;
            });
};

String.prototype.trim = function () {
    return this.replace(String.prototype.REGX_TRIM, "");
};


String.prototype.hashCode = function () {
    var hash = this.__hash__, _char;
    if (hash == undefined || hash == 0) {
        hash = 0;
        for (var i = 0, len = this.length; i < len; i++) {
            _char = this.charCodeAt(i);
            hash = 31 * hash + _char;
            hash = hash & hash; // Convert to 32bit integer
        }
        hash = hash & 0x7fffffff;
    }
    this.__hash__ = hash;

    return this.__hash__;
};

String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};

var shiqiLocation = {
    _parseHash: function() {
        if (!location.search) return;
        var params = [];
        if (location.hash) {
            params = location.hash.slice(1).split('&');   
        }
        var result = {};
        for (var i = 0; i < params.length; i++) {
            var item = params[i].split('=');
            result[item[0]] = item[1];
        }
        return result;
    },
    _updateHash: function(hashObj) {
        location.hash = '#';
        for (var i in hashObj) {
            location.hash += i + '=' + hashObj[i] + '&';
        }
        location.hash = location.hash.substr(0,location.hash.length-1);
    },
    setItem: function(key, value) {
        var hash = this._parseHash();
        hash[key] = value;
        this._updateHash(hash);
    },
    getItem: function(key) {
        var hash = this._parseHash();
        return hash[key];
    },
    getQueryString: function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if(r!=null)return  unescape(r[2]); return null;
    }
};
