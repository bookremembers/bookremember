/**
 * Created by naxiaoguang on 4/14/16.
 */
function EditBookController() {
    PreviewBookController.call(this);
    this.data_delete_article = {};
    this.data_delete_forward = {};
    this.deletePageNums = [];
    this.currentSelectBtnGroup = null;
    this.hasHeader = false;//是否存在页眉
    this.isLongTouched = false;
    this.startLongTouchTime = 0;
    this.startLongTouchInterval = null;
    this.canEdit = true;
    this.catalog_sort = null ;
}
EditBookController.prototype = new PreviewBookController();
EditBookController.prototype.initEditController = function(book_manager,commandChannel){
    var self = this ;
    self.commandChannel = commandChannel ;
    var options = {
        book_doc : self.book_doc,
        view_type : self.view_type,
        app_version : self.app_version,
        device : self.device,
        status : self.status,
        action : self.action,
        book : self.book ,
        user_id : self.user_id ,
        book_manager:book_manager,
    };
    this.content_controller = new BookContentController(options);
};
EditBookController.prototype.getDeleteArticleData = function () {
    return this.data_delete_article;
};
EditBookController.prototype.hasPageHeader = function () {
    return this.hasHeader;
};
EditBookController.prototype.getCurrentPageContentID = function (callback) {
    var self = this ;
    this.content_controller.getContentByPageNum(self.flipBook,callback);
};
EditBookController.prototype.addArticle_EditButtons = function (handler) {
    var self = this ;
    self.canEdit = true;
    self.content_controller.addContentEditBtnsEvent(handler);
    if(self.book.content_theme_type !== 3){
        $(document).on('mouseenter', '.ubook_content', function () {
            $(this).find('.btnGroup').show();
        }).on('mouseleave', '.ubook_content', function () {
            if(self.device == config.DEVICE_PC){
                $(this).find('.btnGroup').hide();
            }
            if (self.currentSelectBtnGroup) {
                self.currentSelectBtnGroup.find('#edit_btn_list').remove();
                self.currentSelectBtnGroup = null;
            }
        });
    }
};
EditBookController.prototype.createGroupBtnList = function (btnGroup) {
    var self = this ;
    var content_id = $(btnGroup).attr('content_id');
    if (self.currentSelectBtnGroup && self.currentSelectBtnGroup.attr('content_id') != content_id) {
        self.currentSelectBtnGroup.find('#edit_btn_list').remove();
        self.currentSelectBtnGroup = null;
    }
    if ($(btnGroup).find('#edit_btn_list').length > 0) {
        if ($(btnGroup).find('#edit_btn_list').is(":hidden")) {
            $(btnGroup).find('#edit_btn_list').show();
        } else {
            $(btnGroup).find('#edit_btn_list').hide();
        }
        return;
    }
    var layout = '' ;
    var canEdit = true ;
    if(self.book.type === config.BOOK_TYPE_GROUP){
        canEdit = self.book.userCanEditContent(self.user_id,$(btnGroup).parents('.ubook_content').attr('owner_id'));
    }else{
        canEdit = true ;
    }
    layout += '<div id="edit_btn_list" content_id="content_id" style="display:block;color:white;position:absolute;top:-50%;left:-120px;width:120px;padding: 10px 10px 0 10px;background-color: rgba(0,0,0,0.8);border-radius: 5px">' ;
    if(canEdit){
        layout += '<p class="editContent" content_id="' + content_id + '" style="cursor:pointer;border-bottom: 1px solid #666666;padding-bottom: 10px;"><img src="https://static.shiqichuban.com/assets/img/icon/genggai_icon_03.png" style="width:15px;margin-right: 10px"/>编辑文章</p>';
        if (self.data_delete_article[content_id])
            layout += '<p class="recoverContent" content_id="' + content_id + '" style="cursor:pointer;border-bottom: 1px solid #666666;padding-bottom: 10px;"><img class="removeArticleImg" src="https://static.shiqichuban.com/assets/img/icon/genggai_icon_05.png" style="width:15px;margin-right: 10px"/><span class="text">撤销删除</span></p>';
        else{
            layout += '<p class="removeContent" content_id="' + content_id + '" style="cursor:pointer;border-bottom: 1px solid #666666;padding-bottom: 10px;"><img class="removeArticleImg" src="https://static.shiqichuban.com/assets/img/icon/genggai_icon_06.png" style="width:15px;margin-right: 10px"/><span class="text">删除文章</span></p>' ;
        }
    }else{
        if (self.book.role === 1 && self.data_delete_article[content_id])
            layout += '<p class="recoverContent" content_id="' + content_id + '" style="cursor:pointer;border-bottom: 1px solid #666666;padding-bottom: 10px;"><img class="removeArticleImg" src="https://static.shiqichuban.com/assets/img/icon/genggai_icon_05.png" style="width:15px;margin-right: 10px"/><span class="text">撤销删除</span></p>';
        else{
            if(self.book.type === config.BOOK_TYPE_GROUP && self.book.role === 1)
                layout += '<p class="removeContent" content_id="' + content_id + '" style="cursor:pointer;border-bottom: 1px solid #666666;padding-bottom: 10px;"><img class="removeArticleImg" src="https://static.shiqichuban.com/assets/img/icon/genggai_icon_06.png" style="width:15px;margin-right: 10px"/><span class="text">删除文章</span></p>' ;
        }
    }
    if(self.book.content_theme_type !== 3){
        layout += '<p class="addNewContent" content_id="' + content_id + '" style="cursor:pointer;border-bottom: 1px solid #666666;padding-bottom: 10px;"><img src="https://static.shiqichuban.com/assets/img/icon/genggai_icon_08.png" style="width:15px;margin-right: 10px"/>添加文章</p>';
    }
    var paging_btn = $(btnGroup).parent('.ubook_content').attr('paging_btn');
    if (paging_btn && paging_btn != '0') {
        var arr = paging_btn.split('/');
        var str;
        var layout_position = 2;
        for (var i in arr) {
            var value = arr[i];
            if (value == '1') {
                layout_position = 3;
                str = "移至下页";
            }
            else if (value == '2') {
                layout_position = 1;
                str = "移至上页";
            }
            if((self.book.type === config.BOOK_TYPE_GROUP && self.book.role === 1 )|| self.book.type === config.BOOK_TYPE_SELF)
                layout += '<p class="moveContent" layout_position=' + layout_position + ' paging_btn=' + value + ' content_id="' + content_id + '" style="cursor:pointer;border-bottom: 1px solid #ccc;"><img src="https://static.shiqichuban.com/assets/img/icon/genggai_icon_10.png" style="width:15px;margin-right: 10px;"/>' + str + '</p>';
        }
    }
    layout += '</div>';
    $(btnGroup).append(layout);
    $('#edit_btn_list p:last').css('border-bottom', 'none');
    self.currentSelectBtnGroup = $(btnGroup);
};
/**
 * 翻页的时候用于动态添加编辑按钮
 * @param book_doc
 */
