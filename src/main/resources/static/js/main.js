if(navigator.userAgent.indexOf("MSIE")>0) {
    //是否是IE浏览器
    if (navigator.userAgent.indexOf("MSIE 6.0") > 0 ||
        navigator.userAgent.indexOf("MSIE 7.0") > 0 ||
        navigator.userAgent.indexOf("MSIE 8.0") > 0 ||
        navigator.userAgent.indexOf("MSIE 9.0") > 0

    ) {

        var truthBeTold = window.confirm("您的浏览器版本过低!\n这将导致拾柒网站,写文章、电子书制作等部分功能无法实现。\n请升级您的IE浏览器,点击确定下载浏览器!");
        if (truthBeTold) {
            location.href("http://172.168.0.98:9999/dl1sw.baidu.com/soft/9e/14917/IE10-Windows6.1-zh-cn.exe?version=3474208079") ;
        }
    }
}

if (!window.console) {
    window.console = {
        log: function () {
        }
    };
}

function setCheck(obj) {
    var ipt = $(obj).next();
    ipt.prop("checked", !ipt.prop("checked"))
}

function getCurrentAPIDomain() {
    return 'https://api.' + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1) + 1);
}
function getCurrentWWWDomain() {
    return 'https://www.' + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1) + 1);
}
(function () {
    /**
     验证码发送
     */
    var interval = null;
    var hostapi = getCurrentAPIDomain();
    var host = getCurrentWWWDomain();

    $('#send_vcode').click(function () {
        var that = this;
        var timer = 60;
        var url = hostapi + $(this).attr('data-url');
        var method = $(this).attr('method');
        if (interval) {
            return;
        }
        $.ajax({
            url: url,
            type: method,
            xhrFields: {
                withCredentials: true
            },
            data: {'mobile': $('#mobile').val()},
            success: function (data) {
                console.log(data)
                interval = setInterval(function () {
                    if (timer < 1) {
                        clearInterval(interval);
                        $(that).html('重新发送');
                        return;
                    }
                    $(that).html(timer + 's后重新发送');
                    timer--;
                }, 1000);
            }
        });
    })

    $('#send_yz').click(function () {
        var that = this;
        var timer = 60;
        var url = $(this).attr('data-url') + '?dd=' + Math.random();
        var method = $(this).attr('method');
        $(that).attr('src', url);
    })

    function checkLogin(userAccount) {
        if (!/^[0-9]{11}$/.test(userAccount) && !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(userAccount)) {
            return false;
        }
        return true;
    }

    function checkReg(userAccount) {
        if (!/^[0-9]{11}$/.test(userAccount)) {
            return false;
        }
        return true;
    }
    function sendCode(mobile,captcha,type,is_type){
        var url=host+'/api/mobile/verify_code/get';
        var method="post";
        var data={};

        if(is_type=='email'){
             url = hostapi + $('#retrieve_passwd').attr('data-url');
             method = $('#retrieve_passwd').attr('method');
            data.captcha=captcha;
        }else{
            data[is_type]=mobile;
            data.captcha=captcha;
            data.type=type;
        }

        $.ajax({
            url: url,
            type: 'post',
            xhrFields: {
                withCredentials: true
            },
            data: data,
            success: function (data) {
                console.log(data)

                if (data.err_code == 0) {

                    location.href = host + '/user/password/forgot_step2?account=' + mobile;
                }else{
                    $('.verify_codeimg').attr('src',hostapi+'/v1/user/captcha'+'?'+Math.random());
                    $('.tishi').removeClass('hide')
                    $('.tishi').html(data.err_msg);
                    return;
                }
            }
        });
    }


    $('#retrieve_passwd').click(function () {

        var mobile=$('#mobile').val();

        if (!checkLogin(mobile) ){
            $('.tishi').removeClass('hide')
            $('.tishi').html('请输入正确电话号码');
            return;
        }else{
            var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            if(myReg.test(mobile)) {
                var is_type='email';
            }else{
                var is_type='mobile';
            }

        }
        if ($('#vcode').val() == '') {
            $('.tishi').removeClass('hide')
            $('.tishi').html('请输入验证码');
            return;
        }

        var that = this;
        var url = hostapi + $(this).attr('data-url');
        var method = $(this).attr('method');
        var captcha=$('#vcode').val();
        var type='retrieve_pwd';
        sendCode(mobile,captcha,type,is_type);
    });
    $('#mobile').click(function () {
        $('.tishi').addClass('hide')

    })
    $('#vcode').click(function () {
        $('.tishi').addClass('hide')

    })
    $('.vcode').click(function () {
        $('.tishi').addClass('hide')

    })
    $('#new_password').click(function () {
        $('.tishi').addClass('hide')

    })
    $('#old_password').click(function () {
        $('.tishi').addClass('hide')

    })
    $('#retrieve_passwd2').click(function () {
        if ($('.vcode').val() == '') {
            $('.tishi').removeClass('hide')
            $('.tishi').html('请输入验证码');
            return;
        }
        var that = this;
        var url = hostapi + $(this).attr('data-url');
        var method = $(this).attr('method');
        $.ajax({
            url: url,
            type: method,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {'captcha': $('.vcode').val(), 'mobile': $('#mobile').val()},
            success: function (data) {
                console.log(data)
                if (data.err_code == 0) {
                    location.href = host + '/user/password/forgot_step3?mobile=' + $('#mobile').val();
                } else {
                    $('.tishi').html(data.err_msg);
                    $('.tishi').removeClass('hide')
                }
            }
        });
    });
    $('#send_sms').click(function () {
        $.ajax({
            url: host+'/api/mobile/verify_code/get',
            type: "POST",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {mobile: $('#mobile').val()},
            success: function (json) {
                if (json.err_code == 0) {
                    alert('短信发送成功');
                } else {
                    alert('短信发送失败: ' + json.err_msg);
                }
                return false;
            }
        });
    });
    $('#send_mail').click(function () {
        $.ajax({
            url: host+'/api/mobile/verify_code/get',
            type: "POST",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {email: $('#email').val()},
            success: function (json) {
                if (json.err_code == 0) {
                    alert('邮件发送成功');
                } else {
                    alert('邮件发送失败: ' + json.err_msg);
                }
                return false;
            }
        });
    });
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }


    $('#retrieve_passwd3').click(function () {
        var that = this;
        var url = hostapi + $(this).attr('data-url');
        var method = $(this).attr('method');
        if ($('#new_password').val() == '') {
            alert('不能输入空密码');
            return;
        }
        if ($('#new_password').val() != $('#old_password').val()) {
            alert('密码必须一致！');
            return;
        }

        $.ajax({
            url: url,
            type: method,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {'new_password': $('#new_password').val()},
            success: function (data) {
                console.log(data)
                if (data.err_code == 0) {
                    location.href = host + '/user/password/forgot_success'
                } else {
                    $('.tishi').removeClass('hide')
                }
            }
        });
    });

})();
(function () {
    // 获取焦点的时候去掉所有的消息提示
    $("#mobile_register input").focus(function () {
        $('.err_tip').hide();
    });
})();
(function () {
    /**
     * 通用tab切换
     */
    $('.tabs li').on('click', function () {
        var that = this;
        if ($(that).hasClass('selected')) {
            return;
        }
        $(that).parent().find('li.selected').removeClass('selected');
        $(that).addClass('selected');

        var target = $(this).attr('target');

        $(that).parent().parent().find('.tab_contents > div.selected').removeClass('selected');
        $(that).parent().parent().find('#' + target).addClass('selected');
    });


})();

