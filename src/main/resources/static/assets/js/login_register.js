var str='<div class="container-fluid land_register_k clearfix" style="font-family:Microsoft Yahei;background: rgba(0, 0, 0, 0.6);position: fixed;top:0;right:0;bottom:0;left: 0;">' +
	'<div class="row"><link rel="stylesheet" href="https://static.shiqichuban.com/assets/css/login.css"/>' +
	'<div class="modal-content col-xs-6 clearfix" id="land_wrap" style="position:absolute;top:0;right:0;bottom:0;left:0;margin:90px auto;max-height:506px;padding:21px 46px;border-radius:4px;background-color:#fff">'+
	'<div style="padding-right:44px;background:url(https://static.shiqichuban.com/assets/img/land_img/land_bg.png) no-repeat right 15px;background-size:auto 100%" class="land_left col-xs-7"><form method="POST" id="modal_land">' +
	'<div  class="lf_head col-xs-12" style="margin-bottom:20px;padding:0;border-bottom:1px solid #A1A1A1;font-size:0">' +
	'<span class="land_over land_now col-xs-6" style="display:inline-block;height:40px;color:#2c2c2c;text-align:center;font-size:18px;line-height:40px;cursor:pointer;padding-bottom:8px;border-bottom:2px solid #2c2c2c;color:#2c2c2c;font-weight:700">登录</span>' +
	'<span class="register_over col-xs-6" style="display:inline-block;height:40px;color:#2c2c2c;text-align:center;font-size:18px;line-height:40px;cursor:pointer">注册</span>' +
	'</div>' +
	'<div class="land_info col-xs-12">' +
	'<div class="form_group" style="position:relative;border-bottom:1px solid #ccc;">' +
	//'<i class="bg_use bg" style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_user_icon.png) no-repeat ">账户</i>' +
	'<input style="margin:0;padding: 0;border: none;outline: none;height:46px;letter-spacing:2px;line-height:normal;width: 100%;" type="text" class="bg_use_name" autocomplete="off" name="login" id="" value="" placeholder="手机号码" />' +
	'</div>' +
	'<div class="form_group" style="position:relative;border-bottom:1px solid #ccc;">' +
	//'<i class="bg_pwd bg" style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_pwd_icon.png) no-repeat" >密码</i>' +
	'<input style="margin:0;padding: 0;border: none;outline: none;height:46px;letter-spacing:2px;line-height:normal;width: 100%;" type="password" class="bg_use_pwd" name="password" id="" value="" placeholder="密码" />' +
	'</div>' +
	'<div class="form_group vcode_box" style="position:relative;border-bottom:1px solid #ccc;display:none;">' +
	//'<i class="vcode_icon" style="background:url(https://static.shiqichuban.com/assets/img/land_img/login_vcode_icon.png) no-repeat;position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0"></i>' +
	'<input style="margin:0;padding: 0;border: none;outline: none;height:46px;letter-spacing:2px;line-height:normal;width: 100%;" id="vcode" type="text" name="captcha" placeholder="验证码">'+
	'<img class="vcode_img" style="position:absolute;right:0;bottom:0;width:100px;height:38px" id="send_yz" data-return="'+getCurrentAPIDomain()+'/v1/user/captcha+/v1/user/captcha" data-url="' + getCurrentAPIDomain() + '/v1/user/captcha" src="' + getCurrentAPIDomain() + '/v1/user/captcha">' + '</div>' +
	'</div>' +
	'<div class="land_tool col-xs-12 clearfix" style="padding:16px 0 16px 14px;font-size:12px">' +
	'<a class="forget_pwd" style="float:left;color:inherit;font-size:12px;line-height:18px;cursor:pointer" href="/user/password/forgot">忘记密码?</a>' +
	'<label for="" class="next_land" style="margin-left:5px;font-size:12px;line-height:18px;float: right;">下次自动登录</label>' +
	'<input style="float:right;" type="checkbox" checked="checked" class="auto_land fr" name="autologin" id="" value="" />' +
	'</div>' +
	'<div class="land_tips col-xs-12" style="display:none;color:red;line-height:40px">验证码有误</div>' +
	'<div class="land_sub col-xs-12" style="width:100%;height:40px;border-radius:10px;background-color:#000;color:#fff;text-align:center;letter-spacing:8px;font-size:14px;line-height:40px;cursor:pointer">' +
	'<div class="login" style="width: 100%;height: 40px;border-radius: 10px;background-color: #000;color: #fff;text-align: center; letter-spacing: 8px;font-size: 14px;line-height: 40px;cursor: pointer;">登录</div>' +
	'</div>' +
	'<div class="other_land col-xs-12" style="padding-top:20px;padding-right:0;padding-left:0">' +
	'<p class="land_icon_tit" style="margin-bottom:0;text-align:center;font-family: 微软雅黑; height:46px;color:#ccc;letter-spacing:1px;font-size:14px;line-height:46px;">使用社交账号登录</p>' +
	'<p class="clearfix land_icon " style="text-align: center;">' +
	'<a href="/user/login_wechat" class="wx_land" style="padding-right:15px;">' +
	'<img src="https://static.shiqichuban.com/assets/img/land_img/wx_land.png" style="width: 34px;width: 36px;" />' +
	'</a>' +
	'<a href="/user/login_qq" class="qq_land" style="padding-left:15px;">' +
	'<img src="https://static.shiqichuban.com/assets/img/land_img/qq_land.png" style="width: 34px;width: 36px;" />' +
	'</a>' +
	'<a href="/user/login_weibo" class="sinaweibo_land" style="padding-left:30px;"><wb:login-button type="3,2" onlogin="login" onlogout="logout"><img style="width: 34px;width: 36px;" src="https://static.shiqichuban.com/assets/img/land_img/sinaweibo_land.png"></wb:login-button>' +
	'</a>' +
	'</p>' +
	'</div>' +
	'</form>' +
	'</div>' +
	'<div class="land_rg col-xs-4 col-xs-offset-1" style="margin-top:18px;padding:0;text-align:center">' +
	'<p class="lg_tit col-xs-12" style="height:54px;letter-spacing:10px;font-weight:700;font-size:18px;line-height:54px">下载APP</p>' +
	'<p class="ewm_img col-xs-12" style="padding:0;width:100%"><img src="https://static.shiqichuban.com/assets/img/app.jpg" style="width:100%"/></p>' +
	'<p class="ewm_dec col-xs-12" alt="扫描微信二维码" style="margin-top:20px;height:36px;color:#9a9a9a;font-size:12px;line-height:36px">手机扫二维码，下载拾柒APP</p>' +
	'</div>' +
	'<div class="close_land " style="position:absolute;top:-12px;right:-12px;width:38px;height:40px">' +
	'<img src="https://static.shiqichuban.com/assets/img/land_img/close_land.png" alt="关闭" />' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>';