EditBookController.prototype.refreshArticleEditButton = function (book_doc) {
    var self = this ;
    if(self.book.content_theme_type === 3){
        if(self.device==='device_pc'||self.device === config.DEVICE_MOBILE){
        var position={};
        if(self.book.size_info.size_id=="140X210"){
            position.top=64;
            position.right=51;
        }else if(self.book.size_info.size_id=="170X230"){
            position.top=93;
            position.right=67;
        }
        $(book_doc).find('.e_book_page').each(function () {
            if ($(this).find('.btnGroup').length === 0) {
                if ($(this).parent().attr('content_id') != 0 && $(this).parent().attr('content_id')) {
                    $(this).css('position', 'relative');
                    var str = self.createEditBtnGroup($(this).parent().attr('article_id'), $(this).parent().attr('content_id'), true);
                    var btn_group_container = '';
                    if (self.device === config.DEVICE_MOBILE) {
                        btn_group_container += '<div class="btnGroup" content_id="' + $(this).parent().attr('content_id') + '" style="z-index:99999;position:absolute;text-align:center;top:' + position.top + 'px;right:' + position.right + 'px;">' + str + '</div>';
                    } else {
                        btn_group_container += '<div class="btnGroup" content_id="' + $(this).parent().attr('content_id') + '" style="display:block;z-index:99999;position:absolute;text-align:center;top:' + position.top + 'px;right:' + position.right + 'px;">' + str + '</div>';
                    }
                    $(this).prepend(btn_group_container);
                }
            }
        });
        }
    }else{
        $(book_doc).find('.ubook_content').each(function () {
            if ($(this).find('.btnGroup').length === 0) {
                $(this).css('position', 'relative');
                var str = self.createEditBtnGroup($(this).attr('article_id'), $(this).attr('content_id'), true);
                var btn_group_container = '' ;
                if(self.device === config.DEVICE_MOBILE)
                    btn_group_container += '<div class="btnGroup" content_id="' + $(this).attr('content_id') + '" style="z-index:99999;position:absolute;text-align:center;margin-top:-5px;right:-20px;">' + str + '</div>';
                else
                    btn_group_container += '<div class="btnGroup" content_id="' + $(this).attr('content_id') + '" style="display:none;z-index:99999;position:absolute;text-align:center;margin-top:-5px;right:-20px;">' + str + '</div>';
                $(this).prepend(btn_group_container);
            }
        });
    }
};
/**
 * 创建编辑按钮
 * @param articleId
 * @param contentId
 * @param isEdit
 * @returns {string}
 */
EditBookController.prototype.createEditBtnGroup = function (articleId, contentId, isEdit) {
    var buttonStr = '';
    if (isEdit == true) {
        buttonStr += '<img content_id=' + contentId + ' article_id=' + articleId + ' style="display:block ;" src="https://static.shiqichuban.com/web/assets/imgs/icon_04.png" title="编辑">';
    }
    return buttonStr;
};
/**
 * 添加单个文章的转载过滤删除按钮
 */
