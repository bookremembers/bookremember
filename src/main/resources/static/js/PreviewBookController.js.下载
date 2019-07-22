/**
 * Created by naxiaoguang on 9/29/16.
 */
function PreviewBookController() {
    this.previewDataFetcher = new PreviewDataFetcher();
    this.catalogEmptyPage = 0;
    this.isSliding = false;
    this.currentPageInput = null;
    this.flipBook = null;
    //可编辑按钮
    this.canEdit = false;
    this.default_cover_fc = 'https://static.shiqichuban.com/assets/img/book/ebook/ori3_fc.jpg';
    this.slider = null;
    this.hasHeader = false; //是否存在页眉
    this.empty_Page = '<div></div>';
    this.currentPageView = null;
    this.newLogic = true ;
    this.groupBookUsers = null ;
    this.pageIdMapPageNum = {} ;
}
PreviewBookController.prototype.setOptions = function(book_manager,options) {
    this.book_manager = book_manager ;
    this.book_doc = options.book_doc;
    this.view_type = options.view_type;
    this.app_version = options.app_version;
    this.device = options.device;
    this.status = options.status;
    this.action = options.action;
    this.book = options.book ;
    this.user_id = options.user_id ;
    this.isNightStatus = options.isNightStatus ;
};
PreviewBookController.prototype.loadRemoteData = function(perRequestAmount,comFun) {
    var self = this;
    self.previewDataFetcher.getBookPageData(
        self.book,
        self.action,
        self.device,
        self.view_type,
        perRequestAmount,
        function(page_list_dic,step){
            comFun(page_list_dic,step);
        }
    )
};
PreviewBookController.prototype.addPage_BookCover_FC = function(cover_fc_image) {
    var self = this ;
    var image = !cover_fc_image ? this.default_cover_fc : cover_fc_image ;
    if(self.device === config.DEVICE_APP && getAppVersion() < "4.4.0"){
        this.flipBook.addFrontCover(
            '<div class="front_cover cover" style="width:' + self.book.page_width + 'px;height:' + self.book.page_height + 'px">' +
            '<img src="' + image + '" style="width:100%;height:100%"/></div>'
        );
    }else{
        this.flipBook.addFrontCover(
            '<div page_type_val="5" content_id="-1" class="front_cover cover" style="width:' + self.book.page_width + 'px;height:' + self.book.page_height + 'px">' +
            '<img src="' + image + '" style="width:100%;height:100%"/></div>'
        );
    }
    this.flipBook.addFrontCover('<div class="front_cover cover even" style="background-color: #ffffff"></div>');
};
PreviewBookController.prototype.addPage_BookCover_BC = function() {
    var self = this;
    var over_page = "";
    if(self.book.type === config.BOOK_TYPE_GROUP && self.book.include_mode === 1){
        over_page = '<img src="https://static.shiqichuban.com/assets/img/book/end_page.png" style="width:40%;margin-top:60%"/>';
    }else{
        if(self.book.isPicTheme === true){
            over_page = '<img class="over_page" src="https://static.shiqichuban.com/assets/img/book/addimages_icon_05.png" style="height:150px;margin-top:'+ (self.book.page_height  - 150 ) * 0.5 +'px"/>';
        }else{
            over_page = '<img class="over_page" src="https://static.shiqichuban.com/assets/img/book/tianjiawenzhang_icon_05.png" style="height:150px;margin-top:'+ (self.book.page_height  - 150 ) * 0.5 +'px"/>';
        }
    }
    if(self.device === config.DEVICE_APP && getAppVersion() < "4.4.0"){
        if (self.status === config.STATUS_EDIT) {
            if (this.book.book_display === config.BOOK_DISPLAY_DOUBLE) {
                this.flipBook.addBackCover('<div class="end_cover cover odd" style="background-color: #ffffff;text-align: center;cursor:pointer">'+ over_page +'</div>');
                this.flipBook.addBackCover('<div class="end_cover cover even" style="background-color: #ffffff;text-align: center;"></div>');
            } else {
                self.flipBook.addBackCover('<div class="end_cover cover" style="background-color: #ffffff;text-align: center;">'+ over_page + '</div>');
            }
        } else {
            if (self.book.book_display === config.BOOK_DISPLAY_DOUBLE) {
                self.flipBook.addBackCover('<div class="end_cover cover odd" style="background-color: #ffffff;position:relative"><img src="https://static.shiqichuban.com/assets/img/book/end_page.png" style="position:absolute;width:316px;height:39px;top:50%;left:50%;margin-top:-19px;margin-left:-158px"/></div>');
                self.flipBook.addBackCover('<div class="end_cover cover even" style="background-color: #ffffff;"></div>');
            } else
                self.flipBook.addBackCover('<div class="end_cover cover" style="background-color: #ffffff;position:relative"><img src="https://static.shiqichuban.com/assets/img/book/end_page.png" style="position:absolute;width:316px;height:39px;top:50%;left:50%;margin-top:-19px;margin-left:-158px"/></div>');
        }
    }else{
        if (self.status === config.STATUS_EDIT) {
            if (this.book.book_display === config.BOOK_DISPLAY_DOUBLE) {
                this.flipBook.addBackCover('<div page_type_val="6" content_id="-2" class="end_cover cover odd" style="background-color: #ffffff;text-align: center;cursor:pointer">'+ over_page +'</div>');
                this.flipBook.addBackCover('<div page_type_val="6" content_id="-2" class="end_cover cover even" style="background-color: #ffffff;text-align: center;"></div>');
            } else {
                self.flipBook.addBackCover('<div page_type_val="6" content_id="-2" class="end_cover cover" style="background-color: #ffffff;text-align: center;">'+ over_page + '</div>');
            }
        } else {
            if (self.book.book_display === config.BOOK_DISPLAY_DOUBLE) {
                self.flipBook.addBackCover('<div page_type_val="6" content_id="-2" class="end_cover cover odd" style="background-color: #ffffff;position:relative"><img src="https://static.shiqichuban.com/assets/img/book/end_page.png" style="position:absolute;width:316px;height:39px;top:50%;left:50%;margin-top:-19px;margin-left:-158px"/></div>');
                self.flipBook.addBackCover('<div page_type_val="6" content_id="-2" class="end_cover cover even" style="background-color: #ffffff;"></div>');
            } else
                self.flipBook.addBackCover('<div page_type_val="6" content_id="-2" class="end_cover cover" style="background-color: #ffffff;position:relative"><img src="https://static.shiqichuban.com/assets/img/book/end_page.png" style="position:absolute;width:316px;height:39px;top:50%;left:50%;margin-top:-19px;margin-left:-158px"/></div>');
        }
    }
};
PreviewBookController.prototype.addPage_BookContents = function(pages) {
    var self = this;
    if (!self.flipBook || !pages) {
        console.log('!bookContentData || !flipBook');
        return;
    }
    var len = pages.length;
    for (var i = 0; i < len; i++) {
        (function(index) {
            var page = pages[index];
            var page_type = page.page_type ;
            var page_number = page.page ;
            var page_id_str = page.hasOwnProperty("page_id") ? 'page_id='+ page["page_id"] : "" ;
            var content_id_str = page.hasOwnProperty("content_id") ? 'content_id='+ page["content_id"] : "" ;
            var page_content = page['page_content'] ;
            var page_header_html = "" ;
            var page_footer_html = "" ;
            var page_header_title = "" ;
            var page_header_attr = "" ;
            if(BookPageHeaderRule[self.book.content_theme_type << 8 | page_type] === 1){
                page_header_html = self.book.header_layout ;
                page_header_title = page["elements"]["header"] ;
                page_header_attr = "" ;
                if(page_header_title != null && page_header_title.length > 0) {
                    page_header_title = page_header_title.replace(/\s/g,"&nbsp;").replace(/>/g,"&gt").replace(/</g,"&lt").replace(/"/g,"&quot;").replace(/'/g,"&quot;");
                    page_header_attr = " header-title=" + page_header_title  ;
                }
            }
            if(BookPageFooterRule[self.book.content_theme_type << 8 | page_type] === 1){
                page_footer_html = self.book.footer_layout ;
            }
            var content = $("<div "+ page_header_attr +" style='background-color: white' "+ page_id_str + " " + content_id_str +">" + page_content + page_footer_html + page_header_html  + "<div class='page-gradient'  style='pointer-events:none'></div></div>");
            content.find(".page_footer_title").html(getPageNumStr(page_number));
            if (content.find('.v_3').length > 0){
                self.forNewLogic(page,content.prop("outerHTML")) ;
            }else
                self.forNewLogic(page,content.prop("outerHTML")) ;
        })(i);
    }
};
PreviewBookController.prototype.forOldLogic = function(page,content){
    var self = this ;
    var page_width = self.book.page_width * 0.5;
    var page_height = self.book.page_height;
    var padding = "padding:30px 51px";//老电子书
    var pageElement;
    if (self.book.book_display === config.BOOK_DISPLAY_SINGLE) {
        pageElement =
            '<div class="own-size odd " style="width:' + page_width + 'px; height:' + page_height + 'px;">' +
            '<div class="page_padding " style="' + padding + ';height:' + page_height + 'px">' + content + '</div>' +
            '</div>';
    } else {
        pageElement =
            '<div class="own-size " style="width:' + page_width + 'px; height:' + page_height + 'px;">' +
            '<div class="page_padding " style="' + padding + ';height:' + page_height + 'px">' + content + '</div>' +
            '</div>';
    }

    var pageElement_dom = $(pageElement);
    if(page['catalog'] > 0){
        if (
            pageElement_dom.find('.author_page').length > 0 ||
            pageElement_dom.find('#author_page').length > 0){
            self.flipBook.addAuthorPage(pageElement);
        } else if (
            pageElement_dom.find('.copy_page').length > 0 ||
            pageElement_dom.find('#copy_page').length > 0 ||
            pageElement_dom.find('.copyright_page').length > 0){
            self.flipBook.addCopyRightPage(pageElement);
        } else if (
            pageElement_dom.find('.catalog_page').length > 0 ||
            pageElement_dom.find('.catalog_start').length > 0 ||
            pageElement_dom.find('.catalog_content_start').length > 0){
            self.flipBook.addCatalogPage(pageElement);
        } else if (
            pageElement_dom.find('.catalog_empty_page').length > 0 ||
            pageElement_dom.find('.catalog_empty').length > 0 ||
            pageElement_dom.find('#catalog_empty').length > 0){
            if (self.book.book_display === config.BOOK_DISPLAY_DOUBLE)
                self.flipBook.addCatalogPage(pageElement);
            else {
                self.catalogEmptyPage = 1;
            }
        }
    }else{
        var pagenum =  self.flipBook.getContentPageNum() + 1 ;
        //老版本电子书页脚
        if (self.book.book_display === config.BOOK_DISPLAY_DOUBLE) {
            if (pagenum % 2 === 0) {
                pageElement_dom.append('<div class="h" style="background-image: url(https://static.shiqichuban.com/web/assets/hp_imgs/page_foot.png);background-size: cover;padding-bottom: 1.2em;background-position: 0 1.5em;background-repeat: no-repeat;bottom:0;font-size:11px;position:absolute;left:54px;">' + pagenum + '</div>');
            } else {
                pageElement_dom.append('<div class="h" style="background-image: url(https://static.shiqichuban.com/web/assets/hp_imgs/page_foot.png);background-size: cover;padding-bottom: 1.2em;background-position: 0 1.5em;background-repeat: no-repeat;bottom:0;font-size:11px;position:absolute;right:54px;">' + pagenum + '</div>');
            }
        } else {
            pageElement_dom.append('<div class="h" style="background-image: url(https://static.shiqichuban.com/web/assets/hp_imgs/page_foot.png);background-size: cover;padding-bottom: 1.2em;background-position: 0 1.5em;background-repeat: no-repeat;bottom:0;font-size:11px;position:absolute;right:54px;">' + pagenum + '</div>');
        }
        self.flipBook.addContentPage(pageElement_dom.prop("outerHTML"));
        if (!self.hasHeader && pageElement_dom.find('.ubook_header').length > 0) {
            self.hasHeader = true;
        }
    }
};
PreviewBookController.prototype.forNewLogic = function(page,content){
    var self = this ;
    var pageType = page.page_type ;
    var page_id = page.page_id ;

    if(pageType === 1){
        self.flipBook.addAuthorPage(content);
    }else if(pageType === 2){
        self.flipBook.addCopyRightPage(content);
    }else if(pageType === 3){
        self.flipBook.addCatalogPage(content);
    }else if(pageType === 4){
        if (self.book.book_display === config.BOOK_DISPLAY_DOUBLE){
            self.flipBook.addCatalogPage(content);
        }else
            self.catalogEmptyPage = 1;
    }else if(pageType === 5 || pageType === 6){
        //封面 封底
    }else if(pageType === 7){
        //篇章页
        self.flipBook.addChapterPage(content);
    }else if(pageType === 8){
        //插页
        self.flipBook.addInsertPage(content);
    }else if(pageType === 9){
        //序
        self.flipBook.addPrefacePage(content);
    }else if(pageType === 10){
        //序空白页
        if (self.book.book_display === config.BOOK_DISPLAY_DOUBLE){
            self.flipBook.addPrefacePage(content);
        }
    }else if(pageType === 0){
        if (!self.hasHeader && $(content).find('.ubook_header').length > 0) {
            self.hasHeader = true;
        }
        self.flipBook.addContentPage(content);
    }
    if(page_id && pageType !== 5 && pageType !== 6 && (pageType !== 4 && self.book.book_display !== config.BOOK_DISPLAY_DOUBLE)){
        self.pageIdMapPageNum[page_id] = self.flipBook.getTotalPageNum() ;
    }
};
PreviewBookController.prototype.updateHeader = function(){
    var self = this ;
    if(self.book.book_display === config.BOOK_DISPLAY_DOUBLE){
        updateHeader();
        if(self.book.content_theme_type === 3) {
            setHeaderTitle();
        }
    }else{
        updateAppBookHeader(self.book.content_theme_type)
    }
};
PreviewBookController.prototype.updateFooter = function(){
    var self = this ;
    if(self.book.book_display === config.BOOK_DISPLAY_DOUBLE){
        updateFooter();
    }else{
        updateAppBookFooter();
    }
};
PreviewBookController.prototype.addContentLastPage = function(){
    var self = this ;
    var page_width = self.book.page_width * 0.5;
    var page_height = self.book.page_height;
    var current_total_page_count = self.book.page_count ;
    if (current_total_page_count % 2 !== 0 && self.book.book_display === config.BOOK_DISPLAY_DOUBLE) {
        self.flipBook.addContentLastPage('<div class="own-size" style="width:' + page_width + 'px; height:' + page_height + 'px;"><div class=\'page-gradient\'  style=\'pointer-events:none\'></div></div>');
    }
};
PreviewBookController.prototype.addVideoController = function(callback) {
    var self = this;
    self.bookVideoController = new BookVideoController({device: self.device,book:self.book});
    self.bookVideoController.addVideoProxyClick(callback);
};
PreviewBookController.prototype.addAudioController = function(callback) {
    var self = this;
    self.bookAudioController = new BookAudioController({device: self.device});
    self.bookAudioController.addAudioClick(callback)
};
PreviewBookController.prototype.getAudioController = function(callback) {
    var self = this;
    if(self.bookAudioController)
        return self.bookAudioController ;
    return null ;
};
PreviewBookController.prototype.startCreateFlipBook = function(turningCallback, turnedCallback) {
    var self = this;
    if (!self.book_doc) return;
    self.flipBook = new FlipBook(self.book_doc, self.book.book_display, self.book.page_width, self.book.page_height, 16, self.book.scale);
    //开始需要一个空白页
    $(self.book_doc).append('<div></div>');
    self.flipBook.create(
        function turningFun(event, pageNum, view) {
            if(self.newLogic === true){
                self.updateHeader();
                self.updateFooter();
            }
            var page = view.length === 1 ? view[0] : ((self.book.book_display === config.BOOK_DISPLAY_DOUBLE && view[1] !== 0)? view[1] : view[0]);
            $(self.currentPageInput).val(page);
            if (self.slider) {
                self.slider.slider('setValue', page);
            }
            if (self.canEdit) {
                self.refreshArticleEditButton(self.book_doc); //翻页的时候检测是否有编辑按钮,没有则创建
            }
            self.refreshPage(); //刷新编辑按钮
            turningCallback();
        },
        function turnedFun(e, pageNum, view) {
            if(self.newLogic === true){
                self.updateHeader();
                self.updateFooter();
            }
            self.currentViewNum = view;
            if (self.canEdit) {
                self.refreshArticleEditButton(self.book_doc); //翻页的时候检测是否有编辑按钮,没有则创建
            }
            self.refreshPage(); //刷新编辑按钮
            self.night();
            turnedCallback();
        },
        function startFun(e, pageObj) {
            //moveBar(true);
        },
        function endFun(e, pageObj) {
            //moveBar(false);
        },
        function missFun(e, pages) {}
    );
};
PreviewBookController.prototype.setBookScale = function(scale_container, value,offsetY) {
    $(scale_container).css(
        {
            '-webkit-transform': 'scale(' + value + ',' + value + ')',
            '-moz-transform': 'scale(' + value + ',' + value + ')',
            '-ms-transform': 'scale(' + value + ',' + value + ')',
            '-o-transform': 'scale(' + value + ',' + value + ')',
            'transform': 'scale(' + value + ',' + value + ')'
        }
    );
    $(scale_container).css(
        {
            '-webkit-transform-origin':'0% '+ (offsetY || 0) +'% 0px',
            '-ms-transform-origin':'0% '+ (offsetY || 0) +'% 0px',
            '-o-transform-origin':'0% '+ (offsetY || 0) +'% 0px',
            'transform-origin':'0% '+ (offsetY || 0) +'% 0px',
        }
    );
};
PreviewBookController.prototype.checkImageRotation = function() {
    var self = this ;
    if (self.device !== config.DEVICE_PC && getBrowserType() !== 'safari') return;
    $('img[rotation="90"]').each(function(index, value) {
        var _width = parseInt($(value).css('width')) / 16;
        var _height = parseInt($(value).css('height')) / 16;
        var _top = (_height - _width) * 0.5;
        var _left = -(_height - _width) * 0.5;
        $(value).css('transform', 'rotate(90deg)');
        $(value).css('width', _height + 'rem');
        $(value).css('height', _width + 'rem');
        $(value).css('left', _left + 'rem');
        $(value).css('top', _top + 'rem');
        $(value).removeAttr('rotation');
        $(value).attr('rotation90');
    });
    $('img[rotation="180"]').each(function(index, value) {
        $(value).css('transform', '180deg');
        $(value).removeAttr('rotation');
        $(value).attr('180');
    });
    $('img[rotation="270"]').each(function(index, value) {
        var _width = parseInt($(value).css('width')) / 16;
        var _height = parseInt($(value).css('height')) / 16;
        var _top = (_height - _width) * 0.5;
        var _left = -(_height - _width) * 0.5;
        $(value).css('transform', 'rotate(270deg)');
        $(value).css('width', _height + 'rem');
        $(value).css('height', _width + 'rem');
        $(value).css('left', _left + 'rem');
        $(value).css('top', _top + 'rem');
        $(value).removeAttr('rotation');
        $(value).attr('rotation270');
    });
};
PreviewBookController.prototype.addKeyBoardController = function() {
    var self = this;
    if (self.flipBook.getEnableKeyBoard() === false) return;
    $(window).bind('keydown', function(e) {
        switch (e.keyCode) {
            case 37:
                e.preventDefault();
                self.flipPre();
                break;
            case 39:
                e.preventDefault();
                self.flipNext();
                break;
        }
    });
};
PreviewBookController.prototype.addSliderBar = function(textInput) {
    var self = this;
    self.slider = $(textInput);
    if (!self.slider) return;
    self.slider.slider({
        min: 1,
        max: 1,
        tooltip: 'always',
        formatter: function(value) {
            return "1/1";
        }
    }).on('slideStart', function(value) {
        self.isSliding = true;
    }).on('slideStop', function(e) {
        var pageNum = Math.max(1, e.value);
        self.turnToPage(pageNum);
        self.isSliding = false;
    }).on('slide', function(e) {
        self.isSliding = true;
    });
};
PreviewBookController.prototype.addPageInputCtrl = function(currentPageInput) {
    var self = this;
    var clearTime = 0;
    /* 输入翻页数字跳转页面*/
    $(currentPageInput).on('input', function(e) {
        if (self.isSliding) return;
        if (isNaN(parseInt($(currentPageInput).val())) === true) return;
        clearTime = setTimeout(function() {
            clearTimeout(clearTime);
            var inputPageNum = parseInt($(currentPageInput).val());
            var realPageNum = inputPageNum + self.flipBook.getFirstContentPage() - 1;
            if (isNaN(realPageNum) === true) return;
            if (realPageNum >= self.flipBook.getTotalPageNum()) {
                self.turnToPage(self.flipBook.getTotalPageNum() - 1);
            } else {
                self.turnToPage(realPageNum);
            }
            $(currentPageInput).val('');
        }, 800);
    });
};
PreviewBookController.prototype.updateSliderUI = function() {
    var self = this;
    if (self.slider) {
        var value = self.slider.slider('getValue');
        self.slider.slider('setAttribute', 'min', 1);
        self.slider.slider('setAttribute', 'max', self.flipBook.getTotalPageNum() - self.flipBook.getContentLastPageNum());
        self.slider.slider('setAttribute', 'formatter', function(value) {
            var tip = self.flipBook.getPageTip(value) || "" ;
            if(tip === ""){
                var currentPage = parseInt(value) - self.flipBook.getFirstContentPage() + 1 ;
                tip = currentPage + "/" + (self.flipBook.getContentPageNum() + self.flipBook.getChapterPageNum() + self.flipBook.getContentLastPageNum());
            }
            return tip;
        });
        self.slider.slider('refresh');
        self.slider.slider('setValue', value);
    }
};
PreviewBookController.prototype.lazyLoadImage = function() {
    var self = this ;
    $(self.book_doc).find('img[img-src]').each(function(index, value) {
        var url = $(value).attr('img-src');
        if (url.indexOf('res.shiqichuban.com') > -1) {
            if (self.device == config.DEVICE_PC) {
                url += "/l";
            } else {
                url += "/m";
            }
        }
        $(value).removeAttr('img-src');
        var image = new Image;
        image.onload = function(e) {
            $(value).prev('img').hide();
            $(value).attr('src', url);
            $(value).css('image-orientation', 'from-image');
        };
        image.onerror = function(e) {
            $(value).attr('src',url);
            $(value).attr('image-src', url);
            $(value).prev('img').hide();
        };
        image.src = url;
    });
};
PreviewBookController.prototype.addGestureFlipHandler = function(gesture_doc,touch_callback) {
    var self = this;
    if (self.flipBook) {
        $(document).on(config.MOUSE_CLICK, gesture_doc, function(e) {
            e.stopPropagation();
            var x = e.originalEvent.changedTouches[0].pageX;
            var y = e.originalEvent.changedTouches[0].pageY;
            if (y < self.book.page_height * self.book.scale) {
                if (x < $(window).width() / 3) {
                    touch_callback(-1);
                } else if (x > $(window).width() * 2 / 3) {
                    touch_callback(1);
                } else {
                    touch_callback(0);
                }
            }
        });
    }
};
PreviewBookController.prototype.setGroupBookUsers = function (users) {
    var self = this ;
    self.groupBookUsers = [] ;
    for(var i in users){
        var user_id = users[i].user_id ;
        var nick_name = users[i].nickname ;
        var user_avatar = users[i].avatar ;
        self.groupBookUsers[user_id] = {nick_name:nick_name,user_id:user_id} ;
    }
};
PreviewBookController.prototype.setContentAuthor = function () {
    var self = this ;
    if(self.groupBookUsers){
        for(var i in self.groupBookUsers){
            var user_id = self.groupBookUsers[i].user_id ;
            var nick_name = self.groupBookUsers[i].nick_name ;
            var selector = $('.ubook_content[owner_id='+ user_id +']');
            if(selector.length > 0){
                if(self.book.show_pen_name === false)
                    selector.find('.content_sub_title').html('') ;
                else
                    selector.find('.content_sub_title').html(nick_name) ;
            }
        }
    }
};
PreviewBookController.prototype.getMinPage = function() {
    var minPage = Infinity;
    var len = 0;
    for (var i in this.deletePageNums) {
        len++;
        minPage = Math.min(minPage, this.deletePageNums[i]);
    }
    if (len === 0) {
        minPage = this.flipBook.getCurrentPageNum() > this.flipBook.getFirstContentPage() ? this.flipBook.getCurrentPageNum() : this.flipBook.getFirstContentPage();
    }
    return minPage;
};
PreviewBookController.prototype.getFlipBook = function() {
    return this.flipBook;
};
PreviewBookController.prototype.getFirstContentPage = function() {
    return this.flipBook.getFirstContentPage();
};
PreviewBookController.prototype.getBookTotalPage = function() {
    return this.flipBook.getTotalPageNum();
};
PreviewBookController.prototype.getCurrentPageNum = function() {
    return this.flipBook.getCurrentPageNum();
};
PreviewBookController.prototype.flipPre = function() {
    var self = this ;
    self.flipBook.turnPre();
    self.refreshPenName();
};
PreviewBookController.prototype.flipNext = function() {
    var self = this ;
    self.flipBook.turnNext();
    self.refreshPenName();
};
PreviewBookController.prototype.turnToPage = function(page) {
    var self = this ;
    if (!page) {
        self.flipBook.turnTo(self.flipBook.getFirstContentPage());
    } else {
        if (page > self.flipBook.getTotalPageNum())
            page = self.flipBook.getTotalPageNum() - 1;
        if(page < 1)
            page = 1 ;
        self.flipBook.turnTo(page);
    }
    self.refreshPenName();
};
PreviewBookController.prototype.turnToPageByPageId = function(page_id){
    var self = this ;
    var pageNum = self.pageIdMapPageNum[page_id] || 0 ;
    if(pageNum)
        self.flipBook.turnTo(pageNum)
    return pageNum ;
};
PreviewBookController.prototype.refreshPenName = function(){
    var self = this ;
    if(self.book.type === config.BOOK_TYPE_GROUP)
        self.setContentAuthor();
};
PreviewBookController.prototype.refreshPage = function(){};
PreviewBookController.prototype.night = function () {
    var self = this ;
    if((self.isNightStatus === true || self.isNightStatus === 1 ) && self.device === config.DEVICE_APP){
        $('body').css("background-color","#4e4e4e");
        $('.book_container').css("background-color","#353535");
        $('.e_book_page').parent("div").css("background-color","#353535");
        $('.f_page').css("background-color","#353535");
        $('p, div').css("color","#a4a4a4");
        $('.e_book_page[page_type=copyright_page]').find('div').each(function(index,value){
            var css = $(value).css("border-bottom") ;
            if(css !== "0px none rgb(164, 164, 164)"){
               $(value).css("border-bottom","2px solid #a4a4a4") ;
            }
        });
        $('.e_book_page[page_type=author_page]').find('.avator_image').css('border',"solid 4px #a4a4a4");
        $('.end_cover').css("background-color","#353535")
    }
};
PreviewBookController.prototype.getPageTipData = function(){
    var self = this ;
    return self.flipBook.getPageTipData() ;
};
PreviewBookController.prototype.getCurrentPageContentID = function (callback) {
    var self = this ;
    this.getContentByPageNum(self.flipBook,callback);
};
PreviewBookController.prototype.getContentID = function () {
    var self = this ;
    var content_ids = [];
    var page_nums = self.flipBook.getCurrentViews();
    for (var i in page_nums) {
        var page_selector = $('.page-wrapper[page=' + page_nums[i] + ']');
        var content_id = $(page_selector.find('.page[content_id]')[0]).attr("content_id");
        if (content_id !== null && content_id !== "0") {
            if (content_ids.length === 0 || (content_ids.length === 1 && content_id !== content_ids[0]))
                content_ids.push(content_id);
        }
    }
    return content_ids ;
};
PreviewBookController.prototype.getPageID = function () {
    var self = this ;
    var page_ids = [];
    var page_nums = self.flipBook.getCurrentViews();
    for (var i in page_nums) {
        var page_selector = $('.page-wrapper[page=' + page_nums[i] + ']');
        var page_id = $(page_selector.find('.page[page_id]')[0]).attr("page_id");
        if (page_id !== null && page_id !== "0") {
            if (page_ids.length === 0 || (page_ids.length === 1 && page_id !== page_ids[0]))
                page_ids.push(page_id);
        }
    }
    return page_ids ;
};
PreviewBookController.prototype.getPageIdNumMap = function(){
    return self.pageIdMapPageNum ;
};
PreviewBookController.prototype.getPageTypeValue = function () {
    var self = this ;
    var pageTypeValArr = [];
    var pageNumArr = self.flipBook.getCurrentViews();
    for (var i in pageNumArr) {
        var page_selector = $('.page-wrapper[page=' + pageNumArr[i] + ']');
        var pageTypeVal = $(page_selector.find('div[page_type_val]')[0]).attr("page_type_val");
        if (pageTypeVal !== null) {
            pageTypeValArr.push(pageTypeVal);
        }
    }
    return pageTypeValArr ;
};
PreviewBookController.prototype.getContentByPageNum = function (flip_book, callback) {
    var self = this;
    var content_ids = [];
    var page_nums = flip_book.getCurrentViews();
    for (var i in page_nums) {
        var page_selector = $('.page-wrapper[page=' + page_nums[i] + ']');
        var content_id = page_selector.find('.ubook_header').length > 0 ? page_selector.find('.ubook_content').first().attr('content_id') : null;
        var length = content_ids.length;
        if(content_id !== null){
            if (length === 0 || (length === 1 && content_id !== content_ids[0]))
                content_ids.push(content_id);
        }
    }
    if (content_ids.length === 0) {
        //不存在IDS就翻到第一页
        if (flip_book.getCurrentPageNum() >= flip_book.getTotalPageNum())
            flip_book.turnTo(flip_book.getFirstContentPage());
        else
            flip_book.turnTo(flip_book.getCurrentPageNum() + 1);
        self.getContentByPageNum(flip_book, callback);
    } else {
        callback(content_ids, page_nums);
    }
};