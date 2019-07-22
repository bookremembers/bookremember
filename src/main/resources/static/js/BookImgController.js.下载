/**
 * Created by shiqi on 2016/11/2.
 */
function ImageController(options,commandChannel) {
    this.device = options.device;
    this.status = options.status;
    this.action = options.action;
    this.view_type = options.view_type;
    this.token = options.token;
    this.app_version = options.app_version;
    this.user_id = options.user_id;
    this.book = options.book;
    this.dataFetcher = new EditDataFetcher();
    this.startLongTouchTime = 0;
    this.commandChannel = commandChannel ;
    this.image_ctrl_mask =
        '<div class="image_ctrl_mask" status="auto" style="position:absolute;width:100%;height:100%;top:0;left: 0;text-align:center;background-color:rgba(0,0,0,0.5);" >' +
        '<img class="image_ctrl_icon" status="do_delete" src="https://static.shiqichuban.com/assets/img/icon/icon_image_delete.png" style="cursor:pointer;width:54px;height:54px;">' +
        '</div>';
    this.image_layout_container =
        '<div class="image_layout_container" style="z-index:1000;position:absolute;top:0;left:0;background-color: rgba(0,0,0,0.5);width:100%;height:' + $(document).height() + 'px ">' +
        '<div class="col-xs-12 col-sm-4 col-sm-offset-4" style="padding:0;;margin-top:60px">' +
        '<div class="col-xs-12" style="padding:0;margin:0;height:' + this.book.page_height * this.book.scale * 0.7 + 'px;background-color: #f7f7f7;border-top-left-radius: 5px;border-top-right-radius: 5px">' +
        '<div class="col-xs-3 col-sm-3" style="position:absolute;padding:0;height:100%;">' +
        '<div style="text-align: center;width:100%;line-height: 30px;color:#2c2c2c;background-color: #fff;border-top-left-radius: 5px">图片组合</div>' +
        '<div class="group_btn_container" style="padding-top:5px;padding-left:10px;padding-right:10px;width:100%;height:' + (this.book.page_height * this.book.scale * 0.7 - 60) + 'px;background-color: #f7f7f7"></div>' +
        '<div style="position:absolute;bottom:0;width:100%;height:30px;cursor: pointer;color:#666666"><div class="to_custom_group_btn" style="line-height: 26px;margin:0 15px;border-radius:5px ;text-align: center;border:1px solid #e5e5e5">自定义组合</div></div>' +
        '</div>' +
        '<div id="image_group_cc" class="col-xs-9 col-xs-offset-3" style="height:100%;padding:10px;overflow: hidden;position:relative;background-color: #f2f2f2;border-top-right-radius: 5px">' +
        '<div class="notice"  style="position:absolute;width:100%;height:100%;line-height:100%;top:0;left:0;text-align: center">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12" style="padding:5px;background-color: #ffffff;border-top:1px solid #e5e5e5">' +
        '<div style="width:100%" id="tip_container">' +
        '<div id="tip" style="color:#2c2c2c;margin-left: 13px;float:left">选择模版</div>' +
        '</div>' +
        '<div class="image_style_container col-xs-12" style="overflow-x: auto;margin-bottom: 10px;padding:15px;white-space: nowrap;min-height:90px">' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12" style="border-top:1px solid #e5e5e5 ;background-color: #ffffff;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;">' +
        '<div class="cancel_image_style col-xs-6" style="cursor:pointer;text-align: center;height:35px;line-height: 35px;color:#2c2c2c;border-right: 1px solid #ccc">取消</div>' +
        '<div class="submit_image_style col-xs-6" style="cursor:pointer;text-align: center;height:35px;line-height: 35px;color:#2c2c2c">确定</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    this.default_image_group_doc =
        '<div class="default_image_group_container col-xs-12" style="position:absolute;height:96%;width:96%;padding:0;top:2%;left:2%">' +
        '</div>';
    //图片删除操作============================
    this.data_delete_images_id;
    this.data_delete_images_src = {};
}
/**
 * 添加删除图片的数据
 * @param content_id
 * @param img_src
 * @param image_index
 * @param image_id
 */
ImageController.prototype.addImageData = function (content_id, img_src, image_index, image_id) {
    var self = this;
    if (image_id != null) {
        //通过image_id删除图片
        if (self.data_delete_images_id == null)
            self.data_delete_images_id = {};
        if (self.data_delete_images_id[content_id] == null)
            self.data_delete_images_id[content_id] = {};
        self.data_delete_images_id[content_id]['content_id'] = content_id;
        if (self.data_delete_images_id[content_id]['image_ids'] == null)
            self.data_delete_images_id[content_id]['image_ids'] = {};
        self.data_delete_images_id[content_id]['image_ids'][image_id] = image_id;
    } else {
        if (!self.data_delete_images_src[content_id])
            self.data_delete_images_src[content_id] = {};
        if (!self.data_delete_images_src[content_id][img_src])
            self.data_delete_images_src[content_id][img_src] = [];
        self.data_delete_images_src[content_id][img_src].push(image_index);
    }
};
/**
 * 移除删除图片的数据
 * @param content_id
 * @param img_src
 * @param image_index
 * @param image_id
 */
ImageController.prototype.removeImageData = function (content_id, img_src, image_index, image_id) {
    var self = this;
    if (image_id != null) {
        //通过image_id删除图片
        if (self.data_delete_images_id[content_id]['image_ids'][image_id] != null)
            delete self.data_delete_images_id[content_id]['image_ids'][image_id];
        if (jQuery.isEmptyObject(self.data_delete_images_id[content_id]['image_ids']))
            delete self.data_delete_images_id[content_id];
    } else {
        var index_arr = self.data_delete_images_src[content_id][img_src].join('').replace(image_index, '').split('');
        self.data_delete_images_src[content_id][img_src] = index_arr;
        if (self.data_delete_images_src[content_id][img_src].length == 0) {
            delete self.data_delete_images_src[content_id][img_src];
        }
        if (jQuery.isEmptyObject(self.data_delete_images_src[content_id]))
            delete self.data_delete_images_src[content_id];
    }
};
/**
 * 添加图片删除功能
 */
ImageController.prototype.addImageDeleteFunction = function (callback) {
    var self = this;
    //鼠标经过图片组合时显示响应的按钮
    $(document).on('mouseenter', '.ubook_content_image', function (e) {
        e.preventDefault();
        var owner_id = $(this).parents('.ubook_content').attr('owner_id');
        var canEdit = self.book.userCanEditContent(self.user_id, owner_id);
        if (canEdit == false)return;
        if ($(this).parent().find('.image_ctrl_mask').length == 0) {
            $(this).parent().append(self.image_ctrl_mask);
            $(this).parent().find('.image_ctrl_icon').css('margin-top', $(this).height() / 2 - 27 + 'px');
            $(this).parent().find('.image_ctrl_icon').attr('content_id', $(this).attr('content_id'));
            $(this).parent().find('.image_ctrl_icon').attr('image_index', $(this).attr('image_index'));
            if ($(this).attr('image_id') != null)
                $(this).parent().find('.image_ctrl_icon').attr('image_id', $(this).attr('image_id'));
            $(this).parent().find('.image_ctrl_icon').attr('image_data', $(this).attr('src'));
        }
    }).on('mouseleave', '.image_ctrl_mask', function () {
        $('.image_ctrl_mask[status=auto]').remove();
    }).on(config.MOUSE_CLICK, '.image_ctrl_icon', function () {
        if ($(this).attr('status') == "do_delete") {
            $(this).parent('.image_ctrl_mask').attr('status', "no_auto");
            //点击删除,同时按钮图片变成恢复的样子
            $(this).attr('src', 'https://static.shiqichuban.com/assets/img/icon/icon_image_recover.png');
            $(this).attr('status', "do_recover");
            self.addImageData($(this).attr('content_id'), $(this).attr('image_data'), $(this).attr('image_index'), $(this).attr('image_id'));
        } else if ($(this).attr('status') == "do_recover") {
            $(this).parent('.image_ctrl_mask').attr('status', "auto");
            $(this).attr('src', 'https://static.shiqichuban.com/assets/img/icon/icon_image_delete.png');
            $(this).attr('status', "do_delete");
            self.removeImageData($(this).attr('content_id'), $(this).attr('image_data'), $(this).attr('image_index'), $(this).attr('image_id'));
        }
        callback();
    });
};
/**
 * 图片组合拆分功能========================================================================
 * @param content_id
 * @param data
 * @param list_data
 */