EditBookController.prototype.addContentForwardButton = function (elementClass, isPC, callback) {
    var self = this ;
    var mask =
        '<div class="forward_ctrl_mask" status="auto" style="position:absolute;width:100%;height:100%;top:0;left: 0;text-align:center;background-color:rgba(0,0,0,0.5);" >';
    mask += '<img class="forward_ctrl_icon" status="do_delete" src="https://static.shiqichuban.com/assets/img/icon/icon_image_delete.png" style="cursor:pointer;width:32px;height:32px;">';
    mask += '</div>';
    var addForwardData = function (content_id) {
        self.data_delete_forward[content_id] = content_id;
    };
    var removeForwardData = function (content_id) {
        if (self.data_delete_forward[content_id]) {
            delete self.data_delete_forward[content_id];
        }
    };
    if (isPC) {
        $(document).on('mouseenter', elementClass, function (e) {
            e.stopPropagation();
            if ($(this).children('.forward_ctrl_mask').length == 0) {
                $(this).append(mask);
                $(this).find('.forward_ctrl_icon').css('margin-top', $(this).height() / 2 - 11 + 'px');
                $(this).find('.forward_ctrl_icon').attr('content_id', $(this).attr('content_id'));
            }
        }).on('mouseleave', elementClass, function (e) {
            if ($(this).find('.forward_ctrl_mask').attr('status') == "auto") {
                $(this).find('.forward_ctrl_mask').remove();
            }
        }).on(config.MOUSE_CLICK, '.forward_ctrl_icon', function () {
            var content_id = $(this).attr('content_id');
            if ($(this).attr('status') == "do_delete") {
                $(this).parent().attr('status', "no_auto");
                //点击删除,同时按钮图片变成恢复的样子
                $(this).attr('src', 'https://static.shiqichuban.com/assets/img/icon/icon_image_recover.png');
                $(this).attr('status', "do_recover");
                addForwardData(content_id);
            } else if ($(this).attr('status') == "do_recover") {
                $(this).parent().attr('status', "auto");
                $(this).attr('src', 'https://static.shiqichuban.com/assets/img/icon/icon_image_delete.png');
                $(this).attr('status', "do_delete");
                removeForwardData(content_id);
            }
            if (!callback)return;
            if (self.checkEditDataIsEmpty())
                callback(null);
            else
                callback(self.data_delete_forward);
        });
    } else {
        $(document).on(config.MOUSE_CLICK, elementClass, function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.forward_ctrl_del').remove();
            var content_id = $(this).attr('content_id');
            if ($(this).children('.forward_ctrl_mask').length == 0) {
                if ($(this).children('.forward_ctrl_mask').length == 0) {
                    $(this).append(mask);
                    $(this).find('.forward_ctrl_icon').css('margin-top', $(this).height() / 2 - 11 + 'px');
                    $(this).find('.forward_ctrl_mask').attr('content_id', content_id);
                    $(this).find('.forward_ctrl_mask').attr('class', 'forward_ctrl_del');
                }
            }
        }).on(config.MOUSE_CLICK, '.forward_ctrl_del', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var content_id = $(this).attr('content_id');
            $(this).find('.forward_ctrl_icon').attr('src', 'https://static.shiqichuban.com/assets/img/icon/icon_image_recover.png');
            $(this).attr('class', 'forward_ctrl_recover');
            addForwardData(content_id);
            if (!callback)return;
            if (self.checkEditDataIsEmpty())
                callback(null);
            else
                callback(self.data_delete_forward);
        }).on(config.MOUSE_CLICK, '.forward_ctrl_recover', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.forward_ctrl_del').remove();
            var content_id = $(this).attr('content_id');
            $(this).remove();
            removeForwardData(content_id);
            if (!callback)return;
            if (self.checkEditDataIsEmpty())
                callback(null);
            else
                callback(self.data_delete_forward);
        });
    }
};
/**
 * 获取文章数据
 * @param content_id
 */
EditBookController.prototype.loadContentDataByContentID = function (content_id, callbackFun,err_callback) {
    var self = this ;
    sendData({
        is_api: true,
        url: '/v1/book/content/get/' + self.book.book_id + '/' + content_id,
        method: 'get',
        callback: function (data) {
            callbackFun(data);
        },
        errorFun: function (error) {
            if(err_callback)
                err_callback(error);
        }
    })
};
/**
 * 保存文章
 * @param type
 * @param content_id
 * @param data
 * @param callbackFun
 */
EditBookController.prototype.saveEditArticle = function (type, content_id, data, callbackFun) {
    var self = this ;
    var url;
    if (type == 'editArticle') {
        url = '/v1/book/content/save/' + self.book.book_id + '/' + content_id;
    } else if (type == 'removeArticle') {
        url = "/v1/book/batch_delete_content/";
    }
    sendData({
        is_api: true,
        url: url,
        method: 'post',
        data: data,
        callback: function (data) {
            if (data.minPage) {
                callbackFun(self.book.book_id, data.minPage + self.flipBook.getFrontCoverPageNum());
            }
            else
                callbackFun(self.book.book_id);
            return true;
        },
        errorFun: function (data) {
        }
    })
};
/**
 * 电子书内添加文章
 * @param book_manager
 * @param data
 * @param targetName
 */