var mouse_click;
var ver_vode=false;
var timer, countdown,img_code_send=true;
if(isPC()) {
	mouse_click = 'click';
} else {
	
	mouse_click = 'touchstart';
	
}
$(window).bind('keydown', function (e) {
   if(e.keyCode==13){
	if(!$('.land_register_k').is(':hidden')){
	if($('.login').length>0 && !$('.login').is(':hidden')){
		$('.login').trigger('click');
	}
	if($('.land_register div').length>0&&!$('.land_register div').is(':hidden')){
		$('.land_register div').trigger('click');
	}
	

	if($('.re_email div').length>0&&!$('.re_email div').is(':hidden')){
		$('.re_email div').trigger('click');
	}
	}
	}
	});
var win_h = $(window).height(); //获取页面的高度


var register_str = '<div class="lf_head col-xs-12" style="margin-bottom:20px;padding:0;border-bottom:1px solid #A1A1A1;font-size:0">' +
	'<span class="land_over land_now col-xs-6" style="display:inline-block;height:40px;color:#2c2c2c;text-align:center;font-size:18px;line-height:40px;cursor:pointer">登录</span>' +
	'<span class="register_over col-xs-6" style="display:inline-block;height:40px;color:#2c2c2c;text-align:center;font-size:18px;line-height:40px;cursor:pointer;padding-bottom:8px;border-bottom:2px solid #2c2c2c;color:#2c2c2c;font-weight:700;">注册</span>' +
	'</div>' +
	'<form>' +
	'<div class="form_group col-xs-12 " style="position:relative;border-bottom:1px solid #ccc">' +
	//'<i class="bg_reuse bg" style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_user_icon.png) no-repeat "> 手机号或者邮箱 </i>' +
	'<input type="text" class="bg_re_use" name="" id="" value="" placeholder="手机号码" style="margin: 0;padding: 0;border: none;outline: none;width: 100%;height: 46px; letter-spacing: 2px;line-height: normal;" />' +
	'</div>' +
	'<div class="form_group col-xs-12 " style="position:relative;border-bottom:1px solid #ccc">' +
		//'<i class="bg_reuse bg" style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_user_icon.png) no-repeat "> 手机号或者邮箱 </i>' +
	'<input type="text" class="bg_re_imgCode" name="" id="" value="" placeholder="请输入图形验证码" style="margin: 0;padding: 0;border: none;outline: none;width: 100%;height: 46px; letter-spacing: 2px;line-height: normal;" />' +
	'<img class="img_code_btn" src="'+getCurrentAPIDomain()+'/v1/user/captcha" style="position:absolute;top:10px;right:0;padding:0 14px;height:28px;cursor:pointer;">' +

	'</div>' +
	'<div class="form_group col-xs-12 " style="position:relative;border-bottom:1px solid #ccc">' +
	//'<i class="bg_remask bg " style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_vcode_icon.png) no-repeat ">验证码</i>' +
	'<input type="text " class="bg_re_mask " name="" id="" value="" placeholder="验证码 " style="margin: 0;padding: 0;border: none;outline: none;width: 100%;height: 46px; letter-spacing: 2px;line-height: normal;max-width:120px;"/>' +
	'<span class="code_btn " style="position:absolute;top:10px;right:0;padding:0 14px;height:28px;border-radius:20px;background:#000;color:#fff;font-size:12px;line-height:28px;cursor:pointer;">获取验证码</span>' +
	'</div>' +

	'<div class="form_group col-xs-12" style="position:relative;border-bottom:1px solid #ccc">' +
	//'<i class="bg_repwd bg " style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_pwd_icon.png) no-repeat ">密码</i>' +
	'<input type="password" class="bg_re_pwd " name="" id="" value="" placeholder="密码" style="margin: 0;padding: 0;border: none;outline: none;width: 100%;height: 46px; letter-spacing: 2px;line-height: normal;" />' +
	'</div>' +
	'<div class="form_group col-xs-12 " style="position:relative;border-bottom:1px solid #ccc">' +
	//'<i class="bg_rerepwd bg " style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_pwd_icon.png) no-repeat ">重复密码</i>' +
	'<input type="password" class="bg_re_repwd " name="" id="" value="" placeholder="重复密码 " style="margin: 0;padding: 0;border: none;outline: none;width: 100%;height: 46px; letter-spacing: 2px;line-height: normal;" />' +
	'</div>' +
	'<div class="form_group col-xs-12 " style="position:relative;border-bottom:1px solid #ccc">' +
	//'<i class="bg_re_repenname bg" style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:21px;width:18px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/bg_icon.png) no-repeat -8px -143px">笔名</i>' +
	'<input type="text " class="bg_pen_name " name="" id="" value="" placeholder="笔名(选填)" style="margin: 0;padding: 0;border: none;outline: none;width: 100%;height: 46px; letter-spacing: 2px;line-height: normal;"/>' +
	'</div>' +
	'<div class="form_group1 col-xs-12 ">' +
	'<input type="checkbox" name="is_agreement" checked="checked" id="is_agreement" style="position: absolute;top:12px"/>' +
	'<p class="agr_tips" style="float:left;height: 46px;letter-spacing: 2px;line-height: 46px;white-space:nowrap;padding-left:20px;color:#a9a9a9;font-size:14px;font-family:Microsoft Yahei;">阅读并接受' +
	'<a href="/agreement" target="_blank" style="color:#a9a9a9;font-size:14px;text-decoration: none;">《用户服务与隐私协议》</a>' +
	'</p>' +
	'</div>' +
	'<div class="register_tips col-xs-12" style="display:none;color:red;line-height:40px;white-space:nowrap;font-size:12px;"></div>' +
	'<div class="land_register col-xs-12" style="">' +
	'<div style="width:100%;height:40px;border-radius:10px;background-color:#000;color:#fff;text-align:center;letter-spacing:8px;font-size:14px;line-height:40px;cursor:pointer">注册</div>' +
	'</div>' +
	'<div class="re_email col-xs-12" style="display: none;margin-top:30px">' +
	'<div style="width:100%;height:40px;border-radius:10px;background-color:#000;color:#fff;text-align:center;letter-spacing:8px;font-size:14px;line-height:40px;cursor:pointer;">发送验证邮箱</div>' +
	'</div>' +
	'</form>';


