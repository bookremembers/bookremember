/**
 * Created by naxiaoguang on 6/14/16.
 */


var MyKindEditor = function (options) {

    var ke = this;

    var width = options.width;
    var height = options.height;
    var uploadJson = options.uploadJson;
    var token = options.token;
    var tags = options.tags;

    var article_id = options.article_id || 0;
    var article_type = options.article_type || 0;
    var book_id = options.book_id;
    var from_type = options.from_type || "";
    var update_check = options.update_check || "";
    var article_user_id = options.article_user_id ;
    var user_id = options.user_id ;
    var editor_type = options.editor_type || "private" ;

    var title = options.title || '';
    var content = options.content;
    var select_tags = options.select_tags || [];
    var dateTime = options.dateTime;
    var save_com = options.save_com;
    var saveToBookCom = options.saveToBookCom;
    var saveToBoxCom = options.saveToBoxCom;
    var rights = options.rights.rights ;
    var isTopLevel = rights.is_top !== 0 ;
    var tag_arr = [];//选择的标签
    var title_len = 20;//可输入标题的长度
    var selected_tag_len = 6;//最多可选标签数量
    var reset_title_len = title_len; //剩余可输入标题字符数

    var _viewController;
    var _dataController;
    var _fileController;
    var _editorManager;
    var _imageController;
    var _audioListController;

    var _createComCallback = null;

    var books_id = [];//需要把文章添加的bookid
    var books_tit = [];
    var is_over = true;
    var data_over = false;

    var read_book = [];
    var _last_book_id = null;
    var is_saving = false;

    this.setBookAttr = function (_book_id) {
        book_id = _book_id;
    };
    this.cleanContent = function () {
        _editorManager.clear();
    };
    this.init = function (selector, callback) {
        var arr = [
            "https://static.shiqichuban.com/assets/css/bootstrap3/bootstrap-datetimepicker.css",
            "https://static.shiqichuban.com/assets/js/book_v2/controller/book/Config.js",
            "https://static.shiqichuban.com/assets/js/base64.js",
            "https://static.shiqichuban.com/assets/js/jquery/plugin/jquery.md5.js",
            "https://static.shiqichuban.com/assets/js/jquery/plugin/jquery.simplePagination.js",

            'https://static.shiqichuban.com/assets/css/jquery/plugin/cropper.min.css',
            'https://static.shiqichuban.com/assets/js/jquery/plugin/cropper.min.js',

            "https://static.shiqichuban.com/assets/js/bootstraps3/bootstrap.js",
            "https://static.shiqichuban.com/assets/js/bootstraps3/bootstrap-datetimepicker.js?t=1506658351",
            "https://static.shiqichuban.com/assets/js/bootstraps3/bootstrap-datetimepicker.zh-CN.js",

            "https://static.shiqichuban.com/assets/js/modules/audio_list.js?t=1556244608",

            "https://static.shiqichuban.com/assets/js/kindEditor/kindeditor-all.js?t=1535528123",
            "https://static.shiqichuban.com/assets/js/kindEditor/controller/data_controller.js?t=1524713071",
            "https://static.shiqichuban.com/assets/js/book_v2/command/controllers/BookImageEditController.js?t=1506658351",
            "https://static.shiqichuban.com/assets/js/kindEditor/controller/file_controller.js?t=1556244608",
            "https://static.shiqichuban.com/assets/js/kindEditor/controller/view_controller.js?t=1558492600",
            "https://static.shiqichuban.com/assets/js/kindEditor/controller/editor_manager.js?t=1556525226"
        ];
        yepnope({
            test: true,
            yep: arr,
            nope: arr,
            complete: function () {
                _viewController = new EditorViewController(from_type);
                _dataController = new EditorDataController();
                _fileController = new EditorFileController();
                _imageController = new BookImageEditController();
                _audioListController = new AudioListController();
                _editorManager = new EditorManager(ke, _dataController, _fileController, _imageController);
                if(rights)
                    _editorManager.setLimit(rights.images,rights.audios,null,rights.videos,rights.video_duration,isTopLevel);
                ke.start(selector, callback)
            }
        });
    };

    this.start = function (selector, callback) {
        _createComCallback = callback;

        var items = ['upload_pic', 'upload_audio','|', 'justifyleft', 'justifycenter' ,'justifyright','|','fontname','forecolor'];
        var keCotent = ".ke-content{padding:0 15px 0 15px;font-size:14px; font-family:'宋体';} img{max-width:100%}";
        ke.editor = KindEditor.create(selector, {
            width: width,
            height: height,
            minHeight: height,
            resizeType: 1,
            cssData: keCotent,
            themeType: 'default',
            items: items,
            allowFileManager: false,
            allowImageRemote: false,
            pasteType: 1,
            uploadJson: uploadJson,
            extraFileUploadParams: {
                _token: token,
                category_id: 1
            },
            afterCreate: ke.afterCreate,
            layout: _viewController.getWriteEditorLayout(options.save_box, options.save_book),
            afterChange: ke.afterChange
        });

        KindEditor.plugin('upload_pic', function (K) {
            var self = this, name = 'upload_pic';
            self.clickToolbar(name, function () {
                $('#file_input').trigger('click');
            });
        });
        KindEditor.plugin('upload_audio', function (K) {
            var self = this, name = 'upload_audio';
            self.clickToolbar(name, function () {
                ke.addAudioView();
            });
        });

        Fetcher.fetchData(
            "/v1/font/list",
            null,
            'get',
            null,
            function (data) {
                var fonts = data.fonts ;
                var fonts_data = {};
                for(var i in fonts){
                    var font_name = fonts[i].font_name ;
                    fonts_data[font_name] = font_name ;
                }

                KindEditor.lang({
                    upload_pic: '上传图片',
                    upload_audio: '上传音频',
                    'fontname.fontName' : fonts_data,
                });
            },
            function () {
            }
        );
    };

    this.getContent = function () {
        return _editorManager.getContent();
    };

    this.afterChange = function () {
        _editorManager.afterChange();
    };

    this.afterCreate = function () {
        _editorManager.setFontStyle() ;
        $('.tag_thumb_container').append($(_viewController.createTags(tags)));
        ke.addDateTimePicker() ;
        ke.refreshView();
        ke.refreshTag();
        ke.createSelectedTagByArr(select_tags);
        ke.addEventAction();
        ke.addZoneEventAction();
        _editorManager.enableVideoImagePlay();
        _editorManager.enableImageEdit();

        if (_createComCallback)
            _createComCallback();
    };


    this.addDateTimePicker = function(){
        $('.ke-toolbar').append(_viewController.getDataTimePicker());
        if (dateTime) {
            if (dateTime.indexOf('-') > -1) {
                var date = dateTime;
            } else {
                var date = new Date(parseInt(dateTime)).toLocaleDateString().replace(/\//g, "-");
            }
            _editorManager.addDateTimePicker(date);
        } else {
            _editorManager.addDateTimePicker(getCurrentDate(true));
        }
    };

    this.setContent = function (content) {
        _editorManager.setContent(content);
    };
    this.addVideoPlayBtnToContent = function () {
        _editorManager.addVideoPlayBtnToContent();
    };
    this.initAudioClickEvent = function(){
        _editorManager.setEditorAudioClickEvent();
    };
    this.formatContent = function(){
        _editorManager.formatContent();
        _editorManager.scaleForAll();
    };
    this.refreshView = function () {

        $('#kind-editor').css('padding-left', '0px !important');
        $('#kind-editor').css('padding-right', '0px !important');

        if (this.fullscreenMode)
            $('.ke-toolbar .ke-icon-fullscreen').css('background-image', 'url(https://static.shiqichuban.com/assets/img/icon/icon_unfullscreen.png)');
        else
            $('.ke-toolbar .ke-icon-fullscreen').css('background-image', 'url(https://static.shiqichuban.com/assets/img/icon/icon_fullscreen.png)');

        $('#title-input').val(title);

        $('#title_notice').text('还可以输入' + reset_title_len + '个字符');


        if (this.fullscreenMode) {

            var width = $(window).width() <= 600 ? $(window).width() : 600;
            var ke_frame = $(".ke-edit-iframe").contents().find(".ke-content");

            if (isPC()) {

                var left = $(window).width() <= 600 ? 0 : ($(window).width() - 600) * 0.5;

                $('.tag_bar').css('height', 'auto');
                ke_frame.css('border-left', '1px solid #ccc');
                ke_frame.css('border-right', '1px solid #ccc');
                ke_frame.css('margin-left', left + 'px');
                 ke_frame.css('height',  '100%');
                //编辑器内容区域的最大宽度为width 600px;
                ke_frame.css('width', width + 'px');

            } else {

                //在手机上需要设置标签的宽度为
                $('.h_tag').css('width', width + 'px');
                $('.ke-edit').css('width', width + 'px');
                $('.ke-edit').css('height', ($(window).height() - 200) + 'px');
                $('.ke-toolbar').css('width', width + 'px');
            }
        }

        if (!isPC()) {

            $('.input_tag').css('width', '60%');
            $('.ke-outline').css('padding', '5px 0');

        }

        $('.ke-edit').css({
            // 'height': ($(window).height() - 300) + 'px',
            '-webkit-overflow-scrolling': 'touch'
        })
    };
    this.addEventAction = function () {
        var self = this;
        var ke_frame = $(".ke-edit-iframe").contents().find(".ke-content").get(0);
        var drag_area_mask;
        document.addEventListener('dragenter', function (e) {
            if (!drag_area_mask) {
                createArea('拖拽图片至此区域');
            } else {
                $(drag_area_mask).html('拖拽图片至此区域');
                $(drag_area_mask).show();
            }
        });

        ke_frame.addEventListener('dragenter', function (e) {
            if (!drag_area_mask) {
                createArea('释放鼠标');
            } else {
                $(drag_area_mask).html('释放鼠标');
                $(drag_area_mask).show();
            }
        });

        function createArea(text) {
            $(ke_frame).css('position', 'relative');
            $(ke_frame).append('<div class="drag_area_mask" disabled="disabled"  style="position:absolute;top:0;left:0;width:100%;height:100%;line-height:200px;background-color: rgba(0,0,0,0.1);text-align: center">' + text + '</div>');
            //拖离
            drag_area_mask = $(ke_frame).find('.drag_area_mask').get(0);

            drag_area_mask.addEventListener("dragenter", function () {
                $(drag_area_mask).html('释放鼠标');
            })
        }

        $(document).mouseleave(function () {
            if (drag_area_mask && !($(drag_area_mask).is(':hidden'))) {
                $(drag_area_mask).hide();
            }
        });

        function areaChange(text) {
            if (!drag_area_mask) {
                $(ke_frame).css('position', 'relative');
                $(ke_frame).append('<div class="drag_area_mask" disabled="disabled"  style="position:absolute;top:0;left:0;width:100%;height:100%;line-height:200px;background-color: rgba(0,0,0,0.1);text-align: center">释放鼠标</div>');
                //拖离
                drag_area_mask = $(ke_frame).find('.drag_area_mask').get(0);

                drag_area_mask.addEventListener("dragenter", function () {
                    $(drag_area_mask).html('释放鼠标');
                })
            } else {
                $(drag_area_mask).html('释放鼠标');
                $(drag_area_mask).show();
            }
        }

        //扔下
        ke_frame.addEventListener('drop', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(drag_area_mask).hide();
            self.selectFile(e);
        }, false);

        $(document).on('click', '.ke_history_tag', function (e) {

            //点击历史标签
            e.preventDefault();
            e.stopPropagation();

            if (!$(this).hasClass('selected')) {
                $(this).addClass('selected');
                ke.createSelectedTag($(this));
            }

        }).on('click', '.history_selected_tag', function (e) {

            //点击选择的历史标签

            e.preventDefault();

            e.stopPropagation();

            ke.removeSelectedTag($(this).attr('id'));

            $(this).remove();

            $('.input_tag').show();

        }).on('click', '.ke_input_selected_tag', function (e) {

            //点击选择的标签

            e.preventDefault();

            e.stopPropagation();

            $(this).remove();

            $('.input_tag').show();

        }).on('click', '.submit_btn', function (e) {
            e.stopPropagation() ;
            e.preventDefault();
            ke.submitData();
        }).on('click', '#cancel_add_to_content_btn', function (e) {

            e.stopPropagation() ;
            e.preventDefault() ;
            ke.clearPreviewData();

        }).on('click', '#add_to_content_btn', function (e) {

            e.stopPropagation() ;
            e.preventDefault() ;

            if ($('#thumb_preview').children('.upload-thumb').length == 0 || $('#thumb_preview').children('.upload-thumb').length > 9) return;

            ke.toUploadPicToEditor(function () {
                ke.clearPreviewData();
            });

        }).on('click', '.remove_img_btn', function (e) {
            e.stopPropagation();
            $(this).parent().remove();//删除缩略图
            if ($('#thumb_preview').children('.upload-thumb').length == 0) {
                $('#pic_preview').hide();
                $('#file_input').val('');
            }
        }).on('mouseover', '.upload-thumb', function (e) {
            e.stopPropagation() ;
            $(this).css('border', '2px solid white');
            $(this).css('border-radius', '5px');
        }).on('mouseout', '.upload-thumb', function (e) {
            e.stopPropagation() ;
            $(this).css('border', 'none');
        }).on('click', '.books_title', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.modular').show();
            if ($('.is_surebook').length > 0) {
                return;
            }
            _last_book_id = "";

            var _article_id = article_id || '';
            var _scope = _article_id ? 'include' : 'exclude';
            var _amount = 8;

            _last_book_id = $('.exclude').last().val() || '';

            ke.bookListData();


            $('.book_item').scroll(function (e) {

                e.preventDefault();
                e.stopPropagation();

                if (is_over == false || data_over == true) return;

                if ($(this)[0].scrollTop + $(this).height() >= $(this)[0].scrollHeight - 100) {
                    is_over = false;
                    ke.getAddBookList('exclude', _article_id, _amount, $('.exclude').last().val() || '')

                }
            });


            if (_scope == "exclude") {
                ke.getBookList(_scope, _article_id, _amount, $('.exclude').last().val())
            } else {
                ke.getIncludeBook(_scope, _article_id, 100, $('.include').last().val() || '', function () {

                    ke.getBookList('exclude', _article_id, _amount, $('.exclude').last().val() || '')

                })

            }
        }).on('click', '.discard', function (e) {

            e.preventDefault();
            e.stopPropagation();
            $('.modular').hide();
            if ($('.is_surebook').length > 0) {
                $('.modular').remoClass('is_surebook');

            }
        }).on('click', '.ensure', function (e) {

            e.preventDefault();
            e.stopPropagation();

            books_id = [];
            books_tit = [];
            var tit_str = '';
            $('.book_ischeck').each(function (index, ele) {
                if ($(this).prop('checked')) {
                    books_id.push($(this).val());
                    books_tit.push($(this).prev('span').html());

                }
            });

            for (var i = 0; i < books_tit.length; i++) {
                if (i == 0) {
                    tit_str += books_tit[i];
                } else {
                    tit_str += '、' + books_tit[i];
                }
            }

            $('.books_title').html(tit_str || '添加至书册');

            $('.modular').hide();
            $('.modular').addClass('is_surebook');

        }).on('click', '.book_cover', function (e) {

            var _this_ischeck = $(this).parents('.book_info').find('.book_ischeck').prop('checked');

            if (_this_ischeck) {
                $(this).parents('.book_info').find('.book_ischeck').prop('checked', false);
            } else {
                $(this).parents('.book_info').find('.book_ischeck').prop('checked', true);
            }

        });


        // $('#title-input').on('input', function (e) {

        //     title = $('#title-input').val();

        //     reset_title_len = title_len - title.length < 0 ? 0 : title_len - title.length;

        //     $('#title_notice').text('还可以输入' + reset_title_len + '个字符');

        // });
        var maxLen = title_len;
        var cpLock = false;
        $('#title-input').off().on({
            compositionstart: function () {//中文输入开始
                cpLock = true;
            },
            compositionend: function () {//中文输入结束
                var $this = $(this), _val = $this.val();
                cpLock = false;
                $this.val(subString(_val, maxLen));
            },
            keydown: function (e) {
                if (e.keyCode == 13) {
                    if (!max_line) return true;
                    if ($(e.target).val().match(/[\r\n]/g) && $(e.target).val().match(/[\r\n]/g).length == max_line - 1) return false;
                }
            },
            input: function () {
                var $this = $(this), _val = $this.val();
                if (cpLock) {
                    $this.val(_val);
                } else {
                    if (getTextareaLen(_val) > maxLen) {
                        $this.val(subString(_val, maxLen));
                    }
                }
                title = $('#title-input').val();

                reset_title_len = title_len - title.length < 0 ? 0 : title_len - title.length;

                $('#title_notice').text('还可以输入' + reset_title_len + '个字符');
            }
        });
        function getTextareaLen(str) {
            if (str == null || str == "") return 0;
            var len = 0;
            var repEnter = /[\&]/;  //  & 符号
            str = str.replace(/[\r\n]/g, '&');
            var strAttr = str.split('');
            strAttr.forEach(function (val, key) {
                if (isHalfCount(val)) {
                    len += 0.5;
                } else if (repEnter.test(val)) {
                    maxLen++;
                } else {
                    len += 1;
                }
            })
            return len;
        }
        function subString(str, maxLen) {
            var strAttr = str.split('');
            var len = maxLen;
            strAttr.forEach(function (val) {
                if (isHalfCount(val)) {
                    len += 0.5;
                }
            });
            return str.substring(0, len);
        }
        function isHalfCount(val) {
            var repOne = /[0-9a-zA-Z|\s]/;  // 字母数字
            var repSign = /[\x00-\xff]+/;
            return repOne.test(val) || repSign.test(val);
        }

        $('.input_tag').keydown(function (e) {

            if (e.keyCode === 13) {

                var text = $('.input_tag').val().trim();

                if (text.length > 0) {

                    ke.createSelectedTag(text);
                }

                $('.input_tag').val('');
            }

        });

        $('#file_input').on('change', ke.selectFile);
    };

    this.submitData = function(){
        var select_weather = '';
        if (is_saving) return;
        is_saving = true;
        var title = ($('#title-input').val().trim());
        var article_date = $('.ke-date-input').val();
        var article_title = title.length == 0 ? null : title;
        var article_content = KindEditor.instances[0].html();
        var article_tags = [];
        $('.ke_input_selected_tag').each(function () {
            article_tags.push($(this).text().replace(' ×', ""));
        });
        $('.history_selected_tag').each(function () {
            article_tags.push($(this).text().replace(' ×', ""));
        });
        _editorManager.checkContent(function () {
            ke.saveFun(article_id, article_content, article_title, select_weather, article_tags, article_date, books_id);
        }, function () {
            is_saving = false;
            showLoading("", false);
        });
    };

    this.uploadMediaFile = function (article_content, callback) {
        _editorManager.showStatus('上传文件...');
        var self = this;
        _editorManager.doVideoUpload($('<div>' + self.getContent() + '</div>'), function () {
            _editorManager.doImageUpload($('<div>' + self.getContent() + '</div>'), function () {
                callback();
            });
        });
    };
    this.addZoneEventAction = function () {
        var self = this;
        $(document).on('click', '.saveToBookBtn', function (e) {
            e.stopPropagation();
            showLoading("正在保存到本书", true);
            self.saveArticleToBook();
        }).on('click', '.saveToBoxBtn', function (e) {
            e.stopPropagation();
            showLoading("正在保存到草稿箱", true);
            self.saveArticleToBox();
        })
    };
    this.saveArticleToBook = function (force_update,callback) {
        if (is_saving) return;
        is_saving = true;
        if (article_type === 0) {
            article_type = 0;
            article_id = 0;
        } else if (article_type === 2) {
            force_update = 1;
        }
        var self = this;
        _editorManager.checkContent(function () {
            self.uploadMediaFile($('<div>' + _editorManager.getContent() + '</div>'), function () {
                var saveToArticle = $('.saveToArticleCheck').prop('checked') == true ? 1 : 0;
                var article_data = {
                    "book_id": parseInt(book_id),
                    "type": parseInt(article_type), // 0为新文章，1已收录，2草稿箱，3审核类
                    "book_article_id": parseInt(article_id),
                    "to_book": 1,     // 0不做任何操作（default），非0表示提交至书中
                    "to_article": saveToArticle,
                    "direction": 1,   // 添加到书中的占位方向
                    "title": $('#title-input').val(),
                    "date": parseInt(dateTime / 1000) || parseInt(Date.now() / 1000),
                    "content": _editorManager.getFormatContent(),
                    "update_check": update_check,
                };

                if(article_user_id)
                    article_data.user_id = article_user_id ;

                if (force_update === 1)
                    article_data.force_update = 1;

                _dataController.bookArticleSave(article_data, function (data) {
                    is_saving = false;
                    showLoading("", false);
                    showConfirm('保存成功!', null, null, function () {
                        if(callback)
                            callback() ;
                        else if (saveToBookCom)
                            saveToBookCom();
                    }, null, 'ok');
                    $('.ke-status-notice').html('');
                }, function (error) {
                    is_saving = false;

                    if (error.err_code === 49) {

                        showLoading("", false);
                        showConfirm('原文章已经通过审核，生成新文章 ?', null, null, function () {
                            article_data.type = 0;
                            article_data.book_article_id = 0;
                            _dataController.bookArticleSave(article_data, function (data) {
                                showLoading("", false);
                                showConfirm('保存成功!', null, null, function () {
                                    if (saveToBookCom)
                                        saveToBookCom();
                                }, null, 'ok');

                            })


                        }, function () {
                            window.location.href = getCurrentWWWDomain() + "/book/single_zone/?" + obj.book_id;

                        }, 'ok|cancel');
                    } else if (error.err_code == 40) {
                        article_data.type = 0;
                        article_data.book_article_id = 0;

                        showLoading("", false);

                        showConfirm(error.err_msg + ' 点击确定新建文章', null, null, function () {
                            var force = 1;
                            article_type = 0;
                            self.saveArticleToBook(force);
                        }, null, 'ok|cancel');


                    } else if (error.err_code == 37) {
                        showLoading("", false);
                        showConfirm(error.err_msg + ' 点击确定覆盖文章', null, null, function () {
                            var force = 1;
                            self.saveArticleToBook(force);
                        }, null, 'ok|cancel');
                    } else {
                        self.dealError(error);
                        showLoading("", false);
                    }

                });
            });
        }, function () {
            is_saving = false;
            showLoading("", false);
        });
    };
    this.saveArticleToBox = function () {
        if (is_saving) return;
        is_saving = true;
        var self = this;

        _editorManager.checkContent(function () {
            self.uploadMediaFile($('<div>' + _editorManager.getContent() + '</div>'), function () {
                var article_data = {
                    "book_id": parseInt(book_id),
                    "type":  parseInt(article_type), // 0为新文章，1已收录，2草稿箱，3审核类
                    "book_article_id":  parseInt(article_id),
                    "to_draft": 1,    // 0不做任何操作（default），非0时表示保存为草稿
                    "title": $('#title-input').val(),
                    "date": parseInt(dateTime / 1000) || parseInt(Date.now() / 1000),
                    "content": _editorManager.getFormatContent(),
                    "update_check": update_check,
                };

                if(article_user_id)
                    article_data.user_id = parseInt(article_user_id) ;

                _dataController.bookArticleSave(article_data, function (data) {
                    is_saving = false;
                    showConfirm('保存到草稿箱成功!', null, null, function () {
                        if (saveToBoxCom)
                            saveToBoxCom();
                    }, null, 'ok');
                    $('.ke-status-notice').html('');
                    showLoading("", false);

                }, function (error) {
                    is_saving = false;
                    self.dealError(error);
                    showLoading("", false);
                });

            });
        }, function () {
            is_saving = false;
            showLoading("", false);
        });
    };

    this.dealError = function (error) {

        var self = this;
        if (error.err_code == 37) {
            showLoading('', false);
            showConfirm(error.err_msg + ' 点击确定覆盖文章', null, null, function () {
                var force = 1;
                self.saveArticleToBook(force);
            }, null, 'ok|cancel');
        } else if (error.err_code == 40) {
            showConfirm(error.err_msg, null, null, function () {
                window.location.href = getCurrentWWWDomain() + "/book/single_zone/?" + obj.book_id;
//              self.saveArticleToBook();
            }, null, 'ok|cancel')
        } else if (error.err_msg)
            showAlert(error.err_msg);
        else
            showAlert('数据请求失败！');
        _editorManager.showStatus('', 'black');
        showLoading('', false);
    };
    this.refreshTag = function () {

        for (var i in tag_arr) {

            $('.selected_tag_container').append(tag_arr[i]);

            var id = $(tag_arr[i]).attr('id');

            try {
                $('.ke_history_tag[id=' + id + ']')

                    .css('background-color', 'black');

            } catch (e) {

            }
        }
    };
    this.createSelectedTag = function (value) {

        if (ke.canAddSelectedTag() === true) {

            var new_tag;

            var id;

            if (typeof value === "object") {

                value.css('background-color', 'black');

                var text = value.text() + " ×";

                id = value.attr('id');

                new_tag = "<div id='" + id + "' class='sq_tag history_selected_tag' style='cursor: pointer;'>" + text + "</div>";

            } else if (typeof value === "string") {

                id = Date.now();

                new_tag = '<div class="sq_tag ke_input_selected_tag " style="cursor: pointer;" style="cursor: pointer;">' + value + " ×" + '</div>';
            }

            tag_arr[id] = new_tag;

            $('.selected_tag_container').append(new_tag);
        }
    };
    this.createSelectedTagByArr = function (arr) {

        for (var i in arr) {
            var text = arr[i].name;
            var ele = $('.ke_history_tag:contains(' + text + ')');
            ele.css('background-color', 'black').addClass('selected');
            var id = ele.attr('id');

            var new_tag = "<div id='" + id + "' class='sq_tag history_selected_tag' style='cursor: pointer;'>" + text + " ×" + "</div>";
            $('.selected_tag_container').append(new_tag);
        }

    };
    this.removeSelectedTag = function (id) {

        $('.ke_history_tag[id=' + id + ']')
            .css('background-color', 'white')
            .removeClass('selected');

        delete tag_arr[id];
    };
    this.canAddSelectedTag = function () {

        var tag_arr = $('.selected_tag_container').children();

        if (tag_arr.length >= selected_tag_len) {
            return false;
        } else {
            if (tag_arr.length === selected_tag_len - 1)
                $('.input_tag').hide();
            else
                $('.input_tag').show();
        }

        return true;
    };

    this.toUploadPicToEditor = function (comFun) {

        _editorManager.insertImage(ke.editor, comFun);
    };
    this.selectFile = function (e) {

        var files = e.target.files || e.dataTransfer.files ;

        _fileController.readFile(files, function (items) {
            if (!items) {
                _editorManager.showStatus('您的浏览器不支持此操作,推荐使用chorme、firefox、safair浏览器', 'red');
                return;
            }
            _editorManager.showStatus('', 'black');

            _editorManager.checkoutOutLimit(items,function(type){
                var str = "" ;
                if(type === "img" || type === "video" || type === "video_dur"){
                    if(type === "img")
                        str = "图片数量" ;
                    else if(type === "video")
                        str = "视频数量" ;
                    else if(type === "video_dur")
                        str = "视频时长" ;

                    ke.toastMemberLimitConfirm(str);
                    ke.clearPreviewData();
                }else{
                    for (var index in items) {
                        (function(i){
                            var type = items[i].type;
                            if (type === "video")
                                $('#thumb_preview').append(_viewController.create_preview_thumb(items[i].thumb, items[i].origin, items[i].file_id, items[i].video_url));
                            else{
                                $('#thumb_preview').append(_viewController.create_preview_thumb(items[i].thumb, items[i].origin, items[i].file_id));
                            }
                        })(index)
                    }
                    if(detectPlatform() === DEVICE_MOBILE){
                        _editorManager.insertImage(ke.editor, function(){
                            ke.clearPreviewData();
                            showLoading('',false);
                        });
                    }else{
                        if (items.length > 0 && isPC()) {
                            $('#pic_preview').show();
                        }
                    }
                }
            });

            $('.ke-edit').css({
                    '-webkit-overflow-scrolling': 'touch',
                    'overflow-y': 'auto',
                }
            )
        })
    };
    this.saveFun = function (article_id, article_content, article_title, seleted_weather, article_tags, article_date, book_ids) {

        var self = this;
        if (!article_content) {
            _editorManager.showStatus('请输入文章内容!', 'red');
            return;
        }
        _editorManager.showStatus('上传文件...');

        _editorManager.doVideoUpload($('<div>' + article_content + '</div>'), function () {
            _editorManager.doImageUpload($('<div>' + KindEditor.instances[0].html() + '</div>'), function () {
                self.saveArticle(article_id, article_title, seleted_weather, article_tags, article_date, book_ids);
            });
        });
    };
    this.saveArticle = function (article_id, article_title, selected_weather, article_tags, article_date, book_ids) {

        _editorManager.showStatus('保存文章...');
        if (books_id.indexOf('1') >= 0 || books_id.indexOf('2') >= 0 || books_id.indexOf('3') >= 0) {
            $(books_id).each(function (index) {
                ke.createEmptyBook(books_id[index], index);
            })
        }

        var data = {
            content: _editorManager.getFormatContent(),
            title: article_title,
            weather: selected_weather,
            tags: article_tags,
            date: article_date,
            book_ids: book_ids
        };

        if (article_id)
            data.article_id = article_id;

        _dataController.saveArticle(data, function () {
            _editorManager.clear();
            if (save_com)
                save_com();
        });
    };
    this.getIncludeBook = function (scope, article_id, amount, last_book_id, callback) {

        var posdata = {
            'scope': scope,
            'article_id': article_id,
            'amount': amount,
            'last_book_id': last_book_id
        };
        sendData({
            is_api: true,
            url: '/v1/article/book/list',
            method: 'post',
            data: posdata,
            callback: function (data) {
                if (data.err_code == 0) {
                    var data_list = '';

                    for (var i = 0; i < data.books.length; i++) {
                        if ((i + 1) % 4 == 0) {
                            data_list += '<div class="book_info" style="position: relative;width: 124px;padding:20px 0 0;float:left">';
                            data_list += '<img class="book_cover" style="width: 124px;height: 162px;border:1px solid #e9e9e9;box-shadow: -2px 0px 0px #ccc;border-bottom-right-radius: 10px;" src="' + data.books[i].thumbnail + '"/>';
                            data_list += '<span style="margin-top: 12px;font-size: 12px;color: #333;line-height: 44px;height: 44px; display: block;font-weight:bold ">' + data.books[i].title + '</span>';
                            if (scope == 'include') {

                                data_list += '<input type="checkbox" name="" checked="checked" class="book_ischeck include" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'
                            } else {
                                data_list += '<input type="checkbox" name="" checked="checked" class="book_ischeck" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'
                            }

                            data_list += '</div>';
                        } else {
                            data_list += '<div class="book_info" style="position: relative;width: 124px;padding:20px 0 0;margin-right:48px;float:left">';
                            data_list += '<img class="book_cover" style="width: 124px;height: 162px;border:1px solid #e9e9e9;box-shadow: -2px 0px 0px #ccc;border-bottom-right-radius: 10px;" src="' + data.books[i].thumbnail + '"/>';
                            data_list += '<span style="margin-top: 12px;font-size: 12px;color: #333;line-height: 44px;height: 44px; display: block; font-weight:bold">' + data.books[i].title + '</span>';

                            if (scope == 'include') {

                                data_list += '<input type="checkbox" name="" checked="checked" class="book_ischeck include" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'
                            } else {
                                data_list += '<input type="checkbox" name="" checked="checked" class="book_ischeck" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'
                            }
                            data_list += '</div>';
                        }
                        read_book.push(data.books[i].book_id);
                    }


                    $('.book_item').append(data_list);

                    _last_book_id = $('.book_ischeck').last().val();


                    if (callback) {
                        callback()
                    }
                }

            },
            errorFun: function (data) {

            }
        });
    };
    this.getBookList = function (scope, article_id, amount, last_book_id, callback) {
        var posdata = {
            'scope': scope,
            'article_id': article_id,
            'amount': amount,
            'last_book_id': last_book_id
        };

        sendData({
            is_api: true,
            url: '/v1/article/book/list',
            method: 'post',
            data: posdata,
            callback: function (data) {
                if (data.err_code == 0) {
                    var data_list = '';

                    for (var i = 0; i < data.books.length; i++) {

                        if (($('.book_info').length + i + 1) % 4 == 0) {
                            data_list += '<div class="book_info" style="position: relative;width: 124px;padding:20px 0 0;float:left">';
                            data_list += '<img class="book_cover" style="width: 124px;height: 162px;border:1px solid #e9e9e9;box-shadow: -2px 0px 0px #ccc;border-bottom-right-radius: 10px;" src="' + data.books[i].thumbnail + '"/>';
                            data_list += '<span style="margin-top: 12px;font-size: 12px;color: #333;line-height: 44px;height: 44px; display: block;font-weight:bold;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">' + data.books[i].title + '</span>';
                            if (scope == 'exclude') {
                                data_list += '<input type="checkbox" name="" class="book_ischeck exclude" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'
                            } else {
                                data_list += '<input type="checkbox" name="" class="book_ischeck" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'
                            }


                            data_list += '</div>';

                        } else {
                            data_list += '<div class="book_info" style="position: relative;width: 124px;padding:20px 0 0;margin-right:48px;float:left">';
                            data_list += '<img class="book_cover" style="width: 124px;height: 162px;border:1px solid #e9e9e9;box-shadow: -2px 0px 0px #ccc;border-bottom-right-radius: 10px;" src="' + data.books[i].thumbnail + '"/>';
                            data_list += '<span style="margin-top: 12px;font-size: 12px;color: #333;line-height: 44px;height: 44px; display: block; font-weight:bold;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">' + data.books[i].title + '</span>';


                            if (scope == 'exclude') {
                                data_list += '<input type="checkbox" name="" class="book_ischeck exclude" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />';
                            } else {
                                data_list += '<input type="checkbox" name="" class="book_ischeck" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />';
                            }
                            data_list += '</div>';
                        }

                    }

                    $('.book_item').append(data_list);

                    _last_book_id = $('.book_ischeck').last().val();

                    $('.book_item').scroll(function (e) {

                        e.preventDefault();
                        e.stopPropagation();

                        if (is_over == false || data_over == true) return;

                        if ($(this)[0].scrollTop + $(this).height() >= $(this)[0].scrollHeight - 100) {
                            is_over = false;
                            ke.getAddBookList('exclude', article_id, amount, _last_book_id)

                        }
                    });
                    $('.book_ischeck[type="checkbox"]').css({
                        'width': '20px',
                        'height': '20px',
                        'border': '1px solid'
                    })
                }


                if (callback) {
                    callback()
                }


            },
            errorFun: function (data) {

            }
        });
    };
    this.bookListData = function () {

        var win_h = $(window).height();

        var data_list = '';
        data_list += '<div class="view" style="position: fixed;top:0;right: 0;bottom:0;left: 0;background: rgba(0,0,0,0.5);">'
            + '<div class="book_des" style="position:absolute;left: 0;top:' + win_h / 10 + 'px;right: 0;width: 742px;height: 494px;padding:20px 30px 0;border-radius:8px ;margin: 0 auto;background: #fefcfd;">'
            + '<div class="book_title" style="height: 50px;">'
            + '<span style="float: left;margin-top: 20px;width: 5px;height: 14px;background-color: #333;"></span>'
            + '<h4  style="float: left;height: 50px;line-height: 50px;color: #333;font-size: 18px;font-weight:bold;margin: 0;margin-left: 10px;">可将文章添加到以下书中</h4>'
            + '</div>'
            + '<div class="book_item" style="width: 100%;height:344px;padding-left:14px;overflow: auto;">'

            + '</div>'
            + '<div class="book_footer" style="overflow: hidden;border-top:1px solid #dfddde;margin: 0 -30px;padding: 0 30px;">'
            + '<span class="discard" style="float:left;width: 50%;text-align:center;font-size:18px;color:#656565;font-weight: bold;line-height:78px;height:78px;cursor: pointer;margin-right:-1px;border-right: 1px solid #dfddde;">取消</span>'
            + '<span class="ensure" style="float:left;width: 50%;text-align:center;font-size:18px;color: #101010;font-weight: bold;line-height:78px;height:78px;cursor: pointer;">确定</span>'
            + '</div></div></div>';

        $('.modular').html(data_list);
    };
    this.createEmptyBook = function (create_book_id, index) {
        var posdata = {
            'def_book_id': create_book_id
        };
        sendData({
            is_api: true,
            url: '/v1/book/create/empty_mybook ',
            method: 'post',
            data: posdata,
            async: false,
            callback: function (data) {
                if (data.err_code == 0) {

                    books_id[index] = data.book_id;

                }
            },
            errorFun: function (data) {

            }
        });
    };
    this.getAddBookList = function (scope, article_id, amount, last_book_id, callback) {

        var posdata = {
            'scope': scope,
            'article_id': article_id || '',
            'amount': amount,
            'last_book_id': last_book_id || ''
        };

        sendData({
            is_api: true,
            url: '/v1/article/book/list',
            method: 'post',
            data: posdata,
            callback: function (data) {
                if (data.err_code == 0) {

                    var win_h = $(window).height();

                    var data_list = '';
                    var arr = [];
                    for (var i = 0; i < data.books.length; i++) {
                        arr.push(data.books[i].book_id);
                        if (($('.book_info').length + i + 1) % 4 == 0) {
                            data_list += '<div class="book_info" style="position: relative;width: 124px;padding:20px 0 0;float:left">';
                            data_list += '<img class="book_cover" style="width: 124px;height: 162px;border:1px solid #e9e9e9;box-shadow: -2px 0px 0px #ccc;border-bottom-right-radius: 10px;" src="' + data.books[i].thumbnail + '"/>';
                            data_list += '<span style="margin-top: 12px;font-size: 12px;color: #333;line-height: 44px;height: 44px; display: block;font-weight:bold;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">' + data.books[i].title + '</span>';

                            if (read_book.indexOf(data.books[i].book_id) > -1) {
                                data_list += '<input type="checkbox" name="" checked="checked" class="book_ischeck" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'
                            } else {

                                data_list += '<input type="checkbox" name="" class="book_ischeck" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'

                            }

                            data_list += '</div>';
                        } else {
                            data_list += '<div class="book_info" style="position: relative;width: 124px;padding:20px 0 0;margin-right:48px;float:left">';
                            data_list += '<img class="book_cover" style="width: 124px;height: 162px;border:1px solid #e9e9e9;box-shadow: -2px 0px 0px #ccc;border-bottom-right-radius: 10px;" src="' + data.books[i].thumbnail + '"/>';
                            data_list += '<span style="margin-top: 12px;font-size: 12px;color: #333;line-height: 44px;height: 44px; display: block; font-weight:bold;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">' + data.books[i].title + '</span>';

                            if (read_book.indexOf(data.books[i].book_id) > -1) {
                                data_list += '<input type="checkbox" name="" checked="checked" class="book_ischeck" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'
                            } else {

                                data_list += '<input type="checkbox" name="" class="book_ischeck" value="' + data.books[i].book_id + '" style="position: absolute;right: -10px;top:10px" />'

                            }
                            data_list += '</div>';
                        }

                    }
                    $('.book_item').append(data_list);
                    $('.book_ischeck[type="checkbox"]').css({
                        'width': '20px',
                        'height': '20px',
                        'border': '1px solid'
                    });


                    is_over = true;

                    if (data.books.length < amount) {
                        data_over = true;
                    }
                    _last_book_id = $('.book_ischeck').last().val();

                    if (callback) {

                        callback()

                    }

                }

            },
            errorFun: function (data) {

            }
        });
    };

    this.addAudioView = function(callback){
        _audioListController.getAudioListData(function(data){
            _audioListController.addView();
            _audioListController.setClickCallback(function(){
                _editorManager.stopMusic();
            });
            _audioListController.addListData(data.songs);
            _audioListController.setAudioListClickEvent();
            _audioListController.setSelectedComEvent(function(data){
                if(_editorManager.checkOutOfAudioLimit(data.length) === true){
                    ke.toastMemberLimitConfirm("音频数量")
                }else{
                    for(var i in data){
                        ke.editor.insertHtml(data[i]);
                    }
                    _editorManager.scaleForAll();
                    _editorManager.setCSSStyle();
                    _editorManager.setEditorAudioClickEvent();
                }
            });

            if(callback)
                callback();
        })
    };

    this.toastMemberLimitConfirm = function(desc){
        var tip = "已经超出限制～,申请或升级会员可享受更多权利" ;
        var btn_tip = "确定并保存" ;
        if(isTopLevel === true){
            tip = "已达上限" ;
            btn_tip = "确定" ;
        }

        if(editor_type === "group" && user_id !== article_user_id){
            tip = "已经超出文章作者的限制了哦～"
        }

        if(editor_type === "group" && user_id !== article_user_id){
            btn_tip = "确定" ;
        }

        if(_editorManager.hasContent() === true){
            showConfirm(desc + tip,null,null,function(){
                if(isTopLevel === true){
                    return ;
                }

                if(editor_type === "group" && user_id !== article_user_id)return ;
                if(editor_type === "group"){
                    ke.saveArticleToBook(0,function(){
                        if(user_id === article_user_id)
                            location.href = "https://www.shiqichuban.com/order/member"
                    });
                }else if(editor_type === "private"){
                    save_com = function(){
                        location.href = "https://www.shiqichuban.com/order/member"
                    };
                    ke.submitData();
                }

            },function(){},'ok|cancel',null,[btn_tip]);
        }else{
            showConfirm(desc + tip,null,null,function(){
                if(isTopLevel === true){
                    return ;
                }

                if(editor_type === "group" && user_id !== article_user_id)return ;
                location.href = "https://www.shiqichuban.com/order/member"
            },function(){},'ok|cancel');
        }
    };

    this.clearPreviewData = function(){
        $('#thumb_preview').children().remove();
        $('#file_input').val('');
        $('#pic_preview').hide();
    }
};
