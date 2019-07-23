/**
 * Created by naxiaoguang on 2017/1/15.
 */
function BookVideoController(options) {
    this.device = options.device;
    this.book = options.book;
    this.MOUSE_CLICK = this.device == config.DEVICE_PC ? 'click' : 'touchstart';
}
/**
 * 添加视频图片的点击事件，返回video_url
 * @param callback
 */
BookVideoController.prototype.addVideoProxyClick = function (callback) {
    var self = this;
    $(document).on(self.MOUSE_CLICK, '.shiqi_video_wrapper', function (e) {
        e.stopPropagation();
        var video_url = $($(this).find(".shiqi_video").get(0)).attr('video_url');
        if (self.device === config.DEVICE_APP) {
            callback(video_url);
        } else {
            self.playVideo(video_url);
        }
    });
};
BookVideoController.prototype.playVideo = function (video_url) {
    var self = this;
    if ($(document).find('.video_wrapper').length != 0) {
        $(document).find('.video_wrapper').remove();
    }
    var z_index = parseInt($('.sliderbar_container').css('z-index')) + 1000;
    var video =
        '<div class="video_wrapper" style="position:absolute;text-align:center;left:0;top:0;padding-top:10px;width:' + $(window).width() + 'px;height:' + $(window).height() + 'px;background-color: rgba(0,0,0,0.7);z-index: ' + z_index + '">' +
        '<video class="_video_" src="' + video_url + '" controls style="position:absolute;top:40px;left:0;width:100%;max-height:' + ($(window).height() - 100) + 'px;background-color: none" autoplay preload >您的浏览器不支持 video 标签。</video>' +
        '<img class="close_video" src="https://static.shiqichuban.com/assets/img/icon/close_land.png" style="position:fixed;top:5px;right:0;width:35px;height:35px"/>' +
        '</div>';
    $(document.body).append(video);
    // getVideoInfo();
    $('.close_video').on(self.MOUSE_CLICK, function (e) {
        e.stopPropagation();
        var video_wrapper = $(this).parent();
        var setTimeoutNum = setTimeout(function () {
            video_wrapper.remove();
            $('.close_video').remove();
            clearTimeout(setTimeoutNum);
        }, 200)
    });
    function getVideoInfo() {
        window.URL = window.URL || window.webkitURL;
        var video = document.createElement('video');
        video.preload = 'auto';
        video.onloadeddata = function () {
            var videoW = video.videoWidth;
            var videoH = video.videoHeight;
            var newVideoW;
            var newVideoH;
            alert(videoW);
            alert(videoH);
            alert($(window).width() - 50);
            alert($(window).height() - 100);
            if (videoH > $(window).height() - 100) {
                newVideoH = $(window).height() - 100;
                newVideoW = newVideoH * videoW / videoH;
            } else if (videoW > $(window).width() - 50) {
                newVideoW = $(window).width() - 50;
                newVideoH = newVideoW * videoH / videoW;
            }
            $('._video_').css({
                "width": newVideoW + "px",
                "height": newVideoH + "px"
            });
        };
        video.src = $('._video_').attr('src');
    }
};
/**
 * Created by naxiaoguang on 2017/1/15.
 */
function BookAudioController(options) {
    this.device = options.device;
    this.MOUSE_CLICK = this.device == config.DEVICE_PC ? 'click' : 'touchstart';
    this.last_key = null;
    this.last_type = null;
    this.current_key = null;
    this.current_type = null;
    this.reset_music_key = {};
    this.reset_record_key = {};
}
BookAudioController.prototype.stopBykey = function (key, type) {
    var self = this;
    var node_list = null;
    if (key === null) return;
    if (type === "music") {
        node_list = $('.book-container .shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_play_btn');
        if (node_list.length === 0) {
            self.reset_music_key[key] = 1;
        } else {
            node_list.attr('src', "https://static.shiqichuban.com/assets/img/shiqi_music_play_btn.png");
            $('.book-container').find('.shiqi_music_wrapper[key=' + key + ']').find(".shiqi_music_animal").hide();
            if (self.reset_music_key[key])
                delete self.reset_music_key[key];
        }
    } else if (type === "record") {
        node_list = $('.shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_play_btn');
        if (node_list.length === 0) {
            self.reset_record_key[key] = 1;
        } else {
            node_list.attr('src', "https://static.shiqichuban.com/assets/img/shiqi_music_play_btn.png");
            $('.book-container').find('.shiqi_record_wrapper[key=' + key + ']').find(".shiqi_record_animal").hide();
            if (self.reset_record_key[key])
                delete self.reset_record_key[key];
        }
    }
};
BookAudioController.prototype.playBykey = function (key, type) {
    if (type === "music") {
        $(".book-container").find('.shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_play_btn').attr('src', "https://static.shiqichuban.com/assets/img/shiqi_music_stop_btn.png");
        $(".book-container").find('.shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_animal').show();
    } else if (type === "record") {
        $(".book-container").find('.shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_play_btn').attr('src', "https://static.shiqichuban.com/assets/img/shiqi_music_stop_btn.png");
        $(".book-container").find('.shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_animal').show();
    }
};
BookAudioController.prototype.changeAudioStyle = function (callback) {
    var self = this;
    if (self.last_key === null || (self.last_key && self.last_key !== self.current_key)) {
        if (self.last_key)
            self.stopBykey(self.last_key, self.last_type);
        self.last_key = self.current_key;
        self.last_type = self.current_type;
        self.playBykey(self.current_key, self.current_type);
        if (callback) {
            //app调用
            callback({
                action: "changeAudioBtnStatus",
                value: {
                    status: "play"
                }
            });
        } else {
            noticeJsonToApp(JSON.stringify({
                action: "changeAudioBtnStatus",
                value: {
                    status: "play"
                }
            }))
        }
    } else if (self.last_key && self.last_key === self.current_key) {
        self.stopBykey(self.last_key, self.last_type);
        self.last_key = null;
        self.last_type = null;
        if (callback) {
            //app调用
            callback({
                action: "changeAudioBtnStatus",
                value: {
                    status: "stop"
                }
            })
        } else {
            noticeJsonToApp(JSON.stringify({
                action: "changeAudioBtnStatus",
                value: {
                    status: "stop"
                }
            }))
        }
    } else {
    }
};
BookAudioController.prototype.jsonData = function (source_url, key, type) {
    var bridgeObj = {};
    bridgeObj.action = "clickMedia";
    bridgeObj.value = {
        mediaUrl: source_url,
        type: 2,
        key: key,
        media_type: type
    };
    return bridgeObj;
};
BookAudioController.prototype.stopMusic = function(){
    var self = this ;
    var music = $(document).find('#ebook_music').get(0);
    music.pause();
    if(self.current_key)
        self.stopBykey(self.current_key,self.current_type);
};
BookAudioController.prototype.playMusic = function(){
    var self = this ;
    var music = $(document).find('#ebook_music').get(0);
    music.play();
    if(self.current_key)
        self.playBykey(self.current_key,self.current_type);
};
/**
 * 添加视频图片的点击事件，返回video_url
 * @param callback
 */