var land_str = '<form method="POST" id="modal_land">' +
	'<div  class="lf_head col-xs-12" style="margin-bottom:20px;padding:0;border-bottom:1px solid #A1A1A1;font-size:0">' +
	'<span class="land_over land_now col-xs-6" style="display:inline-block;height:40px;color:#2c2c2c;text-align:center;font-size:18px;line-height:40px;cursor:pointer;padding-bottom:8px;border-bottom:2px solid #2c2c2c;color:#2c2c2c;font-weight:700">登录</span>' +
	'<span class="register_over col-xs-6" style="display:inline-block;height:40px;color:#2c2c2c;text-align:center;font-size:18px;line-height:40px;cursor:pointer">注册</span>' +
	'</div>' +
	'<div class="land_info col-xs-12">' +
	'<div class="form_group" style="position:relative;border-bottom:1px solid #ccc;">' +
	//'<i class="bg_use bg" style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_user_icon.png) no-repeat">账户</i>' +
	'<input style="margin:0;padding: 0;border: none;outline: none;height:46px;letter-spacing:2px;line-height:normal;width: 100%;" type="text" class="bg_use_name" autocomplete="off" name="login" id="" value="" placeholder="手机号码" /></div>' +
	'<div class="form_group" style="position:relative;border-bottom:1px solid #ccc;">' +
	//'<i class="bg_pwd bg" style="position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0;background:url(https://static.shiqichuban.com/assets/img/land_img/login_pwd_icon.png) no-repeat " >密码</i>' +
	'<input style="margin:0;padding: 0;border: none;outline: none;height:46px;letter-spacing:2px;line-height:normal;width: 100%;" type="password" class="bg_use_pwd" name="password" id="" value="" placeholder="密码" />' +
	'</div>' +
	'<div class="form_group vcode_box" style="position:relative;border-bottom:1px solid #ccc;display:none;">' +
	//'<i class="vcode_icon" style="background:url(https://static.shiqichuban.com/assets/img/land_img/login_vcode_icon.png) no-repeat ;position:absolute;top:12px;left:0;overflow:hidden;padding-top:20px;width:20px;height:0"></i>' +
	'<input style="margin:0;padding: 0;border: none;outline: none;height:46px;letter-spacing:2px;line-height:normal;width: 100%;" id="vcode" type="text" name="captcha" placeholder="验证码">'+
	'<img class="vcode_img" style="position:absolute;right:0;bottom:0;width:100px;height:38px" id="send_yz" data-return="'+getCurrentAPIDomain()+'/v1/user/captcha+/v1/user/captcha" data-url="' + getCurrentAPIDomain() + '/v1/user/captcha" src="' + getCurrentAPIDomain() + '/v1/user/captcha">' + '</div>' +
	'</div>' +
	'<div class="land_tool col-xs-12 clearfix" style="padding:16px 0 16px 14px;font-size:12px">' +
	'<a class="forget_pwd" style="float:left;color:inherit;font-size:12px;line-height:18px;cursor:pointer" href="/user/password/forgot">忘记密码?</a>' +
	'<label for="" class="next_land" style="margin-left:5px;font-size:12px;line-height:18px;float: right;">下次自动登录</label>' +
	'<input style="float:right;" type="checkbox" checked="checked" class="auto_land fr" name="autologin" id="" value="" />' +
	'</div>' +
	'<div class="land_tips col-xs-12" style="display:none;color:red;line-height:40px">验证码有误</div>' +
	'<div class="land_sub col-xs-12" style="width:100%;height:40px;border-radius:10px;background-color:#000;color:#fff;text-align:center;letter-spacing:8px;font-size:14px;line-height:40px;cursor:pointer">' +
	'<div class="login" style="width: 100%;height: 40px;border-radius: 10px;background-color: #000;color: #fff;text-align: center; letter-spacing: 8px;font-size: 14px;line-height: 40px;cursor: pointer;">登录</div>' +
	'</div>' +
	'<div class="other_land col-xs-12" style="padding-top:20px;padding-right:0;padding-left:0">' +
	'<p class="land_icon_tit" style="margin-bottom:0;text-align:center;font-family: 微软雅黑; height:46px;color:#ccc;letter-spacing:1px;font-size:14px;line-height:46px;">使用社交账号登录</p>' +
	'<p class="clearfix land_icon " style="text-align: center;">' +
	'<a href="/user/login_wechat" class="wx_land" style="padding-right:15px;">' +
	'<img src="https://static.shiqichuban.com/assets/img/land_img/wx_land.png" style="width: 34px;width: 36px;" />' +
	'</a>' +
	'<a href="/user/login_qq" class="qq_land" style="padding-left:15px;">' +
	'<img src="https://static.shiqichuban.com/assets/img/land_img/qq_land.png" style="width: 34px;width: 36px;" />' +
	'</a>' +
	'<a href="/user/login_weibo" class="sinaweibo_land" style="padding-left:30px;">' +
	'<wb:login-button type="3,2" onlogin="login" onlogout="logout"><img style="width: 34px;width: 36px;" src="https://static.shiqichuban.com/assets/img/land_img/sinaweibo_land.png"></wb:login-button>' +
	'</a>' +
	'</p>' +
	'</div>' +
	'</form>';

	var encrypt_unEncrypt = {};
	encrypt_unEncrypt.Encrypt = function(Text) { //加密
		var b = new Base64();
		return b.encode(Text)
	};
	encrypt_unEncrypt.unEncrypt = function(Text) { //解密
		var b = new Base64();
		return b.decode(Text);
	};
	
	var use_name = localStorage.getItem("use_names");
	var use_pwd = localStorage.getItem("use_pwds");
	
	if(use_name) {
		use_name = encrypt_unEncrypt.unEncrypt(use_name);
    }