(function () {
    /**
     * home页面的左侧tab切换
     */
    $('.comMenu').on('click', 'li a.down_arrow', function (e) {
        console.log('yes ok');
        if ($(this).parent().parent().hasClass('comMenu')) {
            e.preventDefault();
            $(this).parent().find('.menuChild').toggleClass('hide');
        }
    })
})()


function confirmDelete(url) {
    centerPop('.dlPos');
    $('.mask, .dlPos').removeClass('hide');
    $('.dlPos').attr('dataurl', url);
}


(function () {
// 个人主页的切换
    console.log('listen')
    $("#contents_box").on('click', ".edit_box", function (e) {
        e.preventDefault();
        $(this).parents('li').addClass('hide');
        $(this).parents('li').next().removeClass('hide');
    });

    $('#contents_box').on('click', 'li.contents .box_up', function (e) {
        e.preventDefault();
        $(this).parents('li').addClass('hide');
        $(this).parents('li').prev().removeClass('hide');
    });
    $('#contents_box').on('click', '.add_address_btn', function (e) {
        e.preventDefault();
        $(this).next().show();
        $('#form-update-addr input[type="text"]').val('');
        $('#form-update-addr .add_address h5').text('增加收货地址');
        $('.save_addr').attr('href', 'javascript:save_user_goods_addr()');
    });
    $('#contents_box').on('click', '.close_address_panel', function (e) {
        e.preventDefault();
        $('#contents_box .add_address').hide();
    });
})();
function centerPop(ele) {
    var popupName = $(ele);
    _windowHeight = $(window).height(),//获取当前窗口高度
        _windowWidth = $(window).width(),//获取当前窗口宽度
        _popupHeight = popupName.height(),//获取弹出层高度
        _popupWeight = popupName.width();//获取弹出层宽度
    _posiTop = (_windowHeight - _popupHeight / 2) / 2 + $(window).scrollTop();
    _posiLeft = (_windowWidth - _popupWeight) / 2 + _popupWeight / 2;
    popupName.css({"left": _posiLeft + "px", "top": _posiTop + "px"});//设置position
}
$(document).ready(function () {
    $('.stepSide .iconPre').click(function (e) {
        var context = $(this).parent().find('ul');
        var pleft = context.css('margin-left');
        var counts = $(this).parent().find('li').length;
        counts = 3;
        var distance = 85;
        console.log(pleft, -distance * counts);
        if (pleft == "-5px") {
            return;
        }
        context.css('margin-left', parseInt(pleft) + distance + "px");
    });
    $('.stepSide .iconNext').click(function (e) {
        var context = $(this).parent().find('ul');
        var pleft = context.css('margin-left');
        var counts = $(this).parent().find('li').length;
        counts = counts - 4;
        var distance = 85;
        console.log(pleft, -distance * counts);
        if (pleft == -distance * counts - 5 + "px") {
            return;
        }
        $(context).css('margin-left', parseInt(pleft) - distance + "px");
    });
    try {
        $('.datetimepicker').calendar();
    } catch (e) {
    }
    ;
    $('.searchNav > a').click(function (e) {
        $('.searchNavBox').toggleClass('hide');
        console.log('yes toggle');
        e.stopPropagation();
        e.preventDefault();
    });
    $('.searchNavBox a').mouseover(function (e) {
        $('.searchNavBox a').removeClass('cur');
        $(this).addClass('cur');
    })
    $(document).click(function (e) {
        var target = $(e.target);
        if ($(target).parents('.searchNavBox').length == 0 && !$(this).hasClass('showTagList')) {
            $('.searchNavBox').addClass('hide');
        }
        if ($(target).attr('id') != "tag-ipt" && $(target).parents('.tag_history').length <= 0) {
            $('.tag_history').hide();
        }
    });
    $('.btnMore').click(function (e) {
        e.preventDefault();
        var right = "-375px";
        console.log($('.stepMore').css('right'));
        if ($('.stepMore').css('right') == "0px") {
            $('.stepMore').css('right', right);
        } else {
            $('.stepMore').css('right', 0);
        }
    });
    $('.tagBar span').click(function (e) {
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
            $(this).find('input').attr('checked', 'checked');
            // 检测是否需要给所有的按钮加上checked
            if ($(this).find('input').val() !== '全部') {
                //$(this).parent().find('span').first().removeClass('checked').find('input').removeAttr('checked');
                var ifallchecked = true;
                var all = $(this).parent().find('span');
                for (var i = 1; i < all.length; i++) {
                    if (!$(all[i]).hasClass('checked')) {
                        console.log('not checked', all[i]);
                        ifallchecked = false;
                        break;
                    }
                }
                if (ifallchecked) {
                    console.log('all checked');
                    //$(this).parent().find('span').first().addClass('checked').find('input').attr('checked', 'checked');
                }
            } else {
                var all = $(this).parent().find('span');
                for (var i = 0; i < all.length; i++) {
                    $(all[i]).addClass('checked').find('input').attr('checked', 'checked');
                }
            }

        } else {
            $(this).find('input').removeAttr('checked');
            if ($(this).find('input').val() !== '全部') {
                $(this).parent().find('span').first().removeClass('checked').find('input').removeAttr('checked');
            } else {
                var all = $(this).parent().find('span');
                for (var i = 0; i < all.length; i++) {
                    $(all[i]).removeClass('checked').find('input').removeAttr('checked');
                }

            }
        }
    });
    $('.closed, .cancel').click(function (e) {
        e.preventDefault();
        $('.mask, .dlPos').addClass('hide');
    });
    $('.dlPos .confirmGo').click(function (e) {
        e.preventDefault();
        if ($('.dlPos').attr('formid')) {
            console.log('post form');
            var formid = $('.dlPos').attr('formid');
            $(formid).submit();
            return;
        }
        if ($('.dlPos').attr('dataurl')) {
            window.location = $('.dlPos').attr('dataurl');
            return;
        }
        if (!$('.dlPos').attr('dataurl')) {
            $('.mask, .dlPos').addClass('hide');
            return;
        }
    });
    $('.editcover').click(function (e) {
        e.preventDefault();
        var key = $(this).attr('key');
        $('.editarea').hide();
        $('.dlPos .editarea[key="' + key + '"]').show();
        $('.dlPos').removeClass('hide');
        $('.mask').removeClass('hide');
    });
    $('#post_cover_form').click(function (e) {
        $("#cover_form").submit();
    });

    $('.payLst').on('click', 'li', function (e) {
        var self = this;
        $(self).parent().find('li.checked input').removeAttr('checked');
        $(self).parent().find('li.checked').removeClass('checked');
        $(self).parent().find('li .iconSelCirle').removeClass('iconSelCirle').addClass('iconNoneCirle');
        $(self).addClass('checked');
        $(self).find('i.iconNoneCirle').removeClass('iconNoneCirle').addClass('iconSelCirle');
        $(self).find('input').attr('checked', true);
    });
    $('.mask').css('height', $(document).height());
});

