/**
 * Created by naxiaoguang on 2017/6/1.
 */
function BookImageEditController(book){
    this.book = book ;
    this.height = book && book.page_height || (detectPlatform() === DEVICE_MOBILE ? $(document).height() - 150 : 600 ) ;
    this.scale = book && book.scale || (detectPlatform() === DEVICE_MOBILE ? 0.7 : 0.9 ) ;
    this.images_edit_pan = null ;
    this.images_container = null ;
    this.image_selected_pan = null ;
    this.all_images_container = null ;
    this.imgs = [];
    this.current_content_id = null ;
    this.current_image_group_id = null ;
    this.current_selected_image_id = null ;
    this.isFetchingData = false ;
    this.crop_img_history = [] ;
    this.base64_image = null ;
    this.current_deg = 0 ;
    this.MODE = {
        CROP : "crop",
        ROTATE : "rotate",
    };
    this.current_edit_mode = this.MODE.CROP;
}
BookImageEditController.prototype.reset = function(){
    this.current_selected_image_id = null ;
    this.isFetchingData = false ;
    this.crop_img_history = [] ;
    this.base64_image = null ;
    this.current_deg = 0 ;
    this.current_edit_mode = this.MODE.CROP;
};
BookImageEditController.prototype.destroy = function(){
    this.imgs = [];
    this.current_content_id = null ;
    this.current_image_group_id = null ;
    this.current_selected_image_id = null ;
    this.isFetchingData = false ;
    this.crop_img_history = [] ;
    this.base64_image = null ;
    this.current_deg = 0 ;
    this.current_edit_mode = this.MODE.CROP;
};
BookImageEditController.prototype.hide = function(){
    var self = this ;
    self.images_edit_pan.hide();
};
BookImageEditController.prototype.createImagesSelectedPan = function(){
    var self = this ;
    var pan = '' ;
    var margin_top = '60px' ;
    if(detectPlatform() === DEVICE_MOBILE){
        margin_top = 0 ;
    }
    pan += '<div class="images_selected_pan pan" style="z-index:'+ Z.GUIDE_INDEX + ';position:absolute;top:0;left:0;background-color: rgba(0,0,0,0.5);width:100%;height:' + $(document).height() + 'px ">' ;
    pan += '    <div class="col-xs-12 col-sm-4 col-sm-offset-4" style="position:relative;padding:0;;margin-top:'+ margin_top +';background-color: #f7f7f7;">' ;
    pan += '        <div class="col-xs-12" style="padding:0;margin:0;height:' + (self.height * self.scale * 0.9) + 'px;border-radius: 5px">' ;
    pan += '            <div class="col-xs-12" style="margin: 10px 10px;overflow: auto">选择要编辑的图片</div>' ;
    pan += '            <div class="col-xs-10 col-xs-offset-1 all_images_container" style="height:'+ (self.height * self.scale * 0.9) +'px ;padding-top: 40px;overflow: auto">' ;
    pan += '            </div>' ;
    pan += '        </div>' ;
    pan += '        <div class="col-xs-12 bottom_button_container" style="height:'+ (self.height * self.scale * 0.1) +'px;border-top:1px solid #ccc;line-height:'+ (self.height * self.scale * 0.1) +'px">' ;
    pan += '            <span class="col-xs-12 cancel_select_btn" style="text-align: center;cursor: pointer">取消</span>' ;
    // pan += '            <span class="col-xs-6 ensure_btn" style="text-align: center">确认</span>' ;
    pan += '        </div>' ;
    pan += '    </div>' ;
    pan += '</div>' ;
    return pan ;
};
BookImageEditController.prototype.createImagesEditPan = function(){
    var self = this ;
    var pan = '' ;
    pan += '<div class="images_edit_pan pan" style="z-index:'+ Z.GUIDE_INDEX + ';position:absolute;top:0;left:0;background-color: rgba(0,0,0,0.5);width:100%;height:' + $(document).height() + 'px ">' ;
    pan += '    <div class="col-xs-12 col-sm-4 col-sm-offset-4" style="position:relative;padding:0;;margin-top:60px;background-color: #f7f7f7;">' ;
    pan += '        <div class="col-xs-12 images_action" style="overflow: auto;margin-top: 5px;margin-bottom:5px">' ;
    pan += '            <span class="sq_btn sq_btn_black edit_crop_btn" style="float:left;display: block;border-radius: 5px;cursor: pointer">图片裁切</span>' ;
    pan += '            <span class="sq_btn sq_btn_gray edit_rotate_btn" style="float:left;display: block;margin-left: 5px;border-radius: 5px;cursor: pointer">图片旋转</span>' ;
    pan += "            <span class='sq_btn sq_btn_black choose_image_btn' style='float:right;display: none;cursor: pointer'>选图</span>" ;
    pan += '        </div>' ;
    pan += '        <div class="col-xs-12 images_container" style="padding:10px 10px ;height:'+ (self.height * self.scale * 0.9) +'px ;overflow: hidden;background-color: #ccc;text-align: center">' ;
    pan += '        </div>' ;
    pan += '        <div class="col-xs-12" style="text-align: center;margin: 5px 0px;">' ;
    pan += '          <span class="sq_btn sq_btn_gray reset_crop_btn" style="cursor: pointer">重置</span>' ;
    pan += '          <span class="sq_btn sq_btn_black crop_btn" style="margin-left: 20px;cursor: pointer">裁切</span>' ;
    pan += '          <span class="sq_btn sq_btn_black reset_rotate_btn" style="display:none;cursor: pointer">重置</span>' ;
    pan += '          <img class="rotate-left" style="display:none" src="'+ STATIC_DOMAIN+'/assets/img/book/xuanzhuan_icon_12.png"/>' ;
    pan += '          <img class="rotate-right" style="display:none;margin-left: 20px" src="'+ STATIC_DOMAIN+'/assets/img/book/xuanzhuan_icon_14.png" />' ;
    pan += '        </div>';
    pan += '        <div class="col-xs-12 bottom_button_container" style="height:'+ (self.height * self.scale * 0.1) +'px;border-top:1px solid #ccc;line-height:'+ (self.height * self.scale * 0.1) +'px">' ;
    pan += '            <span class="col-xs-6 cancel_btn" style="text-align: center;border-right: 1px solid #ccc;cursor: pointer">取消</span>' ;
    pan += '            <span class="col-xs-6 ensure_btn" style="text-align: center;cursor: pointer">确认</span>' ;
    pan += '        </div>' ;
    pan += '    </div>' ;
    pan += '</div>' ;
    return pan ;
};
BookImageEditController.prototype.createImagesScalePan = function(){
    var self = this ;
    var pan = '' ;
    pan += '<div class="images_scale_pan pan" style="z-index:'+ Z.GUIDE_INDEX + ';position:absolute;top:0;left:0;background-color: rgba(0,0,0,0.5);width:100%;height:' + $(document).height() + 'px ">' ;
    pan += '    <div class="col-xs-12 col-sm-4 col-sm-offset-4" style="position:relative;padding:0;;margin-top:60px;background-color: #f7f7f7;">' ;
    pan += '        <div class="col-xs-12 images_action" style="overflow: auto;margin-top: 5px;margin-bottom:5px">图片缩放' ;
    pan += '        </div>' ;
    pan += '        <div class="col-xs-12 scale_images_container" style="margin:0;padding:0 ;height:'+ (self.height * self.scale * 0.9) +'px ;line-height:'+ (self.height * self.scale * 0.9) +'px ;overflow: hidden;background-color: #ccc;text-align: center">' ;
    pan += '        </div>' ;
    pan += '        <div class="col-xs-12" style="text-align: center;margin: 5px 0px;line-height: 20px">' ;
    pan += '            <div class="col-xs-2 image_scale_zoomin" style="text-align: center;cursor: pointer"><span style="display:inline-block;border-radius:2px;width: 20px;height:20px;border:1px solid #ccc;line-height: 16px;">-</span></div>' ;
    pan += '            <div class="col-xs-6" style="text-align: center;margin-top: 5px;">' ;
    pan += '                <input class="col-xs-12 single_image_scale_slider" >' ;
    pan += '            </div>' ;
    pan += '            <div class="col-xs-2 image_scale_zoomout" style="text-align: center;cursor: pointer"><span style="display:inline-block;border-radius:2px;width: 20px;height:20px;border:1px solid #ccc;line-height: 16px;">+</span></div>' ;
    pan += '            <div class="col-xs-2 sq_btn sq_btn_gray reset_scale_btn" style="cursor: pointer">重置</div>' ;
    pan += '        </div>';
    pan += '        <div class="col-xs-12 bottom_button_container" style="height:'+ (self.height * self.scale * 0.1) +'px;border-top:1px solid #ccc;line-height:'+ (self.height * self.scale * 0.1) +'px">' ;
    pan += '            <span class="col-xs-6 cancel_scale_btn" style="text-align: center;border-right: 1px solid #ccc;cursor: pointer">取消</span>' ;
    pan += '            <span class="col-xs-6 ensure_scale_btn" style="text-align: center;cursor: pointer">确认</span>' ;
    pan += '        </div>' ;
    pan += '    </div>' ;
    pan += '</div>' ;
    return pan ;
};
BookImageEditController.prototype.setData = function(data,current_content_id,current_image_group_id,type){
    var self = this ;
    self.imgs = [] ;
    self.current_content_id = current_content_id ;
    self.current_image_group_id = current_image_group_id ;
    if(!data)return ;
    if(type === "scale"){
        self.imgs.push({
            image_url:data.image_url,
            image_group_id:data.image_group_id,
            image_width:data.image_width,
            image_height:data.image_height
        });
    }else{
        for (var i in data.images) {
            var image_id = data.images[i].image_id;
            var image_url = data.images[i].url;
            var thumb_url = data.images[i].thumb;
            self.imgs.push({image_url:image_url,image_id:image_id,thumb_url:thumb_url});
        }
    }
};
BookImageEditController.prototype.show = function(callback,type){
    var self = this ;
    var length = self.imgs.length ;
    if(type === "scale"){
        self.current_selected_image_id = self.imgs[0].image_id ;
        self.showScalePan(self.imgs[0].image_url,self.imgs[0].image_width,self.imgs[0].image_height,self.imgs[0].image_group_id,callback);
    }else{
        if(length > 1){
            self.showSelectedPan(callback);
        }else{
            self.current_selected_image_id = self.imgs[0].image_id ;
            self.showEditPan(self.imgs[0].image_url,callback);
        }
    }
};
BookImageEditController.prototype.showSelectedPan = function(callback){
    var self = this ;
    if(!self.image_selected_pan){
        $(document.body).append(self.createImagesSelectedPan());
        self.image_selected_pan = $('.images_selected_pan');
        self.all_images_container = $('.all_images_container');
        $(document).on(config.MOUSE_CLICK,".single_edit_img",function(e){
            e.stopPropagation();
            self.image_selected_pan.hide();
            self.current_selected_image_id = $(this).attr('image_id');
            self.showEditPan($(this).attr('origin_image'),callback);
        }).on(config.MOUSE_CLICK,'.cancel_select_btn',function(e){
            $(this).parents('.pan').hide();
            self.destroy();
        });
    }else{
        self.all_images_container.children().remove();
        self.image_selected_pan.show();
    }
    self.updateImageList();
};
BookImageEditController.prototype.showEditPan = function(origin_image_url,callback){
    var self = this ;
    if(!self.images_edit_pan){
        $(document.body).append(self.createImagesEditPan());
        self.images_edit_pan = $('.images_edit_pan');
        self.images_container = self.images_edit_pan.find('.images_container');
        $(document).on(config.MOUSE_CLICK,'.ensure_btn',function(e){
            e.stopPropagation();
            if(callback)
                callback(self.base64_image);
        }).on(config.MOUSE_CLICK,".cancel_btn",function(e){
            $(this).parents('.pan').hide();
            self.destroy();
        }).on(config.MOUSE_CLICK,".choose_image_btn",function(e){
            self.reset();
            self.images_edit_pan.hide();
            self.image_selected_pan.show();
        }).on(config.MOUSE_CLICK,'.rotate-left',function(e){
            e.stopPropagation();
            self.current_deg -= 90 ;
            self.doRotateAction(self.current_deg);
        }).on(config.MOUSE_CLICK,'.rotate-right',function(e){
            e.stopPropagation();
            self.current_deg += 90 ;
            self.doRotateAction(self.current_deg);
        }).on(config.MOUSE_CLICK,'.edit_crop_btn',function(e){
            e.stopPropagation();
            if(self.current_edit_mode !== self.MODE.CROP) {
                self.current_edit_mode = self.MODE.CROP ;
                self.images_container.children().remove();
                self.images_container.append("<img class='selected_origin_image' src='"+ self.base64_image +"' style='display:none;max-width:100%;'/>");
                self.crop_img_history = [] ;
                self.crop_img_history[0] = self.base64_image ;
                self.cropImage($('.selected_origin_image'));
                self.showCropFun();
            }
        }).on(config.MOUSE_CLICK,'.edit_rotate_btn',function(e){
            e.stopPropagation();
            if(self.current_edit_mode !== self.MODE.ROTATE) {
                self.images_container.children().remove();
                self.current_edit_mode = self.MODE.ROTATE;
                self.current_deg = 0 ;
                self.showRotateFun();
                self.appendImageBySrc(self.base64_image) ;
            }
        }).on(config.MOUSE_CLICK,'.crop_btn',function(e){
            e.stopPropagation();
            self.doCropAction();
        }).on(config.MOUSE_CLICK,'.reset_crop_btn',function(e){
            e.stopPropagation();
            self.doCropRevertAction();
        });
    }else{
        self.images_container.children().remove();
        self.images_edit_pan.show();
        if(self.imgs.length > 1){
            $('.choose_image_btn').show();
        }else
            $('.choose_image_btn').hide();
    }
    showLoading('正在加载原始图片...',true);
    self.loadImage(origin_image_url,function(url){
        self.drawImage(0,url,function(base64_image){
            self.images_container.append("<img class='selected_origin_image' src='"+ base64_image +"' style='display:none;max-width:100%;'/>");
            self.crop_img_history[0] = base64_image ;
            self.base64_image = base64_image ;
            if(self.current_edit_mode === self.MODE.CROP){
                self.cropImage($('.selected_origin_image'));
                self.showCropFun();
            }else{
                self.showRotateFun();
            }
            showLoading('正在加载原始图片...',false);
        });
    },function(error){
        showConfirm('获取图片失败!',null,null,function(){
                    self.images_edit_pan.hide();
            },null,'ok'
        );
    });
    if(self.imgs.length > 1){
        $('.choose_image_btn').show();
    }else{
        $('.choose_image_btn').hide();
    }
};
BookImageEditController.prototype.showScalePan = function(origin_image_url,image_width,image_height,group_id,callback){
    var self = this ;
    var image_width = parseInt(image_width) ;
    var image_height = parseInt(image_height) ;
    var final_width = image_width ;
    var final_height = image_height ;
    var origin_scale = 0 ;
    var scale_value = origin_scale ;
    var origin_image_w = 0 ;
    var origin_image_h = 0 ;
    showLoading("正在加载图片",true);
    var image = new Image();
    image.src = origin_image_url ;
    image.onload = function(e){
        origin_image_w = image.width ;
        origin_image_h = image.height ;
        origin_scale = (image_width / origin_image_w ).toFixed(2);
        scale_value = origin_scale ;
        if(!self.images_scale_pan){
            $(document.body).append(self.createImagesScalePan());
            self.images_scale_pan = $('.images_scale_pan');
            self.images_scale_container = self.images_scale_pan.find('.scale_images_container');
            self.slider = $('.single_image_scale_slider');
            if (!self.slider) return;
            self.slider.slider({
                min: 10,
                max: 100,
                tooltip: 'always',
                value:10,
                formatter: function(value) {
                    return value;
                }
            }).on('slideStart', function(value) {
                self.isSliding = true;
            }).on('slideStop', function(e) {
                scale_value = e.value ;
            }).on('slide', function(e) {
                scale_value = e.value ;
                doScale();
                self.isSliding = true;
            });
            $(document).on(config.MOUSE_CLICK,'.ensure_scale_btn',function(e){
                e.stopPropagation();
                if(callback){
                    callback({
                        width:final_width,
                        height:final_height,
                        group_id:group_id,
                        content_id: self.current_content_id,
                        book_id:self.book.book_id
                    });
                }
            }).on(config.MOUSE_CLICK,".cancel_scale_btn",function(e){
                $(this).parents('.pan').hide();
                self.destroy();
            }).on(config.MOUSE_CLICK,'.reset_scale_btn',function(e){
                e.stopPropagation();
                scale_value = origin_scale * 100 ;
                self.slider.slider('setValue',scale_value);
                doScale();
            }).on(config.MOUSE_CLICK,'.image_scale_zoomin',function(e){
                e.stopPropagation();
                scale_value = self.slider.slider('getValue') - 1 ;
                self.slider.slider('setValue',scale_value);
                doScale();
            }).on(config.MOUSE_CLICK,'.image_scale_zoomout',function(e){
                e.stopPropagation();
                scale_value = self.slider.slider('getValue') + 1 ;
                self.slider.slider('setValue',scale_value);
                doScale();
            });
            showLoading("正在加载图片",false);
        }else{
            self.images_scale_container.children().remove();
            self.images_scale_pan.show();
            showLoading("正在加载图片",false);
        }
        image.onerror = function(){
            showLoading("正在加载图片",false);
            showAlert('图片加载错误');
        };
        if(!self.slider)return ;
        self.slider.slider('setValue',scale_value * 100);
        if(image_width >= image_height){
            var width = $('.scale_images_container').width() * scale_value ;
            $('.scale_images_container').append('<img class="scale_image_target" src="'+ origin_image_url +'" style="width:'+ width +'px"/>');
        }else if(image_width < image_height){
            var height = $('.scale_images_container').height() * scale_value ;
            $('.scale_images_container').append('<img class="scale_image_target" src="'+ origin_image_url +'" style="height:'+ height +'px"/>');
        }
    };
    function doScale(){
        if(image_width >= image_height){
            var width = ($('.scale_images_container').width() * (scale_value / 100)) + "px" ;
            $('.scale_image_target').css('width',width) ;
        }else if(image_width < image_height){
            var height = ($('.scale_images_container').height() * (scale_value / 100)) + "px" ;
            $('.scale_image_target').css('height',height) ;
        }
        final_width = origin_image_w * scale_value / 100 ;
        final_height = origin_image_h * scale_value / 100 ;
    }
};
BookImageEditController.prototype.showCropFun = function(){
    $('.edit_crop_btn').addClass('sq_btn_black');
    $('.edit_crop_btn').removeClass('sq_btn_gray');
    $('.rotate-left').hide();
    $('.rotate-right').hide();
    $('.reset_crop_btn').show();
    $('.edit_rotate_btn').removeClass('sq_btn_black');
    $('.edit_rotate_btn').addClass('sq_btn_gray');
    $('.reset_crop_btn').removeClass('sq_btn_black');
    $('.reset_crop_btn').addClass('sq_btn_gray');
    $('.crop_btn').show();
    $('.cropper-face').show();
    $('.cropper-point').show();
    $('.cropper-line').show();
};
BookImageEditController.prototype.doCropAction = function(){
    var self = this ;
    $('.reset_crop_btn').addClass('sq_btn_black');
    $('.reset_crop_btn').removeClass('sq_btn_gray');
    var result = $('.selected_origin_image').cropper('getCroppedCanvas').toDataURL('image/jpeg',1);
    $('.selected_origin_image').cropper('replace', result);
    self.crop_img_history.push(result);
    if(self.crop_img_history.length > 2){
        self.crop_img_history.shift();
    }
    self.base64_image = self.crop_img_history[self.crop_img_history.length - 1];
};
BookImageEditController.prototype.doCropRevertAction = function(){
    var self = this ;
    if(self.crop_img_history.length <= 1)return ;
    self.crop_img_history.pop();
    self.base64_image = self.crop_img_history[0] ;
    $('.selected_origin_image').cropper('replace',self.base64_image);
    $('.reset_crop_btn').addClass('sq_btn_gray');
    $('.reset_crop_btn').removeClass('sq_btn_black');
};
BookImageEditController.prototype.drawImage = function(deg,src,callback){
    var self = this ;
    var image = new Image();
    image.onload = function(){
        var canvas = document.createElement('canvas');
        var ctx1 = canvas.getContext('2d');
        if((deg/90)%2 === 0){
            canvas.width = image.width ;
            canvas.height = image.height ;
        }else{
            canvas.width = image.height ;
            canvas.height = image.width ;
        }
        var x_pos = canvas.width/2;
        var y_pos = canvas.height/2;
        ctx1.drawImage(image, x_pos - image.width / 2, y_pos - image.height / 2);
        ctx1.save();
        ctx1.translate(x_pos, y_pos);
        ctx1.rotate(deg * Math.PI / 180);
        ctx1.translate(-x_pos, -y_pos);
        ctx1.drawImage(image, x_pos - image.width / 2, y_pos - image.height / 2);
        ctx1.restore();
        callback(canvas.toDataURL(),canvas.width,canvas.height);
    };
    if(src.indexOf('data:image') > -1){
        console.log('base_64');
    }else{
        image.crossOrigin = "*" ;
    }
    image.src = src ;
};
BookImageEditController.prototype.showRotateFun = function(){
    var self = this ;
    $('.selected_origin_image').cropper('destroy');
    $('.edit_rotate_btn').addClass('sq_btn_black');
    $('.edit_rotate_btn').removeClass('sq_btn_gray');
    $('.edit_crop_btn').removeClass('sq_btn_black');
    $('.edit_crop_btn').addClass('sq_btn_gray');
    $('.rotate-left').show();
    $('.rotate-right').show();
    $('.reset_crop_btn').hide();
    $('.crop_btn').hide();
    $('.cropper-face').hide();
    $('.cropper-point').hide();
    $('.cropper-line').hide();
};
BookImageEditController.prototype.doRotateAction = function(deg){
    var self = this ;
    showLoading('正在重新绘图...',true);
    self.drawImage(deg,self.base64_image,function(base64_img){
        self.base64_image = base64_img ;
        self.appendImageBySrc(self.base64_image);
        showLoading('正在重新绘图...',false);
    })
};
BookImageEditController.prototype.appendImageBySrc = function(src){
    var self = this ;
    $('.rotate_wrapper').remove();
    self.current_deg = 0 ;
    var image = new Image();
    image.onload = function(){
        self.images_container.append("<div class='rotate_wrapper' style='width:100%;height:100%;background-color: rgba(0,0,0,0.5);'><img class='selected_origin_image' src='"+ src +"' style='width:100%;'/></div>");
        self.verticalImage(image.width,image.height);
    };
    image.src = src ;
};
BookImageEditController.prototype.verticalImage = function(width,height){
    var top = 0 ;
    var wraper_width = $('.rotate_wrapper').width() ;
    var wraper_height = $('.rotate_wrapper').height() ;
    var image_width = width ;
    var image_height = height ;
    var ratio = wraper_width / image_width ;
    var final_width = image_width * ratio ;
    var final_height = image_height * ratio ;
    if(final_height > wraper_height){
        ratio = wraper_height / final_height ;
        final_height *= ratio ;
        final_width *= ratio
    }
    final_width -= 1 ;
    $('.selected_origin_image').css('width',final_width  + 'px');
    $('.selected_origin_image').css('height',final_height + 'px');
    top = ($('.rotate_wrapper').height() - final_height) * 0.5 ;
    $('.selected_origin_image').css('margin-top',top + 'px') ;
};
BookImageEditController.prototype.updateImageList = function(data){
    var self = this ;
    //添加图片
    for(var i in self.imgs){
        var thumb_url = self.imgs[i].thumb_url ;
        var origin_image =  self.imgs[i].image_url ;
        var image_id =  self.imgs[i].image_id ;
        self.all_images_container.append('<img class="img-responsive col-xs-4 single_edit_img" origin_image="'+ origin_image +'" image_id="'+ image_id +'" src="'+ thumb_url +'" style="margin-bottom: 20px"/>');
    }
    $('.single_edit_img').css('height',$('.single_edit_img').width() + 'px')
};
BookImageEditController.prototype.loadImage = function(url,callback,err_callback){
    var img = new Image;
    img.onload = function(){
        callback(url,img.width,img.height);
    };
    img.onerror = function(e){
        Fetcher.fetchData(
            "/v1/image/batch/get_size",
            getResServerDomain(),
            "post",
            JSON.stringify({
                upload: 1, // int 是否上传图片到res上，默认0为不上传，1为上传
                upload_tmp_dir: 1, // int 是否上传到temp目录下，0为否，1为是，默认为零
                url: [
                    url
                ]
            }),
            function (data) {
                if(data.response[0].status === 200){
                    var url = data.response[0].new_url ;
                    var width = data.response[0].size[0] ;
                    var height = data.response[0].size[1] ;
                    callback(url,width,height);
                }else{
                    err_callback();
                }
            },
            function(error){
                err_callback(error);
            }
        );
    };
    if(url.indexOf('data:image') > -1){
    }else
        img.crossOrigin = "*" ;
    img.src = url ;
};
BookImageEditController.prototype.cropImage = function(origin_img_node){
    origin_img_node.cropper({
        zoomable:false,
        dragCrop:false,//是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
        background:false,
        movable:false,
        autoCropArea:1,
        dragMode:'none',
        viewMode:1,
    });
};