if(use_pwd) {
		use_pwd = encrypt_unEncrypt.unEncrypt(use_pwd);
    }
//登陆按钮

$('.login_new').on(mouse_click,function(){
	if(!isPC()){
		
		window.location.href='https://www.shiqichuban.com/user/mobile_login'
	}
	$(document.body).append(str);
	
	if(window.location.href.indexOf('agent')>1){
		
		var agent= '?agent'+window.location.href.split('agent')[1];
		$('.wx_land').attr('href','/user/login_wechat'+agent);
		$('.qq_land').attr('href','/user/login_qq'+agent);
		$('.sinaweibo_land').attr('href','/user/login_weibo'+agent);
	}

	if(use_name && use_pwd) {
		$('.bg_use_name').val(use_name);
		$('.bg_use_pwd').val(use_pwd);
    }
    return false;
});
//注册按钮
$('.register_new').on(mouse_click,function(){
	$(document.body).append(str);
	$('.land_left').html(register_str);
	$('.land_left').addClass('land_now');
	$('.lf_head').css('margin-bottom', '13px');
	$('.register_over').css('font-weight', '700');
	$('.register_over').css('border-bottom', '2px solid #2c2c2c');
	$('.land_over').css('font-weight', 'normal');
	$('.land_over').css('border-bottom', 'none');
	if($(document).width()<750){
		$('.agr_tips').css('letter-spacing','0');
		$('.modal-content').css({
			'width':'90% !important',
			 'margin':'20px auto',
		})
	}
	return false;
});