ImageController.prototype.addImageGroupFunction = function (changeGroupCallback) {
    var self = this;
    // 添加图片操作布局==========================
    var imageGroup_data;
    var sibling_group_id_list;
    var sibling_group_id_array;
    var currentSelectStyle;
    var currentImageContent_id;
    var currentImageGroup_id;
    var current_content_id;
    var current_image_group_id;
    var current_layout_style_data;
    var custom_layout_data = [];//用户已经完成的自定义布局
    var image_layout_style_data;//自定义板式的数据
    var current_image_layout_style_data;//用户当前选择的布局样式数据
    var current_choice_img_html;
    var current_choice_img_arr;
    var current_custom_layout_data_index;
    var current_custom_positions;
    var total_img_len = 0;
    var current_custom_selected_img_ids = [];//选择的图片字典
    var current_custom_select_img_length = 0;//当前选择的图片的数量
    var current_selected_group_container;
    var CustomImageLayoutContainerID = 0;
    var max_width = 428;
    var max_height = 510;
    var min_height = 100;
    var dataFetching = false;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    /**
     * 重置数据
     */
    function reset() {
        imageGroup_data = null;
        sibling_group_id_list = null;
        sibling_group_id_array = null;
        currentSelectStyle = null;
        currentImageContent_id = null;
        currentImageGroup_id = null;
        current_content_id = null;
        current_image_group_id = null;
        current_layout_style_data = null;
        custom_layout_data = [];//用户已经完成的自定义布局
        image_layout_style_data = null;//自定义板式的数据
        current_image_layout_style_data = null;//用户当前选择的布局样式数据
        current_choice_img_html = null;
        current_choice_img_arr = null;
        current_custom_layout_data_index = null;
        current_custom_positions = null;
        total_img_len = 0;
        current_custom_selected_img_ids = [];//选择的图片字典
        current_custom_select_img_length = 0;//当前选择的图片的数量
        current_selected_group_container = null;
        CustomImageLayoutContainerID = 0;
    }
    /**
     * 默认图片布局=======================================================================
     * @param content_id
     * @param data
     * @param list_data
     */
    var image_group_type;
    $(document).on('mouseenter', '.ubook_img', function (e) {
        e.stopPropagation();
      if( self.book.content_theme_type !== 3 && self.book.content_theme_type !== 4 && self.book.content_theme_type !== 5){
            if ($(this).attr('image_group_id') === null)return;
            if($(this).find('.re_layout_btn').length === 0 && $(this).find('.re_edit_btn').length === 0){
                var owner_id = $(this).parents('.ubook_content').attr('owner_id');
                var canEdit = self.book.userCanEditContent(self.user_id, owner_id);
                if (canEdit === false)return;
                var image_group_id = $(this).attr('image_group_id');
                var sibling_group_id_list = $(this).attr('sibling_group_id_list');
                image_group_type = $(this).attr('image_group_type');
                var btns = "" ;
                var top = 10 ;
                if ($(this).find('.ubook_content_image').length > 1 || $(this).attr('image_group_type') === "combine"){
                    //1张图片禁止做布局操作
                    btns += '<div class="re_layout_btn" image_group_type="' + image_group_type + '" sibling_group_id_list="' + sibling_group_id_list + '" content_id="' + $(this).attr('content_id') + '" image_group_id="' + image_group_id + '" style="cursor:pointer;position:absolute;top:'+ top +'px;left:-35px">' ;
                    btns += '   <img src="https://static.shiqichuban.com/assets/img/book/icon_03.png" title="布局"/>' ;
                    btns += '</div>' ;
                    top += 60 ;
                }
                if($(this).attr('image_group_type') !== "combine"){
                    btns += '<div class="re_edit_btn" image_group_type="' + image_group_type + '" sibling_group_id_list="' + sibling_group_id_list + '" content_id="' + $(this).attr('content_id') + '" image_group_id="' + image_group_id + '" style="cursor:pointer;position:absolute;top:'+ top +'px;left:-30px">' ;
                    btns += '   <img src="https://static.shiqichuban.com/assets/img/book/image_edit_btn.png" title="编辑"/>' ;
                    btns += '</div>' ;
                }
                if($(this).find('.ubook_content_image').length === 1 && $(this).attr('image_group_type') !== "combine"){
                    top += 60 ;
                    var image_w = $($(this).find('.ubook_content_image').get(0)).width() ;
                    var image_h = $($(this).find('.ubook_content_image').get(0)).height() ;
                    var image_url = $($(this).find('.ubook_content_image').get(0)).attr('src') ;
                    btns += '<div class="re_scale_btn" image_width="'+ image_w +'" image_height="'+ image_h +'" image_url="'+ image_url +'" image_group_id="' + image_group_id + '"  content_id="' + $(this).attr('content_id') + '" style="cursor:pointer;position:absolute;top:'+ top +'px;left:-30px">' ;
                    btns += '   <img src="https://static.shiqichuban.com/assets/img/book/image_scale_btn.png" title="编辑"/>' ;
                    btns += '</div>' ;
                }
                $(this).append(btns);
            }
       }
    }).on('mouseleave', '.ubook_img', function (e) {
        e.stopPropagation();
        if( self.book.content_theme_type!==3) {
            $(this).find('.re_layout_btn').remove();
            $(this).find('.re_edit_btn').remove();
            $(this).find('.re_scale_btn').remove();
        }
    }).on(config.MOUSE_CLICK, '.re_layout_btn', function (e) {
        e.stopPropagation();
        $(document.body).append(self.image_layout_container);
        $('#image_group_cc').append(self.default_image_group_doc);
        current_content_id = $(this).attr('content_id');
        current_image_group_id = $(this).attr('image_group_id');
        sibling_group_id_list = $(this).attr('sibling_group_id_list') == 'undefined' ? null : $(this).attr('sibling_group_id_list');
        if ($(this).attr('image_group_type') === "combine") {
            sibling_group_id_array = sibling_group_id_list.split(':');
            //获取所有的自定义布局图片的样式数据
            getCustomImageLayoutStyle();
            $('.to_custom_group_btn').trigger('click');
        } else {
            //根据content_id image_group_id 获取默认的图片的组合样式布局图片
            getDefaultImageStyleData(current_content_id, current_image_group_id, function (data) {
                //创建默认图片组合布局
                createDefaultImageLayout(data);
                addDefaultImageStyleImg(data);
                //添加组合样式按钮
                addDefaultStyleBtn(current_content_id, current_image_group_id);
                //点红第一个样式图片
                setStyleImgRedBorder();
            });
            if (sibling_group_id_list == null) {
                $('.to_custom_group_btn').hide();
            } else {
                $('.to_custom_group_btn').show();
                sibling_group_id_array = sibling_group_id_list.split(':');
                //获取所有的自定义布局图片的样式数据
                getCustomImageLayoutStyle();
            }
        }
    }).on(config.MOUSE_CLICK, '.to_custom_group_btn', function (e) {
        e.stopPropagation();
        if (dataFetching == true)return;
        dataFetching = true;
        current_custom_selected_img_ids = [];
        current_custom_select_img_length = 0;
        $('.notice').html('任意选择以下图片进行布局~');
        //清除默认组合样式里的素材=============================================
        $('#image_group_cc').children('.custom_image_group_container').remove();
        $('#image_group_cc').children('.default_image_group_container').remove();
        //清除样式图片
        $('.image_style_container').children().remove();
        //清除组合按钮
        $('.group_btn_container').children().remove();
        //变幻按钮的属性
        if (image_group_type == 'combine') {
            $('.to_custom_group_btn').hide();
        } else {
            $('.to_custom_group_btn').removeClass('to_custom_group_btn').addClass('to_default_group_btn').html('默认');
        }
        $('.submit_image_style').removeClass('submit_image_style').addClass('custom_submit_image_style');
        $('#tip').html('选择图片');
        //添加一个自定义的布局容器===========================================================
        addCustomImageLayoutContainer();
        //添加自定义图片相关按钮
        addCustomGroupOtherBtn();
        //获取所有的图片======
        var group_ids = sibling_group_id_list.split(':');
        //获取所有组合所需要的图片
        self.dataFetcher.getImageGroupStyleByGroupIDs({
                group_ids: group_ids,
                content_id: current_content_id,
                book_id: self.book.book_id
            }, function (data) {
                //添加图片
                var key = 0;
                for (var i in data.group_styles_list) {
                    var image_pos = data.group_styles_list[i].group_styles[0].image_pos;
                    for (var j in image_pos) {
                        var layout = '<img class="batch_img" id="' + key + '" src="' + image_pos[j].url + '" image_id="' + image_pos[j].image_id + '" style="cursor:pointer;margin:5px 5px 5px 0;height:80px;width:80px;border-radius: 2px"/>';
                        $('.image_style_container').append(layout);
                        key++;
                        total_img_len = key;
                    }
                }
                dataFetching = false;
            }
        )
    }).on(config.MOUSE_CLICK, '.default_group_btn', function (e) {
        e.stopPropagation();
        //清除样式图片
        //获取图片的相关布局样式等数据
        if (current_image_group_id == $(this).attr('image_group_id'))return;
        current_image_group_id = $(this).attr('image_group_id');
        $('.image_style_container').children().remove();
        $('.default_group_btn[class *="choice"]').css({
            'background-color': '#f7f7f7',
            'color': '#666666'
        }).removeClass('choice');
        $(this).css({'background-color': '#eeeeee', 'color': '#2c2c2c'}).addClass('choice');
        getDefaultImageStyleData($(this).attr('content_id'), $(this).attr('image_group_id'), function (data) {
            //创建默认图片组合布局
            createDefaultImageLayout(data);
            addDefaultImageStyleImg(data);
            setStyleImgRedBorder(data.group_styles[0].style_id);
        });
    }).on(config.MOUSE_CLICK, '.image_layout_style_img', function (e) {
        e.stopPropagation();
        $('.borderRed').css('border', 'none');
        $('.borderRed').removeClass('borderRed');
        $(this).css('border', '2px solid red');
        $(this).addClass('borderRed');
        //为默认组合的按钮设置选中的样式ID
        if ($(this).attr('default') == 'default') {
            $('.default_group_btn[image_group_id=' + $(this).attr('image_group_id') + ']').removeAttr('style_id');
        } else {
            $('.default_group_btn[image_group_id=' + $(this).attr('image_group_id') + ']').attr('style_id', $(this).attr('style_id'));
        }
        var index = parseInt($(this).attr('style_num'));
        currentSelectStyle = imageGroup_data.group_styles[index]['style_id'];
        createGroupLayout(imageGroup_data.group_styles[index]);
    }).on(config.MOUSE_CLICK, '.re_edit_btn', function (e) {
        self.commandChannel.postCommand(
            ModuleCommand.SHOW_SINGLE_ING_EDIT_PAN
            ,{image_group_id:$(this).attr('image_group_id')
                ,content_id:$(this).attr('content_id')
            });
    }).on(config.MOUSE_CLICK, '.re_scale_btn', function (e) {
        self.commandChannel.postCommand(
            ModuleCommand.SHOW_SINGLE_ING_SCALE_PAN
            ,{image_group_id:$(this).attr('image_group_id')
                ,content_id:$(this).attr('content_id'),
                image_url:$(this).attr('image_url'),
                image_width:$(this).attr('image_width'),
                image_height:$(this).attr('image_height'),
            });
    });
    //根据group_id获取图片样式数据
    function getDefaultImageStyleData(content_id, image_group_id, callback) {
        self.dataFetcher.getImageGroupStyleByGroupID({
            book_id: self.book.book_id,
            content_id: content_id,
            group_id: image_group_id,
        }, function (data) {
            imageGroup_data = data;
            callback(data);
        });
    }
    function createDefaultImageLayout(data) {
        // $('.image_layout_container').remove();
        if (data.group_styles && data.group_styles.length > 0) {
            current_layout_style_data = data.group_styles;
            //初始显示第一条数据=================================================
            currentSelectStyle = data.group_styles[0]['style_id'];
            createGroupLayout(data.group_styles[0]);
        }
    }
    //添加默认图片组合的样式图片
    function addDefaultImageStyleImg(data) {
        //添加组合样式缩略图
        for (var i in data.group_styles) {
            var celldata = data.group_styles[i];
            var layout;
            if (i == 0)
                layout = '<img class="image_layout_style_img" default="default" image_group_id=' + current_image_group_id + ' style_num="' + i + '" src="' + celldata.thumb_url + '" style_id="' + celldata.style_id + '" style="cursor:pointer;margin:5px 5px 5px ' + (i == 0 ? '0' : '5') + 'px;height:80px"/>';
            else
                layout = '<img class="image_layout_style_img" image_group_id=' + current_image_group_id + ' style_num="' + i + '" src="' + celldata.thumb_url + '" style_id="' + celldata.style_id + '" style="cursor:pointer;margin:5px 5px 5px ' + (i == 0 ? '0' : '5') + 'px;height:80px"/>';
            $('.image_style_container').append(layout);
        }
    }
    //创建图片组合的样式按钮
    function addDefaultStyleBtn(content_id, current_image_group_id) {
        var background_color;
        var default_group_btn;
        if (sibling_group_id_array == null) {
            if (current_image_group_id != null) {
                background_color = "#eeeeee";
                default_group_btn = '<div class="default_group_btn choice" content_id="' + content_id + '" image_group_id="' + current_image_group_id + '" style="cursor:pointer;border:1px solid #e5e5e5;border-radius:5px;margin:5px;padding:5px 0;text-align: center;color: #2c2c2c;cursor: pointer;background-color:' + background_color + '">组合' + 1 + '</div>';
                $('.group_btn_container').append(default_group_btn);
            }
            return;
        }
        //添加默认的组合按钮，根据组合长度
        for (var i in sibling_group_id_array) {
            if (current_image_group_id == sibling_group_id_array[i]) {
                background_color = "#eeeeee";
                default_group_btn = '<div class="default_group_btn choice" content_id="' + content_id + '" image_group_id="' + sibling_group_id_array[i] + '" style="cursor:pointer;border:1px solid #e5e5e5;border-radius:5px;margin:5px;padding:5px 0;text-align: center;color: #2c2c2c;cursor: pointer;background-color:' + background_color + '">组合' + (parseInt(i) + 1) + '</div>';
            } else {
                background_color = "#f7f7f7";
                default_group_btn = '<div class="default_group_btn" content_id="' + content_id + '" image_group_id="' + sibling_group_id_array[i] + '" style="cursor:pointer;border:1px solid #e5e5e5;border-radius:5px;margin:5px;padding:5px 0;text-align: center;color: #666666;cursor: pointer;background-color:' + background_color + '">组合' + (parseInt(i) + 1) + '</div>';
            }
            $('.group_btn_container').append(default_group_btn);
        }
    }
    $(document).on(config.MOUSE_CLICK, '.batch_img', function (e) {
        e.stopPropagation();
        if ($(this).hasClass('freeze')) return;
        var id = $(this).attr('id');
        if (current_selected_group_container) {
            var image_src = {};
            var len = current_selected_group_container.find('.crop_image').length;
            current_selected_group_container.find('.crop_image').each(function (index, value) {
                image_src[$(value).attr('id')] = {src: $(value).attr('src'), image_id: $(value).attr('image_id')};
            });
            if (image_src[id]) {
                //删除已经选择过的图片
                $(this).css('border', 'none');
                $(this).css('opacity', '1');
                $(this).removeClass('choice');
                delete image_src[id];
                len--;
            } else {
                if (len == 5)return;
                //添加新图片
                image_src[id] = {src: $(this).attr('src'), image_id: $(this).attr('image_id')};
                $(this).css('border', '2px solid red');
                $(this).css('opacity', '0.3');
                $(this).addClass('choice');
                len++;
            }
            if (len <= 0) {
                $('.notice').html('任意选择以下图片进行布局～');
                current_selected_group_container.children().remove();
            } else {
                $('.notice').html('');
            }
            if (len <= 0 || len > 5) {
                $('.com_image_choice_btn').hide();
            } else {
                current_selected_group_container.children().remove();
                $('.com_image_choice_btn').show();
                addCropImage(image_src);
                createImageCrop(current_selected_group_container.width(), current_selected_group_container.height(), len, 0);
            }
        } else {
            if (current_custom_selected_img_ids[id]) {
                //如果此图片已经选择过了
                $('.new_image_container').find('.crop_image[id=' + id + ']').remove();
                delete current_custom_selected_img_ids[id];
                current_custom_select_img_length--;
                $(this).css('opacity', '1');
                $(this).removeClass('choice');
                $(this).css('border', 'none');
            } else {
                if (current_custom_select_img_length == 5)return;
                //没有被选择的图片将添加到布局里面
                $(this).addClass('choice');
                $(this).css('opacity', '0.3');
                $(this).css('border', '2px solid red');
                //点击选择新的图片
                current_custom_selected_img_ids[id] = {src: $(this).attr('src'), image_id: $(this).attr('image_id')};
                current_custom_select_img_length++;
            }
            if (current_custom_select_img_length <= 0) {
                $('.notice').html('任意选择以下图片进行布局～');
            } else {
                $('.notice').html('');
            }
            if (
                current_custom_select_img_length <= 0 ||
                current_custom_select_img_length > 5) {
                $('.com_image_choice_btn').hide();
                return;
            } else {
                $('.com_image_choice_btn').show();
                $('.new_image_container').children().remove();
                addCropImage(current_custom_selected_img_ids);
                createImageCrop($('.new_image_container').width(), $('.new_image_container').height(), current_custom_select_img_length, 0);
            }
        }
        setContainerResizeable();
    }).on(config.MOUSE_CLICK, '.com_image_choice_btn', function (e) {
        e.stopPropagation();
        //完成选图
        $('.com_image_choice_btn').hide();
        $('.com_choose_layout_btn').show();
        $('.re_choose_image_btn').show();
        current_choice_img_html = $('.image_style_container').html();
        if (current_selected_group_container) {
            var style_num = current_selected_group_container.attr('style_num');
            addCustomLayoutStyleBtn(current_selected_group_container.find('.cropFrame').length, parseInt(style_num));
        } else {
            addCustomLayoutStyleBtn($('.new_image_container').find('.cropFrame').length);
            var default_style_id = $('.custom_layout_style_img').first().attr('style_id');
            var default_style_num = $('.custom_layout_style_img').first().attr('style_num');
            $('.new_image_container').attr('style_id', default_style_id);
            $('.new_image_container').attr('style_num', default_style_num);
        }
    }).on(config.MOUSE_CLICK, '.custom_layout_style_img', function (e) {
        e.stopPropagation();
        //选择布局样式
        $('.custom_layout_style_img[class *= "choice"]').css('border', 'none');
        $('.custom_layout_style_img[class *= "choice"]').removeClass('choice');
        $(this).addClass('choice');
        $(this).css('border', '2px solid red');
        //设置custom_image_group_container的style_id
        var style_id = $(this).attr('style_id');
        var style_num = $(this).attr('style_num');
        if (current_selected_group_container) {
            current_selected_group_container.attr('style_id', style_id);
            current_selected_group_container.attr('style_num', style_num);
            var image_length = current_selected_group_container.find('.cropFrame').length;
            createImageCrop(current_selected_group_container.width(), current_selected_group_container.height(), image_length, parseInt(style_num));
        } else {
            $('.new_image_container').attr('style_id', style_id);
            $('.new_image_container').attr('style_num', style_num);
            createImageCrop($('.new_image_container').width(), $('.new_image_container').height(), current_custom_select_img_length, parseInt(style_num));
        }
    }).on(config.MOUSE_CLICK, '.com_choose_layout_btn', function (e) {
        e.stopPropagation();
        $('.com_choose_layout_btn').hide();
        $('.re_choose_image_btn').hide();
        $('.com_image_choice_btn').hide();
        $('.image_style_container').html(current_choice_img_html);
        var choice_img_len = $('.image_style_container')
            .find('img[class *= choice]')
            .css('border', 'none')
            .addClass('freeze')
            .length;
        $('.image_style_container').append($('.image_style_container')
            .find('img[class *= choice]'));
        if (current_selected_group_container) {
            current_selected_group_container.hide();
            current_selected_group_container = null;
            $('.new_image_container').show();
            if (choice_img_len < total_img_len) {
                addCustomImageLayoutContainer();
            }
            $('.custom_image_layout_btn').parent().css('background-color', '#f7f7f7');
        } else {
            $('.new_image_container').hide();
            $('.new_image_container').removeClass('new_image_container');
            if (choice_img_len < total_img_len)
                $('.new_image_container').show();
            current_custom_selected_img_ids = [];//选择的图片字典
            current_custom_select_img_length = 0;//当前选择的图片的数量
            //生成新的布局按钮
            addCustomLayoutBtn(CustomImageLayoutContainerID);
            if (choice_img_len < total_img_len) {
                //添加新的布局容器
                addCustomImageLayoutContainer();
            }
        }
        current_choice_img_html = $('.image_style_container').html();
        updateNotice();
    }).on(config.MOUSE_CLICK, '.re_choose_image_btn', function (e) {
        e.stopPropagation();
        $('.image_style_container').html(current_choice_img_html);
        $('.com_choose_layout_btn').hide();
        $('.re_choose_image_btn').hide();
        $('.com_image_choice_btn').show();
        $('.batch_img').css('border', 'none');
        $('.batch_img[class *= choice]').addClass('freeze');
        if (current_selected_group_container) {
            current_selected_group_container.find('.crop_image').each(function (index, value) {
                var id = $(value).attr('id');
                $('.batch_img[id=' + id + ']').css('border', '2px solid red').removeClass('freeze');
                $('.image_style_container').append($('.batch_img[id=' + id + ']'));
            })
        } else {
            $('.new_image_container').find('.crop_image').each(function (index, value) {
                var id = $(value).attr('id');
                $('.batch_img[id=' + id + ']').css('border', '2px solid red').removeClass('freeze');
                $('.image_style_container').append($('.batch_img[id=' + id + ']'));
            })
        }
    }).on(config.MOUSE_CLICK, '.custom_image_layout_btn', function (e) {
        e.stopPropagation();
        if ($('.com_image_choice_btn').is(':hidden') == false || $('.com_choose_layout_btn').is(':hidden') == false) {
            showAlert('请先完成当前图片布局');
            return;
        }
        $('.notice').html('');
        $('.com_choose_layout_btn').show();
        $('.re_choose_image_btn').show();
        $('.com_image_choice_btn').hide();
        $('.custom_image_layout_btn').parent().css({'background-color': '#f7f7f7', 'color': '#666666'});
        $(this).parent().css({'background-color': '#eeeeee', 'color': '#2c2c2c'});
        //点击自定义布局按钮，已经完成样式选择
        $('.custom_image_group_container').hide();
        var id = parseInt($(this).attr('id'));
        current_selected_group_container = $('.custom_image_group_container[id=' + id + ']').show();
        //添加布局样式选择列表,并点亮选择的样式图片
        var img_len = current_selected_group_container.children('.cropFrame').length;
        var style_id = current_selected_group_container.attr('style_id');
        var style_num = current_selected_group_container.attr('style_num');
        var num = parseInt(style_num);
        var style_data = image_layout_style_data[img_len][num];
        current_custom_positions = style_data.positions;
        addCustomLayoutStyleBtn(img_len, parseInt(style_num));
    }).on(config.MOUSE_CLICK, '.custom_image_layout_close_btn', function (e) {
        e.stopPropagation();
        if ($('.com_image_choice_btn').is(':hidden') == false || $('.com_choose_layout_btn').is(':hidden') == false) {
            showAlert('请先完成当前图片布局');
            return;
        }
        $(this).parent().remove();
        $('.com_image_choice_btn').hide();
        $('.re_choose_image_btn').hide();
        $('.com_choose_layout_btn').hide();
        $('.image_style_container').html(current_choice_img_html);
        $('.batch_img[class *= choice]').addClass('freeze').css('border', 'none');
        //点击布局按钮后面的删除按钮
        $('.custom_image_group_container[id=' + $(this).attr('id') + ']').find('.crop_image').each(function (index, value) {
            var id = $(this).attr('id');
            $('.image_style_container')
                .find('.batch_img[id=' + id + ']')
                .removeClass('freeze')
                .removeClass('choice')
                .css('opacity', 1)
                .css('border', 'none');
            $('.image_style_container').prepend($('.image_style_container')
                .find('.batch_img[id=' + id + ']'));
        });
        $('.custom_image_group_container[id=' + $(this).attr('id') + ']').remove();
        if (current_selected_group_container && current_selected_group_container.attr('id') == $(this).attr('id')) {
            current_selected_group_container = null;
        }
        addCustomImageLayoutContainer();
        current_choice_img_html = $('.image_style_container').html();
        updateNotice();
    }).on(config.MOUSE_CLICK, '.to_default_group_btn', function (e) {
        e.stopPropagation();
        if (dataFetching == true)return;
        dataFetching = true;
        CustomImageLayoutContainerID = 0;
        current_selected_group_container = null;
        $('.notice').html('');
        $('#image_group_cc').children('.custom_image_group_container').remove();
        $('#image_group_cc').children('.default_image_group_container').remove();
        $('#image_group_cc').append(self.default_image_group_doc);
        $('.to_default_group_btn').removeClass('to_default_group_btn').addClass('to_custom_group_btn').html('自定义组合');
        $('.custom_submit_image_style').removeClass('custom_submit_image_style').addClass('submit_image_style');
        $('.image_style_container').children().remove();
        $('.group_btn_container').children().remove();
        $('.re_choose_image_btn').hide();
        $('.com_choose_layout_btn').hide();
        $('.com_image_choice_btn').hide();
        getDefaultImageStyleData(current_content_id, current_image_group_id, function (data) {
            //创建默认图片组合布局
            createDefaultImageLayout(data);
            //添加默认图片组合样式
            addDefaultImageStyleImg(data);
            //添加组合样式按钮
            addDefaultStyleBtn(current_content_id, current_image_group_id);
            //点亮样式按钮
            setStyleImgRedBorder();
            dataFetching = false;
        });
    }).on(config.MOUSE_CLICK, '.custom_submit_image_style', function (e) {
        e.stopPropagation();
        if ($('.new_image_container').length > 0) {
            showAlert('还有图片需要布局');
            return;
        }
        showLoading("正在绘制...",true);
        var image_id_dic = {};
        //发送自定义布局
        var data = {};
        // data.book_id = book_id ;
        // data.content_id = current_content_id ;
        // data.sibling_group_ids = sibling_group_id_list ;
        var pics = data.combine_images = [];
        $('.custom_image_group_container').each(function (index, value) {
            var pic_width = 428;
            var pic_height = pic_width * $(this).height() / $(this).width();
            var params = {};
            var src_images = params.src_images = [];
            params.image_key = 'image_' + index ;
            params.dst_width = pic_width;
            params.dst_height = pic_height;
            var image_group_data = image_id_dic['image_' + index] = {};
            image_group_data.image_ids = [];
            image_group_data.dst_width = pic_width;
            image_group_data.dst_height = pic_height;
            $(this).find('.crop_image').each(function (index, value) {
                var cell = {};
                image_group_data.image_ids.push($(this).attr('image_id'));
                var vertical_space_width = parseFloat($(this).attr('v_s_w'));
                var vertical_space_count = parseInt($(this).attr('v_s_c'));
                var horizonal_space_height = parseFloat($(this).attr('h_s_h'));
                var horizonal_space_count = parseInt($(this).attr('h_s_c'));
                var left_space_count = parseInt($(this).attr('l_s_c'));
                var top_space_count = parseInt($(this).attr('t_s_c'));
                var p_w = parseFloat($(this).attr('p_w'));
                var p_h = parseFloat($(this).attr('p_h'));
                var p_l = parseFloat($(this).attr('p_l'));
                var p_t = parseFloat($(this).attr('p_t'));
                var width = (pic_width - vertical_space_width * vertical_space_count) * p_w;
                var height = (pic_height - horizonal_space_height * horizonal_space_count) * p_h;
                var left = (pic_width - vertical_space_width * vertical_space_count) * p_l + vertical_space_width * left_space_count;
                var top = (pic_height - horizonal_space_height * horizonal_space_count) * p_t + horizonal_space_height * top_space_count;
                cell.url = $(value).attr('src');
                //图片的裁切区域
                cell.src_x = parseFloat($(value).attr('crop_x'));
                cell.src_y = parseFloat($(value).attr('crop_y'));
                cell.src_w = parseFloat($(value).attr('crop_w'));
                cell.src_h = parseFloat($(value).attr('crop_h'));
                //图片的坐标及大小
                cell.dst_w = width;
                cell.dst_h = height;
                cell.dst_x = left;
                cell.dst_y = top;
                src_images.push(cell);
            });
            pics.push(params);
        });
        var custom_groups = [];
        cropImages(data.combine_images,0,custom_groups,function(){
            changeGroupCallback('custom',custom_groups, sibling_group_id_array, image_id_dic, current_content_id);
        });
    }).on(config.MOUSE_CLICK, '.submit_image_style', function (e) {
        //发送默认布局
        e.stopPropagation();
        if ($(this).hasClass('submit_already'))return;
        $(this).addClass('submit_already');
        var data = {};
        var params = data.group_styles = [];
        data.book_id = self.book.book_id;
        data.content_id = current_content_id;
        $('.default_group_btn[style_id]').each(function (index, value) {
            var cell_data = {};
            cell_data.group_id = $(this).attr('image_group_id');
            cell_data.style_id = $(this).attr('style_id');
            params.push(cell_data);
        });
        changeGroupCallback('default', data);
    }).on(config.MOUSE_CLICK, '.cancel_image_style', function (e) {
        e.stopPropagation();
        if ($('.group_btn_container').find('.custom_image_layout_btn').length > 0
            || $('.group_btn_container').find('.default_group_btn[style_id]').length > 0) {
            showConfirm('你还未保存，确定要退出吗', null, null, function () {
                removePan();
            }, null, 'ok|cancel');
        } else {
            removePan();
        }
    });
    function cropImages(combine_images,index,custom_groups,callback){
        var data = combine_images[index];
        var src_images = data.src_images ;
        var images = [] ;
        crop(src_images,0,images,function(){
            custom_groups.push({
                "width":parseInt(data.dst_width),
                "height":parseInt(data.dst_height),
                "images":images,
            });
            index++ ;
            if(index === combine_images.length){
                callback()
            }else{
                cropImages(combine_images,index,custom_groups,callback)
            }
        });
        function crop(src_images,index,images,crop_callback) {
            var url = src_images[index].url ;
            var crop_x = src_images[index].src_x ;
            var crop_y = src_images[index].src_y ;
            var crop_w = src_images[index].src_w ;
            var crop_h = src_images[index].src_h ;
            var dst_w = src_images[index].dst_w;
            var dst_h = src_images[index].dst_h;
            var dst_x = src_images[index].dst_x;
            var dst_y = src_images[index].dst_y;
            var image = new Image;
            image.onload = function () {
                var resize_width = crop_w ;
                var resize_height = crop_h ;
                canvas.width = resize_width;
                canvas.height = resize_height;
                context.drawImage(image, crop_x, crop_y, crop_w, crop_h, 0, 0, resize_width, resize_height);
                canvas.toBlob(function(blob){
                    if(blob === null) return ;
                    createFileMD5(blob,function(base64_md5){
                        Fetcher.uploadImageToResServer(blob,base64_md5,"image/png",function(data){
                            var result = JSON.parse(data);
                            var image_data = {
                                "url": result.url ,          // image's url
                                "width": parseInt(resize_width),           // image's width
                                "height": Math.round(resize_height),          // image's height
                                "position":           // image's position in group
                                    {
                                        "x": parseInt(dst_x),
                                        "y": parseInt(dst_y),
                                        "w": parseInt(dst_w),
                                        "h": parseInt(dst_h),
                                    }
                            };
                            images.push(image_data);
                            index++ ;
                            if(index === src_images.length){
                                crop_callback()
                            }else{
                                crop(src_images,index,images,crop_callback)
                            }
                        },function(XMLHttpRequest, textStatus, errorThrown){
                            console.log('----错误哦');
                        });
                    });
                }, "image/png", 0.95);
            };
            image.onerror = function (e) {
                alert("图片下载失败:" + url);
            };
            if (url.indexOf('data:image') > -1) {
            } else
                image.crossOrigin = "*";
            image.src = url;
        }
    }
    function createFileMD5 (blob, callback) {
        readFileAsBinary(blob, function (binary_data) {
            if (binary_data !== null) {
                //计算图片服务需要的header
                var spark = new SparkMD5();
                spark.appendBinary(binary_data);
                var base64_md5 = window.btoa(spark.end(true));
                callback(base64_md5);
            }else{
                showLoading("",false)
            }
        })
    }
    /**
     * 文件转换成二进制，及base64数据
     * @param file
     * @param callback
     */
    function readFileAsBinary(blob, callback) {
        if (window.File && window.FileList && window.FileReader && window.Blob) {
            var reader = new FileReader();
            reader.onload = function () {
                var binary_string = reader.result ;
                callback(binary_string);
            };
            //读取文件内容
            reader.readAsBinaryString(blob);
        } else {
            callback(null);
        }
    }
    function updateNotice() {
        var group_len = $('.custom_image_layout_btn').length;
        if (group_len > 0) {
            var choice_img_len = $('.image_style_container')
                .find('img[class *= choice]')
                .length;
            if (total_img_len == choice_img_len)
                $('.notice').html('完成图片布局');
            else
                $('.notice').html('已形成' + $('.custom_image_layout_btn').length + '个组合,还有' + (total_img_len - choice_img_len) + '张图片没有布局！');
        } else {
            $('.notice').html('任意选择以下图片进行布局～');
        }
    }
    function removePan() {
        try {
            $(".default_image_group_container").resizable("destroy");
        } catch (e) {
        }
        $('.image_layout_container').remove();
        reset();
    }
    //获取用户自定义图片组合样式
    function getCustomImageLayoutStyle() {
        self.dataFetcher.getCustomStyleList({image_count: 0}, function (data) {
            image_layout_style_data = {};
            for (var i in data.custom_group_style_list) {
                image_layout_style_data[data.custom_group_style_list[i].image_count] = data.custom_group_style_list[i].styles;
            }
        });
    }
    function addCustomImageLayoutContainer() {
        if ($('.new_image_container').length == 0) {
            CustomImageLayoutContainerID++;
            max_width = $('#image_group_cc').width();
            max_height = $('#image_group_cc').height();
            var custom_image_group_doc =
                '<div class="custom_image_group_container new_image_container" id="' + CustomImageLayoutContainerID + '" style="position:absolute;width:' + max_width + 'px;height:' + max_height + 'px;line-height:' + max_height + 'px;margin:10px;top:0;left:0;border:5px solid #fff;box-shadow: 0 0 5px #ccc;text-align: center">' +
                '</div>';
            $('#image_group_cc').append(custom_image_group_doc);
            $('.notice').css('line-height', max_height + 'px');
        } else {
            $('.new_image_container').show();
        }
    }
    //添加图片
    function addCropImage(crop_images_src) {
        for (var i in crop_images_src) {
            var img = '<img class="crop_image" src="' + crop_images_src[i].src + '" id="' + i + '" image_id="' + crop_images_src[i].image_id + '"/>';
            //此处添加新自定义布局的容器======================
            if (current_selected_group_container)
                current_selected_group_container.append(img);
            else
                $('.new_image_container').append(img);
        }
    }
    /**
     *
     * @param img_length  选择的图片数量来确定样式数据
     * @param num 当前的样式ID
     */
    function createImageCrop(container_width, container_height, img_length, num) {
        //选择默认的样式
        var style_data = image_layout_style_data[img_length][num];
        current_custom_positions = style_data.positions;
        updateCropImg(container_width, container_height, current_custom_positions);
    }
    var drag_img_src;
    var current_mouseover_cropbox;
    var current_long_touch_cropbox;
    function updateCropImg(container_width, container_height, positions) {
        var image_group_container;
        if (current_selected_group_container) {
            image_group_container = current_selected_group_container;
        } else {
            image_group_container = $('.new_image_container');
        }
        image_group_container.find('.crop_image').each(function (index, value) {
            var position = positions[index];
            var image = $(value);
            var width = (container_width - position.vertical_space_width * position.vertical_space_count) * position.width;
            var height = (container_height - position.horizonal_space_height * position.horizonal_space_count) * position.height;
            var p_l = (container_width - position.vertical_space_width * position.vertical_space_count) * position.left + position.vertical_space_width * position.left_space_count;
            var p_t = (container_height - position.horizonal_space_height * position.horizonal_space_count) * position.top + position.horizonal_space_height * position.top_space_count;
            image.attr('p_w', position.width);
            image.attr('p_h', position.height);
            image.attr('p_l', position.left);
            image.attr('p_t', position.top);
            image.attr('h_s_c', position.horizonal_space_count);
            image.attr('h_s_h', position.horizonal_space_height);
            image.attr('v_s_c', position.vertical_space_count);
            image.attr('v_s_w', position.vertical_space_width);
            image.attr('l_s_c', position.left_space_count);
            image.attr('t_s_c', position.top_space_count);
            image.cropbox({width: width, height: height, img_width: image.css('width')})
                .on('cropbox', function (event, results, img) {
                    image.attr('crop_x', results.cropX);
                    image.attr('crop_y', results.cropY);
                    image.attr('crop_w', results.cropW);
                    image.attr('crop_h', results.cropH);
                    image.attr('percent', results.percent);
                    image.attr('minPercent', results.minPercent);
                }).on('long_touch', function (event, x, y, img) {
                current_long_touch_cropbox = img;
                var img_doc = "<img class='drag_img' src='" + img.attr('src') + "' style='z-index:2000;position:absolute;width:60px;height:60px;top:" + y + "px;left:" + x + "px'/>";
                drag_img_src = img.attr('src');
                $(document.body).append(img_doc);
                $('.cropFrame')
                    .on('mouseover', mouseover_cropFrame)
                    .on('mouseout', mouseout_cropFrame);
            }).on('release', function (event, img) {
                $('.cropFrame')
                    .off('mouseover', mouseover_cropFrame)
                    .off('mouseout', mouseout_cropFrame);
                if (current_long_touch_cropbox && current_mouseover_cropbox) {
                    exchange_position(current_long_touch_cropbox, current_mouseover_cropbox);
                }
                drag_img_src = null;
                current_long_touch_cropbox = null;
                $('.drag_img').remove();
            }).on('move', function (event, x, y, img) {
                $('.drag_img').css({top: (y - 10) + 'px', left: (x + 10) + 'px'});
            });
            $(this).parent('.cropFrame').css('left', p_l + 'px');
            $(this).parent('.cropFrame').css('top', p_t + 'px');
        });
        function mouseover_cropFrame(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).css('border', '2px solid red');
            current_mouseover_cropbox = $($(this).find('.crop_image').get(0));
        }
        function mouseout_cropFrame(e) {
            e.preventDefault();
            e.stopPropagation();
            current_mouseover_cropbox = null;
            $(this).css('border', 'none');
        }
        function exchange_position(current_long_touch_cropbox, current_mouseover_cropbox) {
            var over_target = current_mouseover_cropbox;
            var drag_target = current_long_touch_cropbox;
            drag_target.removeAttr('loaded');
            over_target.removeAttr('loaded');
            over_target.parent().css('border', 'none');
            var over_target_src = over_target.attr('src');
            var over_target_image_id = over_target.attr('image_id');
            var over_target_id = over_target.attr('id');
            var over_target_width = over_target.parent().width();
            var over_target_height = over_target.parent().height();
            var drag_target_src = drag_target.attr('src');
            var drag_target_image_id = drag_target.attr('image_id');
            var drag_target_id = drag_target.attr('id');
            var drag_target_width = drag_target.parent().width();
            var drag_target_height = drag_target.parent().height();
            drag_target.attr('src', over_target_src);
            drag_target.attr('image_id', over_target_image_id);
            drag_target.attr('id', over_target_id);
            drag_target.cropbox({
                width: drag_target_width,
                height: drag_target_height,
                img_width: over_target.css('width')
            });
            over_target.attr('src', drag_target_src);
            over_target.attr('image_id', drag_target_image_id);
            over_target.attr('id', drag_target_id);
            over_target.cropbox({
                width: over_target_width,
                height: over_target_height,
                img_width: drag_target.css('width')
            });
        }
    }
    //添加自定义布局选图，布局相关三个按钮
    function addCustomGroupOtherBtn() {
        if ($('#tip_container').find('.com_choose_layout_btn').length == 0) {
            $('#tip_container').append('<div class="com_choose_layout_btn" style="display:none;cursor:pointer;color:#2c2c2c;margin-right: 13px;float:right">完成布局</div>');
            $('#tip_container').append('<div class="re_choose_image_btn" style="display:none;cursor:pointer;color:#2c2c2c;margin-right: 13px;float:right">重新选图</div>');
            $('#tip_container').append('<div class="com_image_choice_btn" style="display:none;cursor:pointer;color:#2c2c2c;margin-right: 13px;float:right">完成选图</div>');
        }
    }
    //根据图片的position添加图片组合的布局
    function createGroupLayout(celldata) {
        $('.default_image_group_container').children().remove();
        var scale_ratio = 0.5;
        if (celldata.height > celldata.width)
            scale_ratio = $('.default_image_group_container').height() / celldata.height - 0.1;
        else
            scale_ratio = $('.default_image_group_container').width() / celldata.width - 0.1;
        var top = ($('.default_image_group_container').height() - (celldata.height * scale_ratio)) / 2;
        var left = ($('.default_image_group_container').width() - (celldata.width * scale_ratio)) / 2;
        var images = celldata.image_pos;
        var image_container = '<div style="transform:scale(' + scale_ratio + ',' + scale_ratio + ');transform-origin: 0% 0% 0px;margin-top:' + top + 'px;margin-left: ' + left + 'px ;position:relative;">';
        for (var i in images) {
            image_container += '<img src="' + images[i].url + '" style="position: absolute;width:' + images[i].width + 'px;height:' + images[i].height + 'px;top:' + images[i].top + 'px;left:' + images[i].left + 'px">';
        }
        image_container += '</div>';
        $('.default_image_group_container').append(image_container);
    }
    //创建用户自定布局按钮
    var addCustomLayoutBtn = function (i) {
        var btn = '<div style="margin:5px;border-radius:5px;padding:5px 0;text-align: center;border:1px solid #e5e5e5;background-color:#f7f7f7;color:#666666"><span class="custom_image_layout_btn" id="' + i + '" style="display:inline-block;cursor:pointer;">布局&nbsp' + (i) + '</span><span class="custom_image_layout_close_btn" id="' + i + '" style="display:inline-block;cursor:pointer;color:red"> &nbsp ×</span></div>';
        $('.group_btn_container').append(btn);
    };
    //根据图片的数量获取相应的样式缩略图并添加到样式容器
    function addCustomLayoutStyleBtn(image_length, style_num) {
        $('.image_style_container').children().remove();
        //根据选择图片的张数选择需要的样式
        var style_data = image_layout_style_data[image_length];
        for (var i in style_data) {
            var celldata = style_data[i];
            var layout = '<img class="custom_layout_style_img" style_num="' + i + '" src="' + celldata.thumb + '" style_id="' + celldata.style_id + '" style="margin:5px 5px 5px ' + (i == 0 ? '0' : '5') + 'px;height:80px"/>';
            $('.image_style_container').append(layout);
        }
        if (style_num == null) {
            $('.custom_layout_style_img').first().css('border', '2px solid red');
            $('.custom_layout_style_img').first().addClass('choice');
        } else {
            $('.custom_layout_style_img[class *= "choice"]').css('border', 'none');
            $('.custom_layout_style_img[class *= "choice"]').removeClass('choice');
            $('.custom_layout_style_img[style_num=' + style_num + ']').css('border', '2px solid red');
            $('.custom_layout_style_img[style_num=' + style_num + ']').addClass('choice');
        }
    }
    /**
     * 设置容器resize
     */
    function setContainerResizeable() {
        var container;
        if (current_selected_group_container) {
            container = current_selected_group_container;
        } else {
            container = $('.new_image_container');
        }
        try {
            container.resizable('destroy');
        } catch (e) {
        }
        container
            .resizable({
                maxWidth: max_width,
                maxHeight: max_height,
                minHeight: max_height / 3,
                handles: "s,n",
                start: function (e, ui) {
                },
                resize: function (e, ui) {
                    if (current_selected_group_container) {
                        var top = (max_height - current_selected_group_container.height()) * 0.5;
                        current_selected_group_container.css('top', top + 'px');
                        updateCropImg(current_selected_group_container.width(), current_selected_group_container.height(), current_custom_positions, true)
                    } else {
                        var top = (max_height - $('.new_image_container').height()) * 0.5;
                        $('.new_image_container').css('top', top + 'px');
                        updateCropImg($('.new_image_container').width(), $('.new_image_container').height(), current_custom_positions, true)
                    }
                },
                stop: function (e, ui) {
                }
            });
    }
    function setStyleImgRedBorder(style_id) {
        if (style_id != null) {
            $('.image_layout_style_img[style_id=' + style_id + ']').css('border', '2px solid red');
            $('.image_layout_style_img[style_id=' + style_id + ']').addClass('borderRed');
        } else {
            //================================================================
            $('.image_layout_style_img').first().css('border', '2px solid red');
            $('.image_layout_style_img').first().addClass('borderRed');
        }
    }
};
/**
 * 根据group_id删除图片
 * @param group_id
 */
