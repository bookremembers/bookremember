/**
 * Created by naxiaoguang on 2017/3/28.
 */
function WechatController(options) {
    this.options = options;
    this.book_type = options.book_attr.type;
    this.wechat_import_pan = null;
    this.close_banner = null;
    this.view_poster=false;
    this.view_poster_show = null ;
}
WechatController.prototype.appendBanner = function (parent,remove_callback,type) {
    var self = this;
    var ua = window.navigator.userAgent.toLowerCase();
    if(self.wechat_import_pan)return ;
	if(ua.indexOf("com.shiqichuban.client") > -1)return;
    var href = "";
    var icon_src = "";
	
    if (window.location.href.indexOf('wechat') > -1)
        type = "one_wechat_import" ;
    if (type === "one_wechat_import"){
        //微信一键导入  PDF下载的图片
        href = "https://www.shiqichuban.com/getApps?source=pdf_free_downloading";
        icon_src = "https://static.shiqichuban.com/assets/img/icon/wechatimport_img_banner.png";
    }else{
        //一键成册的图片
        href = "https://www.shiqichuban.com/getApps?source=ebook_banner_download";
        icon_src = "https://static.shiqichuban.com/assets/img/banner_2017_8_2.png";
    }
    if(parent){
        parent.append(self.createView(icon_src,href));
        
        self.wechat_import_pan = $('.wechat_banner') ;
        
        self.close_banner = $('.close_banner') ;
        
        self.close_banner.on(config.MOUSE_CLICK,function(e){
            e.stopPropagation();
            if(remove_callback)
                remove_callback();
            self.removeBanner();
        });
    }
    return true;
};
WechatController.prototype.createView = function(icon_src,href){
	
	 var self = this;
    var banner = '';
    banner += '<div class="wechat_banner" style="position:absolute;top:0;left:0;width:100%">';
    if(self.view_poster==true){
    	banner += ' <a style="display:block"  class="view_poster_img">';
    }else{
    	banner += ' <a style="display:block"  href="' + href + '">';
    }
    
    banner += '     <img style="width:100%" ismap="ismap" src="' + icon_src + '">';
    banner += ' </a>';
    banner += ' <span class="close_banner" style="position:absolute;width:10%;height:100%;right:0;top:0;zoom:9"></span>';
    banner += '</div>';
    
	
	
	
    return banner ;
};
WechatController.prototype.removeBanner = function(){
    var self = this ;
    if (!self.wechat_import_pan) return;
    self.wechat_import_pan.remove();
    self.close_banner.off(config.MOUSE_CLICK);
    self.close_banner = null ;
};
WechatController.prototype.hideBanner = function () {
    if (!this.wechat_import_pan) return;
    this.wechat_import_pan.hide();
};
WechatController.prototype.toggleBanner = function () {
    if (!this.wechat_import_pan) return;
    if (this.wechat_import_pan.is(':hidden')) {
        this.wechat_import_pan.show();
    } else
        this.wechat_import_pan.hide();
};
WechatController.prototype.viewPosterImg = function () {
	var str='';
    	str+='<div class="show_img" style="position: absolute;left: 0;top: 0;right: 0;bottom: 0; z-index:99999;width: 100%;">';
		str+='<span class="close_img" style="position: fixed;right: 0;"><img src="https://static.shiqichuban.com/assets/img/icon/close_land.png"></span>';
		str+='<img class=""  style="width: 100%;" src="https://res.shiqichuban.com/v1/image/get/1CO3189YY0rpLr81GgweSV4yRdkHZvkUC09mPL2FRU1YhHjWxlOeir2OuQcJtziaFQrliEN-iAOBEwyAMaVuQQ/w">';
		str+='</div>';
		if($('.show_img').length==0){
			$(document.body).append(str);
			$('.close_img').on(config.MOUSE_CLICK,function(){
				$('.show_img').remove();
			})
		}
};
