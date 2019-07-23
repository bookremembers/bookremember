function AudioListController(selected_com) {
    this._play_btn_url = "https://static.shiqichuban.com/assets/img/shiqi_music_play_btn.png";
    this._stop_btn_url = "https://static.shiqichuban.com/assets/img/shiqi_music_stop_btn.png";
    this._shiqi_music_animal = "https://static.shiqichuban.com/assets/img/shiqi_music_animal.gif";
    this._shiqi_record_bg = "https://static.shiqichuban.com/assets/img/shiqi_record_01.png";

    this._current_search_page = 1;
    this._current_type = "default";
    this._isSearching = false;
    this._default_songs = [];
    this._search_songs = [];
    this._selected_item = [];
    this._selected_com = selected_com;
    this._select_type = "multi";  //single | multi单选还是多选
    this._cur_music_key = null;
    this._cur_music_type = null;
    this._click_callback = null;
    this._mode = "default" ; // default || search
}

AudioListController.prototype.setSelectedComEvent = function (func) {
    var self = this;
    self._selected_com = func;
};

AudioListController.prototype.setSelectType = function (type) {
    var self = this;
    self._select_type = type;
};

AudioListController.prototype.setClickCallback = function (func) {
    var self = this;
    self._click_callback = func;
};

AudioListController.prototype.addView = function (width) {
    var self = this;
    if(width == null)
        width = 460 ;
    var view = '';
    view += '<div class="audio_manage_pan" style="height:' + $(window).height() + 'px;width:100%;position:fixed;top:0;background-color: rgba(0,0,0,0.5);">';
    view += '   <div style="margin:60px auto;width:'+ width +'px;"> ';
    view += '       <div style="position:relative;background-color: white;padding:28px 20px 0;border-radius: 5px"> ';
    view += '           <img class="close_manage_btn" style="position:absolute;right:-15px;top:-15px;width:30px;cursor: pointer;" src="/assets/img/icon/close_land.png" /> ';
    view += '           <div style="font-size: 16px;line-height: 18px;padding-bottom: 10px;position:relative;border-bottom:1px solid #eee">';
    view += '               <span>选择音乐</span>';
    view += '               <span class="all_checked_mar" style="display: none;position:absolute;right:0;top:0;font-size: 12px;line-height: 20px;cursor: pointer;">';
    view += '                   <input class="audio_search_input" type="search" style="border:none;outline: none;border-bottom: 1px solid #eee;" placeholder="搜索音乐..."/>';
    view += '                   <input class="cancel_search_btn" type="button" value="×" style="background-color: transparent;border:none;outline: none;line-height: 20px;font-size:20px;cursor: pointer"/>';
    view += '               </span>';
    view += '               <span class="search_btn" style="position:absolute;right:0;top:0;cursor: pointer;font-size: 12px;"><img src="' + STATIC_DOMAIN + '/assets/img/sousuo.png"/></span>';
    view += '           </div> ';
    view += '           <div class="manage_ui_container" style="font-size: 12px;padding: 10px;max-height:378px;height:378px;overflow: auto;width:100%"></div> ';
    view += '			<div style="text-align: center;line-height: 80px;">';
    view += '  				 <span class="sq_btn sq_btn_black submit_audio" style="cursor: pointer;">确定</span>';
    view += '			</div>';
    view += '       </div> ';
    view += '   </div> ';
    view += '</div> ';
    $(document.body).append(view);

    self.manage_pan = $('.audio_manage_pan');
    self.close_manage_btn = $('.close_manage_btn');
    self.manage_ui_container = $('.manage_ui_container');
    self.all_checked_mar = $('.all_checked_mar');
    self.save_material_book = $('.save_material_book');
    self.search_audio = $('.search_audio');
    self.submit_audio = $('.submit_audio');
    self.close_manage_btn.on(MOUSE_CLICK, self.remove.bind(self));
    self.search_audio.on(MOUSE_CLICK, self.toSearchAudio.bind(self));
    self.submit_audio.on(MOUSE_CLICK, self.submitAudio.bind(self));
    self.manage_ui_container.scroll(function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (self._current_type === "default" || self.is_over === false) return;

        if ($(this)[0].scrollTop + $(this).height() >= $(this)[0].scrollHeight - 100) {
            self.is_over = false;
            self._current_search_page++;
            var key = $('.audio_search_input').val();
            self.searchAudio(key, self._current_search_page, function (data) {
                self._search_songs.push[data.songs];
                self.addListData(data.songs);
                self.is_over = true;
            });
        }
    });

    $('.audio_search_input').on("input", function (e) {
        e.preventDefault();
        e.stopPropagation();
        self._mode = "search" ;
        self.toSearchAudio();
        self.stopMusicPlay();
    });

    $('.search_btn').on(MOUSE_CLICK, function (e) {
        e.stopPropagation();
        $(this).hide();
        $('.all_checked_mar').show();
        $('.audio_search_input').focus();
    });

    $('.cancel_search_btn').on(MOUSE_CLICK, function (e) {
        e.stopPropagation();
        self._mode = "default" ;
        $('.all_checked_mar').hide();
        $('.search_btn').show();
        self.stopMusicPlay();

        self._current_type = "default";
        self._current_search_page = 1;
        self.clearSongs();
        self.addListData(self._default_songs);
        //self.setAudioListClickEvent();
    })
};