EditBookController.prototype.addArticleToBook = function(book_manager,data,targetName){
    var self = this ;
    self.targetName = targetName ;
    var origin_article_time_start  ;
    var origin_article_time_end ;
    var article_time_start ;
    var article_time_end ;
    var tags_dic = {};
    var last_article_id ;
    var selected_article_dic = {};
    var over = false ;
    var isSubmiting = false ;
    var isFetchingList = false ;
    var getArticleList = function(last_id,amount,article_time_start,article_time_end,tags_dic,callback){
        if(isFetchingList)return ;
        isFetchingList = true ;
        var tags_arr = [] ;
        for(var i in tags_dic){
            tags_arr.push(tags_dic[i]);
        }
        var data = {};
        data.amount = amount ;
        if(last_id)
            data.last_article_id = last_id ;
        data.tags = tags_arr ;
        if(article_time_start && article_time_end){
            data.from = article_time_start ;
            data.to = article_time_end ;
        }
        book_manager._dataFetcher.getArticleList(data,function(result) {
            isFetchingList = false ;
            var articles = result.articles;
            for (var i in articles) {
                var article_item =
                    "<div class='article_item' article_id='" + articles[i].id + "' style='padding:10px 0;overflow: auto;border-bottom: 1px solid #eee'>" +
                    "<div style='width:50px;float:left;text-align: center;line-height: 60px;'><input class='book_article_checkbox' type='checkbox' article_id='" + articles[i].id + "'/></div>" +
                    "<div style='float:left;width:" +(isPC() ? 300 : ($(window).width() - 140) ) +"px'>" +
                    "<div style='width:100%;margin-top:5px;color:#8d8d8d;font-size: 10px'>" + articles[i].ctime + "</div>" +
                    "<div style='overflow: hidden;margin-top: 5px'>";
                if (articles[i].images[0].indexOf('http') > -1) {
                    article_item += "<div style='float:left;width:60px;height:60px'><img style='width:100%;height:100%' src='" + articles[i].images[0] + "'></div>";
                    article_item += "<div style='float:left;width:" + (isPC() ? 230 : $(window).width() - 215) +"px;margin-left: 10px'>" +
                        "<div style='font-size: 12px;font-weight: bold;width:100%;white-space: nowrap;margin-top: 10px;color:#8d8d8d;text-overflow: ellipsis;overflow-x: hidden'>" + articles[i].title + "</div>" +
                        "<div style='white-space: nowrap;font-size: 10px;width:100%;margin-top: 10px;color:#8d8d8d;text-overflow: ellipsis;overflow-x: hidden'>" + articles[i].abstract + "</div>" +
                        "</div>";
                } else {
                    article_item += "<div style='float:left;width:300px'>" +
                        "<div style='font-size: 12px;font-weight: bold;width:100%;white-space: nowrap;margin-top: 5px;color:#8d8d8d;text-overflow: ellipsis;overflow-x: hidden'>" + articles[i].title + "</div>" +
                        "<div style='white-space: nowrap;font-size: 10px;width:100%;margin-top: 5px;color:#8d8d8d;text-overflow: ellipsis;overflow-x: hidden'>" + articles[i].abstract + "</div>" +
                        "</div>";
                }
                article_item +=
                    "</div>" +
                    "</div>" +
                    "</div>";
                $('.article_list_container').append(article_item);
                last_article_id = articles[i].id;
            }
            if(result.articles.length < data.amount){
                over = true ;
                if($('.over_bar').length == 0)
                    $('.article_list_container').append("<div class='over_bar' style='text-align: center;margin-top: 10px;height:40px;line-height: 40px;background-color: #eeeeee;border-radius: 3px'>没有数据了</div>");
            }
            if(callback)
                callback();
        });
    };
    if($('.article_first_pan').length == 0){
        $(document.body).append(book_manager._viewController.addArticleListPan(self.targetName));
        $(document).on('change','.book_article_checkbox',function(){
            var selected = $(this).prop('checked') ;
            var article_id = $(this).attr('article_id') ;
            if(selected == true){
                selected_article_dic[article_id] = article_id ;
            }else{
                delete selected_article_dic[article_id] ;
            }
        }).on(config.MOUSE_CLICK,'.writeNewArticleBtn',function(e){
            e.stopPropagation();
            tags_dic = {};
            $('.article_first_pan').hide();
            $('.article_list_container').children().remove();
            book_manager._myMiniEditor.clearMiniDate();
            book_manager._myMiniEditor.setContent('');
            $('#edit_title').val('');
            $('.nextStepBtn').html('下一步');
            $('.edit_first_pan').show();
            $('.addArticleBtn').attr('content_id', $(data.target).attr('content_id'));
            $('.position_pre_input').prop('checked',true);
            if(self.targetName === '.over_page'){
                $('.position_pre').hide();
                $('.position_next').hide();
            }else{
                $('.position_pre').show();
                $('.position_next').show();
            }
        }).on(config.MOUSE_CLICK,'.close_article_first_btn',function(e){
            e.stopPropagation();
            $('.article_first_pan').hide();
            $('.article_list_container').children().remove();
            tags_dic = {};
        }).on(config.MOUSE_CLICK,'.close_article_condition_btn',function(e){
            e.stopPropagation();
            $('.book_article_tag').remove();
            $('.book_article_tag_container').find('.book_article_tag').remove();
            $('.article_condition_pan').hide();
            $('.article_first_pan').show();
            selected_article_dic = {};
        }).on(config.MOUSE_CLICK,'.condition_select_btn',function(e){
            e.stopPropagation();
            $('.article_first_pan').hide();
            if($('.article_condition_pan').length == 0){
                $(document.body).append(book_manager._viewController.addArticleConditionPan());
            }else{
                $('.article_condition_pan').show();
            }
            book_manager._dataFetcher.getArticleRangeTime(function(data){
                origin_article_time_start = data.beginTime ;
                origin_article_time_end = data.endTime ;
                article_time_start = data.beginTime ;
                article_time_end = data.endTime ;
                $('.article_form_datetime_start').attr('data-date',article_time_start);
                $('.article_ke_date_input_end').attr('data-date',article_time_start);
                $('.article_ke_date_input_start').val(article_time_start);
                $('.article_ke_date_input_end').val(article_time_end);
                if($('.article_form_datetime_start').attr('init') == null){
                    $('.article_form_datetime_start').attr('init','1');
                    $('.article_form_datetime_start').datetimepicker({
                        format: 'yyyy-mm-dd',
                        startDate: article_time_start,
                        endDate: article_time_end,
                        language: 'fr',
                        weekStart: 1,
                        todayBtn: 1,
                        autoclose: 1,
                        todayHighlight: 1,
                        startView: 2,
                        minView: 2,
                        forceParse: 1
                    }).on('changeDate', function (e) {
                        article_time_start= $('.article_form_datetime_start').datetimepicker('getFormattedDate');
                        $('.article_ke_date_input_start').val(article_time_start);
                        $('.article_form_datetime_end').datetimepicker('setStartDate' , article_time_start);
                    });
                    $('.article_form_datetime_end').datetimepicker({
                        //年月日
                        format: 'yyyy-mm-dd',
                        startDate: article_time_start,
                        endDate: article_time_end,
                        language: 'fr',
                        weekStart: 1,
                        todayBtn: 1,
                        autoclose: 1,
                        todayHighlight: 1,
                        startView: 2,
                        minView: 2,
                        forceParse: 1
                    }).on('changeDate', function (e) {
                        article_time_end = $('.article_form_datetime_end').datetimepicker('getFormattedDate');
                        $('.article_ke_date_input_end').val(article_time_end);
                        $('.article_form_datetime_start').datetimepicker('setEndDate' , article_time_end);
                    });
                }else{
                    $('.article_form_datetime_start').datetimepicker('update');
                    $('.article_form_datetime_end').datetimepicker('update');
                    $('.article_form_datetime_start').datetimepicker('setStartDate' ,article_time_start);
                    $('.article_form_datetime_start').datetimepicker('setEndDate',article_time_end);
                    $('.article_form_datetime_end').datetimepicker('setStartDate',article_time_start);
                    $('.article_form_datetime_end').datetimepicker('setEndDate',article_time_end);
                }
            });
            book_manager._dataFetcher.getArticleTags(function(data){
                var tags = data.tags ;
                var len = tags.length ;
                for(var i= 0 ; i < len ; i++){
                    (function(index){
                        if(tags_dic[index.toString()])
                            var tag = "<div class='sq_tag book_article_tag' key='"+ index +"' name='" + tags[index] + "' style='line-height:20px;float:left;margin-right: 5px;cursor: pointer;background-color: black'>" + tags[index] +"</div>" ;
                        else
                            var tag = "<div class='sq_tag book_article_tag' key='"+ index +"' name='" + tags[index] + "' style='line-height:20px;float:left;margin-right: 5px;cursor: pointer'>" + tags[index] +"</div>" ;
                        $('.book_article_tag_container').append(tag);
                    })(i);
                }
            })
        }).on(config.MOUSE_CLICK,'.book_article_tag',function(e){
            e.stopPropagation();
            var key = $(this).attr('key') ;
            var tag = tags_dic[key] ;
            if(tag != null){
                $(this).css('background-color','white') ;
                delete tags_dic[key]
            }else{
                $(this).css('background-color','black') ;
                tags_dic[key] = $(this).attr('name') ;
            }
        }).on(config.MOUSE_CLICK,'.reset_selected_article',function(e){
            e.stopPropagation();
            $('.article_ke_date_input_start').val(origin_article_time_start);
            $('.article_ke_date_input_end').val(origin_article_time_end);
            $('.book_article_tag').css('background-color','white') ;
            tags_dic = {} ;
            selected_article_dic = {};
            article_time_start = origin_article_time_start;
            article_time_end = origin_article_time_end;
            $('.article_form_datetime_start').datetimepicker('setStartDate' ,article_time_start);
            $('.article_form_datetime_start').datetimepicker('setEndDate',article_time_end);
            $('.article_form_datetime_end').datetimepicker('setStartDate',article_time_start);
            $('.article_form_datetime_end').datetimepicker('setEndDate',article_time_end);
        }).on(config.MOUSE_CLICK,'.submit_condition_article',function(e){
            $('.article_condition_pan').hide();
            $('.article_first_pan').show();
            $('.book_article_tag').remove();
            $('.article_list_container').children().remove();
            last_article_id = null ;
            over = false ;
            selected_article_dic = {};
            getArticleList(last_article_id,10,article_time_start,article_time_end,tags_dic,function(){
            });
        }).on(config.MOUSE_CLICK,'.submit_add_selected_article',function(e){
            if(isSubmiting == true)return ;
            isSubmiting = true ;
            var article_ids = [];
            for(var i in selected_article_dic){
                article_ids.push(selected_article_dic[i])
            }
            if(article_ids.length == 0){
                showConfirm('没有选择的文章',null,null,null,null,'ok');
                isSubmiting = false ;
                return ;
            }
            if(self.book.content_theme_type === 3){
                var direction=1;
            }else{
                var direction=self.book_manager.direction;
            }
            showLoading('正在添加文章',true);
            book_manager._dataFetcher.addArticleToBook({
                book_id:self.book.book_id,
                content_id:book_manager._content_id,
                direction:direction,
                article_ids:article_ids
            },function(data){
                book_manager.toReload(self.book.book_id, data.minPage + self.getFlipBook().getFrontCoverPageNum());
            },function(error){
                isSubmiting = false ;
                if(error.err_code && (error.err_code == 38 || error.err_code == 44))
                    showAlert(error.err_msg);
                showLoading('',false);
            })
        }).on(config.MOUSE_CLICK, '.book_article_position_pre_input', function(e) {
            if ($(this).prop('checked') == true) {
                self.book_manager.direction = -1;
            }
        }).on(config.MOUSE_CLICK, '.book_article_position_next_input', function(e) {
            if ($(this).prop('checked') == true) {
                self.book_manager.direction = 1;
            }
        });
        $(".article_list_container").scroll(function(){
            if(over == true)return ;
            if($(this)[0].scrollTop + $(this).height() >= $(this)[0].scrollHeight - 100){
                getArticleList(last_article_id,10,article_time_start,article_time_end,tags_dic);
            }else{
            }
        });
    }
    if(self.targetName === '.over_page'){
        $('.book_article_position_pre').hide();
        $('.book_article_position_next').hide();
        $('.position_pre').hide();
        $('.position_next').hide();
        $('.submit_add_selected_article').css("margin-left",0);
        self.book_manager.direction = 1;
    }else{
        $('.position_pre').show();
        $('.position_next').show();
        $('.book_article_position_pre').show();
        $('.book_article_position_next').show();
        $('.book_article_position_pre_input').prop('checked',true);
        $('.submit_add_selected_article').css("margin-left","40px");
        self.book_manager.direction = -1;
    }
    getArticleList(last_article_id,10,article_time_start,article_time_end,tags_dic,function(){
        if($('.article_list_container').find('.article_item').length == 0){
            $('.writeNewArticleBtn').trigger(config.MOUSE_CLICK);
        }else{
            $('.article_first_pan').show();
        }
    });
};
/**
 * app使用的方法====================================
 * @param content_id
 */
