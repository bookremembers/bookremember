/**
 * Created by naxiaoguang on 2017/7/19.
 */
function StepBtnController(book, options, commandChannel) {
    this.device = options.device;
    this.action = options.action;
    this.status = options.status;
    this.view_type = options.view_type;
    this.book = book;
    this.catalog_show = false;
    this.commandChannel = commandChannel;
}
StepBtnController.prototype.getMobileStepBtn = function (showCatalogBtn) {
    var self = this;
    var down_btns = '';
    down_btns += '<div class="form-group catalog_container mobile-step-container" style="margin-top: 7px;position:relative">';
    if (showCatalogBtn === true) {
        down_btns += '<span class="catalog_btn" style="display:inline-block;width:60px;border: 1px solid #000;border-radius: 5px;color:#000;text-align: center;height:30px;line-height:30px;">目  录</span>';
    }
    if (this.book.type === config.BOOK_TYPE_GROUP || this.action === config.ACTION_SHARE) {
        down_btns += '<a href="https://www.shiqichuban.com/getApps?source=share_ebook">';
        down_btns += '<img class="download_btn" src="https://static.shiqichuban.com/assets/img/comment/icon_download_share.png" style="display:inline-block;margin-left:10px;width:60px;height: 30px;border-radius: 5px;border: 1px solid #000;vertical-align: top;">';
        down_btns += '</a>';
    }
    down_btns += '</div>';
    return down_btns;
};
StepBtnController.prototype.hideMobileStepBtn = function () {
    if ($('.sliderbar_container').is(":hidden") === true) {
        $('.sliderbar_container').show();//滑条
        $('.bottom_bar').show();//评论相关
    } else {
        $('.sliderbar_container').hide();//滑条
        $('.bottom_bar').hide();//评论相关
    }
};
StepBtnController.prototype.getPreviewStepBtnDis = function () {
    var up_btns;
    var down_btns;
    var left_top_btns;
    if (this.device === config.DEVICE_MOBILE) {
        down_btns = this.getMobileStepBtn(!this.book.isPicTheme);
    } else {
        if (this.view_type === config.VIEW_TYPE_ORDER) {
            down_btns = "";
            down_btns += '<div class="form-group catalog_container side_btn" style="margin-bottom: 25px;position:relative" name="目录">';
            down_btns += '  <a><img class="catalog_btn" src="https://static.shiqichuban.com/assets/img/icon/icon_catalog.png" alt="目录" title="目录"/></a>';
            down_btns += '</div>';
        } else {
            var book_shelf;
            if (this.book.type === config.BOOK_TYPE_GROUP)
                book_shelf = getCurrentWWWDomain() + '/portal/share_books';
            else
                book_shelf = getCurrentWWWDomain() + '/portal/books';
            if (this.book.isColorBook) {
                var edit_url = '/book/new_contents/' + this.book.book_id;
            } else {
                var edit_url = '/book/contents/' + this.book.book_id;
            }
            up_btns = "";
            // up_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;"  name="书架">';
            // up_btns += '    <a href="' + book_shelf + '"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_shell.png"/></a>';
            // up_btns += '</div>';
            // up_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;position:relative;"  name="分享">';
            // up_btns += '    <a class="ebook_share_to" href="javascript:void(0)"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_share.png"/></a>';
            // up_btns += '</div>';
            // up_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;"  name="打印">';
            // up_btns += '    <a href="javascript:void(0)" class="print_book_btn"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_print.png"/></a>';
            // up_btns += '</div>';
            // up_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;"  name="pdf">';
            // up_btns += '    <a href="javascript:void(0)" class="icon_ebook_download"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_download.png"/></a>';
            // up_btns += '</div>';
            down_btns = "";
            if (this.book.role && this.book.role === 1) {
                down_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;position:relative"  name="邀请好友">';
                down_btns += '  <a><img class="invite_man_btn" src="https://static.shiqichuban.com/assets/img/group_write/yaoqing_icon_26.png"/></a>';
                down_btns += '</div>';
            }
            if (!this.book.isPicTheme) {
                down_btns += '<div class="form-group catalog_container side_btn" style="margin-bottom: 5px;position:relative"  name="目录">';
                down_btns += '  <a><img class="catalog_btn" src="https://static.shiqichuban.com/assets/img/icon/icon_catalog.png"/></a>';
                down_btns += '</div>';
            }
            if (this.action !== config.ACTION_SHARE) {
                down_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;"  name="编辑">';
                down_btns += '  <a href="' + edit_url + '" ><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_edit.png"/></a>';
                down_btns += '</div>';
            }
        }
    }
    var stepBtn = '';
    if (up_btns) {
        if (this.action !== config.ACTION_SHARE) {
            stepBtn += '<div class="up_step_btn" style="z-index:80000;text-align: left;position:absolute;right:-100px;top:0">';
            stepBtn += up_btns;
            stepBtn += '</div>';
        }
        if (this.book.isColorBook === true) {
            stepBtn += '<div class="up_step_btn" style="z-index:80000;text-align: left;position:absolute;right:-100px;top:0">';
            stepBtn += up_btns;
            stepBtn += '</div>';
        }
    }
    if (down_btns) {
        if (this.device === config.DEVICE_MOBILE) {
            stepBtn += '<div class="down_step_btn" style="z-index:80000;text-align: left;position: absolute;right: 10px;">';
        } else {
            stepBtn += '<div class="down_step_btn" style="text-align: left;position:absolute;right:-100px;bottom:0">';
        }
        stepBtn += down_btns;
        stepBtn += '</div>';
    }
    left_top_btns = "";
    if (this.book.bg_music !== null && this.book.bg_music !== "") {
        if (this.device === config.DEVICE_MOBILE) {
            // left_top_btns += "<div class='form-group left_side_btn book_music_btn'  name='音乐' left_pos='-50px' style='position:fixed;top:5px;left:5px;cursor: pointer'><img src='"+ STATIC_DOMAIN + "/assets/img/book_music.png' style='width:25px;height:25px'/></div>" ;
        } else {
            left_top_btns += "<div class='form-group left_side_btn book_music_btn'  name='音乐' left_pos='-50px' style='margin-bottom: 5px;cursor: pointer'><img src='" + STATIC_DOMAIN + "/assets/img/book_music.png' /></div>";
        }
    }
    if (this.book.type === config.BOOK_TYPE_GROUP) {
        left_top_btns += "<div class='form-group left_side_btn' name='进入主题' left_pos='-82px' style='text-align: center;margin-bottom: 5px'><a href='" + getCurrentWWWDomain() + "/book/zone" + "'><img src='" + STATIC_DOMAIN + "/assets/img/to_group.png'/></a></div>";
    }
    stepBtn += '<div class="left_top_btn" style="z-index:80000;position: absolute;left:-100px;top:0">' + left_top_btns + '</div>';
    return stepBtn;
};
StepBtnController.prototype.addEditStepBtnDis = function () {
    if (this.device === config.DEVICE_APP) return;
    var down_btns;
    var left_top_btns;
    var up_btns;
    if (this.device === config.DEVICE_MOBILE) {
        //手机端显示一个目录按钮
        down_btns = this.getMobileStepBtn(!this.book.isPicTheme);
    } else {
        var cover;
        if (this.book.type === config.BOOK_TYPE_GROUP && this.book.role !== 1) {
            cover = getCurrentWWWDomain() + '/book/preview/' + this.book.book_id;
        } else {
            cover = getCurrentWWWDomain() + '/book/cover/' + this.book.book_id;
        }
        var book_shelf;
        if (this.book.type === config.BOOK_TYPE_GROUP)
            book_shelf = getCurrentWWWDomain() + '/portal/share_books';
        else
            book_shelf = getCurrentWWWDomain() + '/portal/books';
        var wechat_share = '/book/share_wechat/' + this.book.book_id;
        if (this.book.isColorBook) {
            var edit_url = '/book/new_contents/' + this.book.book_id;
        } else {
            var edit_url = '/book/contents/' + this.book.book_id;
        }
        up_btns = "";
        if (this.book.isColorBook === false) {
            up_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;"  name="书架">';
            up_btns += '    <a href="' + book_shelf + '"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_shell.png"/></a>';
            up_btns += '</div>';
            up_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;position:relative;"  name="分享">';
            up_btns += '    <a class="ebook_share_to" href="javascript:void(0)"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_share.png"/></a>';
            up_btns += '</div>';
            up_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;"  name="打印">';
            up_btns += '    <a href="javascript:void(0)" class="print_book_btn"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_print.png"/></a>';
            up_btns += '</div>';
            up_btns += '<div class="form-group side_btn" style="margin-bottom: 5px;"  name="pdf">';
            up_btns += '    <a href="javascript:void(0)" class="icon_ebook_download"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_download.png"/></a>';
            up_btns += '</div>';
        }
        if (this.book.isColorBook === true) {
            down_btns = "";
            down_btns += '<div class="form-group saveDeleteBtn side_btn" style="margin-bottom: 5px;visibility: hidden" name="保存">';
            down_btns += '  <a class="toSaveChange" ><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_save.png"/></a>';
            down_btns += '</div>';
            if (this.book.isPicTheme === true) {
                down_btns += '<div class="form-group add_article_btn side_btn" style="" name="添加图片">';
            } else {
                down_btns += '<div class="form-group add_article_btn side_btn" style="" name="添加文章">';
            }
            down_btns += '  <a><img src="https://static.shiqichuban.com/assets/img/color_book/add_article_icon.png" /></a>';
            down_btns += '</div>';
            if (this.book.isPicTheme === true) {
                down_btns += '<div class="form-group side_btn" style="" name="修改封面">';
                down_btns += '  <a href="' + cover + '"><img src="https://static.shiqichuban.com/assets/img/color_book/icon_ebook_cover.png"/></a>';
                down_btns += '</div>';
            }
            // down_btns += '<div class="form-group side_btn" style="" name="修改封面">';
            // down_btns += '  <a href="' + cover + '"><img src="https://static.shiqichuban.com/assets/img/color_book/icon_ebook_cover.png"/></a>';
            // down_btns += '</div>';
            if (this.book.isPicTheme === true) {
                down_btns += '<div class="form-group edit_book side_btn" style="" name="修改内容／排版">';
            } else {
                down_btns += '<div class="form-group edit_book side_btn" style="" name="修改排版">';
            }
            down_btns += '  <a><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_edit.png" /></a>';
            down_btns += '</div>';
            if (this.book.isPicTheme === true) {
                down_btns += '<div class="form-group function_btn side_btn" style="display:none;margin-bottom: 5px;position:relative" name="添加背景音乐">';
            } else {
                down_btns += '<div class="form-group function_btn side_btn" style="display:none;margin-bottom: 5px;position:relative" name="更多修改">';
            }
            down_btns += '  <a><img src="https://static.shiqichuban.com/assets/img/color_book/icon_ebook_more_edit.png"/></a>';
            down_btns += '</div>';
        } else {
            down_btns = "";
            down_btns += '<div class="form-group saveDeleteBtn side_btn" style="margin-bottom: 5px;visibility: hidden" name="保存">';
            down_btns += '  <a class="toSaveChange" ><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_save.png"/></a>';
            down_btns += '</div>';
            down_btns += '<div class="form-group function_btn side_btn" style="display:none;margin-bottom: 5px;position:relative" name="修改">';
            down_btns += '  <a><img src="https://static.shiqichuban.com/assets/img/icon/icon_function.png"/></a>';
            down_btns += '</div>';
            down_btns += '<div class="form-group catalog_container side_btn" style="margin-bottom: 5px;position:relative" name="目录">';
            down_btns += '  <a><img class="catalog_btn" src="https://static.shiqichuban.com/assets/img/icon/icon_catalog.png" /></a>';
            down_btns += '</div>';
            down_btns += '<div class="form-group side_btn" style="" name="下一步">';
            down_btns += '  <a href="' + cover + '"><img src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_nextstep.png"/></a>';
            down_btns += '</div>';
        }
    }
    var stepBtn = '';
    if (this.book.isColorBook == true) {
        stepBtn += '<div class="up_step_btn" style="z-index:80000;text-align: left;position:absolute;right:-100px;top:0">';
        stepBtn += up_btns
        stepBtn += '</div>';
    }
    if (down_btns) {
        if (this.device === config.DEVICE_MOBILE) {
            stepBtn += '<div class="down_step_btn" style="z-index:80000;text-align: left;position: absolute;right: 10px;">';
        } else {
            stepBtn += '<div class="down_step_btn" style="text-align: left;position:absolute;right:-100px;bottom:0">';
        }
        stepBtn += down_btns;
        stepBtn += '</div>';
    }
    left_top_btns = "";
    if (this.book.bg_music !== null && this.book.bg_music !== "") {
        left_top_btns += "<div class='form-group left_side_btn book_music_btn'  name='音乐' left_pos='-50px' style='margin-bottom: 5px;cursor: pointer'><img src='" + STATIC_DOMAIN + "/assets/img/book_music.png' /></div>";
    }
    stepBtn += '<div class="left_top_btn" style="z-index:80000;position: absolute;left:-100px;top:0">' + left_top_btns + '</div>';
    if (this.book.content_theme_type === 3) {
        this.catalogs_list_btn();
    }
    return stepBtn;
};
StepBtnController.prototype.changeBGMusicBtn = function (type) {
    var self = this;
    if ($('.left_top_btn').find('.book_music_btn').length === 0) {
        var btn = "<div class='form-group left_side_btn book_music_btn'  name='音乐' left_pos='-50px' style='margin-bottom: 5px;cursor: pointer'><img src='" + STATIC_DOMAIN + "/assets/img/book_music.png' /></div>";
        $('.left_top_btn').prepend(btn);
        self.sideBtnOver();
    }
    if (type === "play")
        $('.book_music_btn').find('img').attr('src', STATIC_DOMAIN + '/assets/img/book_music_animal.gif');
    else
        $('.book_music_btn').find('img').attr('src', STATIC_DOMAIN + '/assets/img/book_music.png');
};
StepBtnController.prototype.activeStepBtn = function (stepBtn) {
    var self = this;
    var share_to = "<div class='share_to_list' style='z-index:99999;color:#e8e8e8;background-color: rgba(0,0,0,0.8);width:180px;position:absolute;right:80px;top:-50%;padding:10px;border-radius: 5px'><p class='share_to_wechat' style='line-height: 34px;margin:0 3px;cursor: pointer;padding:5px 0;color:#fff;'><img src='https://static.shiqichuban.com/assets/img/icon/ebook_share_to_wechat.png' style='width:24px;margin-right: 10px' />分享至微信好友</p><p class='ebook_share_to_wechat_friend' style='line-height: 34px;margin:0 3px;cursor: pointer;border-top:1px solid white;padding:5px 0;color:#fff;'><img src='https://static.shiqichuban.com/assets/img/icon/ebook_share_to_wechat_friend.png' style='width:24px;margin-right: 10px;' />分享到朋友圈</p></div>";
    if (self.device === config.DEVICE_MOBILE) {
        $('.sliderbar_container').append(stepBtn);
        $('.down_step_btn').css({
            transform: 'scale(' + self.book.scale + ',' + self.book.scale + ')',
            'transform-origin': '90% 0% 0'
        })
    } else {
        $('#canvas').append(stepBtn);
    }
    if (self.status === config.STATUS_PREVIEW || self.book.isColorBook === true) {
        $(document)
            .on(config.MOUSE_CLICK, '.print_book_btn', print_book_handler)
            .on(config.MOUSE_CLICK, '.delete_book_btn', delete_book_handler)
            .on(config.MOUSE_CLICK, '.ebook_share_to', ebookShareTo)
            .on(config.MOUSE_CLICK, '.share_to_wechat', share_to_wechat)
            .on(config.MOUSE_CLICK, '.ebook_share_to_wechat_friend', ebook_share_to_wechat_friend)
            .on(config.MOUSE_CLICK, '.icon_ebook_download', icon_ebook_download);
    }
    $(document).on(config.MOUSE_CLICK, '.catalog_btn', function (e) {
        e.stopPropagation();
        self.commandChannel.postCommand(ModuleCommand.TOGGLE_CATALOG);
    }).on(config.MOUSE_CLICK, '.book_music_btn', function (e) {
        e.stopPropagation();
        self.playDefaultBgMusic();
    });
    function print_book_handler(e) {
        e.stopPropagation();
        if (self.book.page_count >= 400) {
            new BookDivisionPlugin().show();
            return;
        }

        if (self.book.page_count < self.book.bookTotalMinPage) {
            showConfirm('相册书小于'+ self.book.bookTotalMinPage +'页,不能打印!', null, null, null, null, 'ok');
            return;
        }
        if (self.book.page_count >= self.book.bookTotalMinPage) {
            var data = {} ;
                var book_id = self.book.book_id ;
                data[book_id] = {
                    book:{
                        book_id:parseInt(self.book.book_id,10),
                        binding_id:parseInt(self.book.binding_id, 10),
                        title:self.book.title,
                        content_theme_type:parseInt(self.book.content_theme_type,10),
                        thumbnail:self.book.thumbnail,
                        page_total_count:parseInt(self.book.page_count,10),
                        type:parseInt(self.book.type,10)
                    },
                    index:0
                } ;
                debugger ;
                sessionStorage.setItem('cart',JSON.stringify(data));
                window.open('https://www.shiqichuban.com/simple/app/#/cart','_self');
            // $('#book_main_form').attr('action', getCurrentWWWDomain() + '/order/shopping_cart');
            // $('#book_main_form').submit();
        } else {
            showConfirm('电子书小于'+ self.book.bookTotalMinPage +'页,不能打印!', null, null, null, null, 'ok');
        }
    }
    function delete_book_handler(e) {
        e.stopPropagation();
        showConfirm('确定删除此书 ?', null, null, function () {
            $('#book_main_form').attr('action', getCurrentWWWDomain() + '/book/delete');
            $('#book_main_form').submit();
        }, null, 'ok|cancel');
    }
    function ebookShareTo(e) {
        e.stopPropagation();
        if ($('.share_to_list').length === 0) {
            $('.ebook_share_to').parent().append(share_to);
        } else {
            $('.share_to_list').remove();
        }
    }
    function share_to_wechat(e) {
        location.href = "/book/share_wechat/" + self.book.book_id + "?share_to=wechat_friend";
    }
    function ebook_share_to_wechat_friend() {
        location.href = "/book/share_wechat/" + self.book.book_id + "?share_to=wechat";
    }
    function icon_ebook_download() {
        var ebook_uptime = $('input[name="book_ids[]"]').attr('ebook_uptime');
        var updated_at = $('input[name="book_ids[]"]').attr('updated_at');
        if (ebook_uptime == updated_at) {
            window.open('/ebook/download/list')
        } else {
            var action = '/order/create';
            var form = $('<form></form>');
            form.attr('action', action);
            form.attr('method', 'post');
            form.attr('target', '_self');
            var token = $('<input type="text" name="_token" />');
            token.attr('value', self.token);
            var bookid = $('<input type="text" name="book_ids[]" />');
            bookid.attr('value', self.book.book_id);
            var goods_type = $('<input type="text" name="goods_type" />');
            goods_type.attr('value', '2');
            var book_infos = $('<input type="hidden" name="book_infos[]" />');
            form.append(book_infos);
            form.append(bookid);
            form.append(token);
            form.append(goods_type);
            $(document.body).append(form);
            form.submit();
        }
    }
    self.sideBtnOver();
};
StepBtnController.prototype.playDefaultBgMusic = function () {
    var self = this;
    if (self.book.bg_music.length === 0) return;
    //分享的电子书用#audio_bg_music，在ebook_v2.blade.php 中添加
    if ($(document).find('#audio_bg_music').length === 0) {
        if ($(document).find('.mg_msc_source').length === 0) {
            var audio_html = '<div class="mg_msc_source" meted="meted" style="display:none;">'
                + '<audio id="bg_music" src="" preload="auto">你的浏览器不支持audio标签</audio>'
                + '</div>';
            $(document.body).append(audio_html);
        }
    }
    var music = $(document).find('#bg_music').get(0) || $(document).find('#audio_bg_music').get(0);
    if (music === null) return;
    if (music.paused) {
        $(music).attr("src", self.book.bg_music);
        if (isPC()) {
            eval(" music.play().then(()=>{\n" +
                "                console.log('可以自动播放');\n" +
                "            }).catch((err)=>{\n" +
                "                console.log(\"不允许自动播放\");\n" +
                "                 $('.book_music_btn img').attr('src','https://static.shiqichuban.com/assets/img/book_music.png')\n" +
                "                //音频元素只在用户交互后调用.play(),\n" +
                "            });");
        } else {
            music.play().then().catch(
                $('.book_music_btn img').attr('src', 'https://static.shiqichuban.com/assets/img/book_music.png')
            );
        }
        self.commandChannel.postCommand(BookCommand.BOOK_BG_MUSIC, { type: "play" });
    } else {
        music.pause();
        self.commandChannel.postCommand(BookCommand.BOOK_BG_MUSIC, { type: "pause" });
    }
};
StepBtnController.prototype.stopMusic = function () {
    var music = $(document).find('#bg_music').get(0) || $(document).find('#audio_bg_music').get(0);
    if (music)
        music.pause();
    $('.book_music_btn').find('img').attr('src', STATIC_DOMAIN + '/assets/img/book_music.png');
};
StepBtnController.prototype.sideBtnOver = function () {
    var self = this;
    if (self.device === config.DEVICE_PC) {
        $('.side_btn').each(function (index, value) {
            var top = '15px';
            var left = '60px';
            $(this).css('position', 'relative');
            if ($(this).hasClass('catalog_container')) {
                if (self.book.content_theme_type === 3) {
                    if ($(this).find('.tip').length === 0)
                        $(this).append('<div class="tip" style="border-radius:5px;float: left;color:#000;font-size:12px;padding:3px 6px;white-space: nowrap;letter-spacing: 3px">' + $(this).attr('name') + '</div>')
                } else {
                    if ($(this).find('.tip').length === 0)
                        $(this).append('<div class="tip" style="position:absolute;border-radius:5px;top:' + top + ';left:' + left + ';background-color: rgba(0,0,0,0.5);color:white;padding:3px 6px;white-space: nowrap;letter-spacing: 3px">' + $(this).attr('name') + '</div>')
                }
            } else {
                if ($(this).find('.tip').length === 0)
                    $(this).append('<div class="tip" style="position:absolute;border-radius:5px;top:' + top + ';left:' + left + ';background-color: rgba(0,0,0,0.5);color:white;padding:3px 6px;white-space: nowrap;letter-spacing: 3px">' + $(this).attr('name') + '</div>')
            }
        });
        $('.left_side_btn').each(function (index, value) {
            var top = '15px';
            $(this).css('position', 'relative');
            if ($(this).find('.tip').length === 0)
                $(this).append('<div class="left_tip" style="position:absolute;border-radius:5px;top:' + top + ';left:' + $(this).attr('left_pos') + ';background-color: rgba(0,0,0,0.5);color:white;padding:3px 6px;white-space: nowrap;letter-spacing: 3px">' + $(this).attr('name') + '</div>')
        });
    }
};
StepBtnController.prototype.catalogs_list_btn = function () {
    var self = this;
    var catalogs_list_btn = '';
    if (this.action === config.ACTION_SHARE) {
        catalogs_list_btn += '<div class="form-group catalog_container side_btn catalog_btn" style="margin-bottom: 5px;position:relative" name="目录">';
        catalogs_list_btn += '  <a><img class="catalog_btn" style="position:absolute;border-radius:5px;top:15px;left:60px;background-color: rgba(0,0,0,0.5);color:white;padding:3px 6px;white-space: nowrap;letter-spacing: 3px" src="https://static.shiqichuban.com/assets/img/color_book/icon_catalog.png" /></a>';
        catalogs_list_btn += '</div>';
    } else {
        catalogs_list_btn += '<div class="form-group catalog_container side_btn catalog_btn" style="margin-bottom: 5px;position:relative;float:right;    border: 1px solid #999;border-radius: 5px;background:#fff;" name="目录列表">';
        catalogs_list_btn += '  <a style="float:left;"><img class="catalog_btn" style="height:12px;margin:5px 0 5px 5px;;" src="https://static.shiqichuban.com/assets/img/color_book/icon_catalog.png" /></a>';
        catalogs_list_btn += '</div>';
    }
    if (self.device === config.DEVICE_PC) {
        $('.sliderbar_container').append(catalogs_list_btn)
    }
}