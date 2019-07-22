/**
 * Created by naxiaoguang on 2016/12/11.
 */
function EditViewController() {
    PreviewViewController.call(this);
}
EditViewController.prototype = new PreviewViewController();
EditViewController.prototype.addGroupWriteEditBtn = function () {
    var btns =
        "<div class='col-xs-12' style='margin-top:5px;padding-right:15px;overflow: hidden'>" +
        "<div class='view_banner_img'  style='margin-bottom:15px;float:left;vertical-align:middle;text-align:left;line-height:24px;font-size:12px;' ><a href='https://www.shiqichuban.com/getApps?source=share_ebook' style='text-decoration:underline;'>下载</a>登录拾柒，App内书写，体验更佳！</div>" +
        '<div class="form-group saveDeleteBtn" style="display:none;float:left">' +
        '<span class="toSaveChange sq_btn sq_btn_black" >保存</span>' +
        "</div>" +
        // "<a href='/book/preview/"+ this.book.book_id +"' class='book_group_write_finish sq_btn sq_btn_black' style='display:inline-block;margin-left:10px;float:right'>完成</a>" +
        "<div class='book_group_write_trash sq_btn sq_btn_black' style='float:right;margin-bottom:15px;'>草稿箱</div></div>";
    return btns;
};
EditViewController.prototype.addStepBtnDis = function () {
    if (this.device == config.DEVICE_APP) return;
    var down_btns;
    if (this.device === config.DEVICE_MOBILE) {
        //手机端显示一个目录按钮
        down_btns = this.getMobileStepBtn(!this.book.isPicTheme);
    } else {
        var cover;
        if (this.book.type == config.BOOK_TYPE_GROUP && this.book.role != 1) {
            cover = getCurrentWWWDomain() + '/book/preview/' + this.book.book_id;
        } else {
            cover = getCurrentWWWDomain() + '/book/cover/' + this.book.book_id;
        }
        down_btns =
            '<div class="form-group saveDeleteBtn" style="margin-bottom: 5px;visibility: hidden">' +
            '<a class="toSaveChange" ><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_save.png" alt="保存" title="保存"/></a>' +
            '</div>';
        down_btns += '<div class="form-group function_btn" style="display:none;margin-bottom: 5px;position:relative">' +
            '<a><img src="https://static.shiqichuban.com/assets/img/icon/icon_function.png" alt="修改" title="修改"/></a>' +
            '</div>';
        down_btns += '<div class="form-group catalog_container" style="margin-bottom: 5px;position:relative">' +
            '<a><img class="catalog_btn" src="https://static.shiqichuban.com/assets/img/icon/icon_catalog.png" alt="目录" title="目录"/></a>' +
            '</div>';
        down_btns += '<div class="form-group" style="">' +
            '<a href="' + cover + '"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_nextstep.png" alt="下一步" title="下一步"/></a>' +
            '</div>';
    }
    var stepBtn = '';
    if (down_btns) {
        if (this.device === config.DEVICE_MOBILE) {
            stepBtn += '<div class="down_step_btn" style="z-index:80000;text-align: left;position: absolute;right: 10px;">';
        } else {
            stepBtn += '<div class="down_step_btn" style="z-index:80000;text-align: left;position:absolute;right:-100px;bottom:0">';
        }
        stepBtn += down_btns;
        stepBtn += '</div>';
    }
    return stepBtn;
};
/**
 * 电子书内添加文章到电子书，文章列表面板
 * @returns {string}
 */
EditViewController.prototype.addArticleListPan = function (target) {
    var editPan =
        ' <div class="container-fluid article_first_pan" style="display:none;z-index:9000;height:' + $(window).height() + 'px;width:100%;position:fixed;top:0;background-color: rgba(0,0,0,0.5);">' +
        ' <div id="article_list_form" class="col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 60px"> ' +
        ' <div class="col-xs-12" style="position:relative;background-color: white;padding:20px 20px 0;border-radius: 5px"> ' +
        ' <img class="close_article_first_btn" style="position:absolute;right:-15px;top:-15px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png" /> ' +
        ' <div style="width: 100%;position:relative;overflow: hidden"> ' +
        ' <div class="ke-outline-time col-xs-12" style="position:relative;">' +
        ' <img class="condition_select_btn" src="https://static.shiqichuban.com/assets/img/condition_choice_icon.png" style="float:right;">' +
        ' <span style="width:170px;float:left;font-size:20px">文章列表</span>' +
        ' </div>' +
        '<div class="ke-status-notice col-xs-12" style="text-align: right"></div> ';
    editPan += ' </div> ';
    editPan +=
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div class="article_list_container" style="height:' + ($(window).height() - 350) + 'px;overflow-y: scroll"></div>' +
        ' <div style="margin-top:5px;width: 100% ;"></div> ' +
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div class="writeNewArticleBtn" style="margin:15px 0;width: 100% ;cursor: pointer"><img src="https://static.shiqichuban.com/assets/img/icon/icon_write.png" style="margin:0 20px">如需要新建文章点击这里</div> ' +
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div style="margin-top:10px;width:100%;text-align: center;padding-top: 5px;margin-bottom: 20px"> '
        if(this.book.content_theme_type !== 3){
            editPan += ' <span class="book_article_position_pre" ><input class="book_article_position_pre_input" type="radio" name="position" checked style="color:black;border-radius: 5px;box-shadow: 2px 2px 2px #ccc"/> 保存至上一篇</span>' ;
            editPan += ' <span class="book_article_position_next" ><input  class="book_article_position_next_input"  type="radio" name="position" style="margin-left:20px;border-radius: 5px ;box-shadow: 2px 2px 2px #ccc"/> 保存至下一篇</span>' ;
        }
    if(target === ".over_page"){
        editPan +=' <span class="submit_add_selected_article sq_btn sq_btn_black" style="border-radius: 5px ;box-shadow: 2px 2px 2px #ccc">确定<span> ' ;
    }else{
        editPan +=' <span class="submit_add_selected_article sq_btn sq_btn_black" style="border-radius: 5px ;box-shadow: 2px 2px 2px #ccc">确定<span> ' ;
    }
    editPan +=' </div> ' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ';
    return editPan;
};
/**
 * 电子书内添加文章到电子书，文章条件选择面板
 * @returns {string}
 */