BookAudioController.prototype.addAudioClick = function (callback) {
    var self = this;
    if (self.device !== config.DEVICE_APP) {
        var self = this ;
        if($(document).find('.ebook_msc_soure').length === 0 ){
            var audio_html = '<div class="ebook_msc_soure" style="display:none;">'
                + '<audio id="ebook_music" src="">你的浏览器不支持audio标签</audio>'
                + '</div>';
            $(document.body).append(audio_html);
        }
        $(document).on(MOUSE_CLICK, '.book-container .shiqi_music_wrapper', function (e) {
            e.stopPropagation();
            clickHandler(this,e,"music");
        }).on(MOUSE_CLICK, '.book-container .shiqi_record_wrapper', function (e) {
            e.stopPropagation();
            clickHandler(this,e,"record");
        });
        function clickHandler(target,e,type){
            var _left = null ;
            var _top = null ;
            var _width = null;
            var _height = null ;
            if(type === "music"){
                _left = $(target).find('.shiqi_music_play_btn').offset().left;
                _top = $(target).find('.shiqi_music_play_btn').offset().top;
                //元素节点本身的大小
                _width = $(target).find('.shiqi_music_play_btn').width();
                _height = $(target).find('.shiqi_music_play_btn').height();
            }else if(type === "record"){
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
            var s_left =  $(document).scrollLeft();
            var s_top = $(document).scrollTop();
            if (_left < e_left && e_left - (_left - s_left) <= _width && e_top - _top - s_top <= _height) {
                var music = $(document).find('#ebook_music').get(0);
                if($(target).attr('key') === self.current_key){
                    if(music.paused){
                        music.play();
                        self.playBykey($(target).attr('key'),self.current_type);
                        if(callback)
                            callback("play")
                    }else{
                        music.pause();
                        self.stopBykey($(target).attr('key'),self.current_type);
                        if(callback)
                            callback("stop")
                    }
                }else{
                    if(self.current_key !== null)
                        self.stopBykey(self.current_key,self.current_type);
                    self.current_key = $(target).attr('key');
                    self.current_type = type ;
                    self.playBykey(self.current_key,self.current_type);
                    if(type === "music"){
                        music.setAttribute('src', $(target).attr('music_url'));
                    }else if(type === "record"){
                        music.setAttribute('src', $(target).attr('record_url'));
                    }
                    music.play();
                    if(callback)
                        callback("play")
                }
            }
        }
    } else {
        $(document).on(self.MOUSE_CLICK, '.shiqi_music_wrapper', function (e) {
            e.stopPropagation();
            e.preventDefault();
            self.current_key = $(this).attr('key');
            self.current_type = "music";
            self.changeAudioStyle();
            callback(self.jsonData($(this).attr('music_url'), self.current_key, self.current_type));
        }).on(self.MOUSE_CLICK, '.shiqi_record_wrapper', function (e) {
            e.stopPropagation();
            e.preventDefault();
            self.current_key = $(this).attr('key');
            self.current_type = "record";
            self.changeAudioStyle();
            callback(self.jsonData($(this).attr('record_url'), self.current_key, self.current_type));
        })
    }
};
BookAudioController.prototype.flipPage = function () {
    var self = this;
    if (jQuery.isEmptyObject(self.reset_music_key)) {
    } else {
        for (var i in self.reset_music_key) {
            self.stopBykey(i, "music")
        }
    }
    if (jQuery.isEmptyObject(self.reset_record_key)) {
    } else {
        for (var i in self.reset_record_key) {
            self.stopBykey(i, "record")
        }
    }
};