ImageController.prototype.removeImagesByGroupID = function (group_id) {
    var self = this;
    var image_ctrl_mask =
        '<div class="image_ctrl_recover" status="auto" style="position:absolute;width:100%;height:100%;top:0;left: 0;text-align:center;background-color:rgba(0,0,0,0.5);" >';
    image_ctrl_mask += '<img class="image_ctrl_icon" status="do_delete" src="https://static.shiqichuban.com/assets/img/icon/icon_image_recover.png" style="cursor:pointer;width:54px;height:54px;">';
    image_ctrl_mask += '</div>';
    $('.ubook_img[image_group_id=' + group_id + ']').find('.image_ctrl_del').remove();
    $('.ubook_img[image_group_id=' + group_id + ']').find('.ubook_content_image').each(function (index, value) {
        if ($(value).parent().find('.image_ctrl_recover').length == 0) {
            $(value).parent().append(image_ctrl_mask);
            $(value).parent().find('.image_ctrl_icon').css('margin-top', $(value).height() / 2 - 27 + 'px');
            $(value).parent().find('.image_ctrl_recover').attr('content_id', $(value).attr('content_id'));
            $(value).parent().find('.image_ctrl_recover').attr('image_index', $(value).attr('image_index'));
            if ($(value).attr('image_id') != null)
                $(value).parent().find('.image_ctrl_recover').attr('image_id', $(value).attr('image_id'));
            $(value).parent().find('.image_ctrl_recover').attr('image_data', $(value).attr('src'));
            self.addImageData($(value).attr('content_id'), $(value).attr('image_data'), $(value).attr('image_index'), $(value).attr('image_id'));
        }
    });
};
/**
 * 恢复图片
 * @param group_id
 * @param callback
 */