EditViewController.prototype.addArticleConditionPan = function () {
    var editPan =
        ' <div class="container-fluid article_condition_pan" style="z-index:9000;height:' + $(document).height() + 'px;width:100%;position:fixed;top:0;background-color: rgba(0,0,0,0.5);">' +
        ' <div id="article_condition_form" class="col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 60px"> ' +
        ' <div class="col-xs-12" style="position:relative;background-color: white;padding:20px 20px 0;border-radius: 5px"> ' +
        ' <div class="close_article_condition_btn" style="position:absolute;left:20px;top:15px;cursor: pointer" >返回</div>' +
        ' <div style="width: 100%;position:relative;overflow: hidden;margin-top: 12px"> ' +
        ' <div class="ke-outline-time col-xs-12" style="position:relative;">' +
        ' </div>' +
        ' <div class="ke-status-notice col-xs-12" style="text-align: right;"></div> ';
    editPan += ' </div> ';
    editPan +=
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div style="overflow: auto">' +
        '<div style="margin-top: 20px">选择时间:</div>' +
        '<div style="margin-top: 20px;">' +
        ' <span class="input-group date article_form_datetime_start" style="display:block;width:120px;float:left;margin-left: ' + (isPC() ? 30 : 0) + 'px" data-date="2016-09-16" data-date-format="yyyy-mm-dd">' +
        ' <input class="article_ke_date_input_start" type="text" style="width:100%;height: 25px;border: 1px solid #ccc;border-radius:15px;background: transparent ;outline: none;text-align: center"></span>' +
        '</div>' +
        '<div style="float: left;width:30px;text-align: center;line-height: 25px">--</div>' +
        '<div style="margin-top: 20px;">' +
        ' <span class="input-group date article_form_datetime_end" style="display:block;width:120px;float:left" data-date="2016-09-16" data-date-format="yyyy-mm-dd">' +
        ' <input class="article_ke_date_input_end" type="text" style="width:100%;height: 25px;border: 1px solid #ccc;border-radius:15px;background: transparent ;outline: none;text-align: center"></span>' +
        '</div>' +
        ' </div>' +
        ' <div style="margin-top: 30px">选择标签:</div>' +
        ' <div class="book_article_tag_container" style="width:100%;height:' + ($(window).height() - 400) + 'px;padding-left: 30px;margin-top: 30px;overflow-y: scroll;overflow-x: hidden"></div>' +
        ' <div style="margin-top:5px;width: 100% ;"></div> ' +
        ' <div style="margin-top:30px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div style="margin-top:10px;width:100%;text-align: center;padding-top: 5px;margin-bottom: 20px"> ' +
        ' <span class="reset_selected_article sq_btn sq_btn_gray" style="display:inline-block;border-radius: 5px ;box-shadow: 2px 2px 2px #ccc">重置</span> ' +
        ' <span class="submit_condition_article sq_btn sq_btn_black" style="display:inline-block;margin-left:40px;border-radius: 5px ;box-shadow: 2px 2px 2px #ccc">确定</span> ' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ';
    return editPan;
};
/**
 * 电子书文章二次编辑面板
 * @param callback
 */