EditBookController.prototype.selectArticle = function (content_id) {
    if(content_id == null)return ;
    var self = this ;
    self.unselectArticle();
    var selector = ".ubook_content[content_id=" + content_id + "]";
    $(selector).addClass('select_article');
    $(selector).css('position', 'relative');
    var has = $(selector).has('.e-mask').length ? 'true' : 'false';
    var mask = '<div class="e-mask" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color: #0a3191;opacity: 0.3"></div>';
    if (has === 'false') {
        $(selector).append(mask);
        if (self.book.content_theme_type === 1) {
            //微博样式
            $('.ubook_img[content_id=' + content_id + ']').append(mask);
        }
    }
};
EditBookController.prototype.unselectArticle = function (content_id) {
    var self = this ;
    var selector = ".ubook_content[content_id=" + content_id + "]";
    if ($(selector).find('.e-mask').length > 0) {
        $(selector).find('.e-mask').remove();
        if (self.book.content_theme_type === 1) {
            //微博样式
            $('.ubook_img[content_id=' + content_id + ']').find('.e-mask').remove();
        }
    }
    $(selector).removeClass('select_article');
};
EditBookController.prototype.recoverArticle_ids = function (contents_ids, catalog_book_id, callback) {
    for (var i = 0; i < contents_ids.length; i++) {
        this.recoverArticle(contents_ids[i], catalog_book_id, callback);
    }
};
EditBookController.prototype.removeArticle_ids = function (contents_ids, catalog_book_id, callback) {
    for (var i = 0; i < contents_ids.length; i++) {
        this.removeArticle(contents_ids[i], catalog_book_id, callback);
    }
};
EditBookController.prototype.removeContentByID = function(content_id,callback){
    var self = this ;
    if(this.book.content_theme_type === 3){
        var selector = ".page[content_id=" + content_id + "]";
    }else{
        var selector = ".ubook_content[content_id=" + content_id + "]";
    }
    self.data_delete_article[content_id] = content_id;
    self.setRecoverArticleMask(selector, content_id);
    if (!callback)return;
    if (self.checkEditDataIsEmpty())
        callback(null);
    else
        callback(self.data_delete_article);
};
EditBookController.prototype.recoverContentByID = function(content_id,callback){
    var self = this ;
    var selector = ".ubook_content[content_id=" + content_id + "]";
    delete self.data_delete_article[content_id];
    self.setRemoveArticleMask(selector, content_id);
    if (!callback)return;
    if (self.checkEditDataIsEmpty())
        callback(null);
    else
        callback(self.data_delete_article);
};
/**
 * 删除文章
 * @param content_id
 * @param article_id
 * @param callback
 */