AudioListController.prototype.stopMusicPlay = function () {
    document.getElementById('music').pause();
};

AudioListController.prototype.remove = function () {
    var self = this;
    self.manage_pan.remove();
    self.close_manage_btn.off(MOUSE_CLICK);
    self.manage_pan = null;
    self.close_manage_btn = null;
    self.manage_ui_container = null;
    self.save_material_book = null;
    self.all_checked_mar = null;
    self._current_search_page = 1;
    self._current_type = "default";
    self._default_songs = [];
    self._search_songs = [];
    self._selected_item = [];
    self.stopMusicPlay();
};

AudioListController.prototype.getAudioListData = function (callback) {
    var self = this;

    Fetcher.fetchData(
        "/v1/song/list/default",
        null,
        'get',
        null,
        function (data) {
            self._default_songs = data.songs;
            callback(data);
        }
    )
};

AudioListController.prototype.searchAudio = function (key, page, callback, errcallback) {
    Fetcher.fetchData(
        "/v1/song/search",
        null,
        'get',
        {
            "key": key,      // singer or name of song*
            "page": page,        // 获取某一页的歌曲*******
            "num": 20,
        },
        function (data) {
            callback(data);
        },
        function () {
            errcallback();
        }
    )
};

AudioListController.prototype.clearSongs = function () {
    $('.manage_ui_container').children().remove();
};

AudioListController.prototype.submitAudio = function () {
    var self = this;
    if(self._cur_music_key)
        self.stopBykey(self._cur_music_key, self._cur_music_type);
    var length = $('.audio_checkbox:checked').length;
    if (length > 0) {
        var songs_data = [] ;
        $('.audio_checkbox').each(function (index, value) {
            if($(this).prop('checked') === true){
                var shiqi_music = $(value).parent().next().html();
                self._selected_item.push("<p><br/></p>" + $(shiqi_music).prop('outerHTML') + "<p><br/></p>");
                if(self._mode === "search")
                    songs_data.push(self._search_songs[index]);
                else
                    songs_data.push(self._default_songs[index]);
                if (self._selected_item.length === length && self._selected_com != null) {
                    if(self._mode === "search"){
                        self._selected_com(self._selected_item,songs_data);
                    }else{
                        self._selected_com(self._selected_item,songs_data);
                    }
                }
            }
        });
    } else {
        if (self._selected_com !== null)
            self._selected_com(self._selected_item)
    }

    self.remove();
};

AudioListController.prototype.toSearchAudio = function () {
    var self = this;
    if (self._isSearching === true) return;
    self._isSearching = true;
    self._current_type = "search";
    self._current_search_page = 1;
    var key = $('.audio_search_input').val();
    self.searchAudio(key, self._current_search_page, function (data) {
        self._isSearching = false;
        self.clearSongs();
        self._search_songs = data.songs;
        self.addListData(self._search_songs);
        //self.setAudioListClickEvent();
    }, function () {
        self._isSearching = false;
    });
};

AudioListController.prototype.addListData = function (songs) {
    var self = this;
    if (songs.length === 0) {
        $('.manage_ui_container').append('<p style="margin-top:50px;text-align: center;font-size: 16px;color:#ccc">没有音乐~</p>');
        return;
    }

    var width = self.manage_ui_container.width();
    var item_scale = width / 700 > 1 ? 1 : width / 700;
    var item_height = 120 * item_scale;
    var date = new Date();
    for (var i in songs) {
        (function (i) {
            var img_url = songs[i].image;
            var source_url = songs[i].online_url;
            var name = songs[i].name;
            var author = songs[i].singer;
            var duration = self.durationStr(songs[i].interval);
            var key = "WEB-SNQXG-MUSIC-" + i.toLocaleUpperCase() + "-" + date.getTime();
            self.manage_ui_container.append(self.getListItem(
                key,
                "music",
                img_url,
                source_url,
                name,
                author,
                duration,
                item_height,
                i == 0
            ));
            self.scaleLayout(width, "music", key);
            self.setListItemStyle("music", key);
        })(i);
    }
};