var scrollInterval = null;
$(window).scroll(function () {
    if (scrollInterval) {
        clearTimeout(scrollInterval);
    }
    scrollInterval = setTimeout(function () {
        $('.artDr').css("top", $(window).scrollTop());
    }, 200);
})

function checkLogin() {
    var userAccount = $('#mobile').val();
    if (!/^[0-9]{11}$/.test(userAccount) && !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(userAccount)) {
        $('<span class="err_tip">账号格式错误</span>').insertAfter($('#mobile'));
        return false;
    }
    if ($('#pass').val() == "") {
        $('<span class="err_tip">密码不能为空</span>').insertAfter($('#pass'));
        return false;

    }
    return true;
}
function checkReg() {
    var userAccount = $('#mobile').val();
    if (!/^[0-9]{11}$/.test(userAccount)) {
        $('<span class="err_tip">手机号格式不对</span>').insertAfter($('#mobile'));
        return false;
    }
    return true;
}
(function () {

    var debugData = {
        "/article/save": {"article_id": 1528, "ret": 0},
        "/article/save/1574": {"article_id": 1574, "ret": 0},
        "/book_content/1579": {
            "id": "142",
            "title": "test1",
            "page": "1",
            "article_id": "46",
            "book_author_id": "13",
            "content": "asdfasdfsadfasdfkljaslkdfj",
            "ret": 0
        }

    };


    var apiHost = getCurrentAPIDomain();

    function form2ajax(formId, path, cb, noPos) {
        var form = $('#' + formId),
            items = form.serializeArray(),
            data = {},
            len = items.length,
            method = form.attr('method'),
            url = apiHost + path;
				
        for (var i = 0; i < len; i++) {
            var item = items[i];
            var name = item.name === "tags[]" ? "tags" : item.name,
                value = item.value;
            if (!data[name]) {
                data[name] = value;
            } else {
                if (!(data[name] instanceof Array)) {
                    data[name] = [value];
                }
                data[name].push(value);
            }
        }

        //ie8,9
        if ($.browser.msie && window.XDomainRequest && navigator.userAgent.indexOf("MSIE 10.0") == -1) {

            console.log('添加IFRAME') ;
            console.log(getCurrentWWWDomain()) ;

            var extendHTML =
                "<form id='iePost' name='iePost' method='" + method + "' action='" + url +"' target='iePostIframe'></form>" +
                "<iframe width='0' height='0' id='iePostIframe' name='iePostIframe'>" +
                "</iframe>" ;
                "<script type='text/javascript'>document.domain = '" + getCurrentWWWDomain() + '/portal/writing' + "';</script>" ;

            $(document.body).append(extendHTML);

            console.log('添加IFRAME') ;

            var form = $("#iePost")[0];
            for (var p in data) {
                $("#iePost").append('<input type="hidden" id="' + p + '" name="' + p + '" value="' + data[p] + '">');
            }

            form.submit();


            $("#iePostIframe").off();
            $("#iePostIframe").load(function() {

                var iframe = document.getElementById('iePostIframe') ;

                var timer = setInterval(function(){

                    console.log(iframe.readyState) ;

                    if(iframe.readyState == "complete"){

                        console.log('iframe.readyState == "complete"') ;

                        clearInterval(timer);
                        //iframe.contentWindow.document.body.innerHTML = '这是新设置的页面内容';
                        //var result = iframe.contentWindow.document.body.innerHTML ;
                        //console.log(result);
                        //console.log('+++++++++');
                        if (!noPos) {
                            showSuccess();
                        }

                        setTimeout(function(){location.reload(true)},700);

                        //setTimeout(function(){cb && cb(result, data)},700);

                        //location.reload(true);
                    }
                }, 500);
                //
                //console.log(this);
                //var result = iframe.contentWindow.document.body.innerHTML;
                //
                //if(document.readyState == "complete" && ifr.readyState == "complete"){
                //    //在此处访问并操作iframe所引入的document文档对象
                //}
                //var length = result.length;
                //console.log(result);
                //success($.parseJSON(result.substring(1, length - 1)));
                //$("#iePost").children().remove();
                //
                //location.reload(true);

                //showSuccess();

                //setTimeout(function(){location.reload(true)},700);
            });

        }else {

            $.ajax({
                type: method,
                url: url,
                data: data,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (result) {

                    console.log('success');

                    if(typeof result === 'string'){

                        console.log('ie浏览器解析数据');
                        result = JSON.parse(result) ;
                    }

                    if (!noPos) {
                        if (result && result.err_code === 0) {
                            showSuccess();
                        } else {
                            showFail();
                        }
                    }

                    setTimeout(function(){cb && cb(result, data)},700);
                },

                error: function (x,e) {

                    console.log('error-------') ;
                    console.log(e) ;

                    for (var i in e) {

                        console.log('error:' + i + '==' + e[i]);
                    }

                    if(x.status==0){
                        console.log('You are offline!!\n Please Check Your Network. /  x.status==0');
                    }else if(x.status==404){
                        console.log('Requested URL not found. /  x.status==404');
                    }else if(x.status==500){
                        console.log('Internel Server Error / x.status==500');
                    }else if(e=='parsererror'){
                        console.log('Error.\nParsing JSON Request failed.');
                    }else if(e=='timeout'){
                        console.log('Request Time out.');
                    }else {
                        console.log('Unknow Error.\n'+x.responseText);
                    }
                }

            });

        }

        return;
    }

    function link2ajax(sendObj, path, cb, noPos) {

        var
            data = sendObj.data,
            method = sendObj.method,
            url = apiHost + path;

        /*cb&&cb(debugData[path]||{ret: 0});
         if(!noPos){
         showSuccess();
         }*/
        $.ajax({
            type: method,
            url: url,
            data: data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (result) {

                if (!noPos) {
                    if (result && result.err_code === 0) {
                        showSuccess();
                    } else {
                        showFail();
                    }
                }

                cb && cb(result, data);
                console.log(result);
            },

            error: function (x,e) {



                showFail();


            }

        })
        return;

    }

	function deleLinkAjax(sendObj,panel,path, cb, noPos) {

        var
            data = sendObj.data,
            method = sendObj.method,
            url = apiHost + path;
        $.ajax({
            type: method,
            url: url,
            data: data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (result) {

                if (!noPos) {
                    if (result && result.err_code === 0) {
                        
                        $('.pos-mask').show();
       					$('.dele-success').show();
       					var formPanel = $('#'+panel);
			            if(formPanel.attr('isdefault')){
			                formPanel.parents('li').prev().children('.mid').text('您还没有添加默认收货地址');
			            }
			            formPanel.remove();
                    } else {
                         $('.pos-mask').hide();
       					 $('.dele-success').hide();
                    }
                }

                cb && cb(result, data);
                console.log(result);
            },

            error: function (x,e) {
                $('.pos-mask').hide();
       			$('.dele-success').hide();


            }

        })
        return;
    }
    $.form2ajax = form2ajax;
    $.link2ajax = link2ajax;
	$.deleLinkAjax=deleLinkAjax;

    function showSuccess() {

        $('.pos-mask').show();
        $('.pos-success').show();
    }

    function showFail() {
        $('.pos-mask').show();
        $('.pos-fail').show();
    }

    function hidePos() {
        $('.pos-mask').hide();
        $('.tipPos').hide();
    }

    function showSelf(selector) {
        $('.pos-mask').show();
        $(selector).show();
    }

    $.showSuccess = showSuccess;
    $.showFail = showFail;
    $.showSelf = showSelf;
    $('.pos-mask').click(hidePos);
    $('.tipPos').click(hidePos);

})();