$(document).on(mouse_click, '.land_over', function() {
	$('.land_left ').html(land_str);
	$('.land_left ').removeClass('land_now');
	$('.lf_head').css('margin-bottom', '20px');
	$('.land_over').css('border-bottom', '2px solid #2c2c2c');
	$('.land_over').css('font-weight', '700');
	$('.register_over').css('font-weight', 'normal');
	$('.register_over').css('border-bottom', 'none')
	clearInterval(timer2)
	countdown=-1;
	$(".code_btn ").html('获取验证码');
	isSend=true;
	
}).on(mouse_click, '.register_over', function() {
	$('.land_left').html(register_str);
	if($(document).width()<750){
		$('.agr_tips').css('letter-spacing','0');
		$('.modal-content').css({
			'width':'90% !important',
			 'margin':'20px auto',
		})
	}
	$('.lf_head').css('margin-bottom', '13px');
	$('.land_left ').addClass('land_now');
	$('.register_over').css('font-weight', '700');
	$('.land_over').css('font-weight', 'normal');
	$('.register_over').css('border-bottom', '2px solid #2c2c2c');
	$('.land_over').css('border-bottom', 'none')

}).on(mouse_click, '.vcode_img', function() {
	var that = this;
	var timer = 60;
	var url = $(this).attr('data-url') + '?dd=' + Math.random();
	var method = $(this).attr('method');
	$(that).attr('src', url);
}).on(mouse_click, '.code_btn', function() {
	sms_verify_send();
}).on(mouse_click, '.close_land', function(e) {
	e.preventDefault();

	clearInterval(timer2)
	countdown=-1;
	$(".code_btn ").html('获取验证码');
	isSend=true;

	$('.land_register_k').remove();
	
}).on(mouse_click, '.login', function() {
	var userAccount = $('.bg_use_name').val();
	var re_mobile = /^1\d{10}$/;
	var re_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	//为空、手机格式、邮箱格式检测、密码为空检测
	if(userAccount.length == 0) {
		$('.land_tips').css({
			'display': 'block',
			'text-align': 'center'
		}).html('* 账号不能为空');
		$('.land_tool').css('padding-bottom', '0');
		$('.other_land').css('padding-top', '0');
		return false;
	}
	if(!re_mobile.test(userAccount) && !re_email.test(userAccount)) {
		$('.land_tips').css({
			'display': 'block',
			'text-align': 'center'
		}).html('* 请输入正确的手机号码');
		$('.land_tool').css('padding-bottom', '0');
		$('.other_land').css('padding-top', '0');
		return false;
	}
	if($('.bg_use_pwd').val() == "") {
		$('.land_tips').css({
			'display': 'block',
			'text-align': 'center'
		}).html('* 密码不能为空');
		$('.land_tool').css('padding-bottom', '0');
		$('.other_land').css('padding-top', '0');
		return false;
	}

	var Form_data = {};
	if(re_mobile.test(userAccount)) {
		Form_data.mobile = $('.bg_use_name').val();
	} else {
		Form_data.email = $('.bg_use_name').val();
	}
	if($('.auto_land').is(":checked")) {
		Form_data.autologin = 'Y'
	} else {
		Form_data.autologin = 'N'
	}
	Form_data.password = $('.bg_use_pwd').val();
	Form_data.captcha = $('#vcode').val();
	Form_data['_token'] = csrf;
	
	if(window.location.href.indexOf('agent')>1){
		var agent= '?agent'+window.location.href.split('agent')[1];
		var url_name='/user/login_popup'+agent;
	}else{
		var url_name='/user/login_popup';
	}
	
	sendData({
		is_api: false,
		url: url_name,
		data: Form_data,
		method: 'post',
		callback: function(data) {
			if(data.err_code == 0) {
				
				var use_name = encrypt_unEncrypt.Encrypt($('.bg_use_name').val());
				var use_pwd = encrypt_unEncrypt.Encrypt($('.bg_use_pwd').val());
				if($('.auto_land').is(":checked")) {
					localStorage.setItem('use_names', use_name);
					localStorage.setItem('use_pwds', use_pwd);
				} else {
					localStorage.removeItem('use_names');
					localStorage.removeItem('use_pwds');
				}
				location.replace(data.return_url);
			}
		},
		errorFun: function(data) {
			$('.land_tips').css({
				'display': 'block',
				'text-align': 'center',
			});
			$('.vcode_img').trigger('click');
			$('.land_tips').html(data.err_msg);
			$('.land_tool ').css('padding-bottom', '0');
			$('.vcode_box').show();
			$('.other_land').css('padding-top', '0');

		}
	});

}).on('focus','.bg_re_pwd',function(){
	
	var pwd = $(".bg_re_pwd").val();
	if(!isLegit(pwd)){
		$('.register_tips').show().html("密码必须包含字母和数字组成的6-20位字符");
		$('#old_password').next('.ipt_tip').eq(0).html('').show();
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
	}else{

		$('.register_tips').hide();
	}
}).on('blur','.bg_re_pwd',function(){
	
	var pwd = $(".bg_re_pwd").val();
	if(!isLegit(pwd)){
		$('.register_tips').show().html("密码必须包含字母和数字组成的6-20位字符");
		$('#old_password').next('.ipt_tip').eq(0).html('').show();
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
	}else{

		$('.register_tips').hide();
	}
}).on('input','.bg_re_pwd',function(){
	var pwd = $(".bg_re_pwd").val();
	if(!isLegit(pwd)){
		$('.register_tips').show().html("密码必须包含字母和数字组成的6-20位字符");
		$('#old_password').next('.ipt_tip').eq(0).html('').show();
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
	}else{
		$('.register_tips').hide();
	}
	
}).on('blur', '.bg_re_use', function() {
	var mobile = $.trim($(".bg_re_use").val());
	var re_mobile = /^1\d{10}$/;
	var re_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	//$('.re_email ').css('margin-top', '30px');
	if(mobile.length == 0) {
		$('.register_tips').css({
			'text-align': 'center',
			'line-heigth': '40px'
		});
		$('.land_register').css('margin-top', '0');
		$('.register_tips').show().html('用户名不能为空');
		return false;
	}
	if(re_mobile.test(mobile)) {
		//如果是手机注册
		$('.code_btn').html('获取验证码');
		$('.bg_re_use').parent().nextAll('.form_group ').show();
		$('.re_email').hide();
		$('.land_register').show();
	} else {
		$('.register_tips').css({
			'margin-top': '0',
			'text-algin': 'center'
		});
		$('.land_register').css('margin-top', '0');
		$('.register_tips').show().html('用户名输入错误');
		return false;
	}
}).on('blur', '.bg_re_use', function() {
	//$('.land_register').css('margin-top', '30px');
	$('.register_tips').hide();

}).on(mouse_click,'.is_agreement',function(){
	if($('#is_agreement').is(':checked')==true){
		$('.agr_tips').css('color','#f00');
		$('.agr_tips a').css('color','#f00');
	}
}).on(mouse_click, '.land_register div', function() {
	var pwd = $.trim($('.bg_re_pwd').val());
	var num_letters = /^[0-9a-zA-Z]+$/;
	var pwd = $(".bg_re_pwd").val();
	var reset_pwd = $(".bg_re_repwd").val();
	var mask = $('.bg_re_mask').val();
	var user_name = $('#land_wrap .bg_re_use').val()
	var re_mobile = /^1\d{10}$/;
	var is_agreement=$('#is_agreement').is(':checked')==true;
	if(!re_mobile.test(user_name)) {

		$('.register_tips').show().html("请输入正确的用户名");
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
    }
    if(user_name.length == 0) {
		$('.register_tips').show().html("用户名不能为空");
		$('.register_tips').css('text-align','center');
		$('.land_register').css('margin-top','0');
		return false;
	}

	if(!ver_vode){
		$('.register_tips').show().html("请输入正确的验证码");
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
	}
	if(mask.length == 0) {
		$('.register_tips').show().html("验证码不能为空");
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
	}
	
	var pwd = $(".bg_re_pwd").val();
	if(!isLegit(pwd)){
		$('.register_tips').show().html("密码必须包含字母和数字组成的6-20位字符");
		$('#old_password').next('.ipt_tip').eq(0).html('').show();
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
	}else{
		$('.land_register').css('margin-top', '30px');
		$('.register_tips').hide();
	}
    if(reset_pwd != pwd) {
		$('.land_register').css('margin-top','0');
		$('.register_tips').show().html("两次密码输入不一致");
		$('.register_tips').css('text-align','center');
		return false;
	}
	if(!is_agreement){
		$('.agr_tips').css('color','#f00');
		$('.agr_tips a').css('color','#f00');
		return false;
	}
	var Form_data = {};
	if(re_mobile.test(user_name)) {
		Form_data['mobile'] = user_name;
	} else {
		Form_data['email'] =user_name;
	}
	Form_data['_token'] = csrf;
	Form_data.verify = mask;
	Form_data.password = pwd;
	Form_data.password_confirmation = reset_pwd;
	Form_data.nickname = $(".bg_pen_name").val();
	
	
	if(window.location.href.indexOf('agent')>1){
		var agent= '?agent'+window.location.href.split('agent')[1];
		var url_name='/user/register/popup/mobile'+agent;
	}else{
		var url_name='/user/register/popup/mobile';
	}
	
	sendData({
		is_api: false,
		url: url_name,
		data: Form_data,
		method: 'post',
		callback: function(data) {
			if(data.err_code == 0) {
				location.href = data.return_url;
			}
		},
		errorFun: function(data) {
			if(data.err_code == '1' && data.err_msg == '验证码已过期') {
				$('.register_tips').html('请输入正确的验证码');
			} else {
				$('.register_tips').html(data.err_msg);
			}
			$('.register_tips').css({
				'display': 'block',
				'text-align': 'center'
			});
			$('.land_register').css('margin-top', '0');
		}
	});
}).on(mouse_click, '.re_email', function() {
	var email_use = $('.bg_re_use').val();
	var re_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	var is_agreement=$('#is_agreement').is(':checked')==true;
	if(!re_email.test(email_use)) {
		$('.register_tips').show().html("请输入正确的邮箱");
		$('.register_tips').css('text-align', 'center');
		$('.re_email').css('margin-top', '0');
		return false;
    }
    var email_use = $('.bg_re_use').val();
	var re_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!re_email.test(email_use)) {
		$('.register_tips').show().html("请输入正确的邮箱");
		$('.register_tips').css('text-align', 'center');
		$('.re_email').css('margin-top', '0');
		return false;
    }
    if(!is_agreement){
		$('.agr_tips').css('color','#f00');
		$('.agr_tips a').css('color','#f00');
		return false;
	}
	var Form_data = {};
	Form_data['email'] = email_use;
	
	if(window.location.href.indexOf('agent')>1){
		var agent= '?agent'+window.location.href.split('agent')[1];
		var url_name='/user/register/popup/mail'+agent;
		
	}else{
		var url_name='/user/register/popup/mail';
	}
	sendData({
		is_api: false,
		url: url_name,
		data: Form_data,
		method: 'post',
		callback: function(data) {
			if(data.err_code == 0) {
				if(data.mailPage==null||data.mailPage=='undefined'){
					console.log(data);
					$('.register_tips').css({
						'display': 'block',
						'text-align': 'center'
					});
					$('.register_tips').html('注册链接已发送至您的邮箱'+email_use);
					$('.re_email').css('margin-top', '0');
					return;
				}
				var form=$('<form></form>');
				var action = agent?("/user/register/mail"+agent):'/user/register/mail';
				console.log(action);
				var my_input = $('<input type="text" name="email" />');
				var mydata=email_use;
				
				form.attr('action', action);  
			    form.attr('method', 'post'); 
			    my_input.attr('value', mydata);  
			    form.attr('target', '_self'); 
			    
			    form.append(my_input);
			    form.appendTo("body");
			    form.submit();
			    
			    return false; 
			}
		},
		errorFun: function(data) {
			$('.register_tips').css({
				'display': 'block',
				'text-align': 'center'
			});
			$('.register_tips').html('注册链接已发送至您的邮箱'+email_use);
			$('.re_email').css('margin-top', '0');
		},
	})
}).on(mouse_click,'.img_code_btn',function(){
	$(this).attr('src','https://api.shiqichuban.com/v1/user/captcha'+'?'+Math.random());
});