AudioListController.prototype.durationStr = function (duration) {
    var minutes = Math.floor(duration / 60).toString();
    var seconds = (duration % 60).toString();
    if (minutes.length === 1)
        minutes = "0" + minutes;
    if (seconds.length === 1)
        seconds = "0" + minutes;
    return minutes + ":" + seconds;
};

AudioListController.prototype.getListItem = function (key, type, img_url, source_url, name, author, duration, height,checked) {
    var self = this;
    var view = "";
    view += "<div style='overflow: hidden'>";
    if (self._select_type === "single"){
        if(checked === false)
            view += "<div style='float:left;line-height:"+ (height + 5) +"px;height:" + (height + 5) + "px;margin-left: 2px'><input class='audio_checkbox' type='radio' name='bg_music'/></div>";
        else
            view += "<div style='float:left;line-height:"+ (height + 5) +"px;height:" + (height + 5) + "px;margin-left: 2px'><input class='audio_checkbox' type='radio' name='bg_music' checked='checked'/></div>";
    }else
        view += "<div style='float:left;line-height:"+ (height + 5) +"px;height:" + (height + 5) + "px;margin-left: 2px'><input class='audio_checkbox' type='checkbox'/></div>";
    view += "   <div style='float:left;display:inline-block;width:90%'>";
    view += self.getBookMusicLayout(key, type, img_url, source_url, name, author, duration);
    view += "   </div>";
    view += "</div>";
    return view;
};


AudioListController.prototype.getBookMusicLayout = function (key, type, img_url, source_url, name, author, duration) {
    var self = this;
    var view = '';
    if(source_url !== ""){
        view += '<div class="shiqi_music_wrapper" type="' + type + '" key="' + key + '" music_url="' + source_url + '"  style="position:relative;width:100%;" contenteditable="false">';
        view += '   <div class="shiqi_music" key="' + key + '" style="position:relative;width: 700px;height: 120px;box-shadow:0 0 10px #ccc;margin-left:2px;margin-top:2px;" >';
        if(img_url !== "")
            view += '       <img class="shiqi_music_img" src="' + img_url + '" style="position:absolute;left:11px;top:12px;width:86px;height:86px;"/>';

        view += '       <img class="shiqi_music_play_btn" src="' + self._play_btn_url + '" style=" position: absolute;left: 586px;top: 23px;width: 67px;height: 67px;"/>';
        view += '       <img class="shiqi_music_animal" key="' + key + '" src="' + self._shiqi_music_animal + '" style=" display:none;position: absolute;left: 498px;top: 41px;width: 30px;height: 30px;"/>';
        view += '       <div class="shiqi_music_name" style="text-align:left;moz-user-select: -moz-none;-moz-user-select: none;-o-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;position: absolute;left: 146px;top: 15px;width: 320px;height: 32px;line-height:32px;font-family:宋体;font-size: 30px;color:#555555;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">' + name + '</div>';
        view += '       <div class="shiqi_music_duration" style="display:none; position: absolute;left: 146px;top: 66px;width: 320px;height: 19px;font-family:宋体;font-size: 14px;color:#999;">' + duration + '</div>';
        view += '       <div class="shiqi_music_author" style="text-align:left;moz-user-select: -moz-none;-moz-user-select: none;-o-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;position: absolute;left: 146px;top: 60px;width: 320px;height: 19px;font-family:宋体;font-size: 25px;color:#999;">' + author + '</div>';
        view += '   </div>';
        view += '   <div class="shiqi_mask" style=" position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0);-webkit-user-modify:read-only;" contenteditable="false"></div>';
        view += '</div>';
    }else{
        view += '<div class="shiqi_music_wrapper" type="' + type + '" key="' + key + '" music_url="' + source_url + '"  style="position:relative;width:100%;" contenteditable="false">';
        view += '   <div class="shiqi_music" key="' + key + '" style="position:relative;width: 700px;height: 120px;box-shadow:0 0 10px #ccc;margin-left:2px;margin-top:2px;" >';
        view += '       <div class="shiqi_music_name" style="text-align:left;moz-user-select: -moz-none;-moz-user-select: none;-o-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;position: absolute;left: 30px;top: 43px;width: 320px;height: 32px;line-height:32px;font-family:宋体;font-size: 30px;color:#555555;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">' + name + '</div>';
        view += '   </div>';
        view += '</div>';
    }
    return view;
};

AudioListController.prototype.setListItemStyle = function (type, key) {
    if (type === "music") {
        $('.audio_manage_pan .shiqi_music[key=' + key + ']').css({
            "box-shadow": "none",
            "border-bottom": "1px solid #ccc"
        });
    } else if (type === "record") {
        $('.audio_manage_pan .shiqi_record[key=' + key + ']').css({
            "box-shadow": "none",
            "border-bottom": "1px solid #ccc"
        });
    }
};