EditBookController.prototype.removeArticle = function (content_id, article_id, callback) {
    var self = this ;
    self.unselectArticle();
    if(this.book.content_theme_type === 3){
        var selector = ".page[content_id=" + content_id + "]";
    }else{
        var selector = ".ubook_content[content_id=" + content_id + "]";
    }
    self.setRecoverArticleMask(selector, content_id, article_id);
    self.data_delete_article[content_id] = content_id;
    var nodes = $(selector).parents(".page-wrapper");
    var minpage = Infinity;
    nodes.each(function (index, element) {
        minpage = Math.min(minpage, parseInt($(element).attr('page')));
    });
    self.deletePageNums[minpage + ''] = minpage;
    if (!callback)return;
    if (self.checkEditDataIsEmpty())
        callback(null);
    else
        callback(self.data_delete_article);
};
EditBookController.prototype.showRecoverBtn = function (content_id, callback) {
    var self = this ;
    var selector = '.ubook_content[content_id=' + content_id + ']';
    $(selector).append(
        '<div class="recover_article_btn" content_id="' + content_id + '" style="width:40px;height:40px;position:absolute;top:0;left:-50px;background-color: black;border-radius: 20px">' +
        '<img src="https://static.shiqichuban.com/assets/img/icon/icon_image_recover.png" style="width:100%;"></div>');
    $(document).on(config.MOUSE_CLICK, '.recover_article_btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var content_id = $(this).attr('content_id');
        self.recoverArticle(content_id, null, function (data) {
            self.removeRecoverBtn(content_id);
            callback(data);
        });
        $(this).remove();
    })
};
EditBookController.prototype.removeRecoverBtn = function (content_id) {
    var selector = '.ubook_content[content_id=' + content_id + ']';
    $(selector).find('.recover_article_btn').remove();
};
/**
 * 文章恢复
 * @param content_id
 * @param article_id
 * @param callback
 */