EditViewController.prototype.addEditPan = function () {
    if (this.status == config.STATUS_PREVIEW || this.action == config.ACTION_SHARE || this.device == config.DEVICE_APP || this.view_type == config.VIEW_TYPE_ORDER) return '';
    var editPan = "";
    editPan += ' <div class="container-fluid edit_first_pan" style="z-index:90000;display:none;height:' + $(document).height() + 'px;width:100%;position:fixed;top:0;background-color: rgba(0,0,0,0.5);">';
    editPan += ' <div id="edit_first_form" class="col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top:' + (this.device == config.DEVICE_MOBILE ? "60" : "60") + 'px"> ';
    editPan += ' <div class="col-xs-12" style="position:relative;background-color: white;padding:20px 20px 0;border-radius: 5px"> ';
    editPan += ' <img class="close_edit_first_btn" style="position:absolute;right:-15px;top:-15px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png" /> ';
    editPan += ' <div id="thumb_preview" style="display:none"></div>';
    editPan += ' <textarea id="edit_content" style="width:100%"></textarea> ';
    if (this.book.type == config.BOOK_TYPE_GROUP) {
        editPan += ' <div style="margin-top:10px;width:100%;text-align: center;padding-top: 5px;margin-bottom: 20px"> ';
        editPan += ' <span class="saveToBoxBtn sq_btn sq_btn_black" style="border-radius: 5px ;box-shadow: 2px 2px 2px #ccc">保存至草稿箱</span> ';
        editPan += ' <span class="saveToBookBtn sq_btn sq_btn_black" style="margin-left:40px;border-radius: 5px ;box-shadow: 2px 2px 2px #ccc">保存至本书</span> ';
    } else {
        editPan += ' <div style="margin-top:10px;width:100%;text-align: center;padding-top: 5px;margin-bottom: 20px"> ';
        if(this.book.content_theme_type !== 3){
            editPan += ' <span class="position_pre" ><input class="position_pre_input" type="radio" name="position" checked style="color:black;border-radius: 5px;box-shadow: 2px 2px 2px #ccc"/> 保存至上一篇</span>';
             editPan += ' <span class="position_next" ><input  class="position_next_input"  type="radio" name="position" style="margin-left:20px;border-radius: 5px ;box-shadow: 2px 2px 2px #ccc"/> 保存至下一篇</span>';
        }
        
        editPan += ' <span class="nextStepBtn sq_btn sq_btn_black" style="border-radius: 5px ;box-shadow: 2px 2px 2px #ccc">下一步</span> ';
    }
    editPan += ' </div> ';
    editPan += ' </div> ';
    editPan += ' </div> ';
    editPan += ' </div> ';
    editPan += ' </div> ';
    editPan += ' <div class="container-fluid edit_second_pan" style="z-index:2000;display:none;width:100%;height:' + $(document).height() + 'px;position:fixed;top:0;background-color: rgba(0,0,0,0.5);overflow: hidden">';
    editPan += ' <div id="edit_second_form" class="col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 60px"> ' ;
    editPan += ' <div class="col-xs-12" style="background-color: white;padding:20px;border-radius: 5px;text-align: center;position:relative;"> ' ;
    editPan += ' <img class="back_edit_first_btn" style="z-index:2000;position:absolute;left:15px;top:15px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/back_icon_07.png" /> ';
    editPan += ' <img class="close_edit_second_btn" style="position:absolute;right:-15px;top:-15px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png" /> ';
    editPan += ' <p class="col-xs-12" style="font-size: 16px">保存到拾柒文章列表</p>';
    editPan += ' <div class="col-xs-12" style="margin-top: 20px">';
    editPan += ' <input class="saveToLocalInput" type="radio" name="saveAsArticle" checked style="color:black;border-radius: 5px;box-shadow: 2px 2px 2px #ccc;margin-right:10px;"/> 是';
    editPan += ' <input class="unSaveToLocalInput" type="radio" name="saveAsArticle" style="margin-left:30px;margin-right:10px;border-radius: 5px ;box-shadow: 2px 2px 2px #ccc"/> 否';
    editPan += ' </div>';
    editPan += ' <input class="tag_input col-xs-10 col-xs-offset-1" placeholder="输入文字,按回车键添加标签,小于14个字符" maxlength="14" style="height:30px;margin-top: 20px;border:1px solid #ccc;border-radius: 5px"/>';
    editPan += ' <div class="col-xs-10 col-xs-offset-1">';
    editPan += ' <div class="tag_container" style="margin-top: 10px ;text-align: left;background-color: transparent"></div>';
    editPan += ' </div>';
    editPan += ' <div class="col-xs-8 col-xs-offset-2 addArticleBtn sq_btn sq_btn_black" style="margin-top: 50px;padding:5px 15px">确认保存</div>';
    editPan += ' </div>';
    editPan += ' </div>';
    editPan += ' </div>';
    return editPan;
};
EditViewController.prototype.getFunctionListPan = function (callback) {
    var style_btn = [];
    style_btn['change_size_btn'] = {
        name: 'change_size_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_03.png',
        des: '更换书籍尺寸'
    };
    style_btn['change_page_header_btn'] = {
        name: 'change_page_header_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_05.png',
        des: '更换页眉页脚'
    };
    style_btn['change_page_catalog_btn'] = {
        name: 'change_page_catalog_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/change_catalog.png',
        des: '更换目录模板'
    };
    style_btn['change_insert_btn'] = {
        name: 'change_insert_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_09.png',
        des: '更换插页'
    };
    var edit_btn = [];
    edit_btn['edit_page_header_btn'] = {
        name: 'edit_page_header_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_11.png',
        des: '修改页眉内容'
    };
    edit_btn['edit_create_time_btn'] = {
        name: 'edit_create_time_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_12.png',
        des: '修改创作时间'
    };
    edit_btn['edit_author_photo_btn'] = {
        name: 'edit_author_photo_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_15.png',
        des: '更换扉页头像'
    };
    edit_btn['edit_indent_btn'] = {
        name: 'set_indent_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_16.png',
        des: '设置首行缩进'
    };
    edit_btn['edit_plus_article_btn'] = {
        name: 'edit_plus_article_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_19.png',
        des: '电子书增量'
    };
    edit_btn['edit_forward'] = {
        name: 'filter_ui filter_forward',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_23.png',
        des: '显示朋友圈转发'
    };
    edit_btn['edit_insert_page_btn'] = {
        name: 'edit_insert_page_btn',
        src: 'https://static.shiqichuban.com/assets/img/book/cebian_icon_23.png',
        des: '过滤插页'
    };
    edit_btn['edit_trash_btn'] = {
        name: 'edit_trash_btn',
        src: 'https://static.shiqichuban.com/assets/img/icon/caogaoxiang_icon_12.png',
        des: '电子书回收站'
    };
    edit_btn['book_group_write_trash'] = {
        name: 'book_group_write_trash',
        src: 'https://static.shiqichuban.com/assets/img/icon/caogaoxiang_icon_12.png',
        des: '草稿箱'
    };
    edit_btn['edit_font_size'] = {
        name: 'edit_font_size',
        src: 'https://static.shiqichuban.com/assets/img/book/zihao_23.png',
        des: '字号设置'
    };
    edit_btn['show_nickname'] = {
        name: 'filter_ui show_nickname',
        src: 'https://static.shiqichuban.com/assets/img/book/show_nickname.png',
        des: '显示笔名'
    };
    edit_btn['edit_bg_music'] = {
        name: 'edit_bg_music',
        src: 'https://static.shiqichuban.com/assets/img/f_yinyue.png',
        des: '设置背景音乐'
    };
    edit_btn['book_theme_convert'] = {
        name: 'book_theme_convert',
        src: 'https://static.shiqichuban.com/assets/img/book/book_upgrade_icon.png',
        des: '编辑模式升级'
    };
    edit_btn['book_division'] = {
        name: 'book_division',
        src: 'https://static.shiqichuban.com/assets/img/book/book_division_icon.png',
        des: '书籍分册'
    };
    var pan =
        "<div class='function_list' style='display:none;width:360px;padding:10px 20px;border-radius:5px;color: white;font-size:16px;position:absolute;right:80px;top:-250px;background-color:rgba(0,0,0,0.7)'>" +
        "<div class='design_btn_container_title' style='font-size: 20px;color:white;margin-bottom: 10px;'>设计样式</div>" +
        "<div class='design_btn_container' style='width:100%;overflow: hidden;'></div>" +
        "<div class='edit_btn_container_title' style='font-size: 20px;color:white;margin-top:15px;margin-bottom: 10px;border-top: 1px solid #666666;padding-top:15px;'>内容修改</div>" +
        "<div class='edit_btn_container' style='width:100%;overflow: hidden;'></div>" +
        "</div>";
    callback(pan, style_btn, edit_btn);
};
EditViewController.prototype.getPageSizeChoicePan = function (book_size) {
    var pan =
        "<div class='size_change_pan' style='z-index:9000;position:fixed;width:100%;height:" + $(window).height() + "px;background-color: rgba(0,0,0,0.6);top:0;left:0'>" +
        "<div style='width:460px;overflow: hidden;background-color:white;margin:auto auto;margin-top:150px;border-radius:5px'>" +
        "<div style='width:100%;white-space: nowrap;padding-left:10px;font-size: 14px;line-height:30px;margin-top:10px'>修改书籍尺寸</div>" +
        "<div style='width:100%;overflow: auto;white-space: nowrap'>";
    for (var i in book_size) {
        pan +=
            "<div style='position:relative;display:inline-block;padding:15px;'>" +
            "<img src='" + book_size[i].thumb + "' style='width:200px;border:1px solid #ccc'/>";
        if (i == 0)
            pan += "<input class='size_page_ratio' default='default' checked type='radio' name='size_choice_ratio' value='" + book_size[i].size_id + "' style='position:absolute;top:20px;right:20px'/>";
        else
            pan += "<input class='size_page_ratio' type='radio' name='size_choice_ratio' value='" + book_size[i].size_id + "' style='position:absolute;top:20px;right:20px'/>";
        pan += "</div>";
    }
    pan += '</div>';
    pan +=
        '<div style="width:100%;border-top:1px solid #ccc">' +
        '<span class="cancel_change_size_btn" style="display:inline-block;width:50%;text-align: center;line-height:40px;cursor:pointer;border-right:1px solid #ccc">取消</span>' +
        '<span  class="submit_change_size_btn" style="display:inline-block;width:50%;text-align: center;line-height:40px;cursor:pointer">确定</span>' +
        '</div>';
    pan += '</div>';
    pan += '</div>';
    return pan;
};
EditViewController.prototype.getInsertChoicePan = function (template_list) {
    var pan =
        "<div class='insert_change_pan' style='z-index:9000;position:fixed;width:100%;height:" + $(window).height() + "px;background-color: rgba(0,0,0,0.6);top:0;left:0'>" +
        "<div style='width:460px;overflow: hidden;background-color:white;margin:auto auto;margin-top:150px;border-radius:5px'>" +
        "<div style='width:100%;white-space: nowrap;padding-left:10px;font-size: 14px;line-height:30px;margin-top:10px'>修改插页版式</div>" +
        "<div style='width:100%;overflow: auto;white-space: nowrap'>";
    for (var i in template_list) {
        pan +=
            "<div style='position:relative;display:inline-block;padding:15px;'>" +
            "<img src='" + template_list[i].sample + "' style='width:200px;border:1px solid #ccc'/>";
        if (i == 0)
            pan += "<input class='insert_page_ratio' checked type='radio' name='insert_choice_ratio' value='" + template_list[i].id + "' style='position:absolute;bottom:20px;right:20px'/>";
        else
            pan += "<input class='insert_page_ratio' type='radio' name='insert_choice_ratio' value='" + template_list[i].id + "' style='position:absolute;bottom:20px;right:20px'/>";
        pan += "</div>";
    }
    pan += '</div>';
    pan +=
        '<div style="width:100%;border-top:1px solid #ccc">' +
        '<span class="cancel_change_insert_btn" style="display:inline-block;width:50%;text-align: center;line-height:40px;cursor:pointer;border-right:1px solid #ccc"">取消</span>' +
        '<span  class="submit_change_insert_btn" style="display:inline-block;width:50%;text-align: center;line-height:40px;cursor:pointer">确定</span>' +
        '</div>';
    pan += '</div>';
    pan += '</div>';
    return pan;
};
EditViewController.prototype.getHeaderFooterPan = function (template_list) {
    var pan =
        "<div class='hf_change_pan' style='z-index:9000;position:fixed;width:100%;height:" + $(window).height() + "px;background-color: rgba(0,0,0,0.6);top:0;left:0'>" +
        "<div style='width:550px;overflow: hidden;background-color:white;margin:auto auto;margin-top:150px;border-radius:5px'>" +
        "<div style='width:100%;white-space: nowrap;padding-left:10px;font-size: 14px;line-height:30px;margin-top:10px'>修改页眉页脚版式</div>" +
        "<div style='width:100%;overflow: auto;white-space: nowrap'>";
    for (var i in template_list) {
        pan +=
            "<label style='position:relative;display:inline-block;padding:15px;' id='" + template_list[i].id + "'>" +
            "<img src='" + template_list[i].sample + "' style='width:200px;border:1px solid #ccc'/>";
        if (i == 0)
            pan += "<input class='hf_page_ratio' checked type='radio' name='hf_choice_ratio' value='" + template_list[i].id + "' for='" + template_list[i].id + "' style='position:absolute;top:20px;right:20px'/>";
        else
            pan += "<input class='hf_page_ratio' type='radio' name='hf_choice_ratio' value='" + template_list[i].id + "' for='" + template_list[i].id + "' style='position:absolute;top:20px;right:20px'/>";
        pan += "</label>";
    }
    pan += '</div>';
    pan +=
        '<div style="width:100%;border-top:1px solid #ccc">' +
        '<span class="cancel_change_hf_btn" style="display:inline-block;width:50%;text-align: center;line-height:40px;cursor:pointer;border-right:1px solid #eee">取消</span>' +
        '<span  class="submit_change_hf_btn" style="display:inline-block;width:50%;text-align: center;line-height:40px;cursor:pointer">确定</span>' +
        '</div>';
    pan += '</div>';
    pan += '</div>';
    return pan;
};
EditViewController.prototype.getCatalogPan = function (template_list) {
    var pan =
        "<div class='catalog_change_pan' style='z-index:9000;position:fixed;width:100%;height:" + $(window).height() + "px;background-color: rgba(0,0,0,0.6);top:0;left:0'>" +
        "<div style='width:550px;overflow: hidden;background-color:white;margin:auto auto;margin-top:150px;border-radius:5px'>" +
        "<div style='width:100%;white-space: nowrap;padding-left:10px;font-size: 14px;line-height:30px;margin-top:10px'>修改目录版式</div>" +
        "<div style='width:100%;overflow: auto;white-space: nowrap'>";
    for (var i in template_list) {
        pan +=
            "<label style='position:relative;display:inline-block;padding:15px;' id='" + template_list[i].template_id + "'>" +
            "<img src='" + template_list[i].thumb + "'  style='width:200px;border:1px solid #ccc'/>";
        if (i == 0){
            pan += "<input class='catalog_page_ratio' checked type='radio' name='catalog_choice_ratio' value='" + template_list[i].template_id + "' for='" + template_list[i].template_id +"' style='position:absolute;top:20px;right:20px'/>";}
        else{
            pan += "<input class='catalog_page_ratio' type='radio' name='catalog_choice_ratio' value='" + template_list[i].template_id + "' for='" + template_list[i].template_id +"' style='position:absolute;top:20px;right:20px'/>";}
        pan += "</label>";
    }
    pan += '</div>';
    pan +=
        '<div style="width:100%;border-top:1px solid #ccc">' +
        '<span class="cancel_change_catalog_btn" style="display:inline-block;width:50%;text-align: center;line-height:40px;cursor:pointer;border-right:1px solid #eee">取消</span>' +
        '<span  class="submit_change_catalog_btn" style="display:inline-block;width:50%;text-align: center;line-height:40px;cursor:pointer">确定</span>' +
        '</div>';
    pan += '</div>';
    pan += '</div>';
    return pan;
};
EditViewController.prototype.getHeaderEditPan = function (_theme, headers, content_id, val) {
    var btns;
    var str;
    var editPan;
    for (var i in headers) {
        var data = headers[i];
        if (data) {
            if (i == 0) {
                str =
                    '<span class="header_left sq_btn sq_btn_black" header=' + data.header + ' content_id="' + data.content_id + '"' +
                    ' style="display:inline-block;padding: 3px 5px;border-bottom-left-radius:5px;border-top-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0;">左侧页眉</span>';
            } else if (i == 1) {
                if (!str) str = '';
                str +=
                    '<span class="header_right sq_btn sq_btn_white" header=' + data.header + ' content_id="' + data.content_id + '"' +
                    ' style="display:inline-block;padding: 3px 5px;border-bottom-left-radius:0;border-top-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px;border: 1px solid #cccccc">右侧页眉</span>';
            }
        }
    }
    if (str) {
        btns =
            '<div style="position: absolute ;top:40px;right:40px">' +
            str +
            '</div>';
        if ($(btns).find('.sq_btn').length < 2)
            btns = '';
    }
    if (btns != null) {
        editPan =
            '<div class="editPan col-xs-12 col-sm-12" style="position:fixed;top:0;left:0;height:' + $(window).height() + 'px;background-color: rgba(0,0,0,0.5);z-index:9999999" >' +
            '<form class="header_form">' +
            '<div class="col-xs-12 col-sm-4 col-sm-offset-4" style="max-width:450px;position:relative;background-color: white;border-radius: 5px;padding:40px 40px 30px;margin-top: ' + $(window).height() * 0.2 + 'px">' +
            '<img class="close_editPan" style="position:absolute;right:-10px;top:-10px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png"/>' +
            '<div class="form-group" style="font-size: 20px;">更改页眉</div>' +
            btns;
        if (_theme == 2||_theme == 3)
            editPan +=
                '<div class="form-group" style="border-top:1px solid #f0f0f0;padding-top: 10px"><input name="type" value="title" type="radio" checked><span style="margin-left:15px">以文章标题为页眉</span></div>' +
                '<div class="form-group" style="border-top:1px solid #cccccc;padding-top: 10px"><input name="type" value="date" type="radio" ><span style="margin-left:15px">以文章创作的日期为页眉</span></div>';
        else if (_theme == 1)
            editPan +=
                '<div class="form-group" style="border-top:1px solid #cccccc;padding-top: 10px"><input name="type" value="date" type="radio" checked><span style="margin-left:15px">以日期为页眉</span></div>';
        editPan += '<div class="form-group" style="border-top:1px solid #f0f0f0;padding-top: 10px"><input name="type" value="custom" type="radio">' +
            '<input class="edit_header_text" style="width:90%;height:30px;margin-left:15px;border: 1px solid #ccc;outline: none;border-radius: 5px;" placeholder="请输入页眉显示内容"/>' +
            '</div>' +
            '<div class="form-group" style="border-top:1px solid #f0f0f0;padding-top: 30px;text-align: left">';
        if (_theme == 2||_theme == 3)
            editPan += '<input name="scope" value="article" type="radio" checked><span style="margin-left:5px;margin-right: 50px;">仅适用当前文章</span>';
        else if (_theme == 1)
            editPan += '<input name="scope" value="month" type="radio" checked><span style="margin-left:5px;margin-right: 50px;">仅适用当月</span>';
        editPan +=
            '<input name="scope" value="all" type="radio"><span style="margin-left:5px">适用于全书</span>' +
            '</div>' +
            '<div class="form-group" style="margin-top: 30px"><div class="submit_edit_header col-sm-8 col-sm-offset-2 sq_btn sq_btn_black" style="line-height: 28px;height: 30px;">确认更改</div></div>' +
            '</div>' +
            '</form>' +
            '</div>';
    }
    return editPan;
};
EditViewController.prototype.getIndentPan = function (_theme, indents) {
    var btns;
    var str;
    var editPan;
    for (var i in indents) {
        var data = indents[i];
        if (data) {
            if (i == 0) {
                str =
                    '<span class="header_left sq_btn sq_btn_black" indent=' + data.indent + ' content_id="' + data.content_id + '"' + 'selected="true"' +
                    ' style="display:inline-block;padding: 3px 5px;border-bottom-left-radius:5px;border-top-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0;">左侧文章</span>';
            } else if (i == 1) {
                if (!str) str = '';
                str +=
                    '<span class="header_right sq_btn sq_btn_white" indent=' + data.indent + ' content_id="' + data.content_id + '"' +
                    ' style="display:inline-block;padding: 3px 5px;border-bottom-left-radius:0;border-top-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px;border: 1px solid #cccccc">右侧文章</span>';
            }
        }
    }
    if (str) {
        btns =
            '<div style="position: absolute ;top:40px;right:40px">' +
            str +
            '</div>';
        if ($(btns).find('.sq_btn').length < 2)
            btns = '';
    }
    if (btns != null) {
        editPan =
            '<div class="editPan col-sm-12" style="z-index:9000;position:fixed;top:0;left:0;height:' + $(window).height() + 'px;background-color: rgba(0,0,0,0.5)" >' +
            '<form class="header_form">' +
            '<div class="col-xs-12 col-sm-4 col-sm-offset-4" style="max-width:450px;position:relative;background-color: white;border-radius: 5px;padding:40px 40px 30px;margin-top: ' + $(window).height() * 0.2 + 'px">' +
            '<img class="close_editPan" style="position:absolute;right:-10px;top:-10px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png"/>' +
            '<div class="form-group" style="font-size: 20px;">首行缩进</div>' +
            btns;
        editPan +=
            '<div class="form-group" style="border-top:1px solid #f0f0f0;padding-top: 10px"><input name="indent" value="1" type="radio" checked style="vertical-align: text-bottom;"><span style="margin-left:15px">设置首行缩进</span></div>' +
            '<div class="form-group" style="border-top:1px solid #f0f0f0;padding-top: 10px"><input name="indent" value="2" type="radio" style="vertical-align: text-bottom;"><span style="margin-left:15px">取消首行缩进</span></div>';
        editPan += '<div class="form-group" style="border-top:1px solid #f0f0f0;padding-top: 30px;text-align: left">';
        editPan += '<input name="scope" value="article" type="radio" checked style="vertical-align: text-bottom;"><span style="margin-left:5px;margin-right: 50px;">仅适用当前文章</span>';
        editPan +=
            '<input name="scope" value="all" type="radio" style="vertical-align: text-bottom;"><span style="margin-left:5px">适用于全书</span>' +
            '</div>' +
            '<div class="form-group" style="margin-top: 30px"><div class="submit_edit_indent col-sm-8 col-sm-offset-2 sq_btn sq_btn_black" style="line-height: 28px;height: 30px;">确认更改</div></div>' +
            '</div>' +
            '</form>' +
            '</div>';
    }
    return editPan;
};
EditViewController.prototype.getBookPlusPan = function (message, tag) {
    var editPan =
        '<div id="editPan" style="z-index:10000000;position:fixed;top:0;left:0;background-color: rgba(0,0,0,0.5);width:100%;height:' + $(document).height() + 'px ">' +
        '<form class="editPan_form ">' +
        '<div class="editPan_pan"' +
        'style="width:400px;position:fixed;left:50%;top:30%;margin-left:-200px;padding:10px;border-radius:5px;background-color: white">' +
        '<div style="padding:20px;border-radius:5px;background-color: white">' +
        '<p style="margin:0 25px 20px 25px;color:#565656;font-size: 16px;text-align: center">' +
        message +
        '</p>' +
        '<div style="text-align: center;margin-bottom: 10px">';
    if (tag.indexOf('cancel') > -1)
        editPan += '<a class="sq_btn sq_btn_gray cancel_plus_btn" style="margin-right: 20px">取消</a>';
    if (tag.indexOf('ok') > -1)
        editPan += '<a class="sq_btn sq_btn_black submit_plus_btn" >确定</a>';
    editPan +=
        '</div>' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>';
    return editPan;
};
EditViewController.prototype.getDraftPan = function () {
    var pan = '';
    if (this.device == config.DEVICE_MOBILE) {
        pan +=
            '<div class="draft_pan" style="z-index:9000;position:fixed;top:0;left:0;width:' + $(window).width() + 'px;height:' + $(window).height() + 'px;background-color: white;">' +
            '<div style="position:relative;overflow: auto;border-bottom: 1px solid rgba(0,0,0,0.1);padding: 15px 0;box-shadow: 0 2px 2px #eee">' +
            '<div style="position:absolute;width: 50%;left:25%;text-align: center;font-size:16px;line-height: 20px;z-index:1">草稿箱</div>' +
            '<div class="closeDraftPanBtn" style="float:left;margin-left: 20px;cursor: pointer;z-index:2">返回</div>' +
            '<div class="cleanDraftBtn" style="float:right;margin-right: 20px;cursor: pointer;z-index:2">清空</div>' +
            '</div>' +
            '<div class="draftListContainer" style="overflow:auto;height:' + ($(window).height() - 50) + 'px"></div>' +
            '</div>';
    } else if (this.device == config.DEVICE_PC) {
        pan +=
            '<div class="draft_pan" style="z-index:9000;position:fixed;top:0;left:0;width:' + $(window).width() + 'px;height:' + $(window).height() + 'px;background-color: rgba(0,0,0,0.5);z-index:80000">' +
            '<div style="position:relative;margin: 60px auto;;width:400px;height:500px;background-color: white">' +
            '<div style="position:relative;overflow: auto;border-bottom: 1px solid rgba(0,0,0,0.5);padding: 15px 0;box-shadow: 0 2px 2px #eee">' +
            '<div style="float:left;margin-left:20px;text-align: center;font-size:16px;line-height: 20px;z-index:1">草稿箱</div>' +
            '<div class="cleanDraftBtn" style="float:right;margin-right: 20px;cursor: pointer;z-index:2">清空</div>' +
            '</div>' +
            '<div class="draftListContainer" style="overflow:auto;height:440px"></div>' +
            '<img class="closeDraftPanBtn" style="position:absolute;right:-10px;top:-10px;width:30px;cursor:pointer" src="https://static.shiqichuban.com/assets/img/icon/close_land.png"/>' +
            '</div>';
        '</div>';
    }
    return pan;
};
EditViewController.prototype.getDraftListItem = function (id, title, abstract, ctime, image_urls, content_id) {
    var item = '';
    if (this.device == config.DEVICE_MOBILE) {
        var images_node = '';
        if (image_urls) {
            for (var i in image_urls) {
                images_node += '<image src="' + image_urls[i] + '"/>';
            }
        }
        item +=
            "<div class='list_item' draft_id=" + id + " style='width:100%;padding:10px 15px;border-bottom: 1px solid #eee'>" +
            "<div style='padding:10px 0 ;color:8d8d8d;font-size: 16px'>" + title + "</div>" +
            "<div class='item_abstract' draft_id=" + id + " style='padding:10px 0;color:#ccc;font-size: 14px'>" + abstract + "</div>" +
            "<div style='padding:5px'>" + images_node + "</div>" +
            "<div style='overflow: auto'>" +
            "<div style='float:left'>" + ctime + "</div>" +
            "<div style='float:right'><span class='delete_draft_btn sq_btn sq_btn_gray' draft_id=" + id + " >删除</span>" +
            "<span content_id='" + content_id + "' class='edit_draft_btn sq_btn sq_btn_black' content_id=" + content_id + " draft_id=" + id + "  style='margin-left: 15px'>继续编辑</span></div>" +
            "</div>" +
            "</div>";
    } else if (this.device == config.DEVICE_PC) {
        var images_node = '';
        if (image_urls) {
            for (var i in image_urls) {
                images_node += '<image src="' + image_urls[i] + '"/>';
            }
        }
        item +=
            "<div class='list_item' draft_id=" + id + " style='width:100%;padding:10px 15px;border-bottom: 1px solid #eee'>" +
            "<div style='padding:10px 0 ;color:#8d8d8d;font-size: 16px'>" + title + "</div>" +
            "<div class='item_abstract' draft_id=" + id + " style='padding:10px 0;color:#ccc;font-size: 14px'>" + abstract + "</div>" +
            "<div style='padding:5px'>" + images_node + "</div>" +
            "<div style='overflow: auto'>" +
            "<div style='float:left'>" + ctime + "</div>" +
            "<div style='float:right'><span class='delete_draft_btn sq_btn sq_btn_gray' draft_id=" + id + " content_id=" + content_id + ">删除</span><span class='edit_draft_btn sq_btn sq_btn_black' draft_id=" + id + " content_id=" + content_id + "  style='margin-left: 15px'>继续编辑</span></div>" +
            "</div>" +
            "</div>";
    }
    return item;
};
EditViewController.prototype.getTrashPan = function () {
    var editPan =
        ' <div class="container-fluid trash_pan" style="z-index:9000;height:' + $(window).height() + 'px;width:100%;position:fixed;top:0;background-color: rgba(0,0,0,0.5);">' +
        ' <div id="article_list_form" class="col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 60px"> ' +
        ' <div class="col-xs-12" style="position:relative;background-color: white;padding:20px 20px 0;border-radius: 5px"> ' +
        ' <img class="close_trash_btn" style="position:absolute;right:-15px;top:-15px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png" /> ' +
        ' <div style="margin-top:5px;width: 100% ;">回收站</div> ' +
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div class="trash_list_container" style="height:' + ($(window).height() - 200) + 'px;overflow-y: auto"></div>' +
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div style="margin-top:5px;margin-bottom:5px;width: 100% ;text-align: center">' +
        '<span class="sq_btn sq_btn_gray delete_trash_btn">删除</span>' +
        '<span class="sq_btn sq_btn_black recover_trash_btn" style="margin-left: 20px">恢复</span>' +
        '</div> ' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ';
    return editPan;
};
EditViewController.prototype.getTrashListItem = function (id, title, abstract, ctime, image_urls) {
    var item = '';
    var images_node;
    if (image_urls.length > 0)
        images_node = '<image style="width:100%" src="' + image_urls[0] + '"/>';
    item +=
        "<div class='list_item' style='width:100%;padding:10px 15px;border-bottom: 1px solid #eee;overflow:auto'>" +
        "<div style='float: left;width:15%;margin-top: 30px;'><input class='trash_checkbox' trash_id='" + id + "' type='checkbox'></div>" +
        "<div style='float: left;width:80%'>" +
        "<div class='col-xs-12'  style='overflow: auto'>" +
        "<div style='float:left;color:#ccc'>" + ctime + "</div>" +
        "</div>" +
        "<div class='col-xs-12' style='margin-top: 10px;padding:0'>";
    if (images_node)
        item += "<div class='col-xs-3 col-sm-3'>" + images_node + "</div>" +
            "<div class='col-xs-9 col-sm-9;padding:0'>";
    else
        item += "<div class='col-xs-12 col-sm-12;padding:0'>";
    item += "<div class='col-xs-12' style='color:#8d8d8d;font-size: 14px;margin-top: 5px;padding:0'>" + title + "</div>" +
        "<div class='col-xs-12 item_abstract' style='color:#ccc;;padding:0;font-size: 12px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-top: 5px'>" + abstract + "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    return item;
};
EditViewController.prototype.getFontSizePan = function () {
    var editPan =
        ' <div class="container-fluid font_size_pan" style="z-index:9000;height:' + $(window).height() + 'px;width:100%;position:fixed;top:0;background-color: rgba(0,0,0,0.5);">' +
        '   <div id="article_list_form" class="col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 180px"> ' +
        '       <div class="col-xs-12 col-sm-8 col-sm-offset-2" style="position:relative;background-color: white;border-radius: 5px"> ' +
        '           <img class="close_font_btn" style="position:absolute;right:-15px;top:-15px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png" /> ' +
        '           <div style="margin:20px 40px 10px 20px ;font-size: 16px">更改字号</div> ' +
        '           <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        '           <div class="font_list_container" style=""></div>' +
        '           <div style="margin-top:15px;margin-bottom:15px;width: 100% ;text-align: center">' +
        '               <span class="sq_btn sq_btn_black submit_font_btn" style="padding:1px 60px">确认更改</span>' +
        '           </div> ' +
        '       </div> ' +
        '   </div> ' +
        ' </div> ';
    return editPan;
};
EditViewController.prototype.setBookDivision = function (data,title) {
    var creation_str='';
     creation_str += '<div id="modify_creation_time" style="z-index:999999;width: 100%;position: fixed;top:0;left: 0;background-color: rgba(0,0,0,0.5); height:' + $(document).height() + 'px;">';
     creation_str +=       '<div class="modify_pan" style="width: 460px;position: fixed;top: 30%;left: 50%;margin-left: -200px;padding: 24px 40px;border-radius:10px;background-color: #fff;">';
     creation_str +=            '<div class="modify_title" style="font-size: 18px;color:#2c2c2c;margin-bottom: 20px;">';
     creation_str +=                 '通过时间节选文章，再创建一本书' ;
     creation_str +=             '</div>' ;
     creation_str +=             '<div class="modify_time" style="margin-bottom: 25px;font-size:0;">';
    creation_str +=                   '<p style="font-size: 14px;color:#454545;margin-bottom: 20px;">请选择时间</p>'
     creation_str +=                 '<p class="time_conntent" style="position: relative;margin-bottom: 20px">';
     creation_str +=                     '<input type="text"  id="datetimepicker_star" readonly="readonly" value="' + data.ctime_start.split(" ")[0] + '" style="display:inline-block;width: 160px;line-height: 26px;border: 1px solid #c3c3c3; border-radius: 10px; text-align: center;cursor:pointer;color: #5d5c5c;letter-spacing: 2px;font-size: 14px;"> ';
     creation_str +=                     '<span style="display:inline-block;vertical-align:middle;width:40px;margin:0 10px;height: 1px;background-color:#c3c3c3;overflow: hidden;"></span>';
     creation_str +=                     '<input type="text"  id="datetimepicker_end" value="' + data.ctime_end.split(" ")[0] + '"  readonly="readonly" style="display:inline-block;width: 160px;line-height: 26px;border: 1px solid #c3c3c3; border-radius: 10px; text-align: center;cursor:pointer;color: #5d5c5c;letter-spacing: 2px;font-size: 14px;">';
     creation_str +=                '</p>' ;
    creation_str +=                   '<p style="font-size: 14px;color:#454545;margin-bottom: 20px;">点击可修改书名：</p>'
    creation_str +=                   '<p style="font-size: 14px;margin-bottom: 0"><input class="new_book_title" style="border:none;background: #eee;color:#666;font-size:12px;line-height: 32px;border-radius: 6px;padding-left:15px;" type="text" placeholder="'+ title +'"></p>'
     creation_str +=            '</div>' ;
     creation_str +=            '<div class="modify_operation" style="margin-bottom: 10px;text-align: center;border-top: 1px solid #ccc;padding-top: 20px">' ;
     creation_str +=                 '<span class="cancel_mod" style="display: inline-block;font-size:12px;line-height: 30px;border-radius: 15px;    background: #ccc;padding: 0 26px;color: #fff;margin-right: 10px;cursor: pointer;">';
     creation_str +=                      '取消';
     creation_str +=                '</span>' ;
     creation_str +=                 '<span class="sure_book_division" style="display: inline-block;font-size:12px;line-height: 30px;border-radius: 15px;    background: #000;padding: 0 26px;color: #fff;margin-left: 10px;cursor: pointer;;">';
    creation_str +=                      '点击创建';
    creation_str +=                  '</span>' ;
    creation_str +=              '</div>' ;
    creation_str +=       '</div>' ;
    creation_str += '</div>' ;
    return creation_str
};
EditViewController.prototype.setBookTime = function (data) {
    var linkstr = '<link href="https://static.shiqichuban.com/assets/css/bootstrap3/bootstrap-datetimepicker.css" rel="stylesheet"/>' +
        '<script src="https://static.shiqichuban.com/assets/js/bootstraps3/bootstrap-datetimepicker.js?t=1506658351"></script>' +
        '<script src="https://static.shiqichuban.com/assets/js/bootstraps3/bootstrap-datetimepicker.zh-CN.js"></script>';
    $('#modify_creation_time').prepend(linkstr);
    $('#datetimepicker_star').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'fr',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('#datetimepicker_end').datetimepicker({
        //年月日
        format: 'yyyy-mm-dd',
        language: 'fr',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
}
EditViewController.prototype.iptSubstr = function (str) {
    var num = 0, str_val = '';
    for (var i = 0; i < str.length; i++) {
        if (num >= 10) {
            break;
        }
        if (str.charCodeAt(i) > 255) {
            num += 1;
            str_val += str[i];
        } else {
            str_val += str[i];
            num += 0.5;
        }
        if (num >= 10) {
            break;
        }
    }
    return {
        str_val: str_val,
        num: num
    };
};