AudioListController.prototype.scaleLayout = function (screen_w, type, key) {
    var scale = screen_w / 700 > 1 ? 1 : screen_w / 700;
    if (type === "music") {
        $('.audio_manage_pan .shiqi_music[key=' + key + ']').css({
            "transform": 'scale(' + scale + ',' + scale + ')',
            "transform-origin": "0 0 0",
        });
        $('.audio_manage_pan .shiqi_music_wrapper[key=' + key + ']').css("height", 120 * scale + 'px');
    } else if (type === "record") {
        $('.audio_manage_pan .shiqi_record[key=' + key + ']').css({
            "transform": 'scale(' + scale + ',' + scale + ')',
            "transform-origin": "0 0 0",
        });
        $('.audio_manage_pan .shiqi_record_wrapper[key=' + key + ']').css("height", 120 * scale + 'px');
    }
};


AudioListController.prototype.setAudioListClickEvent = function () {
    var self = this;
    if ($(document).find('.msc_soure').length === 0) {
        var audio_html = '<div class="msc_soure" style="display:none;">'
            + '<audio id="music" src="">你的浏览器不支持audio标签</audio>'
            + '</div>';
        $(document.body).append(audio_html);
    }

    $(document).on(MOUSE_CLICK,".shiqi_music_wrapper",function (e) {
        e.stopPropagation();
        clickHandler(this, e, "music");
    });
    $(document).on(MOUSE_CLICK,".shiqi_record_wrapper",function (e) {
        e.stopPropagation();
        clickHandler(this, e, "record");
    });


    function clickHandler(target, e, type) {
        var _left = null;
        var _top = null;
        var _width = null;
        var _height = null;
        if (type === "music") {
            _left = $(target).find('.shiqi_music_play_btn').offset().left;
            _top = $(target).find('.shiqi_music_play_btn').offset().top;
            //元素节点本身的大小
            _width = $(target).find('.shiqi_music_play_btn').width();
            _height = $(target).find('.shiqi_music_play_btn').height();
        } else if (type === "record") {
            _left = $(target).find('.shiqi_record_play_btn').offset().left;
            _top = $(target).find('.shiqi_record_play_btn').offset().top;
            //元素节点本身的大小
            _width = $(target).find('.shiqi_record_play_btn').width();
            _height = $(target).find('.shiqi_record_play_btn').height();
        }

        //鼠标或者触屏的节点的坐标
        var e_left = e.clientX || e.originalEvent.touches[0].clientX;
        var e_top = e.clientY || e.originalEvent.touches[0].clientY;

        //文档滚动的距离
        var s_left = $(document).scrollLeft();
        var s_top = $(document).scrollTop();

        if (_left < e_left && e_left - (_left - s_left) <= _width && e_top - _top - s_top <= _height) {
            var music = $(document).find('#music').get(0);
            if ($(target).attr('key') === self._cur_music_key) {
                if (music.paused) {
                    music.play();
                    self.playBykey($(target).attr('key'), self._cur_music_type);
                    if (self._click_callback)
                        self._click_callback("play");
                } else {
                    music.pause();
                    self.stopBykey($(target).attr('key'), self._cur_music_type);
                    if (self._click_callback)
                        self._click_callback("stop");
                }
            } else {
                if (self._cur_music_key !== null)
                    self.stopBykey(self._cur_music_key, self._cur_music_type);

                self._cur_music_key = $(target).attr('key');
                self._cur_music_type = type;
                self.playBykey(self._cur_music_key, self._cur_music_type);
                music.setAttribute('src', $(target).attr('music_url'));
                music.play();
                if (self._click_callback)
                    self._click_callback("play");
            }
        }
    }
};

AudioListController.prototype.stopBykey = function (key, type) {
    var self = this;
    if (type === "music") {
        $('.audio_manage_pan .shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_play_btn').attr('src', self._play_btn_url);
        $('.audio_manage_pan .shiqi_music_animal[key=' + key + ']').hide();
    } else if (type === "record") {
        $('.audio_manage_pan .shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_play_btn').attr('src', self._play_btn_url);
        $('.audio_manage_pan .shiqi_record_animal[key=' + key + ']').hide();
    }
    key = null;
    type = null;
};

AudioListController.prototype.playBykey = function (key, type) {
    var self = this;
    if (type === "music") {
        $('.audio_manage_pan .shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_play_btn').attr('src', self._stop_btn_url);
        $('.audio_manage_pan .shiqi_music_animal[key=' + key + ']').show();
    } else if (type === "record") {
        $('.audio_manage_pan .shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_play_btn').attr('src', self._stop_btn_url);
        $('.audio_manage_pan .shiqi_record_animal[key=' + key + ']').show();
    }
};