EditBookController.prototype.recoverArticle = function (content_id, article_id, callback) {
    var self = this ;
    delete self.data_delete_article[content_id];
    var selector = ".ubook_content[content_id=" + content_id + "]";
    self.setRemoveArticleMask(selector, content_id, article_id);
    var nodes = $(selector).parents(".page-wrapper");
    var minpage = Infinity;
    nodes.each(function (index, element) {
        minpage = Math.min(minpage, parseInt($(element).attr('page')));
    });
    delete self.deletePageNums[minpage + ''];
    if (!callback)return;
    if (self.checkEditDataIsEmpty())
        callback(null);
    else
        callback(self.data_delete_article);
};
EditBookController.prototype.recoverAllArticle = function (callback) {
    var self = this ;
    for (var i in self.data_delete_article) {
        self.recoverArticle(self.data_delete_article[i], null, callback);
    }
};
/**
 * 添加批量删除图片按钮==============================================================
 * @param isPC
 * @param touchCallback
 */
EditBookController.prototype.addImageCtrl = function (isPC, callback, longTouchCallback, changeGroupCallback) {
    var self = this ;
    self.bookImageController = new ImageController({
        device:self.device,
        status:self.status,
        action:self.action,
        view_type:self.view_type,
        token:self.token,
        app_version:self.app_version,
        user_id:self.user_id,
        book:self.book,
    },self.commandChannel);
    if (self.device !== config.DEVICE_APP) {
        self.bookImageController.addImageDeleteFunction(function () {
            if (!callback)return;
            if (self.checkEditDataIsEmpty())
                callback(null);
            else
                callback(self.bookImageController.data_delete_images_src);
        });
        self.bookImageController.addImageGroupFunction(changeGroupCallback);
    } else {
        self.bookImageController.addLongTouchController(callback,self.startCheckLongTouch.bind(this),longTouchCallback,self.clearLongTouch.bind(this),self.checkEditDataIsEmpty.bind(this));
    }
};
EditBookController.prototype.startCheckLongTouch = function(ele, callback) {
    var self = this ;
    if (self.isLongTouched) {return;}
    self.isLongTouched = true;
    var content_id = $(ele).attr('content_id');
    //如果已经删除,不能长按
    if (self.data_delete_article[content_id]) {
        return;
    }
    self.startLongTouchInterval = setInterval(function () {
        self.startLongTouchTime += config.LONG_TOUCH_DELTA;
        if (self.startLongTouchTime == config.LONG_TOUCH_DELTA) {
            clearInterval(self.startLongTouchInterval);
            callback(content_id);
        }
    }, config.LONG_TOUCH_DELTA);
};
/**
 * 检查数据是否为空=================================================================
 * @returns {boolean}
 */
EditBookController.prototype.checkEditDataIsEmpty = function () {
    var self = this ;
    if (jQuery.isEmptyObject(self.bookImageController.data_delete_images_src) &&
        jQuery.isEmptyObject(self.bookImageController.data_delete_images_id) &&
        jQuery.isEmptyObject(self.data_delete_article) &&
        jQuery.isEmptyObject(self.data_delete_forward)
    )
        return true;
    return false;
};
/**
 * 翻页后刷新按钮
 */
