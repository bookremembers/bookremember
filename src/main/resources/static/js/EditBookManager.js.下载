function EditBookManager() {
    PreviewBookManager.call(this);
    this._adding_article = false;
    this._origin_article_title = null;
    this._origin_article_content = null;
    this._content_id = null;
    this._myMiniEditor = null;
    this.direction = -1 ;
    this.content_action = "add";
    this.functionListPan = null ;
    this.write_book_tips=0;
    this.edit_book_tips=0;
    this.input_status=false;
    this.imageFileUploadPlugin= null ;
}
EditBookManager.prototype = new PreviewBookManager();
EditBookManager.prototype.initFilePath = function(){
    var self = this ;
    var book_css = STATIC_DOMAIN + '/assets/css/book/flipbook.css?t=1525257121' ;
    if(self.isNightStatus === 1 || self.isNightStatus === true)
        book_css = STATIC_DOMAIN + '/assets/css/book/flipbook_night.css?t=1525257121' ;
    var arr ;
    if(self.device === config.DEVICE_APP){
        arr = [
            // book_css,
        ];
    }else{
        arr = [
            book_css,
            STATIC_DOMAIN + '/assets/css/bootstrap3/bootstrap-slider.css',
            STATIC_DOMAIN + '/assets/css/bootstrap3/bootstrap-datetimepicker.css',
            STATIC_DOMAIN + '/assets/css/jquery/plugin/jquery.cropbox.css',
            STATIC_DOMAIN + '/assets/css/jquery/plugin/jquery-ui.css',
            STATIC_DOMAIN + '/assets/css/jquery/plugin/cropper.min.css',
            STATIC_DOMAIN + '/assets/js/jquery/plugin/jquery-ui.js',
            STATIC_DOMAIN + '/assets/js/jquery/plugin/jquery.mousewheel.js',
            STATIC_DOMAIN + '/assets/js/jquery/plugin/jquery.cropbox.js?t=1514969606',
            STATIC_DOMAIN + '/assets/js/jquery/plugin/jquery.md5.js',
            STATIC_DOMAIN + '/assets/js/jquery/plugin/CanvasToBlob.js',
            STATIC_DOMAIN + '/assets/js/jquery/plugin/cropper.min.js',
            STATIC_DOMAIN + "/assets/js/modules/audio_list.js?t=1556244608",
            STATIC_DOMAIN + "/assets/js/kindEditor/kindeditor-all.js?t=1535528123",
            STATIC_DOMAIN + "/assets/js/kindEditor/controller/data_controller.js?t=1524713071",
            STATIC_DOMAIN + "/assets/js/kindEditor/controller/file_controller.js?t=1556244608",
            STATIC_DOMAIN + "/assets/js/kindEditor/controller/view_controller.js?t=1558492600",
            STATIC_DOMAIN + "/assets/js/kindEditor/controller/editor_manager.js?t=1556525226",
            STATIC_DOMAIN + "/assets/js/kindEditor/editors/mini_editor_2.2.1.js?t=1556244608",
            STATIC_DOMAIN + '/assets/js/bootstraps3/bootstrap-slider.js',
            STATIC_DOMAIN + '/assets/js/bootstraps3/bootstrap-datetimepicker.js?t=1506658351',
            STATIC_DOMAIN + '/assets/js/bootstraps3/bootstrap-datetimepicker.zh-CN.js',
        ];
    }
    return  arr ;
};
EditBookManager.prototype.initController = function(){
    this._bookController = new EditBookController();
    this._dataFetcher = new EditDataFetcher();
    this._viewController = new EditViewController();
};
EditBookManager.prototype.addEditFunction = function(){
    var self = this ;
    self._bookController.initEditController(self,self.commandChannel);
    $(document.body).append(self._viewController.addEditPan());
    if(self.book.type == config.BOOK_TYPE_GROUP){
        if(self.device == config.DEVICE_MOBILE)
            $('.book-container').prepend(self._viewController.addGroupWriteEditBtn());
        self.addGroupWriteEditBtnEvent();
    }
    self.addFunctionList(); //添加修改功能列表
    self.addFunctionEvent();
    if((self.book.type == config.BOOK_TYPE_GROUP && self.book.role == 1) || self.book.type == config.BOOK_TYPE_SELF) {
        self.addCreativeTime(); //创作时间
        self.addTitpageImg(); //修改扉页头像
        self.addEditBookBGMusicEvent();
    }
    self._bookController.content_controller.addOverPageEvent(self.editHandler.bind(this));//电子书最后一页点击添加文章
    self.addContentController(); //增加电子书内容编辑相关控制
    if(self.device !== config.DEVICE_APP){
        self.addEditPanEvent();
    }
    if(self.book.role === 1){
        self.getAccessAllowUsers();
    }
};
EditBookManager.prototype.getAccessAllowUsers = function(){
    var self = this ;
    sendData({
        is_api:true ,
        host:getSocialServerDomain(),
        url:'/v1/book/author/permit/list',
        method:'post',
        data:JSON.stringify({book_id:self.book.book_id,permit_edit:1}),
        callback:function(data){
            var permit_authors = data.authors ;
            var len = permit_authors.length ;
            for(var i = 0 ; i < len ; i++){
                (function(index){
                    self.book.permit_authors[permit_authors[index]] = permit_authors[i] ;
                })(i)
            }
        },
        errorFun:function(e){}
    })
};
EditBookManager.prototype.addGroupWriteEditBtnEvent = function () {
    var self = this ;
    var next_start = '' ;
    var is_saving = false ;
    function getList(){
        sendData({
            url:'/v1/book/draft/list',
            is_api:true,
            method:'get',
            data:{book_id:parseInt(self.book.book_id),next_start:next_start,count:10},
            callback:function(data){
                next_start = data.next_start ? data.next_start : '' ;
                var drafts = data.drafts ;
                if(next_start == '')
                    $('.draftListContainer').children().remove();
                if(drafts) {
                    if ($('.draft_pan').length > 0)
                        $('.draft_pan').show();
                    else
                        $(document.body).append(self._viewController.getDraftPan());
                }else{
                    showAlert('没有草稿箱数据！');
                    return ;
                }
                if (drafts.length > 0) {
                    for (var i = 0; i < drafts.length; i++) {
                        (function (index) {
                            var item_data = drafts[index];
                            var date = new Date(item_data.date * 1000).toLocaleDateString();
                            var hour = new Date(item_data.date * 1000).getHours() ;
                            var minute = new Date(item_data.date * 1000).getMinutes() ;
                            var second = new Date(item_data.date * 1000).getSeconds() ;
                            $('.draftListContainer').append(
                                self._viewController.getDraftListItem(
                                    item_data.draft_id,
                                    item_data.title,
                                    item_data.abstract,
                                    (date + " " + hour + ":" + minute + ":" + second),
                                    item_data.img_urls,
                                    item_data.content_id
                                )
                            )
                        })(i)
                    }
                } else {
                    $('.draftListContainer').children().remove();
                    $('.draftListContainer').append('<div style="text-align: center;line-height: 100px">没有内容～</div>');
                }
                if(self.device == config.DEVICE_MOBILE)
                    $('.sliderbar_container').hide();
            },
            errorFun:function(){
            }
        })
    }
    $(document).on(config.MOUSE_CLICK,'.book_group_write_trash',function(e){
        e.stopPropagation();
        $('.view_banner_img').remove();
        if(self.functionListPan)
            self.functionListPan.hide();
        getList();
    }).on(config.MOUSE_CLICK,'.delete_draft_btn',function(e){
        e.stopPropagation();
        var btn = this ;
        var draft_id =  parseInt($(this).attr('draft_id')) ;
        sendData({
            url:'/v1/book/draft/delete',
            method:'post',
            is_api:true,
            data:JSON.stringify({draft_ids:[draft_id],book_id:parseInt(self.book.book_id)}),
            content_type:'application/json',
            callback:function(data){
                $(btn).parents('.list_item').remove();
                if( $('.draftListContainer').children().length == 0){
                    $('.draftListContainer').append('<div style="text-align: center;line-height: 100px">没有内容～</div>');
                }
                showAlert('删除成功');
            }
        })
    }).on(config.MOUSE_CLICK,'.edit_draft_btn',function(e){
        e.stopPropagation();
        var draft_id =  $(this).attr('draft_id') ;
        var content_id = $(this).attr('content_id') ;
        sendData({
            url:'/v1/book/draft/detail',
            method:'get',
            is_api:true,
            data:{draft_id:draft_id,book_id:self.book.book_id},
            content_type:'application/json',
            callback:function(data){
                var title = data.draft.title ;
                var content = data.draft.content ;
                var date = new Date(data.draft.date * 1000).toLocaleDateString() ;
                var hour = new Date(data.draft.date * 1000).getHours() ;
                var minute = new Date(data.draft.date * 1000).getMinutes() ;
                var second = new Date(data.draft.date * 1000).getSeconds() ;
                $('.edit_first_pan').show();
                // $('#edit_title').val(title);
                // $('.file_input').val('');
                self._myMiniEditor.clearFile();
                self._myMiniEditor.setTitle(title) ;
                self._myMiniEditor.setContent(content);
                self._myMiniEditor.setMiniDate(date + " " + hour + ":" + minute + ":" + second);
                $('.saveToBoxBtn').attr('draft_id',draft_id);
                $('.saveToBookBtn').attr('draft_id',draft_id);
                $('.saveToBoxBtn').attr('content_id',content_id);
                $('.saveToBookBtn').attr('content_id',content_id);
            }
        })
    }).on(config.MOUSE_CLICK,'.cleanDraftBtn',function(e){
        e.stopPropagation();
        sendData({
            url:'/v1/book/draft/empty',
            method:'post',
            is_api:true,
            data:JSON.stringify({book_id:parseInt(self.book.book_id)}),
            content_type:'application/json',
            callback:function(data){
                $('.draftListContainer').children().remove();
                $('.draftListContainer').append('<div style="text-align: center;line-height: 100px">没有内容～</div>');
            }
        })
    }).on(config.MOUSE_CLICK,'.closeDraftPanBtn',function(e){
        e.stopPropagation();
        $('.draft_pan').hide();
        if(self.device == config.DEVICE_MOBILE)
            $('.sliderbar_container').show();
    }).on(config.MOUSE_CLICK, '.saveToBoxBtn', function(e) {
        e.stopPropagation();
        showLoading("正在保存到草稿箱",true);
        if(is_saving)return ;
        is_saving = true ;
        var saveToBoxBtn = this ;
        var draft_id = $(saveToBoxBtn).attr('draft_id') ? $(saveToBoxBtn).attr('draft_id') : 0;
        var date = new Date();
        var update_check = $(saveToBoxBtn).attr('update_check') ;
        var content_id = $(saveToBoxBtn).attr('content_id') ;
        self.checkContent(function(){
            self._myMiniEditor.uploadMediaFile($('<div>' + self._myMiniEditor.getContent() + '</div>'), function() {
                sendData({
                    url:'/v1/book/draft/save',
                    is_api:true,
                    method:'post',
                    data:{
                        "book_id": self.book.book_id,
                        "draft_id": draft_id,              // id不填或者为0表示新增
                        "title":  self._myMiniEditor.getTitle(),                // 默认为日期
                        "date": date.getTime() / 1000,                    // 默认为服务器当前时间***
                        "content": self._myMiniEditor.getContent(),
                        "content_id":content_id || '',
                        "update_check" : update_check
                    },
                    callback:function(data){
                        showConfirm('保存到草稿箱成功!',null,null,null,null,'ok');
                        $('.ke-status-notice').html('');
                        $(saveToBoxBtn).attr('draft_id',data.draft_id);
                        $('.saveToBookBtn').attr('draft_id',data.draft_id);
                        is_saving = false ;
                        if(data.draft_id){
                            $('.item_abstract[draft_id='+ data.draft_id +']').html(data.abstract) ;
                        }
                        $('.close_edit_first_btn').trigger(config.TOUCHE_END);
                        showLoading("",false);
                        if($('.draft_pan').length == 0 || $('.draft_pan').is(':hidden')){
                        }else{
                            $('.draftListContainer').children().remove();
                            getList();
                        }
                    },
                    errorFun:function(data){
                        self.dealError(data,null) ;
                    }
                });
            });
        },function(){
            is_saving = false ;
        });
    }).on(config.MOUSE_CLICK, '.saveToBookBtn', function(e){
        e.stopPropagation();
        var btn = this ;
        var content_id = $(btn).attr('content_id') ;
        var draft_id = $(btn).attr('draft_id');
        if(draft_id){
            self.saveDraftToBook(content_id,draft_id);
        }else{
            $('.edit_first_pan').hide();
            $('.edit_second_pan').show();
            $('.addArticleBtn').attr("content_id",content_id);
        }
    });
    $('.draftListContainer').scroll(function(e){
        if ($(this).scrollTop() >= ($(this).height() - $(window).height())) {
            getList();
        }
    });
};
EditBookManager.prototype.saveDraftToBook = function(content_id,draft_id,force){
    var self = this ;
    self.checkContent(function(content) {
        var send_data = {
            book_id: parseInt(self.book.book_id),
            draft_id: parseInt(draft_id),
            title: self._myMiniEditor.getTitle(),
            date: new Date($('.ke-date-input').val()).getTime(),
            content: content,
            content_id: content_id
        };
        if(force == 1){
            send_data.force_update = 1 ;
        }
        sendData({
            url: "/v1/book/draft/commit",
            is_api: true,
            content_type: 'application/json',
            data: JSON.stringify(send_data),
            callback: function (data) {
                self.refreshToPage(data);
            },
            errorFun: function (data) {
                self.dealError(data, function () {
                    if (data.err_code == 37) {
                        self.saveDraftToBook(content_id,draft_id, 1);
                    }else{
                        showAlert(data.err_msg);
                    }
                });
            }
        });
    })
};
EditBookManager.prototype.checkContent = function(callback,err_callback){
    var self = this ;
    var content = self._myMiniEditor.getContent();
    if (content.trim().length == 0) {
        showConfirm('请输入文章内容', null, null, null, null, 'ok');
        showLoading('',false);
        if(err_callback)
            err_callback()
    }else{
        callback(content);
    }
};
EditBookManager.prototype.getEditor = function(){
    var self = this ;
    return self._myMiniEditor ;
};
EditBookManager.prototype.addEditPanEvent = function() {
    var self = this;
    var saveToSQ = 1; //默认保存到拾柒
    self._myMiniEditor = new MyKindEditor({
        width: $('#edit_content').width() + 'px',
        height: (self.device === config.DEVICE_PC ) ? (this.device_h - 200) * self.book.scale : (this.device_h - 200) * self.book.scale,
        token: self.token,
        audioHandler:function(){
            self.commandChannel.postCommand(ModuleCommand.SHOW_AUDIO_LIST,{type:"multi"})
        },
        save_com: function() {
            self.refreshToPage(data);
        },
    });
    self._myMiniEditor.initMini('#edit_content',function(){
        $(document).on(config.TOUCHE_END, '.close_edit_first_btn', function(e) {
            e.stopPropagation();
            var time = setTimeout(function(){
                $('.edit_first_pan').hide();
                $('.nextStepBtn').removeAttr('content_id');
                $('.addArticleBtn').removeAttr('content_id');
                // $('#edit_title').val('');
                // $('#file_input').val('');
                self._myMiniEditor.clearFile();
                self._myMiniEditor.setTitle('') ;
                self._myMiniEditor.setContent('');
                $('.saveToBoxBtn').removeAttr('draft_id');
                $('.saveToBookBtn').removeAttr('content_id');
                clearTimeout(time);
            },100);
        }).on(config.MOUSE_CLICK, '.close_edit_second_btn', function(e) {
            e.stopPropagation();
            $('.edit_second_pan').hide();
            $('.nextStepBtn').removeAttr('content_id');
            $('.addArticleBtn').removeAttr('content_id');
            // $('#edit_title').val('');
            // $('#file_input').val('');
            self._myMiniEditor.clearFile();
            self._myMiniEditor.setTitle('') ;
            self._myMiniEditor.setContent('');
        }).on(config.MOUSE_CLICK, '.back_edit_first_btn', function(e) {
            e.stopPropagation();
            $('.edit_first_pan').show();
            $('.edit_second_pan').hide();
        }).on(config.MOUSE_CLICK, '.saveToLocalInput', function(e) {
            e.stopPropagation();
            if ($(this).prop('checked') == true) {
                $('.tag_input').show();
                saveToSQ = 1;
            }
        }).on(config.MOUSE_CLICK, '.unSaveToLocalInput', function(e) {
            e.stopPropagation();
            if ($(this).prop('checked') == true) {
                $('.tag_input').hide();
                saveToSQ = 0;
                $('.tag_container').children().remove();
            }
        }).on(config.MOUSE_CLICK, '.position_pre_input', function(e) {
            e.stopPropagation();
            if ($(this).prop('checked') == true) {
                self.direction = -1;
            }
        }).on(config.MOUSE_CLICK, '.position_next_input', function(e) {
            e.stopPropagation();
            if ($(this).prop('checked') == true) {
                self.direction = 1;
            }
        }).on(config.MOUSE_CLICK, '.upload_img_btn', function(e) {
            e.stopPropagation();
            self._myMiniEditor.clearFile();
        }).on(config.MOUSE_CLICK, '.nextStepBtn', function(e) {
            e.stopPropagation();
            var content_id = $(this).attr('content_id');
            self.checkContent(function(){
                if (content_id) {
                    $('.edit_first_pan').hide();
                    $('.edit_second_pan').show();
                    $('.addArticleBtn').attr("content_id",content_id);
                    // self.updateArticle(content_id);
                } else {
                    var content = self._myMiniEditor.getContent();
                    if (content.trim().length != 0) {
                        $('.edit_first_pan').hide();
                        $('.edit_second_pan').show();
                    } else {
                        showConfirm('请输入文章内容', null, null, null, null, 'ok');
                    }
                }
            },function(){
                showConfirm('没有文章内容！',null,null,null,null,'ok');
            });
        }).on(config.MOUSE_CLICK, '.addArticleBtn', function(e) {
            if(self.book.content_theme_type===3){
                self.direction=1;
            }
            self.addNewArticle($(this).attr('content_id'),saveToSQ,self.direction,$(this).attr('update_check'));
        }).on(config.MOUSE_CLICK, '.tag', function(e) {
            $(this).remove();
            $('.tag_input').removeAttr('disabled', 'disabled');
        });
        $('.tag_input').on('keydown', function(e) {
            if (e.keyCode == 13) {
                if ($('.tag_container').children().length >= 6) {
                    showConfirm('最多只能输入6个标签', null, null, null, null, 'ok');
                    $('.tag_input').val('');
                    return;
                }
                var value = $('.tag_input').val();
                if (value.trim().length > 0) {
                    var tag = '<span class="tag sq_btn sq_btn_gray" style="margin-right: 1px;margin-top: 5px;">' + value + " ×" + '</span>';
                    $('.tag_container').append(tag);
                }
                if (value.trim().length > 14) {
                    showConfirm('字符长度不能大于14', null, null, null, null, 'ok');
                }
                if (value.trim().length == 0) {
                    showConfirm('请输入标签字符', null, null, null, null, 'ok');
                }
                if ($('.tag_container').children().length >= 6) {
                    $('.tag_input').prop('disabled', 'disabled');
                }
                $('.tag_input').val('');
            }
        })
    });
};
EditBookManager.prototype.updateArticle = function(content_id){
    var self = this ;
    self.checkContent(function(content){
        var title = self._myMiniEditor.getTitle();
        var article_date =new Date().Format("yyyy-MM-dd hh:mm:ss");
        showLoading('正在保存文章...', true);
        if (self.book.content_theme_type === 1) {
            if (content.toString() == self._origin_article_content.toString()) {
                $('.edit_first_pan').hide();
                $('.loading_mask').remove();
                // $('#edit_title').val('');
                self._myMiniEditor.setTitle('') ;
                self._myMiniEditor.setContent('');
                return;
            }
        } else if (self.book.content_theme_type === 2) {
            if (title &&
                self._origin_article_title && title.toString() == self._origin_article_title.toString() &&
                content.toString() == self._origin_article_content.toString()
            ) {
                $('.edit_first_pan').hide();
                $('.loading_mask').remove();
                // $('#edit_title').val('');
                // self._myMiniEditor.clearFile();
                self._myMiniEditor.setTitle('') ;
                self._myMiniEditor.setContent('');
                return;
            }
        }
        self._myMiniEditor.uploadMediaFile($('<div>' + self._myMiniEditor.getContent() + '</div>'), function() {
            //文章二次编辑
            self._bookController.saveEditArticle(
                'editArticle',
                self._content_id, {
                    title: title,
                    content: self._myMiniEditor.getContent(),
                    date: article_date
                },
                function(book_id, page) {
                    self.toReload(book_id, page);
                });
        });
    });
};
EditBookManager.prototype.addNewArticle = function(content_id,saveToSQ,direction,update_check,force){
    var self = this ;
    if (self._adding_article == true) {
        showAlert("正在添加文章");
        return;
    }
    self.checkContent(function(content){
        showLoading('正在保存文章...', true);
        $('.edit_first_pan').show();
        $('.edit_second_pan').hide();
        self._adding_article = true;
        var title = self._myMiniEditor.getTitle();
        var tags = [];
        $('.tag_container').find('.tag').each(function(index, value) {
            var tag_str = $(value).html().replace(' ×', '');
            tags.push(tag_str);
        });
        self._myMiniEditor.uploadMediaFile($('<div>' + self._myMiniEditor.getContent() + '</div>'), function() {
            var url ;
            if(self.content_action == "edit"){
                url = '/v1/book/content/save/' + self.book.book_id + '/' + content_id ;
            }else{
                url = '/v1/book/content/add' ;
            }
            var send_data = {
                date: $('.ke-date-input').attr('_time'),
                save_as_article: saveToSQ,
                direction: direction,
                content: self._myMiniEditor.getContent(),
                tags: tags,
                content_id: content_id || '',
                title: title,
                book_id: self.book.book_id,
                update_check : update_check
            };
            if(force == 1){
                send_data.force_update = 1 ;
            }
            sendData({
                is_api: true,
                url: url,
                data: send_data,
                callback: function(data) {
                    self.refreshToPage(data);
                },
                errorFun: function(data) {
                    self._adding_article = false;
                    self.dealError(data,function(){
                        if(data.err_code == 37){
                            self.addNewArticle(content_id,saveToSQ,direction,update_check,1);
                        }else{
                            showAlert(data.err_msg)
                        }
                    });
                }
            })
        });
    });
};
EditBookManager.prototype.dealError = function(error,okFun){
    var self = this ;
    if(error.err_code == 37){
        showConfirm(error.err_msg  + ' 点击确定覆盖文章',null,null,okFun,null,'ok|cancel');
    }else if(error.err_code == 40){
        showConfirm(error.err_msg + ",点击确定新建文章",null,null,function(){
            var draft_id = $('.saveToBookBtn').attr('draft_id');
            var content_id = $('.saveToBookBtn').attr('content_id');
            self.saveDraftToBook(content_id,draft_id,1);
        },null,'ok|cancel')
    }else if(error.err_msg)
        showAlert(error.err_msg);
    else
        showAlert('数据请求失败！');
    self._myMiniEditor.showStatus('','black');
    showLoading('',false);
};
EditBookManager.prototype.forceUpdate = function(){
};
EditBookManager.prototype.addFunctionList = function(callback) {
    var self = this;
    if ($('.function_btn').length <= 0) return;
    $('.function_btn').append(self._viewController.getFunctionListPan(function(pan, style_btn, edit_btn) {
        $('.function_btn').append(pan);
        self.functionListPan = $('.function_list') ;
        var style_btn_data = [];
        var edit_btn_data = [];
        if(self.book.type !== config.BOOK_TYPE_GROUP || self.book.role === 1){
            style_btn_data["change_size_btn"] = style_btn["change_size_btn"];
            if (self._bookController.hasPageHeader()) {
                edit_btn_data["edit_page_header_btn"] = edit_btn["edit_page_header_btn"];
                style_btn_data["change_page_header_btn"] = style_btn["change_page_header_btn"];
                style_btn_data["change_page_catalog_btn"] = style_btn["change_page_catalog_btn"];
            }
            edit_btn_data["edit_create_time_btn"] = edit_btn["edit_create_time_btn"];
            edit_btn_data["edit_author_photo_btn"] = edit_btn["edit_author_photo_btn"];
            if (self.book.content_theme_type === 2 || self.book.isColorBook) {
                if(self.book.content_theme_type === 2){
                    edit_btn_data["edit_indent_btn"] = edit_btn["edit_indent_btn"];
                }
                edit_btn_data["edit_font_size"] = edit_btn["edit_font_size"];
            }
            if(self.book.type === config.BOOK_TYPE_SELF){
                if (!self.book.isColorBook) {
                    edit_btn_data["edit_trash_btn"] = edit_btn["edit_trash_btn"];
                }
            }
            edit_btn_data["edit_bg_music"] = edit_btn["edit_bg_music"];
        }
        if(self.book.type === config.BOOK_TYPE_GROUP){
            edit_btn_data["book_group_write_trash"] = edit_btn["book_group_write_trash"];
        }
        if (self.book.content_theme_type === 2 && self.book.type === 0) {
            edit_btn_data["book_theme_convert"] = edit_btn["book_theme_convert"];
        }
        edit_btn_data["book_division"] = edit_btn["book_division"];
        self.getFiltersBtn(function(data) {
            var book_state = data.book_states;
            for (var i in book_state) {
                if (book_state[i].module === "insert_page") {
                    if (book_state[i].display == 1) {
                        edit_btn_data["edit_insert_page_btn"] = edit_btn["edit_insert_page_btn"];
                        edit_btn_data["edit_insert_page_btn"]['des'] = book_state[i].desc;
                    }
                    if (book_state[i].state === 1) {
                        style_btn_data['change_insert_btn'] = style_btn['change_insert_btn'];
                        style_btn_data['change_insert_btn']['state'] = book_state[i].state;
                        style_btn_data['change_insert_btn']['des'] = book_state[i].desc;
                    }
                } else if (book_state[i].module === "increment_import" && book_state[i].display === 1) {
                    edit_btn_data['edit_plus_article_btn'] = edit_btn['edit_plus_article_btn'];
                } else if (book_state[i].module === "fwd_content" && book_state[i].display === 1) {
                    edit_btn_data['edit_forward'] = edit_btn['edit_forward'];
                    edit_btn_data['edit_forward']['state'] = book_state[i].state;
                    edit_btn_data['edit_forward']['des'] = book_state[i].desc;
                    edit_btn_data['edit_forward']['module'] = book_state[i].module;
                    if (book_state[i].state === 0)
                        edit_btn_data['edit_forward']['src'] = STATIC_DOMAIN + '/assets/img/book/cebian_icon_21.png';
                    else
                        edit_btn_data['edit_forward']['src'] = STATIC_DOMAIN + '/assets/img/book/cebian_icon_23.png';
                } else if(book_state[i].module === "pen_name" && book_state[i].display === 1 && self.book.type === config.BOOK_TYPE_GROUP){
                    edit_btn_data['show_nickname'] = edit_btn['show_nickname'];
                    edit_btn_data['show_nickname']['state'] = book_state[i].state;
                    edit_btn_data['show_nickname']['des'] = book_state[i].desc;
                    edit_btn_data['show_nickname']['module'] = book_state[i].module;
                    edit_btn_data['show_nickname']['type'] = book_state[i].type;
                }
            }
            for (var j in style_btn_data) {
                var left_btn = style_btn_data[j];
                if (left_btn)
                    line = "<div class='btn style_function_btn " + left_btn['name'] + "' style='display: inline-block;float:left;'><img src='" + left_btn['src'] + "' style='margin-right: 10px;width:14px;height:14px;vertical-align: sub'/>" + left_btn['des'] + "</div>";
                $('.design_btn_container').append(line);
            }
            for (var k in edit_btn_data) {
                var line = "";
                var left_btn = edit_btn_data[k];
                if (left_btn)
                    if(left_btn.type === "checkbox"){
                        var checked = left_btn.state === 1 ? "checked" : "" ;
                        line +=
                            "<div value='" + left_btn['state'] + "' action='" + left_btn['module'] + "' class='btn edit_function_btn " + left_btn['name'] + "' style='display: inline-block;float:left;'>" +
                            "<input type='"+ left_btn.type +"' value='"+ left_btn.state+"' module='"+ left_btn.module +"' style='margin-right: 10px;'" + checked +">"+ left_btn.des +"</div></div>";
                    }else{
                        line +=
                            "<div value='" + left_btn['state'] + "' action='" + left_btn['module'] + "' class='btn edit_function_btn " + left_btn['name'] + "' style='display: inline-block;float:left;'>" +
                            "<img src='" + left_btn['src'] + "' style='margin-right: 10px;width:14px;height:14px;vertical-align: sub'/>" +
                            left_btn['des'] + "</div>";
                    }
                $('.edit_btn_container').append(line);
            }
            if($('.design_btn_container').children('.btn').length == 0){
                $('.design_btn_container_title').remove();
                $('.edit_btn_container_title').css('border-top','none');
                $('.edit_btn_container_title').css('padding-top','0');
            }
            if($('.edit_btn_container').children('.btn').length == 0)
                $('.edit_btn_container_title').remove();
            $('.style_function_btn:odd').css({
                'float': 'right'
            });
            $('.edit_function_btn:odd').css({
                'float': 'right'
            });
            $('.style_function_btn').css({
                'margin': '5px',
                'width': '150px',
                'text-align': 'left',
                'cursor': 'pointer'
            });
            $('.edit_function_btn').css({
                'margin': '5px',
                'width': '150px',
                'text-align': 'left',
                'cursor': 'pointer'
            });
            $('.function_btn').show();
            if (callback)
                callback();
        });
    }));
};
EditBookManager.prototype.addFunctionEvent = function() {
    var self = this;
    if (self.device == config.DEVICE_PC) {
        $(document).on(config.MOUSE_CLICK, '.function_btn', function(e) {
            e.stopPropagation();
            if(self.book.isPicTheme){
                self.commandChannel.postCommand(ModuleCommand.SHOW_AUDIO_LIST,{type:'single'});
            }else{
                self.showPopPan('.function_list');
            }
        }).on(config.MOUSE_CLICK, '.edit_book ',function(e){
            e.stopPropagation();
            var cur_content_id=self._bookController.getContentID();
            var cur_page_id=self._bookController.getPageID();
            var cur_rent_view_num=self._bookController.currentViewNum[0];
            if(self.book.isPicTheme){
                localStorage.setItem("color_content_id",'null');
                if(cur_page_id.length == 2) {
                    if(cur_page_id[1]){
                        localStorage.setItem("color_page_id", cur_page_id[1]);
                        localStorage.setItem("color_book_id",   self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else if(cur_page_id[0]){
                        localStorage.setItem("color_page_id", cur_page_id[0]);
                        localStorage.setItem("color_book_id",   self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else{
                        sendData({
                            is_api: true,
                            url:  '/v1/book/content/page/get',
                            method: 'post',
                            data:{
                                'book_id':parseInt(self.book.book_id),
                                'content_id':parseInt(0)
                            },
                            async: true,//暂时采取同步加载的方式
                            callback: function (data) {
                                if(data.pages==0){
                                    setShowConfirm('本书还没有内容，请添加图片开始制作?', null, null, function () {
                                        $('.over_page').trigger('click');
                                    }, null, '添加图片|cancel');
                                }else{
                                    localStorage.setItem("color_page_id", data.pages[0].page_id);
                                    localStorage.setItem("color_book_id",   self.book.book_id);
                                    localStorage.setItem("color_book_num", cur_rent_view_num);
                                    window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                }
                            },
                            errorFun: function (data) {
                            }
                        });
                    }
                }else{
                    if(cur_page_id[0]){
                        localStorage.setItem("color_page_id", cur_page_id[0]);
                        localStorage.setItem("color_book_id",   self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else{
                        sendData({
                            is_api: true,
                            url:  '/v1/book/content/page/get',
                            method: 'post',
                            data:{
                                'book_id':parseInt(self.book.book_id),
                                'content_id':parseInt(0)
                            },
                            async: true,//暂时采取同步加载的方式
                            callback: function (data) {
                                if(data.pages==0){
                                    setShowConfirm('本书还没有内容，请添加图片开始制作?', null, null, function () {
                                        $('.over_page').trigger('click');
                                    }, null, '添加图片|cancel');
                                }else{
                                    localStorage.setItem("color_page_id", data.pages[0].page_id);
                                    localStorage.setItem("color_book_id",   self.book.book_id);
                                    window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                }
                            },
                            errorFun: function (data) {
                            }
                        });
                    }
                }
            }else{
                var write_book_tips=localStorage.getItem("write_book_tips");
                if(write_book_tips==null){
                    localStorage.setItem("write_book_tips",3);
                    self.write_book_tips=3;
                }else{
                    self.write_book_tips=parseInt(localStorage.getItem("write_book_tips"));
                }
                if(self.write_book_tips>0){
                    self.addWriteBookTips();
                }else{
                    $('.color_book_write_tips').remove();
                    if(self.book.content_theme_type === 3){
                        if(cur_content_id){
                            if(cur_content_id.length===2 && cur_content_id[1]) {
                                if (cur_content_id[1] == "-2") {
                                    BookDataHandler.getCatalogListData(self.book.book_id,'book',function(data){
                                        if(data.catalogs.length === 0){
                                            setShowConfirm('本书还没有内容，请添加文章开始写作?', null, null, function () {
                                                $('.over_page').trigger('click');
                                            }, null, '添加文章|cancel');
                                        }else{
                                            sendData({
                                                is_api: true,
                                                url:  '/v1/book/pagelist?' + 'book_id=' + self.book.book_id + '&start=' + 0 + '&amount=' + 1,
                                                method: 'get',
                                                async: true,//暂时采取同步加载的方式
                                                callback: function (result) {
                                                    localStorage.setItem("color_book_id",   self.book.book_id);
                                                    localStorage.setItem("color_content_id",  data.catalogs[0].content_ids[0]);
                                                    localStorage.setItem("color_page_id",  null);
                                                    localStorage.setItem("color_book_num", cur_rent_view_num);
                                                    localStorage.removeItem('my_article_data');
                                                    window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                                },
                                                errorFun: function (data) {
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    localStorage.setItem("color_content_id", cur_content_id[1]);
                                    if (cur_page_id.length === 2) {
                                        localStorage.setItem("color_page_id", cur_page_id[1]);
                                    } else {
                                        localStorage.setItem("color_page_id", cur_page_id[0]);
                                    }
                                    localStorage.setItem("color_book_id", self.book.book_id);
                                    localStorage.setItem("color_book_num", cur_rent_view_num);
                                    localStorage.removeItem('my_article_data');
                                    window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                }
                            }else if(cur_content_id.length === 2 && cur_content_id[0]){
                                if (cur_content_id[0] == "-2") {
                                    BookDataHandler.getCatalogListData(self.book.book_id,'book',function(data){
                                        if(data.catalogs.length === 0){
                                            setShowConfirm('本书还没有内容，请添加文章开始写作?', null, null, function () {
                                                $('.over_page').trigger('click');
                                            }, null, '添加文章|cancel');
                                        }else{
                                            sendData({
                                                is_api: true,
                                                url:  '/v1/book/pagelist?' + 'book_id=' + self.book.book_id + '&start=' + 0 + '&amount=' + 1,
                                                method: 'get',
                                                async: true,//暂时采取同步加载的方式
                                                callback: function (result) {
                                                    localStorage.setItem("color_book_id",   self.book.book_id);
                                                    localStorage.setItem("color_content_id",  data.catalogs[0].content_ids[0]);
                                                    localStorage.setItem("color_page_id",  null);
                                                    localStorage.setItem("color_book_num", cur_rent_view_num);
                                                    localStorage.removeItem('my_article_data');
                                                    window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                                },
                                                errorFun: function (data) {
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    localStorage.setItem("color_content_id", cur_content_id[0]);
                                    if (cur_page_id.length === 2 && cur_page_id[1]) {
                                        localStorage.setItem("color_page_id", cur_page_id[1]);
                                    } else {
                                        localStorage.setItem("color_page_id", cur_page_id[0]);
                                    }
                                    localStorage.setItem("color_book_id", self.book.book_id);
                                    localStorage.setItem("color_book_num", cur_rent_view_num);
                                    localStorage.removeItem('my_article_data');
                                    window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                }
                            }else if(cur_content_id.length === 1 && cur_content_id[0]){
                                BookDataHandler.getCatalogListData(self.book.book_id,'book',function(data){
                                    if(data.catalogs.length === 0){
                                        setShowConfirm('本书还没有内容，请添加文章开始写作?', null, null, function () {
                                            $('.over_page').trigger('click');
                                        }, null, '添加文章|cancel');
                                    }else{
                                        localStorage.setItem("color_content_id",  cur_content_id[0]);
                                        var page_id = $('div[content_id='+ cur_content_id[0] +']').attr("page_id");
                                        if(page_id){
                                            localStorage.setItem("color_page_id",  page_id);
                                        }
                                        localStorage.setItem("color_book_id",   self.book.book_id);
                                        localStorage.setItem("color_book_num", cur_rent_view_num);
                                        localStorage.removeItem('my_article_data');
                                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                    }
                                });
 
                            }else{
                                BookDataHandler.getCatalogListData(self.book.book_id,'book',function(data){
                                    if(data.catalogs.length === 0){
                                        setShowConfirm('本书还没有内容，请添加文章开始写作?', null, null, function () {
                                            $('.over_page').trigger('click');
                                        }, null, '添加文章|cancel');
                                    }else{
                                        sendData({
                                            is_api: true,
                                            url:  '/v1/book/pagelist?' + 'book_id=' + self.book.book_id + '&start=' + 0 + '&amount=' + 1,
                                            method: 'get',
                                            async: true,//暂时采取同步加载的方式
                                            callback: function (result) {
                                                localStorage.setItem("color_book_id",   self.book.book_id);
                                                localStorage.setItem("color_content_id",  data.catalogs[0].content_ids[0]);
                                                localStorage.setItem("color_page_id",  null);
                                                localStorage.setItem("color_book_num", cur_rent_view_num);
                                                localStorage.removeItem('my_article_data');
                                                window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                            },
                                            errorFun: function (data) {
                                            }
                                        });
                                    }
                                });
                            }
                        }else{
                        }
                    }
                }
            }
        }).on(config.MOUSE_CLICK,'.write_book_tips',function(e){
            e.stopPropagation();
            $('.color_book_write_tips').remove();
            var cur_content_id=self._bookController.getContentID();
            var cur_page_id=self._bookController.getPageID();
            var cur_rent_view_num=self._bookController.currentViewNum[0];
            if(self.book.content_theme_type === 3){
                if(cur_content_id){
                    if(cur_content_id.length==2&&cur_content_id[1]) {
                        localStorage.setItem("color_content_id", cur_content_id[1]);
                        if (cur_page_id.length == 2) {
                            localStorage.setItem("color_page_id", cur_page_id[1]);
                        } else {
                            localStorage.setItem("color_page_id", cur_page_id[0]);
                        }
                        localStorage.setItem("color_book_id", self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        localStorage.removeItem('my_article_data');
                        self.write_book_tips--;
                        localStorage.setItem("write_book_tips",self.write_book_tips);
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else if(cur_content_id.length==2&&cur_content_id[0]){
                        localStorage.setItem("color_content_id", cur_content_id[0]);
                        if (cur_page_id.length == 2&& cur_page_id[1]) {
                            localStorage.setItem("color_page_id", cur_page_id[1]);
                        } else {
                            localStorage.setItem("color_page_id", cur_page_id[0]);
                        }
                        localStorage.setItem("color_book_id", self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        localStorage.removeItem('my_article_data');
                        self.write_book_tips--;
                        localStorage.setItem("write_book_tips",self.write_book_tips);
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else if(cur_content_id.length==1&&cur_content_id[0]){
                        localStorage.setItem("color_content_id",  cur_content_id[0]);
                        if(cur_page_id.length==2){
                            localStorage.setItem("color_page_id",  cur_page_id[1]);
                        }else{
                            localStorage.setItem("color_page_id",  cur_page_id[0]);
                        }
                        localStorage.setItem("color_book_id",   self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        localStorage.removeItem('my_article_data');
                        self.write_book_tips--;
                        localStorage.setItem("write_book_tips",self.write_book_tips);
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else{
                        BookDataHandler.getCatalogListData(self.book.book_id,'book',function(data){
                            if(data.catalogs.length==0){
                                setShowConfirm('本书还没有内容，请添加文章开始写作?', null, null, function () {
                                    $('.over_page').trigger('click');
                                }, null, '添加文章|cancel');
                            }else{
                                sendData({
                                    is_api: true,
                                    url:  '/v1/book/pagelist?' + 'book_id=' + self.book.book_id + '&start=' + 0 + '&amount=' + 1,
                                    method: 'get',
                                    async: true,//暂时采取同步加载的方式
                                    callback: function (result) {
                                        localStorage.setItem("color_book_id",   self.book.book_id);
                                        localStorage.setItem("color_content_id",  data.catalogs[0].content_ids[0]);
                                        localStorage.setItem("color_page_id",  null);
                                        localStorage.setItem("color_book_num", cur_rent_view_num);
                                        localStorage.removeItem('my_article_data');
                                        self.write_book_tips--;
                                        localStorage.setItem("write_book_tips",self.write_book_tips);
                                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                    },
                                    errorFun: function (data) {
                                    }
                                });
                            }
                        });
                    }
                }else{
                }
            }else if(self.book.isPicTheme){
                localStorage.setItem("color_content_id",'null');
                if(cur_page_id.length == 2) {
                    if(cur_page_id[1]){
                        localStorage.setItem("color_page_id", cur_page_id[1]);
                        localStorage.setItem("color_book_id",   self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        localStorage.removeItem('my_article_data');
                        self.write_book_tips--;
                        localStorage.setItem("write_book_tips",self.write_book_tips);
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else if(cur_page_id[0]){
                    }
                    localStorage.setItem("color_page_id", cur_page_id[0]);
                    localStorage.setItem("color_book_id",   self.book.book_id);
                    localStorage.setItem("color_book_num", cur_rent_view_num);
                    localStorage.removeItem('my_article_data');
                    self.write_book_tips--;
                    localStorage.setItem("write_book_tips",self.write_book_tips);
                    window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                }else{
                    sendData({
                        is_api: true,
                        url:  '/v1/book/content/page/get',
                        method: 'post',
                        data:{
                            'book_id':parseInt(self.book.book_id),
                            'content_id':parseInt(0)
                        },
                        async: true,//暂时采取同步加载的方式
                        callback: function (data) {
                            if(data.pages==0){
                                setShowConfirm('本书还没有内容，请添加图片开始制作?', null, null, function () {
                                    $('.over_page').trigger('click');
                                }, null, '添加图片|cancel');
                            }else{
                                localStorage.setItem("color_page_id", data.pages[0].page_id);
                                localStorage.setItem("color_book_id",   self.book.book_id);
                                localStorage.setItem("color_book_num", cur_rent_view_num);
                                localStorage.removeItem('my_article_data');
                                self.write_book_tips--;
                                localStorage.setItem("write_book_tips",self.write_book_tips);
                                window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                            }
                        },
                        errorFun: function (data) {
                        }
                    });
                }
            }else{
                if(cur_page_id[0]){
                    localStorage.setItem("color_page_id", cur_page_id[0]);
                    localStorage.setItem("color_book_id",   self.book.book_id);
                    localStorage.setItem("color_book_num", cur_rent_view_num);
                    localStorage.removeItem('my_article_data');
                    self.write_book_tips--;
                    localStorage.setItem("write_book_tips",self.write_book_tips);
                    window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                }else{
                    sendData({
                        is_api: true,
                        url:  '/v1/book/content/page/get',
                        method: 'post',
                        data:{
                            'book_id':parseInt(self.book.book_id),
                            'content_id':parseInt(0)
                        },
                        async: true,//暂时采取同步加载的方式
                        callback: function (data) {
                            if(data.pages==0){
                                setShowConfirm('本书还没有内容，请添加图片开始制作?', null, null, function () {
                                    $('.over_page').trigger('click');
                                }, null, '添加图片|cancel');
                            }else{
                                localStorage.setItem("color_page_id", data.pages[0].page_id);
                                localStorage.setItem("color_book_id",   self.book.book_id);
                                localStorage.setItem("color_book_num", cur_rent_view_num);
                                localStorage.removeItem('my_article_data');
                                self.write_book_tips--;
                                localStorage.setItem("write_book_tips",self.write_book_tips);
                                window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                            }
                        },
                        errorFun: function (data) {
                        }
                    });
                }
            }
        }).on(config.MOUSE_CLICK,'.no_write_book_tips',function(e){
            e.stopPropagation();
            var cur_content_id=self._bookController.getContentID();
            var cur_page_id=self._bookController.getPageID();
            var cur_rent_view_num=self._bookController.currentViewNum[0];
            self.write_book_tips=0;
            localStorage.setItem("write_book_tips",self.write_book_tips);
            $('.color_book_write_tips').remove();
            if(self.book.content_theme_type === 3){
                if(cur_content_id){
                    if(cur_content_id.length==2&&cur_content_id[1]) {
                        localStorage.setItem("color_content_id", cur_content_id[1]);
                        if (cur_page_id.length == 2) {
                            localStorage.setItem("color_page_id", cur_page_id[1]);
                        } else {
                            localStorage.setItem("color_page_id", cur_page_id[0]);
                        }
                        localStorage.setItem("color_book_id", self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        localStorage.removeItem('my_article_data');
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else if(cur_content_id.length==2&&cur_content_id[0]){
                        localStorage.setItem("color_content_id", cur_content_id[0]);
                        if (cur_page_id.length == 2&& cur_page_id[1]) {
                            localStorage.setItem("color_page_id", cur_page_id[1]);
                        } else {
                            localStorage.setItem("color_page_id", cur_page_id[0]);
                        }
                        localStorage.setItem("color_book_id", self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        localStorage.removeItem('my_article_data');
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else if(cur_content_id.length==1&&cur_content_id[0]){
                        localStorage.setItem("color_content_id",  cur_content_id[0]);
                        if(cur_page_id.length==2){
                            localStorage.setItem("color_page_id",  cur_page_id[1]);
                        }else{
                            localStorage.setItem("color_page_id",  cur_page_id[0]);
                        }
                        localStorage.setItem("color_book_id",   self.book.book_id);
                        localStorage.setItem("color_book_num", cur_rent_view_num);
                        localStorage.removeItem('my_article_data');
                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                    }else{
                        BookDataHandler.getCatalogListData(self.book.book_id,'book',function(data){
                            if(data.catalogs.length==0){
                                setShowConfirm('本书还没有内容，请添加文章开始写作?', null, null, function () {
                                    $('.over_page').trigger('click');
                                }, null, '添加文章|cancel');
                            }else{
                                sendData({
                                    is_api: true,
                                    url:  '/v1/book/pagelist?' + 'book_id=' + self.book.book_id + '&start=' + 0 + '&amount=' + 1,
                                    method: 'get',
                                    async: true,//暂时采取同步加载的方式
                                    callback: function (result) {
                                        localStorage.setItem("color_book_id",   self.book.book_id);
                                        localStorage.setItem("color_content_id",  data.catalogs[0].content_ids[0]);
                                        localStorage.setItem("color_page_id",  null);
                                        localStorage.setItem("color_book_num", cur_rent_view_num);
                                        localStorage.removeItem('my_article_data');
                                        window.location.href = "/book/new_edit?book_id=" + self.book.book_id;
                                    },
                                    errorFun: function (data) {
                                    }
                                });
                            }
                        });
                    }
                }else{
                }
            }
        }).on(config.MOUSE_CLICK,'.close_color_book_write',function(e){
            $('.color_book_write_tips').remove();
        }).on(config.MOUSE_CLICK,'.add_article_btn',function(e){
            e.stopPropagation();
            $('.saveToBoxBtn').removeAttr('draft_id');
            $('.saveToBookBtn').removeAttr('draft_id');
            $('.saveToBoxBtn').removeAttr('content_id');
            $('.saveToBookBtn').removeAttr('content_id');
            $('.saveToBoxBtn').removeAttr('update_check');
            $('.saveToBookBtn').removeAttr('update_check');
            self.setEditorLimit("new");
            self.content_action = "add";
            if(self.book.isPicTheme){
                self.showUploadImagePan();
            }else{
                self._bookController.addArticleToBook(self,data,self._targetName);
            }
        }).on(config.MOUSE_CLICK, '.edit_page_header_btn', function(e) {
            e.stopPropagation();
            self.getHeaderData(function(headers, pages) {
                self.addEditHeaderPan(headers, pages);
            });
        }).on(config.MOUSE_CLICK, '.change_insert_btn', function(e) {
            self.functionListPan.hide();
            e.stopPropagation();
            self._dataFetcher.getTemplateList({
                book_id: self.book.book_id,
                type_list: ['insert']
            }, function(data) {
                $(document.body).append(self._viewController.getInsertChoicePan(data.template_list[0].templates));
            });
        }).on(config.MOUSE_CLICK, '.change_page_catalog_btn', function(e) {
            self.functionListPan.hide();
            e.stopPropagation();
                self._dataFetcher.getCatalogTemplateList({
                    book_id: self.book.book_id,
                    type: 'catalog',
                }, function(data) {
                    $(document.body).append(self._viewController.getCatalogPan(data.catalog));
                });

        }).on(config.MOUSE_CLICK, '.change_page_header_btn', function(e) {
            self.functionListPan.hide();
            e.stopPropagation();
            if(self.book.isColorBook){
                var msg='更换页眉页脚版式会对您整本书重新进行智能排版，您手动排版的样式将会丢失，您确认要更换页眉页脚版式么？'
                showConfirm(msg,null,null,function(){
                    self._dataFetcher.getTemplateList({
                        book_id: self.book.book_id,
                        type_list: ['header_footer']
                    }, function(data) {
                        $(document.body).append(self._viewController.getHeaderFooterPan(data.template_list[0].templates));
                    });
                },null,'ok|cancel')
            }else{
                self._dataFetcher.getTemplateList({
                    book_id: self.book.book_id,
                    type_list: ['header_footer']
                }, function(data) {
                    $(document.body).append(self._viewController.getHeaderFooterPan(data.template_list[0].templates));
                });
            }
        }).on(config.MOUSE_CLICK,'.book_theme_convert',function(e){
            self.functionListPan.hide();
            e.stopPropagation();
            showLoading("正在升级...", true);
            sendData({
                is_api: true,
                url: '/v1/book/theme/convert',
                method: 'post',
                data:{
                    'book_id':self.book.book_id,
                    'content_theme_type':self.book.content_theme_type,
                },
                callback: function (data) {
                    if(data.err_code == 0) {
                        showLoading("", false);
                        window.location.href='https://www.shiqichuban.com/book/new_contents/'+data.book_id;
                    }
                },
                errorFun: function (data) {
                }
            });
        }).on(config.MOUSE_CLICK, '.filter_forward', function(e) {
            self.functionListPan.hide();
            e.stopPropagation();
        }).on(config.MOUSE_CLICK, '.filter_ui', function(e) {
            e.stopPropagation();
            var action = $(this).attr('action');
            var value = parseInt($(this).attr('value')) == 0 ? 1 : 0;
            if(action === "pen_name" && e.target.nodeName != "INPUT"){
                return ;
            }
            showLoading("正在编辑...", true);
            var obj = {};
            obj['module'] = action;
            obj['state'] = value;
            sendData({
                is_api: true,
                data: JSON.stringify({
                    book_id: self.book.book_id,
                    book_states: [obj]
                }),
                url: API_BOOK_CHANGE_STATE,
                content_type:'application/json',
                method: 'post',
                callback: function(data) {
                    if(action === "pen_name"){
                        showLoading("正在编辑...", false);
                        self.book.show_pen_name = !self.book.show_pen_name ;
                        self._bookController.setContentAuthor();
                    }
                    else
                        location.reload(true);
                },
                errorFun: function(data) {}
            })
        }).on(config.MOUSE_CLICK, '.set_indent_btn', function(e) {
            self._bookController.getCurrentPageContentID(function(content_ids, pages) {
                self._dataFetcher.getIndentBtn({
                    content_ids: content_ids,
                    book_id: self.book.book_id
                }, function(data) {
                    $(document.body).append(self._viewController.getIndentPan(self.book.content_theme_type, data.indents));
                    self.setIndentPanEvent($('.editPan'), config.MOUSE_CLICK, data.indents, function(data) {
                        data.book_id = self.book.book_id;
                        self._dataFetcher.setIndentBtn(data, function(data) {
                            self.refreshToPage(data);
                        })
                    });
                });
            });
        }).on(config.MOUSE_CLICK, '.edit_plus_article_btn', function(e) {
            $(document.body).append(self._viewController.getBookPlusPan('您确定更新电子书数据吗?', 'cancel|ok'));
            $(document).on(config.MOUSE_CLICK, '.cancel_plus_btn', function(e) {
                $('#editPan').remove();
            }).on(config.MOUSE_CLICK, '.submit_plus_btn', function(e) {
                showLoading('', true);
                $('#editPan').remove();
                self.getIncrementStatus();
            });
        }).on(config.MOUSE_CLICK, '.change_size_btn', function(e) {
            self.functionListPan.hide();
            e.stopPropagation();
            if(self.book.isColorBook){
                var msg='更换书籍尺寸会对您整本书重新进行智能排版，您手动排版的样式将会丢失，您确认要更换书籍尺寸么？'
                showConfirm(msg,null,null,function(){
                    self._dataFetcher.getBookSizeList({
                        book_id: self.book.book_id
                    }, function(data) {
                        $(document.body).append(self._viewController.getPageSizeChoicePan(data.book_size));
                    }, null);
                },null,'ok|cancel')
            }else{
                self._dataFetcher.getBookSizeList({
                    book_id: self.book.book_id
                }, function(data) {
                    $(document.body).append(self._viewController.getPageSizeChoicePan(data.book_size));
                }, null);
            }
        }).on(config.MOUSE_CLICK, '.close_editPan', self.removeEditPan)
            .on(config.MOUSE_CLICK,'.edit_font_size',function(e){
                if(self.book.isColorBook) {
                    var msg = '字号设置会对您整本书重新进行智能排版，您手动排版的样式将会丢失，您确认要字号设置么？';
                    showConfirm(msg, null, null, function () {
                        self.getFontSizeList();
                    }, null, 'ok|cancel')
                }else{
                    self.getFontSizeList();
                }
            }).on(config.MOUSE_CLICK,'.book_division',function(e){
            e.stopPropagation();
            sendData({
                is_api: true,
                url: API_BOOK_CREATIVE_GETTIME,
                method: 'post',
                data: {
                    book_id: self.book.book_id
                },
                callback: function(data) {
                    $(document.body).append(self._viewController.setBookDivision(data,self.book.title));
                    self._viewController.setBookTime();
                },
                errorFun: function(data) {
                    console.log('error', API_BOOK_CREATIVE_GETTIME)
                }
            });
        }).on(config.MOUSE_CLICK,'.sure_book_division',function(e){
            e.stopPropagation();
            var pos_data={
                'book_id': self.book.book_id,
                'start_time':Date.parse($('#datetimepicker_star').val())/1000,
                'end_time':Date.parse($('#datetimepicker_end').val())/1000,
                'book_title':$('.new_book_title').val(),
            }
            sendData({
                is_api: true,
                url: '/v1/book/import/date_range',
                method: 'post',
                data: pos_data,
                callback: function(data) {
                    if(data.err_code==0){
                        location.reload()
                    }
                },
                errorFun: function(data) {
                    console.log('error', '/v1/book/import/date_range')
                }
            });
        }).on('focusout','.new_book_title',function(e){
            e.stopPropagation();
            var str=$(this).val();
            if(!self.input_status){
                var str=$(this).val();
                var data=self._viewController.iptSubstr(str);
                $('.new_book_title').val(data.str_val);
            }
        }).on('compositionstart','.new_book_title',function(e){
            e.stopPropagation();
            self.input_status=true;
        }).on('compositionend','.new_book_title',function(e){
            e.stopPropagation();
            self.input_status=false;
        })
        self.addChangeInsertEvent();
        self.addChangeHFEvent();
        self.addChangeCatalogEvent();
        self.addChangeSizeEvent();
        if(self.book.type != config.BOOK_TYPE_GROUP)
            self.addBookTrashEvent();
    }
};
EditBookManager.prototype.showUploadImagePan = function(){
    var self = this ;
    if(self.book.images >= self.rightsController.getImageCount()){
        if(self.rightsController.is_top === 1){
            showAlert("图片数量已达上限～");
        }else{
            showAlert("图片数量已经超出限制～,申请或升级会员可享受更多权利");
        }
        return ;
    }else{
        if (self.content_theme_type === 4) {
            self.imageFileUploadPlugin = new PhotoUploadPlugin();
        }else if (self.content_theme_type === 5 || self.content_theme_type === 7) {
            self.imageFileUploadPlugin = new AlbumUploadPlugin();
        }
        self.imageFileUploadPlugin.setImageUploadMaxCount(self.rightsController.getImageCount() - self.book.images);
        self.imageFileUploadPlugin.uploadCompleteHandler = function(urls){
            BookDataHandler.addPicToBook(self.book.book_id,urls, self.imageFileUploadPlugin.bookPageType, function(data){
                location.href='https://www.shiqichuban.com/book/new_contents/'+ self.book.book_id +'#page/'+(data.minPage + 2);
                location.reload();
            },function(error){
                showAlert(error.err_msg) ;
            });
        };
        self.imageFileUploadPlugin.showModelView();
    }
}
EditBookManager.prototype.setIndentPanEvent = function(indentPan,eventType,data,callback){
    var content_id ;
    var indent ;
    var _isSubmit = false ;
    selectArticle(data[0].content_id ,data[0].indent);
    indentPan.on(eventType ,'.submit_edit_indent',function(e){
        if(_isSubmit)return ;
        submit(e);
    }).on(eventType ,'.header_left',function(e){
        btn_click_handler(this,e);
    }).on(eventType ,'.header_right',function(e){
        btn_click_handler(this,e);
    });
    function submit(e){
        e.preventDefault();
        e.stopPropagation();
        var data = {};
        var arr = $('.header_form').serializeArray();
        for (var i in arr) {
            data[arr[i].name] = arr[i].value;
        }
        data.content_id = content_id ;
        callback(data);
    }
    function btn_click_handler(btn,e){
        e.preventDefault();
        e.stopPropagation();
        $(btn).addClass('sq_btn_black');
        $(btn).removeClass('sq_btn_white');
        if($(btn).hasClass('header_right')){
            $('.header_left').addClass('sq_btn_white');
            $('.header_left').removeClass('sq_btn_black');
        }else{
            $('.header_right').addClass('sq_btn_white');
            $('.header_right').removeClass('sq_btn_black');
        }
        selectArticle($(btn).attr('content_id'),$(btn).attr('indent'));
    }
    function selectArticle(selected_content_id,selected_indent){
        content_id = selected_content_id ;
        indent = selected_indent == 0 ? 1 :  selected_indent ;
        indentPan.find('input[value='+ indent +']').each(function(index,value){
            $(value).prop('checked',true);
        });
    }
};
EditBookManager.prototype.getFontSizeList = function(){
    var self = this ;
    self._dataFetcher.getFontSize({
        book_id:self.book.book_id,
    },function(data){
        var sur_size_id = data.cur_size_id;
        var size_list = data.size_list ;
        if( $('.font_size_pan').length == 0){
            $(document.body).append(self._viewController.getFontSizePan());
            self.addFontChangeEvent();
        }
        else{
            $('.font_list_container').children().remove();
            $('.font_size_pan').show();
        }
        for(var i in size_list){
            var cell = size_list[i] ;
            var cell_dom = "" ;
            cell_dom += '<div style="line-height: 40px;border-bottom: 1px solid #eee;padding-left: 30px">' ;
            if(sur_size_id == cell.id)
                cell_dom += '   <input class="font_size_checkbox" name="font_radio" value="'+ cell.id +'" type="radio" checked current_id="'+ sur_size_id +'"/>' ;
            else
                cell_dom += '   <input class="font_size_checkbox" name="font_radio" value="'+ cell.id +'" type="radio" current_id="'+ sur_size_id +'"/>' ;
            cell_dom += '   <span style="margin-left:10px;font-size: '+ parseInt(cell.id)+'px">'+ cell.desc +'</span>' ;
            cell_dom += '</div>' ;
            $('.font_list_container').append(cell_dom);
        }
    })
};
EditBookManager.prototype.addFontChangeEvent = function(){
    var self = this ;
    var sel_id ;
    var cur_id ;
    $(document).on(config.MOUSE_CLICK,'.font_size_checkbox',function(e){
        e.stopPropagation();
        sel_id = $(this).val();
        cur_id = $(this).attr('current_id');
    });
    $(document).on(config.MOUSE_CLICK,'.submit_font_btn',function(e){
        e.stopPropagation();
        if(cur_id === sel_id){
            $('.font_size_pan').hide();
            return ;
        }
        self.changeFontSize(sel_id,function(data){
            if(data.minPage)
                self.toReload(self.book.book_id,data.minPage);
            else
                self.toReload(self.book.book_id,1);
        });
    }).on(config.MOUSE_CLICK,'.close_font_btn',function(e){
        e.stopPropagation();
        $('.font_size_pan').hide();
    })
};
EditBookManager.prototype.changeFontSize = function(font_size_id,callback){
    var self = this ;
    self._bookController.getCurrentPageContentID(function(content_ids){
        var content_id ;
        if(content_ids.length == 2 && content_ids[0] == null)
            content_id = content_ids[1];
        else
            content_id = content_ids[0];
        if(content_id)
            self._dataFetcher.changeFontSize({
                book_id:self.book.book_id,
                font_size_id:font_size_id,
                content_id_on_cur_page:content_id,
            },function(data){
                callback(data);
            });
    });
};
EditBookManager.prototype.addChangeSizeEvent = function() {
    var self = this;
    $(document).on(config.MOUSE_CLICK, '.cancel_change_size_btn', function(e) {
        $('.size_change_pan').remove();
    }).on(config.MOUSE_CLICK, '.submit_change_size_btn', function(e) {
        if($('input:radio[name="size_choice_ratio"]:checked').attr('default') == 'default'){
            $('.size_change_pan').remove();
            return ;
        }
        showLoading('正在修改', true);
        var val = $('input:radio[name="size_choice_ratio"]:checked').val();
        $('.size_change_pan').remove();
        self._dataFetcher.setBookSizeList({
            book_id: self.book.book_id,
            size_id: val
        }, function(data) {
            self.refreshToPage(data);
        });
    })
};
EditBookManager.prototype.getIncrementStatus = function() {
    var self = this;
    self._dataFetcher.increment_update({
        book_id: self.book.book_id
    }, function(data) {
        $('#editPan').remove();
        showLoading('', false);
        self.refreshToPage(data);
    }, function(data) {
        $('#editPan').remove();
        if (data.err_code < 0)
            showConfirm(data.err_msg, null, null, null, null, 'ok');
        showLoading('', false);
    });
};
EditBookManager.prototype.addChangeInsertEvent = function() {
    var self = this;
    $(document).on(config.MOUSE_CLICK, '.cancel_change_insert_btn', function(e) {
        $('.insert_change_pan').remove();
    }).on(config.MOUSE_CLICK, '.submit_change_insert_btn', function(e) {
        var val = $('input:radio[name="insert_choice_ratio"]:checked').val();
        $('.insert_change_pan').remove();
        self._dataFetcher.setTemplateList({
            book_id: self.book.book_id,
            templates: [{
                type: 'insert',
                template_id: val
            }]
        }, function(data) {
            self.refreshToPage(data);
        });
    })
};
EditBookManager.prototype.addBookTrashEvent = function(){
    var self = this ;
    var isFetchingData = false ;
    $(document).on(config.MOUSE_CLICK, '.edit_trash_btn', function(e) {
        e.stopPropagation();
        if(isFetchingData)return ;
        self.functionListPan.hide();
        getBookTrashList();
    }).on(config.MOUSE_CLICK, '.close_trash_btn', function(e) {
        $('.trash_pan').remove();
    }).on(config.MOUSE_CLICK, '.delete_trash_btn', function(e) {
        if(isFetchingData == true){
            showAlert('正在发送数据,请不要重复提交');
            return ;
        }
        isFetchingData = true ;
        var ids = checkSelectedItemsid() ;
        if(ids.length == 0){
            showConfirm('还没有选择文章',null,null,null,null,'ok');
            isFetchingData = false ;
            return ;
        }
        self._dataFetcher.deleteTrashList({
            "type": "book_content",
            "ids": ids,
            "book_id":self.book.book_id
        },function(){
            getBookTrashList();
        })
    }).on(config.MOUSE_CLICK, '.recover_trash_btn', function(e) {
        if(isFetchingData == true){
            showAlert('正在发送数据,请不要重复提交');
            return ;
        }
        isFetchingData = true ;
        var ids = checkSelectedItemsid() ;
        if(ids.length == 0){
            showConfirm('还没有选择文章',null,null,null,null,'ok');
            isFetchingData = false ;
            return ;
        }
        self._dataFetcher.restoreTrashList({
            "type": "book_content",
            "ids": ids,
            "book_id":self.book.book_id
        },function(data){
            self.refreshToPage(data);
        })
    });
    function getBookTrashList(){
        isFetchingData = true ;
        self._dataFetcher.getBookTrashList({type:"book_content",book_id:self.book.book_id},function(data){
            isFetchingData = false ;
            if($('.trash_pan').length == 0)
                $(document.body).append(self._viewController.getTrashPan());
            else
                $('.trash_list_container').children().remove();
            var book_contents = data.book_contents ;
            for(var i in book_contents){
                var item_Data = book_contents[i] ;
                $('.trash_list_container').append(
                    self._viewController.getTrashListItem(
                        item_Data.id,
                        item_Data.title,
                        item_Data.abstract,
                        item_Data.deleted_at,
                        item_Data.images
                    )
                );
            }
            if(book_contents.length == 0){
                $('.trash_list_container').append("<div class='over_bar' style='text-align: center;margin-top: 10px;height:40px;line-height: 40px;background-color: #eeeeee;border-radius: 3px'>没有数据了</div>") ;
            }
        })
    }
    function checkSelectedItemsid(){
        var ids = [] ;
        $('.trash_checkbox').each(function(index,value){
            if($(value).prop('checked') == true)
                ids.push(parseInt($(value).attr('trash_id')));
        });
        return ids ;
    }
};
EditBookManager.prototype.addChangeHFEvent = function() {
    var self = this;
    $(document).on(config.MOUSE_CLICK, '.cancel_change_hf_btn', function(e) {
        $('.hf_change_pan').remove();
    }).on(config.MOUSE_CLICK, '.submit_change_hf_btn', function(e) {
        showLoading('正在修改', true);
        var val = $('input:radio[name="hf_choice_ratio"]:checked').val();
        $('.hf_change_pan').remove();
        self._dataFetcher.setTemplateList({
            book_id: self.book.book_id,
            templates: [{
                type: 'header_footer',
                template_id: val
            }]
        }, function(data) {
            self.refreshToPage(data);
        });
    })
};
EditBookManager.prototype.addChangeCatalogEvent = function() {
    var self = this;
    $(document).on(config.MOUSE_CLICK, '.cancel_change_catalog_btn', function(e) {
        $('.catalog_change_pan').remove();
    }).on(config.MOUSE_CLICK, '.submit_change_catalog_btn', function(e) {
        showLoading('正在修改', true);
        var val = $('input:radio[name="catalog_choice_ratio"]:checked').val();
        $('.catalog_change_pan').remove();
        self._dataFetcher.setCatalogTemplate({
                    book_id: self.book.book_id,
                    template_id: val
                }, function(data) {
                    self.refreshToPage(data);
                });

    })
};
EditBookManager.prototype.getHeaderData = function(callback1) {
    var self = this;
    self._bookController.getCurrentPageContentID(function(content_ids, pages) {
        sendData({
            is_api: true,
            method: 'post',
            url: '/v1/book/page_header/get',
            data: {
                content_ids: content_ids,
                book_id: self.book.book_id
            },
            callback: function(data) {
                var headers = [];
                for (var i in content_ids) {
                    var content_id = content_ids[i];
                    for (var j in data.headers) {
                        var headerData = data.headers[j];
                        if (headerData) {
                            var receive_id = headerData.content_id;
                            if (content_id == receive_id)
                                headers[i] = headerData;
                        } else {
                            headers[i] = null;
                        }
                    }
                }
                callback1(headers, pages);
            },
            errorFun: function(data) {
            },
        });
    });
};
EditBookManager.prototype.addEditHeaderPan = function(headers, pages) {
    var self = this;
    var content_id = null;
    var val;
    var isFetchingData = false ;
    self.functionListPan.hide();
    for (var i in headers) {
        var data = headers[i];
        if (data) {
            if (i == 0) {
                content_id = data.content_id;
                val = data.header;
            } else if (i == 1) {
                if (!content_id)
                    content_id = data.content_id;
                if (!val)
                    val = data.header;
            }
        }
    }
    var editPan = self._viewController.getHeaderEditPan(self.book.content_theme_type, headers, content_id, val);
    if (editPan) {
        $(document.body).append(editPan);
        $('.edit_header_text').val(val);
        $(document).on(config.MOUSE_CLICK, '.header_left', function(e) {
            e.stopPropagation();
            $(this).addClass('sq_btn_black');
            $(this).removeClass('sq_btn_white');
            $('.header_right').addClass('sq_btn_white');
            $('.header_right').removeClass('sq_btn_black');
            content_id = $(this).attr('content_id');
            $('.edit_header_text').val($(this).attr('header'));
        }).on(config.MOUSE_CLICK, '.header_right', function(e) {
            e.stopPropagation();
            $(this).addClass('sq_btn_black');
            $(this).removeClass('sq_btn_white');
            $('.header_left').addClass('sq_btn_white');
            $('.header_left').removeClass('sq_btn_black');
            content_id = $(this).attr('content_id');
            $('.edit_header_text').val($(this).attr('header'));
        }).on(config.MOUSE_CLICK, '.submit_edit_header', function(e) {
            e.stopPropagation();
            e.preventDefault();
            if(isFetchingData === true){
            }else{
                showLoading("正在提交数据，请稍等",true);
                isFetchingData = true ;
                var data = {};
                var arr = $('.header_form').serializeArray();
                for (var i in arr) {
                    data[arr[i].name] = arr[i].value;
                }
                if (data['type'] === "custom")
                    data.header = $('.edit_header_text').val();
                if (data['scope'] == null)
                    data['scope'] = "current" ;
                data.book_id = self.book.book_id;
                data.content_id = content_id;
                sendData({
                    is_api: true,
                    url: '/v1/book/page_header/save',
                    data: data,
                    callback: function(data) {
                        self.refreshToPage(data);
                        isFetchingData = false ;
                    },
                    errorFun: function() {
                        isFetchingData = false ;
                        showLoading("正在提交数据，请稍等",false);
                        showConfirm("请求失败，请稍后重试",null,null,null,null,"ok");
                    },
                })
            }
        });
    }
};
EditBookManager.prototype.removeEditPan = function() {
    $('.editPan').remove();
};
EditBookManager.prototype.getFiltersBtn = function(callback) {
    var self = this;
    if(self.device == config.DEVICE_APP || self.status == config.STATUS_PREVIEW || self.view_type == config.VIEW_TYPE_ORDER)return ;
    sendData({
        is_api: true,
        url: API_BOOK_FILTERS,
        method: 'post',
        data: {
            book_id: self.book.book_id
        },
        callback: function(data) {
            callback(data);
        },
        errorFun: function() {}
    });
};
EditBookManager.prototype.addContentController = function() {
    var self = this;
    if (self.status === config.STATUS_EDIT) {
        //预览和分享没有编辑按钮
        if (self.device !== config.DEVICE_APP) {
            self._bookController.addArticle_EditButtons(self.editHandler.bind(this));
            var target;
            $(document).on(config.MOUSE_CLICK,function(e){
                $('.btnGroup').find('#edit_btn_list').remove()
            }).on(config.MOUSE_CLICK, '.btnGroup', function (e) {
                e.stopPropagation();
                if(!self.book.isColorBook){
                    self._bookController.createGroupBtnList(this);
                }else{
                    var pageTypeValue = parseInt($(this).parent(".e_book_page").attr("page_type_val"));
                    if(pageTypeValue === 7){
                        //序在web端暂时不支持全文编辑等操作
                        Confirm.showOk("请点击修改排版按钮，进入排版页面进行篇章页的编辑修改");
                        return ;
                    }

                    var edit_book_tips=localStorage.getItem("edit_book_tips");
                    if(edit_book_tips==null){
                        localStorage.setItem("edit_book_tips",3);
                        self.edit_book_tips=3;
                    }else{
                        self.edit_book_tips=parseInt(localStorage.getItem("edit_book_tips"));
                    }
                    if(self.edit_book_tips>0){
                        target=this;
                        self.editBookTips();
                    }else{
                        self._bookController.createGroupBtnList(this);
                    }
                }
            }).on(config.MOUSE_CLICK,'.edit_book_tips',function(e){
                e.stopPropagation();
                e.preventDefault();
                self._bookController.createGroupBtnList(target);
                self.edit_book_tips--;
                localStorage.setItem("edit_book_tips",self.edit_book_tips);
                $('.color_book_edit_tips').remove();
            }).on(config.MOUSE_CLICK,'.no_edit_book_tips',function(e){
                e.stopPropagation();
                e.preventDefault();
                self.edit_book_tips=0;
                localStorage.setItem("edit_book_tips",self.edit_book_tips);
                self._bookController.createGroupBtnList(target);
                $('.color_book_edit_tips').remove();
            }).on(config.MOUSE_CLICK,'.close_edit_book_write',function(e){
                e.stopPropagation();
                e.preventDefault();
                $('.color_book_edit_tips').remove();
            })
        } else {
            self._bookController.addLongMouseDownEvent(function(data) {
                noticeToApp('long_touch_text', data);
            });
        }
        self._bookController.addImageCtrl(self.device === config.DEVICE_PC, function(data) {
            self.changeSaveBtnDisplay(data);
        }, function(long_touch_data,type) {
            if(type === "json"){
                noticeJsonToApp(long_touch_data);
            }
            else
                noticeToApp('long_touch_img', long_touch_data);
        }, function(type, data, sibling_group_id_array, image_id_dic, content_id) {
            showLoading('正在修改布局...', true);
            if (type === "default") {
                sendData({
                    is_api: true,
                    url: '/v1/book/content/image/group_style/set',
                    data: data,
                    callback: function(data) {
                        self.refreshToPage(data);
                    },
                    errorFun: function(data) {
                        showLoading('', false);
                        showAlert('默认布局设置失败！')
                    }
                })
            } else {
                Fetcher.fetchData(
                    '/v1/book/content/group/style/custom',
                    null,
                    "post",
                    JSON.stringify({
                        "book_id": parseInt(self.book.book_id),
                        "content_id": parseInt(content_id),
                        "group_ids": sibling_group_id_array,
                        "custom_groups": data
                    }),
                    function (data) {
                        self.refreshToPage(data);
                    },
                    function (data) {
                        showLoading('', false);
                        showAlert('自定义布局设置失败!');
                    },
                    "application/json"
                )
            }
        });
        if(self.book.content_theme_type === 1){
            self._bookController.addContentForwardButton('.ubook_content_forward', self.device == config.DEVICE_PC, function(data) {
                self.changeSaveBtnDisplay(data);
            });
        }
    }
    $(document).on(config.MOUSE_CLICK, '.toSaveChange', function(e) {
        e.stopPropagation();
        var data = self._bookController.getRemoveData();
        self.commandChannel.postCommand(BookCommand.SUBMIT_BOOK_CHANGE,data);
    });
};
EditBookManager.prototype.showSaveBtn = function(){
    $('.saveDeleteBtn').css('visibility','visible');
};
EditBookManager.prototype.hideSaveBtn = function(){
    $('.saveDeleteBtn').css('visibility','hidden');
};
EditBookManager.prototype.reloadAfterDelete = function(book_id,page){
    var self = this ;
    if(page == null)
        page = 1 ;
    if (self.device != config.DEVICE_APP)
        page = page + self.getBookController().catalogEmptyPage;
    self.toReload(book_id, page + self.getBookController().getFlipBook().getFrontCoverPageNum());
};
EditBookManager.prototype.setEditorLimit = function(type){
    var self = this ;
    if(type === "new"){
        var limit_data = JSON.parse(sessionStorage.getItem("user_member_level"));
        if(limit_data){
            var right = limit_data.rights ;
            self._myMiniEditor.setLimit(right.images,right.audios,-1,right.videos,right.video_duration,right.is_top) ;
        }
    }
};
EditBookManager.prototype.editHandler = function(data) {
    var self = this;
    if(self._targetName === '.over_page'){
        self._content_id = null ;
    }else{
        self._content_id = data.content_id;
    }
    self._targetName = data.target_name;
    if(data.direction)
        self.direction = data.direction ;
    if (self._targetName === ".editContent") {
        self.commandChannel.postCommand(BookCommand.BOOK_BG_MUSIC,{type:"pause"});
        self.content_action = "edit";
        self._bookController.loadContentDataByContentID(self._content_id, function(data) {
            var title = data.title || '';
            var content = data.content || '';
            var date = data.ctime;
            var update_check = data.update_check ;
            var right = data.rights ;
            if(right){
                self._myMiniEditor.setLimit(right.images,right.audios,-1,right.videos,right.video_duration,right.is_top) ;
            }
            self._origin_article_title = title;
            self._origin_article_content = content;
            if(data.hasOwnProperty("content_type") && data.content_type === 3){
                //篇章页
                self._myMiniEditor.enableAudioBtn(false) ;
                self._myMiniEditor.enableUploadImageBtn(false) ;
                self._myMiniEditor.enableAlignLeftBtn(false) ;
                self._myMiniEditor.enableAlignCenterBtn(false) ;
                self._myMiniEditor.enableAlignRightBtn(false) ;
                self._myMiniEditor.enableFontNameBtn(false) ;
                self._myMiniEditor.enableFontColorBtn(false) ;
            }else{
                self._myMiniEditor.enableAudioBtn(true) ;
                self._myMiniEditor.enableUploadImageBtn(true) ;
                self._myMiniEditor.enableAlignLeftBtn(true) ;
                self._myMiniEditor.enableAlignCenterBtn(true) ;
                self._myMiniEditor.enableAlignRightBtn(true) ;
                self._myMiniEditor.enableFontNameBtn(true) ;
                self._myMiniEditor.enableFontColorBtn(true) ;
            }
            self._myMiniEditor.setTitle(title) ;
            self._myMiniEditor.setMiniDate(date);
            self._myMiniEditor.setContent(content);
            var editorTimeout = setTimeout(function(){
                clearTimeout(editorTimeout);
                self._myMiniEditor.formatContent($('#edit_content').width() -50);
            },100);
            if (self._content_id) {
                $('.position_pre').hide();
                $('.position_next').hide();
                // $('.nextStepBtn').html('确定');
                $('.nextStepBtn').attr('content_id', self._content_id);
            }
            $('.edit_first_pan').show();
            $('.saveToBookBtn').attr('content_id',self._content_id);
            $('.saveToBoxBtn').attr('content_id',self._content_id);
            $('.saveToBookBtn').attr('update_check',update_check);
            $('.saveToBoxBtn').attr('update_check',update_check);
        },function(error){
            self.dealError(error);
        })
    } else if (self._targetName === ".removeContent") {
        self._bookController.removeArticle(self._content_id, data.article_id, function(data) {
            self.changeSaveBtnDisplay(data);
        });
        self.commandChannel.postCommand(BookCommand.REMOVE_CONTENT,{content_id:self._content_id});
    } else if (self._targetName === ".recoverContent") {
        self._bookController.recoverArticle(self._content_id, data.article_id, function(data) {
            self.changeSaveBtnDisplay(data);
            // var selected_catalog_item = $('.catalog_item[catalog_content_ids='+self._content_id+']') ;
            // selected_catalog_item.find('input').prop('checked', false);
            // selected_catalog_item.css('background', 'none');
            self.commandChannel.postCommand(BookCommand.RECOVER_CONTENT,{content_id:self._content_id});
        });
    } else if(self._targetName === ".addNewContent" || self._targetName === '.over_page'){
        self.setEditorLimit("new");
        self.content_action = "add";
        if (self.device == config.DEVICE_APP && self.status == config.STATUS_EDIT)
            noticeToApp('addNewPage', "addNewPage");
        else{
            $('.saveToBoxBtn').removeAttr('draft_id');
            $('.saveToBookBtn').removeAttr('draft_id');
            $('.saveToBoxBtn').removeAttr('content_id');
            $('.saveToBookBtn').removeAttr('content_id');
            $('.saveToBoxBtn').removeAttr('update_check');
            $('.saveToBookBtn').removeAttr('update_check');
            if(self.book.isPicTheme == true){
                self.showUploadImagePan();
            }else{
                self._bookController.addArticleToBook(self,data,self._targetName);
            }
        }
    } else if (self._targetName === ".moveContent") {
        var layout_position = $(data.target).attr('layout_position');
        sendData({
            is_api: true,
            url: '/v1/book/content/layout_position',
            data: {
                book_id: self.book.book_id,
                content_id: self._content_id,
                layout_position: layout_position
            },
            callback: function(data) {
                self.refreshToPage(data);
            },
            errorFun: function(error) {
                self.dealError(error);
            }
        })
    }
};
EditBookManager.prototype.addCreativeTime = function() {
    var self = this;
    if(self.device != config.DEVICE_APP && self.status == config.STATUS_EDIT){
        sendData({
            is_api: true,
            url: API_BOOK_CREATIVE_GETTIME,
            method: 'post',
            data: {
                book_id: self.book.book_id
            },
            callback: function(data) {
                $(document).on(config.MOUSE_CLICK, '.edit_create_time_btn', function() {
                    var creation_str = '<div id="modify_creation_time" style="z-index:999999;width: 100%;position: fixed;top:0;left: 0;background-color: rgba(0,0,0,0.5); height:' + $(document).height() + 'px;"><div class="modify_pan" style="width: 460px;position: fixed;top: 30%;left: 50%;margin-left: -200px;padding: 24px 40px;border-radius:10px;background-color: #fff;"><div class="modify_title" style="font-size: 20px;font-weight: 700;margin-bottom: 30px;">修改创作时间</div><div class="modify_time" style="margin-bottom: 36px;font-size:0;"><p class="time_conntent" style="position: relative;"><input type="text"  id="datetimepicker_star" readonly="readonly" value="' + data.ctime_start.split(" ")[0] + '" style="display:inline-block;width: 160px;line-height: 32px;border: 1px solid #c3c3c3; border-radius: 10px; text-align: center;cursor:pointer;color: #c3c3c3;letter-spacing: 2px;font-size: 16px;">   <span style="display:inline-block;vertical-align:middle;width:40px;margin:0 10px;height: 1px;background-color:#c3c3c3;overflow: hidden;"></span><input type="text"  id="datetimepicker_end" value="' + data.ctime_end.split(" ")[0] + '"  readonly="readonly" style="display:inline-block;width: 160px;line-height: 32px;border: 1px solid #c3c3c3; border-radius: 10px; text-align: center;cursor:pointer;color: #c3c3c3;letter-spacing: 2px;font-size: 16px;"></p></div><div class="modify_operation" style="margin-bottom: 10px;text-align: center;"><span class="cancel_mod" style="margin-right: 48px;cursor: pointer;"><img src="https://static.shiqichuban.com/assets/img/icon/cancel_icon.png" width="74" height="39"/></span><span class="sure_mod" style="cursor: pointer;"><img src="https://static.shiqichuban.com/assets/img/icon/keeps_icon.png" width="74" height="39"/></span></div></div></div>';
                    $(document.body).append(creation_str);
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
                }).on(config.MOUSE_CLICK, '.sure_mod', function() {
                    var starTime = $('#datetimepicker_star').val().split('-').join('');
                    var endTime = $('#datetimepicker_end').val().split('-').join('');
                    var clear_Interval;
                    if (starTime > endTime) {
                        $('.modify_title').css('margin-bottom', '0');
                        if ($('.tips_content').length <= 0) {
                            clearTimeout(clear_Interval);
                            $('.modify_title').after('<div class="tips_content" style="text-align:center;font-weight:700;line-height:30px;">请选择正确的创作时间</div>');
                            clear_Interval = setTimeout(function() {
                                $('.tips_content').remove();
                                $('.modify_title').css('margin-bottom', '30px');
                            }, 1000);
                        }
                        return;
                    }
                    var postDate = {
                        "book_id": self.book.book_id,
                        "ctime_start": $('#datetimepicker_star').val() + ' 00:00:00',
                        "ctime_end": $('#datetimepicker_end').val() + ' 00:00:00'
                    };
                    var Current_page = self._bookController.getCurrentPageNum();
                    sendData({
                        is_api: true,
                        url: API_BOOK_CREATIVE_SETTIME,
                        method: 'post',
                        data: postDate,
                        callback: function(data) {
                            self.refreshToPage(data);
                        },
                        errorFun: function(data) {
                            console.log('error', API_BOOK_CREATIVE_SETTIME)
                        }
                    })
                }).on(config.MOUSE_CLICK, '.cancel_mod', function() {
                    $('#modify_creation_time').remove();
                });
            },
            errorFun: function(data) {
                console.log('error', API_BOOK_CREATIVE_GETTIME)
            }
        });
    }
};
EditBookManager.prototype.addTitpageImg = function() {
    var self = this;
    if (self.device != config.DEVICE_APP && self.status == config.STATUS_EDIT){
        var width;
        var height;
        var boundx;
        var boundy;
        var jcrop_api;
        var start_x;
        var start_y;
        var end_x;
        var end_y;
        var clip_width;
        var clip_height;
        var ratio = 1;
        var postdata;
        var postdata1;
        var Current_page = self._bookController.getCurrentPageNum();
        var tit_page_jsfile = '<script type="text\/javascript" src="\/assets\/js\/jquery\/plugin\/jquery.Jcrop.min.js"><\/script>' + '<link rel="stylesheet" href="\/assets\/css\/jquery\/plugin\/jquery.Jcrop.css"\/>';
        $(document).on(config.MOUSE_CLICK, '.edit_author_photo_btn', function() {
            var tit_page_str = '<div id="modify_tit_pic" style="z-index: 999999;width: 100%;position: fixed;top:0;left: 0;background-color: rgba(0,0,0,0.5); height:'+ $(window).height()+'px;"><div class="pagetit_pan" style="padding: 20px 18px 20px 20px;width:25%;position: fixed;top: 15%;left: 50%;margin-left: -12.5%;border-radius:10px;background-color: #fff;"><div class="title_images_con" style="margin-bottom: 6px;border: 1px solid #b4b2b3;border-radius: 10px;width: 100%;height:200px;position:relative;"><img class="tit_img_loading" src="/web/themes/common/loading.gif" style="border-radius:10px;position:absolute;left:50%;top:50%;margin-left:-15px;margin-top:-15px;"/><img class="tit_img_insert"  width="100%" style="border-radius:10px;"/><div class="tit_img_view" style="display:none;width:100%;position:relative;"><img id="loading" src="/web/themes/common/loading.gif" style="position:absolute;left:50%;top:50%"><img id="crop_target" style="max-width:100%;align-self: center"/></div></div><div class="handle_tips" style="margin-bottom: 25px;position: relative;"><span class="tit_img_tips" style="line-height: 28px;font-size: 12px;">请选择裁剪区域~</span><a class="tit_img_btn" style="position: absolute;right: 0;cursor: pointer;border: 1px solid #ccc;color: #666;border-radius:26px;padding: 8px 12px;font-size: 12px;">上传新图片<input type="file" class="upload_url" name="" id="" value="上传新图片" accept="image/*" style="width: 90px;height:26px;position: absolute;left:0;top:0;right: 0;opacity:0;cursor:pointer;" /></a></div><div class="sure_btn" style="text-align: center;"><span class="tit_img_close" style="display:inline-block;padding: 5px 20px;border: 1px solid transparent;border-radius: 20px;background-color: #f3f3f3;margin-right: 60px;font-size: 14px;cursor:pointer">关闭</span><span class="tit_img_sure" style="display:inline-block;padding: 5px 20px;border: 1px solid transparent;border-radius: 20px;background-color: #000;color: #fff;font-size: 14px;cursor:pointer;">保存</span></div></div></div>';
            $(document.body).append(tit_page_str);
            sendData({
                is_api: true,
                url: API_BOOK_TITLE_GETIMG,
                method: 'post',
                data: {
                    book_id: self.book.book_id
                },
                callback: function(data) {
                    if (data.err_code == 0) {
                        $('.tit_img_insert').attr('src', data.avatar);
                        $('.title_images_con').css('height', 'auto');
                        $('#modify_tit_pic').prepend(tit_page_jsfile);
                        $('.tit_img_loading').remove();
                    }
                },
                errorFun: function(data) {
                    console.log('error', API_BOOK_TITLE_GETIMG)
                }
            })
        })
            .on('change', '.upload_url', function(e) {
                var imgboxW = $('.pagetit_pan').width();
                var file = e.target.files[0];
                var filereader = new FileReader;
                filereader.onload = function(e) {
                    var img = new Image();
                    img.onload = function() {
                        if (img.width >= img.height) {
                            var re_width = img.width > imgboxW ? imgboxW : img.width;
                            var re_height = re_width * img.height / img.width;
                        } else if (img.width < img.height) {
                            var re_height = img.height > imgboxW ? imgboxW : img.height;
                            var re_width = re_height * img.width / img.height;
                        }
                        if (img.width < 100 || img.height < 100) {
                            var re_height = 100;
                            var re_width = 100;
                        }
                        var canvas = document.createElement('canvas');
                        canvas.width = re_width;
                        canvas.height = re_height;
                        var context = canvas.getContext('2d');
                        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, re_width, re_height);
                        postdata = canvas.toDataURL("image/jpeg");
                        $('#crop_target').attr('src', postdata);
                        $('#crop_target').css('width', re_width);
                        $('#crop_target').css('height', re_height);
                        $('#crop_target').css('margin-left', (380 - re_width) * 0.5);
                        $('#crop_target').Jcrop({
                            onChange: updatePreview,
                            onSelect: updatePreview,
                            aspectRatio: ratio,
                            setSelect: [0, 0, 300, 300],
                        }, function() {
                            var bounds = this.getBounds();
                            boundx = bounds[0];
                            boundy = bounds[1];
                            jcrop_api = this;
                            jcrop_api.animateTo([0, 0, 300, 300]);
                            $('.jcrop-holder').css({
                                'width': re_width,
                                'border-radius': '10px'
                            });
                            $('.tit_img_insert').hide();
                            $('.tit_img_view').show();
                            $('.tit_img_view').css('width', re_width);
                            $('.title_images_con').css('width', re_width);
                            $('.tit_img_btn').hide();
                        });
                    };
                    img.src = e.target.result;
                };
                filereader.readAsDataURL(file);
                function updatePreview(c) {
                    if (parseInt(c.w) > 0) {
                        var rx = width / c.w;
                        var ry = height / c.h;
                        start_x = c.x;
                        start_y = c.y;
                        end_x = c.x2;
                        end_y = c.y2;
                        clip_width = c.w;
                        clip_height = c.h;
                    }
                }
            })
            .on(config.MOUSE_CLICK, '.tit_img_close', function() {
                $('#modify_tit_pic').remove();
            })
            .on(config.MOUSE_CLICK, '.tit_img_sure', function() {
                if ($('.tit_img_btn').is(':hidden')) {
                    var data_url;
                    var formData = new FormData();
                    var data1;
                    var type;
                    var blob;
                    var img = new Image();
                    var canvas1 = document.createElement('canvas');
                    var context1 = canvas1.getContext('2d');
                    var img_y = $('.jcrop-tracker').eq(0).parent().parent().position().top;
                    var img_x = $('.jcrop-tracker').eq(0).parent().parent().position().left;
                    var img_w = $('.jcrop-tracker').width();
                    var img_h = $('.jcrop-tracker').height();
                    canvas1.width = img_w;
                    canvas1.height = img_h;
                    img.src = $('.jcrop-hline').prev('img').attr('src');
                    context1.drawImage(img, img_x, img_y, img_w, img_h, 0, 0, img_w, img_h);
                    postdata1 = canvas1.toDataURL("image/jpeg");
                    data1 = postdata1.split(',')[1];
                    type = postdata1.split(';')[0].split('/')[1];
                    blob = toBlob(data1, type);
                    getbase(formData, basesumit);
                    function basesumit() {
                        var tit_img_data = {
                            'book_id': self.book.book_id,
                            'avatar': data_url
                        };
                        sendData({
                            is_api: true,
                            url: API_BOOK_TITLE_SETIMG,
                            method: 'post',
                            data: tit_img_data,
                            callback: function(data) {
                                if (data.err_code == 0) {
                                    $('.tit_img_insert').attr('src', data.avatar);
                                    $('.title_images_con').css('height', 'auto');
                                    self.refreshToPage(data);
                                }
                            },
                            errorFun: function(data) {
                                console.log('error', API_BOOK_TITLE_GETIMG)
                            }
                        })
                    }
                    function getbase(formData, callback) {
                        formData.append('img_type_' + 0, type);
                        formData.append('img_id_' + 0, 'title');
                        formData.append('img_file_' + 0, blob);
                        sendData({
                            is_api: true,
                            url: API_UPLOAD_PICS,
                            data: formData,
                            data_type: 'text',
                            method: 'post',
                            async: true,
                            callback: function(data) {
                                //接受后端返回的图片URL地址,替换文档里的BASE64数据
                                $('#crop_target').attr('src', data.images[0].url);
                                data_url = data.images[0].url;
                                callback();
                            },
                            processData: function(data) {
                                console.log(data, 'processData')
                            },
                            contentType: function(data) {
                                console.log(data, 'contentType')
                            }
                        });
                    }
                }
            });
    }
};
EditBookManager.prototype.changeSaveBtnDisplay = function(data) {
    if (data) {
        $('.saveDeleteBtn').css('visibility', 'visible');
        noticeToApp('showRemoveBtn');
        $('.saveDeleteBtn').show();
        $('.view_banner_img').remove();
    } else {
        $('.saveDeleteBtn').css('visibility', 'hidden');
        noticeToApp('hideRemoveBtn');
        $('.view_banner_img').hide();
    }
};
EditBookManager.prototype.refreshToPage = function(data){
    var self = this ;
    if (data.minPage) {
        var minPage = data.minPage ;
        if(self.book.book_display == config.BOOK_DISPLAY_SINGLE)
            minPage = data.minPage - self._bookController.catalogEmptyPage;
        self.toReload(self.book.book_id, minPage + self._bookController.getFlipBook().getFrontCoverPageNum());
    } else
        self.toReload(self.book.book_id);
};
EditBookManager.prototype.addEditBookBGMusicEvent = function(){
    var self = this ;
    $(document).on(config.MOUSE_CLICK,".edit_bg_music",function(e){
        e.stopPropagation();
        self.commandChannel.postCommand(ModuleCommand.SHOW_AUDIO_LIST,{type:'single'});
    })
};
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
EditBookManager.prototype.addWriteBookTips = function(){
    var self = this ;
    if($('.color_book_write_tips').length==0){
        var tips='';
        tips+='<div class="color_book_write_tips" style="position: fixed;z-index:999999;left:0;top:0;width:100%;height:100%;background-color: rgba(0,0,0,0.5);" ">';
        tips+=  '<div class="tips_info" style="position:absolute;left:50%;margin-left:-11.15%;margin-top:'+$(window).height()*0.14+'px;width:22.3%;">'
        tips+=          '<div style="width:100%;height: 100%;">'
        tips+=              '<img class="close_color_book_write" style="position: absolute;right: -10px;top: -10px;width: 30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png">'
        tips+=               '<img style="width:100%" src="https://static.shiqichuban.com/assets/img/color_book/color_book_write_tips.png">'
        tips+=               '<div style="background:#fff;text-align: center;padding: 10px 0;"><span class="no_write_book_tips" style="display: inline-block;font-size:12px;line-height: 30px;border-radius: 15px;    background: #ccc;padding: 0 26px;color: #fff;margin-right: 10px;cursor: pointer;">不再提醒</span><span class="write_book_tips" style="display: inline-block;font-size:12px;line-height: 30px;border-radius: 15px;    background: #000;padding: 0 26px;color: #fff;margin-left: 10px;cursor: pointer;">确认</span></div>'
        tips+=          '</div>';
        tips+=  '</div>';
        tips+='</div>';
        $(document.body).append(tips);
    }
};
EditBookManager.prototype.editBookTips = function(){
    var self = this ;
    if($('.edit_book_tips').length==0){
        var tips='';
        tips+='<div class="color_book_edit_tips" style="position: fixed;z-index:999999;left:0;top:0;width:100%;height:100%;background-color: rgba(0,0,0,0.5);" ">';
        tips+=  '<div class="tips_info" style="position:absolute;left:50%;margin-left:-11.15%;margin-top:'+$(window).height()*0.14+'px;width:22.3%;">'
        tips+=          '<div style="width:100%;height: 100%;">'
        tips+=              '<img class="close_edit_book_write" style="position: absolute;right: -10px;top: -10px;width: 30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png">'
        tips+=                '<div class="tips_msg" style="background: #fff;font-size:16px;padding:34px 30px;line-height: 24px">修改文章保存会重新排版您的文章，您之前的排版会丢失。</div>'
        tips+=
            tips+=               '<div style="background:#fff;text-align: center;padding: 30px 0;"><span class="no_edit_book_tips" style="display: inline-block;font-size:12px;line-height: 30px;border-radius: 15px;    background: #ccc;padding: 0 26px;color: #fff;margin-right:20px;cursor: pointer;">不再提醒</span><span class="edit_book_tips" style="display: inline-block;font-size:12px;line-height: 30px;border-radius: 15px;    background: #000;padding: 0 26px;color: #fff;margin-left: 20px;cursor: pointer;">确认</span></div>'
        tips+=          '</div>';
        tips+=  '</div>';
        tips+='</div>';
        $(document.body).append(tips);
    }
};