ImageController.prototype.recoverImagesByGroupID = function (group_id, callback) {
    var self = this;
    $('.ubook_img[image_group_id=' + group_id + ']').find('.ubook_content_image').each(function (index, value) {
        $(value).parent().find('.image_ctrl_recover').remove();
        self.removeImageData($(value).attr('content_id'), $(value).attr('image_data'), $(value).attr('image_index'), $(value).attr('image_id'));
    });
    callback();
};
ImageController.prototype.addLongTouchController = function (callback, startCheckLongTouch, longTouchCallback, clearLongTouch, checkEditDataIsEmpty) {
    var self = this;
    var image_ctrl_mask =
        '<div class="image_ctrl_mask" status="auto" style="position:absolute;width:100%;height:100%;top:0;left: 0;text-align:center;background-color:rgba(0,0,0,0.5);" >';
    image_ctrl_mask += '<img class="image_ctrl_icon" status="do_delete" src="https://static.shiqichuban.com/assets/img/icon/icon_image_delete.png" style="cursor:pointer;width:54px;height:54px;">';
    image_ctrl_mask += '</div>';
    //此处添加手机端图片点击效果=====================
    $(document).on(config.MOUSE_CLICK, '.ubook_content_image', function (e) {
        e.stopPropagation();
        $('.image_ctrl_del').remove();
        var ubook_content_image = this;
        var canEdit = self.book.userCanEditContent(self.user_id, $(ubook_content_image).parents('.ubook_content').attr('owner_id'));
        startCheckLongTouch(this, function () {
            if (longTouchCallback) {
                clearImageMask(ubook_content_image);
                var selector = $(ubook_content_image) ;
                selector.attr('single_img_url',selector.attr('src'));
                var attr_data = getSelectorData(selector,canEdit);
                self.selectImgByGroupID(null, attr_data.group_id);
                if (selector.parent().children('.image_ctrl_mask').length === 0) {
                    if (canEdit)
                        selector.parent().append(image_ctrl_mask);
                    selector.parent().find('.image_ctrl_icon').css('margin-top',selector.height() / 2 - 27 + 'px');
                    selector.parent().find('.image_ctrl_icon').attr('src', 'https://static.shiqichuban.com/assets/img/icon/icon_image_delete.png');
                    selector.parent().find('.image_ctrl_mask').attr('image_index', selector.attr('image_index'));
                    if (attr_data.image_id !== null)
                        selector.parent().find('.image_ctrl_mask').attr('image_id', attr_data.image_id);
                    selector.parent().find('.image_ctrl_mask').attr('single_img_url', attr_data.single_img_url);
                    selector.parent().find('.image_ctrl_mask').attr('pid', attr_data.pid);
                    selector.parent().find('.image_ctrl_mask').attr('content_id', selector.attr('content_id'));
                    selector.parent().find('.image_ctrl_mask').attr('class', 'image_ctrl_del');
                }
            }
        });
    }).on('touchend', '.ubook_content_image', function (e) {
        e.stopPropagation();
        clearLongTouch();
    }).on(config.MOUSE_CLICK, '.image_ctrl_del', function (e) {
        e.stopPropagation();
        var image_ctrl_del = this;
        var canEdit = self.book.userCanEditContent(self.user_id, $(image_ctrl_del).parents('.ubook_content').attr('owner_id'));
        startCheckLongTouch(this, function () {
            if (longTouchCallback) {
                var selector = $(image_ctrl_del) ;
                getSelectorData(selector,canEdit);
            }
            clearImageMask(image_ctrl_del);
            selector.attr('class', 'ubook_content_image');
            selector.remove();
        });
    }).on('touchend', '.image_ctrl_del', function (e) {
        if (self.startLongTouchTime < config.LONG_TOUCH_DELTA) {
            var selector =  $(this) ;
            var canEdit = self.book.userCanEditContent(self.user_id,$(this).parents('.ubook_content').attr('owner_id'));
            var attr_data = getSelectorData(selector,canEdit);
            self.addImageData(attr_data.content_id,attr_data.single_img_url, $(this).attr('image_index'),attr_data.image_id);
            $(this).attr('class', 'image_ctrl_recover');
            $(this).find('.image_ctrl_icon').attr('src', 'https://static.shiqichuban.com/assets/img/icon/icon_image_recover.png');
            if (!callback)return;
            if (checkEditDataIsEmpty()) {
                callback(null);
            } else {
                callback(self.data_delete_images_src);
            }
        }
        clearLongTouch();
    }).on(config.MOUSE_CLICK, '.image_ctrl_recover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.image_ctrl_del').remove();
        var image_ctrl_recover = this;
        var canEdit = self.book.userCanEditContent(self.user_id, $(image_ctrl_recover).parents('.ubook_content').attr('owner_id'));
        startCheckLongTouch(this, function () {
            if (longTouchCallback) {
                var selector =  $(image_ctrl_recover) ;
                getSelectorData(selector,canEdit);
            }
            clearImageMask(image_ctrl_recover);
        });
    }).on('touchend', '.image_ctrl_recover', function (e) {
        e.stopPropagation();
        if (self.startLongTouchTime < config.LONG_TOUCH_DELTA) {
            self.removeImageData($(this).attr('content_id'), $(this).attr('single_img_url'), $(this).attr('image_index'), $(this).attr('image_id'));
            $(this).attr('class', 'ubook_content_image');
            $(this).remove();
            if (!callback)return;
            if (checkEditDataIsEmpty())
                callback(null);
            else
                callback(self.data_delete_images_src);
        }
        clearLongTouch();
    });
    function getSelectorData(selector,canEdit){
        var group_id = selector.parents('.ubook_img').attr('image_group_id');
        var group_list_id = selector.parents('.ubook_img').attr('sibling_group_id_list');
        var image_group_type = selector.parents('.ubook_img').attr('image_group_type');
        var content_id ;
        if(self.book.content_theme_type === config.BOOK_THEME_WECHAT)
            content_id= selector.parents('.ubook_img').attr('content_id');
        else if(self.book.content_theme_type === config.BOOK_THEME_SHIQI)
            content_id= selector.parents('.ubook_content').attr('content_id');
        var owner_id = selector.parents('.ubook_content').attr('owner_id') ;
        var image_id = selector.attr('image_id');
        var pid = selector.attr('paragraph_id');
        var img_length = selector.parents('.ubook_img').children().length;
        var single_img_url = selector.attr('single_img_url');
        var image_w = selector.width();
        var image_h = selector.height();
        if(single_img_url.lastIndexOf("res.shiqichuban.com") > -1 && single_img_url.lastIndexOf("/m") === (single_img_url.length - 2)){
            single_img_url = single_img_url.substring(0,single_img_url.lastIndexOf("/m")) ;
        }
        var app_version = getAppVersion();
        if(app_version > "3.1.1") {
            var value = {
                content_id: content_id,
                group_id: group_id,
                img_length: img_length,
                group_list_id: group_list_id ,
                image_group_type: image_group_type,
                owner_id: owner_id,
                canEdit: canEdit,
                single_img_url: single_img_url,
                image_id:image_id,
                pid:pid,
                image_w:image_w,
                image_h:image_h
            };
            var data = JSON.stringify({
                action: 'long_touch_img',
                value:value,
            });
            longTouchCallback(data,'json');
        }else{
            longTouchCallback(content_id + ',' + group_id + ',' + img_length + ',' + '[' + group_list_id + ']' + ',' + image_group_type + "," + owner_id + ',' + canEdit);
        }
        return value ;
    }
    function clearImageMask(ele) {
        $(ele).parents('.ubook_img').find('.image_ctrl_del').each(function (index, value) {
            $(value).remove();
        });
    }
};
ImageController.prototype.selectImgByGroupID = function (content_id, imageGroup_id) {
    var self = this;
    var selector = ".ubook_img[image_group_id=" + imageGroup_id + "]";
    self.setImageScale(selector, 1.1);
    var timeoutnum = setTimeout(function () {
        clearTimeout(timeoutnum);
        $(selector).css('z-index', '100');
        self.setImageScale(selector, 1);
    }, 400);
};
ImageController.prototype.setImageScale = function (scale_container, value) {
    $(scale_container).css({'-webkit-transform': 'scale(' + value + ',' + value + ')'});
    $(scale_container).css({'-moz-transform': 'scale(' + value + ',' + value + ')'});
    $(scale_container).css({'-ms-transform': 'scale(' + value + ',' + value + ')'});
    $(scale_container).css({'-o-transform': 'scale(' + value + ',' + value + ')'});
    $(scale_container).css({'transform': 'scale(' + value + ',' + value + ')'});
    $(scale_container).css('-webkit-transform-origin', '50% 0% 0px');
    $(scale_container).css('-moz-transform-origin', '50% 0% 0px');
    $(scale_container).css('-ms-transform-origin', '50% 0% 0px');
    $(scale_container).css('-o-transform-origin', '50% 0% 0px');
    $(scale_container).css('transform-origin', '50% 0% 0px');
};