//发送手机验证码

var each_countdown = function() {
	countdown--;
	if(countdown > 0) {
		img_code_send=false;
		$(".code_btn").html(countdown + '秒后再次获取');
		timer = window.setTimeout(each_countdown, 1000);

	} else {
		$(".code_btn").removeAttr('disabled');
		$(".code_btn").html('发送验证码');
		img_code_send=true;

	}
};
function start_count_down() {
	countdown = 60;
	img_code_send=false;
	$(".code_btn").attr('disabled', 'disabled');
	timer = window.setTimeout(each_countdown, 1000);
}
function sms_verify_send() {
	var mobile = $.trim($(".bg_re_use").val());
	var bg_re_imgCode=$.trim($(".bg_re_imgCode").val());

	var re_mobile = /^1\d{10}$/;
	var re_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(mobile.length == 0) {
		$('.register_tips').addClass('show');
		$('.register_tips').html("* 用户名不能为空");
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
	}
	if(!re_mobile.test(mobile)) {
		$('.register_tips').addClass('show').html("* 用户名不正确");
		$('.register_tips').css('text-align', 'center');
		$('.land_register').css('margin-top', '0');
		return false;
	}
	if(!img_code_send) {
		return;
	}
	sendData({
		is_api: false,
		url: '/api/mobile/verify_code/get',
		data: {
			'mobile':mobile,
			'captcha':bg_re_imgCode,
			'type':'register'
		},
		method: 'post',
		callback: function(data) {
			if(data.err_code == 0) {
				ver_vode=true;
				start_count_down();
				$('.register_tips').html('验证码已发送，请您注意查收');
				$('.register_tips').show();
				console.log(data)
			}else{
				ver_vode=false;
				$('.register_tips').html(data.err_msg);
				$('.register_tips').show();
				$('.img_code_btn').attr('src','https://api.shiqichuban.com/v1/user/captcha'+'?'+Math.random());

			}
		},
		errorFun: function(data) {
			ver_vode=false;
			$('.register_tips').html(data.err_msg);
			$('.register_tips').show();
			$('.land_register').css('margin-top', '0');
			$('.img_code_btn').attr('src','https://api.shiqichuban.com/v1/user/captcha'+'?'+Math.random());
		},
	})




}