EditBookController.prototype.refreshPage = function () {
    var self = this ;
    $(self.book_doc).find('.ubook_content').each(function () {
        var content_id = $(this).attr('content_id');
        var article_id = $(this).attr('article_id');
        if (self.data_delete_article[content_id] != null) {
            self.setRecoverArticleMask(this, content_id, article_id);
        } else {
            self.setRemoveArticleMask(this, content_id, article_id);
        }
    });
};
EditBookController.prototype.setRemoveArticleMask = function (selector, content_id, article_id) {
    var self = this ;
    if ($(selector).find('.e-mask').length > 0) {
        $(selector).find('.e-mask').remove();
        if (self.book.content_theme_type === 1) {
            //微博样式
            $('.ubook_img[content_id=' + content_id + ']').find('.e-mask').remove();
        }
    }
};
EditBookController.prototype.setRecoverArticleMask = function (selector, content_id, article_id) {
    var self = this ;
    $(selector).find('.e-mask').remove();
    var mask = '<div class="e-mask" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color: rgba(0,0,0,0.3)"></div>';
    $(selector).append(mask);
    if (self.book.content_theme_type === 1) {
        //微博样式
        $('.ubook_img[content_id=' + content_id + ']').append(mask);
    }
};
EditBookController.prototype.getRemoveData = function(){
    var self = this ;
    if (self.checkEditDataIsEmpty())return;
    var deleteArticleIDS = [];
    var deleteForwardIDs = [];
    var deleteImageIDs;
    for (var i in self.data_delete_article) {
        var id = self.data_delete_article[i];
        if (id != null);
        deleteArticleIDS.push(self.data_delete_article[i])
    }
    for (var i in self.data_delete_forward) {
        var id = self.data_delete_forward[i];
        if (id != null);
        deleteForwardIDs.push(self.data_delete_forward[i])
    }
    if (self.bookImageController.data_delete_images_id != null) {
        deleteImageIDs = [];
        for (var i in self.bookImageController.data_delete_images_id) {
            var cell = {};
            var content_id = self.bookImageController.data_delete_images_id[i]['content_id'];
            cell.content_id = content_id;
            cell.image_ids = [];
            for (var j in self.bookImageController.data_delete_images_id[i]['image_ids']) {
                var image_id = self.bookImageController.data_delete_images_id[i]['image_ids'][j];
                cell.image_ids.push(image_id);
            }
            deleteImageIDs.push(cell);
        }
    }
    var data = {
        book_id: self.book.book_id,
        content_ids: deleteArticleIDS,
        images: self.bookImageController.data_delete_images_src,
        delete_image_ids: deleteImageIDs,
        delete_forward_ids: self.data_delete_forward
    };
    return data ;
};
EditBookController.prototype.saveRemoveArticleChange = function (callbackFun,errFun,remain_article) {
    var self = this ;
    if (self.checkEditDataIsEmpty())return;
    var deleteArticleIDS = [];
    var deleteForwardIDs = [];
    var deleteImageIDs;
    for (var i in self.data_delete_article) {
        var id = self.data_delete_article[i];
        if (id != null);
        deleteArticleIDS.push(self.data_delete_article[i])
    }
    for (var i in self.data_delete_forward) {
        var id = self.data_delete_forward[i];
        if (id != null);
        deleteForwardIDs.push(self.data_delete_forward[i])
    }
    if (self.bookImageController.data_delete_images_id !== null) {
        deleteImageIDs = [];
        for (var i in self.bookImageController.data_delete_images_id) {
            var cell = {};
            var content_id = self.bookImageController.data_delete_images_id[i]['content_id'];
            cell.content_id = content_id;
            cell.image_ids = [];
            for (var j in self.bookImageController.data_delete_images_id[i]['image_ids']) {
                var image_id = self.bookImageController.data_delete_images_id[i]['image_ids'][j];
                cell.image_ids.push(image_id);
            }
            deleteImageIDs.push(cell);
        }
    }
    sendData({
        is_api: true,
        url: API_BOOK_DELETE_ARTICLE,
        data: {
            book_id: self.book.book_id,
            content_ids: deleteArticleIDS,
            images: self.bookImageController.data_delete_images_src,
            delete_image_ids: deleteImageIDs,
            delete_forward_ids: self.data_delete_forward,
            remain_article:remain_article || 0,
        },
        callback: function (data) {
            if (data.minPage) {
                callbackFun(self.book.book_id, data, data.minPage);
            }
            else
                callbackFun(self.book.book_id);
        },
        errorFun: function (data) {
            if(errFun)
                errFun(data);
        }
    })
};
EditBookController.prototype.removeImagesByGroupID = function (group_id) {
    this.bookImageController.removeImagesByGroupID(group_id);
};
EditBookController.prototype.recoverImagesByGroupID = function (group_id, callback) {
    var self = this ;
    this.bookImageController.recoverImagesByGroupID(group_id, function () {
        if (self.checkEditDataIsEmpty())
            callback(false);
        callback(true)
    });
};
EditBookController.prototype.addLongMouseDownEvent = function (callback) {
    var self = this ;
    $(document).on(config.MOUSE_CLICK, '.ubook_content', function (e) {
        e.stopPropagation();
        var ubook_content = this ;
        var canEdit = self.book.userCanEditContent(self.user_id,$(ubook_content).attr('owner_id')) ;
        self.startCheckLongTouch(this, function () {
            callback(
                $(ubook_content).attr('content_id') +
                "," + $(ubook_content).attr('paging_btn') +
                "," + $(ubook_content).attr('owner_id') +
                "," + canEdit
            );
            self.selectArticle($(ubook_content).attr('content_id'));
        });
    }).on('touchend', '.ubook_content', function (e) {
        e.stopPropagation();
        self.clearLongTouch();
    });
};
EditBookController.prototype.clearLongTouch = function () {
    clearInterval(this.startLongTouchInterval);
    this.startLongTouchTime = 0;
    this.isLongTouched = false;
};