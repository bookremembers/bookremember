function PreviewBookManager() {}
PreviewBookManager.prototype.setOptions = function (options) {
    this.options = options;
    this.device = options.device;
    this.status = options.status;
    this.action = options.action;
    this.view_type = options.view_type;
    this.token = options.token;
    this.app_version = options.app_version;
    this.user_id = options.user_id;
    this.update_check = options.update_check;
    this.is_show_banner = options.is_show_banner;
    this.book_id = options.book_id;
    this.cipher = options.cipher;
    this.isNightStatus = options.isNightStatus || (0 || false);
    this.device_w = $(window).width();
    this.device_h = Math.min($(window).height(), 1600);
    this.book_container = $(".book-container");
    this.alertPanDic = null;
    this.options.window = $(window);
    this.options.window_w = this.device_w;
    this.options.window_h = this.device_h;
    this.options.document_body = $(document.body);
    this.options.document = $(document);
    this.options.book_container = this.book_container;
    this.appNeedLoadData = options.appNeedLoadData;
};
PreviewBookManager.prototype.getBookController = function () {
    return this._bookController;
};
PreviewBookManager.prototype.initFilePath = function () {
    var self = this;
    var book_css = STATIC_DOMAIN + '/assets/css/book/flipbook.css?t=1525257121';
    if (self.isNightStatus === 1 || self.isNightStatus === true)
        book_css = STATIC_DOMAIN + '/assets/css/book/flipbook_night.css?t=1525257121';
    var arr = [
        book_css,
        STATIC_DOMAIN + '/assets/css/bootstrap3/bootstrap-slider.css',
        STATIC_DOMAIN + '/assets/js/bootstraps3/bootstrap-slider.js',
    ];
    return arr;
};
PreviewBookManager.prototype.init = function (callback) {
    var self = this;
    var arr = self.initFilePath();
    if (arr.length > 0) {
        yepnope({
            test: Modernizr.csstransforms,
            yep: arr,
            nope: arr,
            complete: function () {
                self.start(callback)
            }
        });
    } else {
        self.start(callback)
    }
};
PreviewBookManager.prototype.start = function (callback) {
    var self = this;
    if (self.device !== config.DEVICE_PC) {
        self.book_container.css({
            width: self.device_w + 'px',
            height: (self.device_h - parseInt($('.container-root').css('margin-top'))) + 'px',
            overflow: 'hidden'
        })
    }
    if((self.device === config.DEVICE_APP && self.appNeedLoadData) || self.device === config.DEVICE_MOBILE || self.device === config.DEVICE_PC){
        self.startGetBookData(callback);
    } else {
        if (window.nativeBridge && window.nativeBridge.start) {
            window.nativeBridge.start();
        }
    }
};
PreviewBookManager.prototype.startGetBookData = function(callback){
    var self = this;
    if (self.action !== config.ACTION_SHARE) {
        BookDataHandler.getBookAttr([self.book_id], function (book_attr) {
            self.setBookAttr(book_attr, callback);
            self.rightsController = new RightController();            
            if(self.book.isPicTheme === true){
                BookDataHandler.getBookMediaCount(self.book_id, function (data) {
                    if (data.medias)
                        self.book.setMediaCount(data.medias.audios, data.medias.images, data.medias.videos);
                    self.rightsController.setDefaultRight(data.rights);
                }, function (error) {
                    console.log("get media count error!");
                });
            }
        });
    } else {
        BookDataHandler.getPublicBookAttr(self.cipher, function (book_attr) {
            self.setBookAttr(book_attr);
        });
    }
};
PreviewBookManager.prototype.setBookAttr = function (book_attr, callback) {
    console.log("setBookAttr --------");
    var self = this;
    self.options.book_attr = book_attr;
    if (self.device === config.DEVICE_PC || (self.device === config.DEVICE_MOBILE && self.action !== config.ACTION_SHARE && book_attr.type !== 1)) {
        $('.header').show();
        $('.footer').show();
    }
    self.book = new Book(self.device, self.device_w, self.device_h, book_attr);
    self.book.cipher = self.cipher;
    self.content_theme_type = book_attr.content_theme_type;
    self.initController();
    self.setControllerOptions();
    self.commandChannel = new CommandChannel(self.options);
    self.commandChannel.registerHandler(new ModuleHandler(self.book, self._bookController, self));
    self.commandChannel.postCommand(ModuleCommand.START);
    $(self.book_container).append(self._viewController.addBookWrapperDis());
    self.initBookController(); //初始化控制器
    self.addFlipPageController(); //增加电子书翻页相关控制
    //添加电子书数据
    if((self.device === config.DEVICE_APP && self.appNeedLoadData) || self.device === config.DEVICE_MOBILE || self.device === config.DEVICE_PC){
        self.addFlipBookPage(function () {
            self.pageLoadCom();
            if (callback) callback();
        });
    }
    self.centerBook();
    noticeToApp('ready', self.book.book_id + ',' + self.book.page_count);
};
PreviewBookManager.prototype.setBookPageData = function (pages) {
    console.log("setBookPageData --------");
    var self = this;
    self._bookController.addPage_BookCover_FC(self.book.cover);
    self._bookController.addPage_BookContents(pages);
    self._bookController.addContentLastPage();
    self.addFlipBookPageCom(function () {
        self.pageLoadCom();
        console.log("setBookPageData complete --------");
    });
};
PreviewBookManager.prototype.initController = function () {
    var self = this;
    self._dataFetcher = new PreviewDataFetcher();
    self._bookController = new PreviewBookController();
    self._viewController = new PreviewViewController();
};
PreviewBookManager.prototype.setControllerOptions = function () {
    var self = this;
    var options = {
        device: self.device,
        status: self.status,
        action: self.action,
        book: self.book,
        view_type: self.view_type,
        app_version: self.app_version,
        user_id: self.user_id,
        book_doc: '.sj-book-new',
        isNightStatus: self.isNightStatus,
    };
    self._viewController.setOptions(self, options);
    self._bookController.setOptions(self, options);
};
PreviewBookManager.prototype.addEditFunction = function () {
};
PreviewBookManager.prototype.centerBook = function () {
    var self = this;
    //剧中显示电子书
    $('#book-zoom').css('padding-left', (parseInt($('#book-zoom').css('width')) - self.book.page_width) * 0.5 + 'px');
};
PreviewBookManager.prototype.addDocumentEvent = function () {
    var self = this;
    self.alertPanDic = [];
    $(document).on(config.MOUSE_CLICK, function (e) {
        self.hideAllPan();
        if (e.target.className !== "catalog_jump") {
            self.commandChannel.postCommand(ModuleCommand.HIDE_CATALOG);
        }
        if (self.book.content_theme_type === 3) {
        } else {
            if ($('.btnGroup').is(':visible') === true) {
                $('.btnGroup').hide();
                $('.btnGroup').find('#edit_btn_list').remove();
            }
        }
    });
};
PreviewBookManager.prototype.showPopPan = function (selector) {
    var self = this;
    if ($(selector).is(':hidden')) {
        $(selector).show();
        self.alertPanDic[selector] = selector;
    } else {
        $(selector).hide();
        delete self.alertPanDic[selector];
    }
    for (var i in self.alertPanDic) {
        if (selector == self.alertPanDic[i]) {
        } else {
            $(self.alertPanDic[i]).hide();
            delete self.alertPanDic[i];
        }
    }
};
PreviewBookManager.prototype.hideAllPan = function () {
    var self = this;
    var hasShowPan = false;
    for (var i in self.alertPanDic) {
        var selector = self.alertPanDic[i];
        $(selector).hide();
        delete self.alertPanDic[selector];
        hasShowPan = true;
    }
    return hasShowPan;
};
PreviewBookManager.prototype.initBookController = function () {
    var self = this;
    $('#canvas').css("width",(self.book.page_width * self.book.scale) + "px") ;
    $('#canvas').css("height",(self.book.page_height * self.book.scale) + "px") ;
    self._bookController.startCreateFlipBook(function () {
        if (self._bookController.getAudioController() !== null)
            self._bookController.getAudioController().flipPage();
    }, function () {
        self._bookController.checkImageRotation();
        self._bookController.lazyLoadImage();
        if (self._bookController.getAudioController() !== null)
            self._bookController.getAudioController().flipPage();
    });
    self._bookController.setBookScale('.sj-book-new', self.book.scale);
};
PreviewBookManager.prototype.autoFixView = function(){
    var self = this;
    self._bookController.setBookScale('.down_step_btn', self.book.scale,90);
    self._bookController.setBookScale('.up_step_btn', self.book.scale);
    self._bookController.setBookScale('.left_top_btn', self.book.scale);
};
PreviewBookManager.prototype.addFlipPageController = function () {
    var self = this;
    if (self.device !== config.DEVICE_APP) {
        self.book_container.append(self._viewController.addSliderBarDis((self.book.page_height + 20) * self.book.scale));
        self._bookController.addSliderBar('.slider');
        if (self.device === config.DEVICE_PC)
            self._bookController.addPageInputCtrl('.pageInput');
    }
    if (self.device === config.DEVICE_PC) {
        self._bookController.addKeyBoardController();
        $(document).on(config.MOUSE_CLICK, '#pre_btn', function (e) {
            e.stopPropagation();
            self.commandChannel.postCommand(BookCommand.GESTURE_FLIP_PAGE, {pos: -1});
        }).on(config.MOUSE_CLICK, '#next_btn', function (e) {
            self.commandChannel.postCommand(BookCommand.GESTURE_FLIP_PAGE, {pos: 1});
        });
    } else {
        //手机浏览器 | app ,添加点击屏幕两端翻页
        if(self.device === config.DEVICE_APP && shiqiLocation.getQueryString("touchable") == 'false')
            return ;
        self._bookController.addGestureFlipHandler('#canvas'
            , function (pos) {
                self.commandChannel.postCommand(BookCommand.GESTURE_FLIP_PAGE, {pos: pos});
            });
    }
};
PreviewBookManager.prototype.addFlipBookPage = function (callback) {
    var self = this;
    var perRequestAmount = 200;
    var total_step = Math.ceil(self.book.page_count / perRequestAmount);
    var book_page_dic = [];
    self._bookController.addPage_BookCover_FC(self.book.cover);
    if (self.book.page_count === 0) {
        self.addFlipBookPageCom(callback);
    } else {
        self._bookController.loadRemoteData(
            perRequestAmount,
            function (data, step) {
                total_step = step;
                book_page_dic = data;
                for (var i in book_page_dic) {
                    var page_data = book_page_dic[i].pages;
                    if (page_data) {
                        self._bookController.addPage_BookContents(page_data);
                    }
                }
                self._bookController.addContentLastPage();
                self.addFlipBookPageCom(callback);
            }
        );
    }
};
PreviewBookManager.prototype.pageLoadCom = function () {
    var self = this;
    if (self.device === config.DEVICE_PC) {
        self.addDocumentEvent();
    }
    self._bookController.addVideoController(function (url) {
        if (self.device === DEVICE_APP)
            noticeToApp('toPlayVideo', url);
    });
    self._bookController.addAudioController(function (data) {
        if (self.device === DEVICE_APP)
            noticeJsonToApp(JSON.stringify(data));
        else {
            self.commandChannel.postCommand(BookCommand.BOOK_AUDIO_ACTION, {type: data})
        }
    });
    //编辑需要
    if (self.status === config.STATUS_PREVIEW && self.device === config.DEVICE_PC && self.book.type === config.BOOK_TYPE_GROUP && action !== config.ACTION_SHARE)
        self.addGroupWriteManageFun();
    if (self.device !== config.DEVICE_APP) {
        self.commandChannel.postCommand(ModuleCommand.ADD_STEP_BTN);
        var parent;
        if (self.device === config.DEVICE_PC)
            parent = $('.catalog_container');
        else
            parent = $('.book-container');
        self.commandChannel.postCommand(ModuleCommand.ADD_CATALOG, {parent: parent});
    }
    self.addEditFunction();
};
PreviewBookManager.prototype.addFlipBookPageCom = function (callback) {
    var self = this;
    self._bookController.addPage_BookCover_BC();
    //更新滑条数据
    if (self.device !== config.DEVICE_APP)
        self._bookController.updateSliderUI();
    self.turnDefaultPage();
    if (self.device === config.DEVICE_APP) {
        noticeToApp('loadComplete', 1);
        setTimeout(function () {
            noticeToApp('flipPage', self._bookController.getCurrentPageNum() + ',' + self._bookController.getFirstContentPage());
        }, 1000);
    }
    showLoading('', false);
    callback();
};
PreviewBookManager.prototype.turnDefaultPage = function () {
    var self = this;
    if (location.href.indexOf('#page') > -1) {
        var arr = location.href.split('/');
        var flipPage = parseInt(arr[arr.length - 1]);
        self._bookController.turnToPage(flipPage);
    } else {
        if (self.status === config.STATUS_PREVIEW || self.action === config.ACTION_SHARE)
            self._bookController.turnToPage(1);
        else
            self._bookController.turnToPage();
    }
};
PreviewBookManager.prototype.addGroupWriteManageFun = function () {
    var self = this;
    var isFetchingData = false;
    function getFriendList() {
        var next_start;
        sendData({
            url: "/v1/book/author/list",
            is_api: true,
            method: "post",
            host: getSocialServerDomain(),
            data: JSON.stringify({
                book_id: self.book.book_id,
                count: 0,
                next_start: next_start
            }),
            callback: function (data) {
                isFetchingData = false;
                var authors = data.authors;
                for (var i in authors) {
                    $('.friend_list_container').append(self._viewController.getFriendListItem(authors[i]));
                }
                if (authors.length == 0) {
                    $('.friend_list_container').append("<div style='text-align: center;margin-top: 10px;height:40px;line-height: 40px;background-color: #eeeeee;border-radius: 3px'>没有数据了</div>");
                }
            },
            errorFun: function () {
                isFetchingData = false;
            }
        })
    }
    $(document).on(config.MOUSE_CLICK, '.friend_list_btn', function (e) {
        e.stopPropagation();
        if ($('.friend_pan').length == 0)
            $(document.body).append(self._viewController.getFriendListPan());
        getFriendList();
    }).on(config.MOUSE_CLICK, '.close_qr_btn', function (e) {
        e.stopPropagation();
        $(this).parents('.qr_pan').remove();
    }).on(config.MOUSE_CLICK, '.delete_friend_btn', function (e) {
        e.stopPropagation();
        var ids = [];
        $('.friend_list_item').each(function (index, value) {
            if ($(value).prop('checked') == true)
                ids.push({user_id: parseInt($(value).attr("id")), book_id: self.book.book_id});
        });
        if (ids.length == 0) {
            showConfirm("没有选择的参与者", null, null, null, null, 'ok');
            return;
        }
        sendData({
            url: "/v1/books/authors/remove",
            is_api: true,
            method: "post",
            host: getSocialServerDomain(),
            data: JSON.stringify(ids),
            callback: function (data) {
                isFetchingData = false;
                $('.friend_list_container').children().remove();
                getFriendList();
            },
            errorFun: function () {
                isFetchingData = false;
            }
        })
    }).on(config.MOUSE_CLICK, '.delete_friend_item_btn', function (e) {
        e.stopPropagation();
        console.log(self.user_id);
        sendData({
            url: "/v1/book/author/delete",
            is_api: true,
            method: "post",
            host: getSocialServerDomain(),
            data: JSON.stringify({
                book_id: self.book.book_id,
                user_id: parseInt($(this).attr('id'))
            }),
            callback: function (data) {
                isFetchingData = false;
                $('.friend_list_container').children().remove();
                getFriendList();
            },
            errorFun: function () {
                isFetchingData = false;
            }
        })
    }).on(config.MOUSE_CLICK, '.close_friend_list_btn', function (e) {
        e.stopPropagation();
        $(this).parents('.friend_pan').remove();
    });
    if (self.book.role == 1) {
        $(document).on(config.MOUSE_CLICK, '.invite_man_btn', function (e) {
            if (self.book.invite_state == 0) {
                showConfirm("您设置了关闭好友邀请，请先去主题创作管理更改设置，再来邀请好友吧！", null, null, null, null, 'ok');
                return;
            }
            sendData({
                url: "/v1/qrcode/add",
                is_api: true,
                method: "post",
                host: getResServerDomain(),
                data: JSON.stringify({
                    "logo_list": [],
                    "has_err_code": 1,
                    "req":
                        [
                            {
                                "type": 0,
                                "msg": self.book.invite_url,
                                "logo": 0
                            },
                        ]
                }),
                callback: function (data) {
                    isFetchingData = false;
                    var result = data.data;
                    $(document.body).append(self._viewController.getInviteQRcodePan());
                    $('.qr_code_image').attr("src", result[0].url);
                    $('#qr_msg').val(result[0].msg);
                },
                errorFun: function () {
                    isFetchingData = false;
                }
            })
        }).on(config.MOUSE_CLICK, '.lock_edit_btn', function (e) {
            if (isFetchingData) return;
            isFetchingData = true;
            var btn_icon = $(this).find("img").first();
            var edit_state = self.book.edit_state == 1 ? 0 : 1;
            var icon = self.book.edit_state == 0 ? STATIC_DOMAIN + "/assets/img/group_write/icon_18.png" : STATIC_DOMAIN + "/assets/img/group_write/icon_21.png";
            sendData({
                url: "/v1/book/edit_state/update",
                is_api: true,
                method: "post",
                data: {
                    book_id: self.book.book_id,
                    edit_state: edit_state,
                },
                callback: function (data) {
                    isFetchingData = false;
                    self.book.edit_state = edit_state;
                    btn_icon.attr("src", icon);
                },
                errorFun: function () {
                    isFetchingData = false;
                }
            })
        }).on(config.MOUSE_CLICK, '.close_invite_btn', function (e) {
            if (isFetchingData) return;
            isFetchingData = true;
            var btn_icon = $(this).find("img").first();
            if (self.book.invite_state == 1) {
                sendData({
                    url: "/v1/book/invite/close",
                    is_api: true,
                    method: "post",
                    data: {
                        book_id: self.book.book_id,
                    },
                    callback: function (data) {
                        isFetchingData = false;
                        self.book.invite_state = 0;
                        btn_icon.attr("src", STATIC_DOMAIN + "/assets/img/group_write/icon_21.png");
                        $('.invite_man_btn').css('color', '#ccc');
                    },
                    errorFun: function () {
                        isFetchingData = false;
                    }
                })
            } else {
                sendData({
                    url: "/v1/book/invite/url/update",
                    is_api: true,
                    method: "post",
                    data: {
                        book_id: self.book.book_id,
                    },
                    callback: function (data) {
                        isFetchingData = false;
                        self.book.invite_state = 1;
                        self.book.invite_url = data.invite_url;
                        btn_icon.attr("src", STATIC_DOMAIN + "/assets/img/group_write/icon_18.png");
                        $('.invite_man_btn').css('color', 'black');
                    },
                    errorFun: function () {
                        isFetchingData = false;
                    }
                })
            }
        }).on(config.MOUSE_CLICK, '.copy_invite_btn', function (e) {
            var Url2 = document.getElementById("qr_msg");
            Url2.select(); // 选择对象
            document.execCommand("Copy");
            showConfirm("复制成功", null, null, null, null, 'ok');
        });
    } else {
        $(document).on(config.MOUSE_CLICK, '.permit_edit_btn', function (e) {
            var btn_icon = $(this).find("img").first();
            var permit_edit = self.book.permit_edit == 1 ? 0 : 1;
            var icon = permit_edit == 0 ? STATIC_DOMAIN + "/assets/img/group_write/icon_18.png" : STATIC_DOMAIN + "/assets/img/group_write/icon_21.png";
            sendData({
                url: "/v1/book/content/permit_edit/update",
                is_api: true,
                method: "post",
                data: {
                    book_id: self.book.book_id,
                    permit_edit: permit_edit,
                },
                callback: function (data) {
                    isFetchingData = false;
                    self.book.permit_edit = permit_edit;
                    btn_icon.attr("src", icon);
                },
                errorFun: function () {
                    isFetchingData = false;
                }
            })
        });
    }
};
PreviewBookManager.prototype.toReload = function (book_id, page) {
    var self = this;
    if (page === null)
        page = 1;
    var url ;
    if (self.book.isColorBook === true) {
        url = getCurrentWWWDomain() + '/book/new_contents/' + book_id;
    } else {
        url = getCurrentWWWDomain() + '/book/contents/' + book_id;
    }
    if (self.device === config.DEVICE_APP) {
        location.reload(true);
    } else {
        url += '#page/' + page;
        location.href = url ;
        if (location.href.indexOf('#page') > -1)
            location.reload(true);
    }
};