function start_count_down() {
	countdown = 60;
	timer1 = window.setTimeout(each_countdown, 100);

}
var timer1,timer2, countdown;

function each_countdown() {

	clearTimeout(timer1)
	timer2 = window.setInterval(function(){

		countdown--;
		$(".code_btn").html(countdown + '秒后再次获取');

		if(countdown==0){
			clearInterval(timer2)
			$(".code_btn ").html('获取验证码');
			isSend=true;

		}

	}, 1000);

};

//显示验证码
$('#send_yz').click(function() {
	var that = this;
	var timer = 60;
	var url = $(this).attr('data-url') + '?dd=' + Math.random();
	var method = $(this).attr('method');
	$(that).attr('src', url);
});
//动态加载js或者css
function loadfile(fileurl,filetype,fileparent){
	 if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",fileurl);
        if(typeof fileref != "undefined"){
	        fileparent.append(fileref);
	   	 }
    }else if(filetype == "css"){
	 	var fileref = document.createElement('link');
	    fileref.setAttribute("rel","stylesheet");
	    fileref.setAttribute("href",fileurl);
	    fileref.setAttribute("id","land_css");
	    if(typeof fileref != "undefined"){
	        fileparent.prepend(fileref);
	   	 }
    }
}
function isLegit(val){
		var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
		if(!reg.test(val)){
			return false;
		}else{
			return true;
		}
	}
