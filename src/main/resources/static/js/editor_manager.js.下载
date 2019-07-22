/**
 * Created by naxiaoguang on 2016/12/30.
 */
function EditorManager(kindEditor, dataController, fileController, imgController) {

    this.ke = kindEditor;
    this._self = this;
    this.select_weather = '';
    this._dataController = dataController;
    this._fileController = fileController;
    this._imgController = imgController;
    this._fileUploader = new FileUploader()

    this._current_edit_base64_image = null;
    this._current_edit_upload_imageId = null;

    this._play_btn_url = "https://static.shiqichuban.com/assets/img/shiqi_music_play_btn.png";
    this._stop_btn_url = "https://static.shiqichuban.com/assets/img/shiqi_music_stop_btn.png";
    this._cur_music_key = null;
    this._cur_music_type = null;

    this.myFrame = null;
    this.frameWindow = null;
    this.frameBody = null;
    //文件数量限制,音频与视频时长 -1=没有限制
    this.limit_image_num = -1;
    this.limit_audio_num = -1;
    this.limit_audioDuration = -1;
    this.limit_video_num = -1;
    this.limit_videoDuration = -1;
    this.limit_enable = false;
}

EditorManager.prototype.setLimit = function (img_num, audio_num, audioDuration, video_num, videoDuration) {
    this.limit_enable = true;
    this.limit_image_num = img_num;
    this.limit_audio_num = audio_num;
    this.limit_audioDuration = audioDuration;
    this.limit_video_num = video_num;
    this.limit_videoDuration = videoDuration;
};

EditorManager.prototype.checkoutOutLimit = function (items, cb) {
    var self = this;
    var img_len = 0;
    var video_len = 0;
    var video_out_dur = 0;

    for (var index in items) {
        (function (i) {
            var type = items[i].type;
            if (type === "video") {
                video_len++;
                if (self.checkOutOfVideoDurationLimit(items[i]["video_duration"]) === true)
                    video_out_dur++;
            }
            else
                img_len++;
        })(index)
    }

    if (self.checkOutOfImgLimit(img_len) === true) {
        cb("img");
    } else if (self.checkOutOfVideoLimit(video_len) === true) {
        cb("video");
    } else if (video_out_dur > 0) {
        cb("video_dur");
    } else {
        cb();
    }
};

EditorManager.prototype.checkOutOfImgLimit = function (sub_num) {
    var self = this;
    if (!sub_num)
        sub_num = 0;
    if (self.limit_enable === true && (self.getFrameDocument().find('.shiqi_image').length + sub_num) > self.limit_image_num)
        return true;
    return false;
};

EditorManager.prototype.checkOutOfVideoLimit = function (sub_num) {
    var self = this;
    if (!sub_num)
        sub_num = 0;
    if (self.limit_enable === true && (self.getFrameDocument().find('.shiqi_video').length + sub_num) > self.limit_video_num)
        return true;
    return false;
};

EditorManager.prototype.checkOutOfAudioLimit = function (sub_num) {
    var self = this;
    if (self.limit_enable === false)
        return false;
    if (!sub_num)
        sub_num = 0;
    var audio_length = self.getFrameDocument().find('.shiqi_music').length;
    var record_length = self.getFrameDocument().find('.shiqi_record').length;
    if (self.limit_audio_num > -1 && record_length + audio_length + sub_num > self.limit_audio_num)
        return true;
    return false;
};

EditorManager.prototype.checkOutOfVideoDurationLimit = function (duration) {
    var self = this;
    if (self.limit_videoDuration > -1 && duration > self.limit_videoDuration)
        return true;
    return false;
};

EditorManager.prototype.setFontStyle = function () {
    var self = this;
    $(self.getFrameDocument().find("head")[0]).append("<link rel=\"stylesheet\" href=\"https://static.shiqichuban.com/assets/css/font.css?t=1545187458\"/>");
};

EditorManager.prototype.getMyFrame = function () {
    var self = this;
    if (self.myFrame === null)
        self.myFrame = document.getElementsByClassName("ke-edit-iframe")[0];
    return self.myFrame;
};

EditorManager.prototype.getFrameDocument = function () {
    var self = this;
    if (self.frameWindow === null)
        self.frameWindow = $(self.getMyFrame().contentWindow.document);
    return self.frameWindow;
};

EditorManager.prototype.getFrameDocumentBody = function () {
    var self = this;
    if (self.frameBody === null)
        self.frameBody = $(self.getMyFrame().contentWindow.document.body);
    return self.frameBody;
};

EditorManager.prototype.setContent = function (content) {
    var self = this;
    if (self._cur_music_key) {
        self.stopBykey(self._cur_music_key, self._cur_music_type);
        self._cur_music_key = null;
        self._cur_music_type = null;
    }
   
    self.ke.editor.html(content);
    
    self.formatContent();
    self.addVideoPlayBtnToContent();
    self.addImageEditBtnToContent();
    self.setEditorAudioClickEvent();

};
EditorManager.prototype.setMusicStyle = function () {
    var self = this;

    self.getFrameDocument().find('.shiqi_music_name').css({
        'moz-user-select': '-moz-none',
        '-moz-user-select': 'none',
        '-o-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
        'text-align': 'left',
    });
    self.getFrameDocument().find('.shiqi_music_author').css({
        'moz-user-select': '-moz-none',
        '-moz-user-select': 'none',
        '-o-user-select': 'none',
        '-khtml-user-select': 'none',
        '-webkit-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
        'text-align': 'left',
    });
};
EditorManager.prototype.afterChange = function () {
    var self = this;
    self.getFrameDocument().find('.image_edit_tip').remove();
    if (self._cur_music_key !== null && self.checkHasLayoutBykey(self._cur_music_key) === false) {
        self.stopMusic();
    }
};

EditorManager.prototype.addVideoPlayBtnToContent = function () {
    var self = this;
    $(".ke-edit-iframe").contents().find('img[class *= shiqi_video]').each(function (index, value) {
        var video_url = $(this).attr('video_url');
        $(this).parent().append(self.getVideoPlayButton(video_url)).css('position', 'relative');
    });
};

EditorManager.prototype.addImageEditBtnToContent = function () {

};

/**
 * 获取最终用于文章保存的数据
 */
EditorManager.prototype.getFormatContent = function(){
    var self = this;
    self.getFrameDocument().find('.image_edit_tip').remove();
    self.getFrameDocument().find('.drag_area_mask').remove();
    self.getFrameDocument().find('.shiqi_video_container').each(function (index, value) {
        if ($(value).find('.shiqi_video').length === 0) {
            $(value).remove();
        }
    });
    self.getFrameDocument().find('font').each(function (index, value) {
        $(value).replaceWith(function () {
            var font = $(value).attr("face");
            var color = $(value).attr("color");
            return $('<span/>', {
                html: this.innerHTML,
                style: 'font-family:' + font + ";" + 'color:' + color,
            });
        })
    });

    self.getFrameDocument().find('.shiqi_music_wrapper').each(function (index, value) {
        if($(value).prev('p').html() === "<br/>" || $(value).prev('p').html() === "<br>"){
            $(value).prev('p').remove();
        }
        if($(value).next('p').html() === "<br/>" || $(value).next('p').html() === "<br>"){
            $(value).next('p').remove();
        }

        if ($(value).prev('br').length === 0)
            $('<br/>').insertBefore($(value));
        if ($(value).next('br').length === 0)
            $('<br/>').insertAfter($(value));

        $(value).find('.shiqi_music_animal').hide();
        $(value).find('.shiqi_music_play_btn').attr('src', self._play_btn_url);
    });

    self.getFrameDocument().find('.shiqi_record_wrapper').each(function (index, value) {
        if($(value).prev('p').html() === "<br/>" || $(value).prev('p').html() === "<br>"){
            $(value).prev('p').remove();
        }
        if($(value).next('p').html() === "<br/>" || $(value).next('p').html() === "<br>"){
            $(value).next('p').remove();
        }

        if ($(value).prev('br').length === 0)
            $('<br/>').insertBefore($(value));
        if ($(value).next('br').length === 0)
            $('<br/>').insertAfter($(value));

        $(value).find('.shiqi_record_animal').hide();
        $(value).find('.shiqi_record_play_btn').attr('src', self._play_btn_url);
    });

    var content = self.getFrameDocument().find(".ke-content").html();
    return content.replace(/&quot;/g,"'");
};

EditorManager.prototype.getContent = function () {

    var content = this.ke.editor.html();
    return content;
};

EditorManager.prototype.showStatus = function (msg, color) {

    $('.ke-status-notice').text(msg);
    $('.ke-status-notice').css('color', color);
};

EditorManager.prototype.clear = function () {
    $('#thumb_preview').children().remove();
    $('#title-input').val('');
    this.showStatus('', 'black');
    this.ke.editor.html('');
};

/**
 * 服务
 * @param file
 * @param callback
 */


EditorManager.prototype.addWeatherTool = function (weather_tags) {

    var tag = '';

    for (var index in weather_tags) {

        tag += '<option value="' + weather_tags[index] + '">' + weather_tags[index] + '</option>'
    }

    this._self.select_weather = weather_tags[0];

    var layout =
        '<div class="ke-outline-weather col-xs-2 col-sm-1 col-md-1" style="float:right;margin-top: 5px;text-align: right">' +
        '<select class="ke-weather-select" style="border:none;outline:none;border-radius: 5px;padding: 5px 5px 5px;line-height: 20px;background-color: transparent;">' +
        tag +
        '</select>' +
        '</div>';

    $('.ke-toolbar').append(layout);

    $('.ke-weather-select').change(function (e) {

        this._self.select_weather = $(this).children('option:selected').val();

    });
};

EditorManager.prototype.addDateTimePicker = function (dateTime) {

    var changeData = false;
    var interval;
    var self = this;
    var current_time;
    if (dateTime)
        current_time = dateTime.split(' ').join('');

    $('.form_datetime').datetimepicker({
        // language:  'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        minView: 0,
        format: 'yyyy-mm-dd HH:ii',
        startShowCallBack: function () {
            clearInterval(interval);
        },

        hideModelCallBack: function () {
            if (!changeData) {
                interval = setInterval(self.ke.setTimeDate, 1000)
            }
        }

    }).on('changeDate', function (ev) {

        changeData = true;

        var val = $('.form_datetime').datetimepicker('getFormattedDate');

        self._self.setTimeDate(val);

    });

    if (dateTime) {
        $('.form_datetime').val(current_time);
        $('.ke-date-input').val(current_time);
        $('.ke-date-input').attr('_time',current_time);
    } else {
        interval = setInterval(self._self.setTimeDate, 1000);
    }
};

EditorManager.prototype.setTimeDate = function (val) {

    if (!val)

        val = getCurrentDate(true);

    $('.ke-date-input').val(val);
    //$('.ke-date-input').val(val);
    $('.form_datetime').datetimepicker('update');

};

EditorManager.prototype.insertImage = function (editor, callback) {

    var self = this;

    var setTimeOutNum = setTimeout(function () {
        $('#thumb_preview').find('img[upload_image_id]').each(function (index, image) {
            (function (i) {
                var id = $(image).attr('upload_image_id');
                var url = $(image).attr('upload_src');
                var video_url = $(image).attr('video_url');
                if (video_url) {
                    editor.exec('insert_sq_video_image', url, id, video_url);
                    $($(".ke-edit-iframe").contents().find('img[class *= shiqi_video][ke_image_id=' + id + ']').get(0)).parent().append(self.getVideoPlayButton(video_url));
                } else {
                    editor.exec('insert_sq_image', url, id);
                }

                var myFrame = document.getElementsByClassName("ke-edit-iframe")[0];
                self.placeCaretAtEnd(myFrame.contentWindow.document.body);

                if ($('#thumb_preview').children().length - 1 === i) {
                    clearTimeout(setTimeOutNum);
                    callback();
                }
            })(index);
        });
    }, 500);
};

EditorManager.prototype.getVideoPlayButton = function (video_url) {
    return '<button video_url="' + video_url + '" class="ke_video_play_btn" style="position:absolute;top:50%;left:50%;margin-left:-80px ;margin-top:-80px;width:160px;height:160px;cursor:pointer;opacity: 0" ></button>';
};

EditorManager.prototype.enableVideoImagePlay = function () {

    var self = this;
    self.getFrameDocument().on('click', '.ke_video_play_btn', function () {
        var html =
            "<div class='video_bg' style='position:fixed;z-index: 999999;left:0;top:0;width: " + $(window).width() + "px;height:" + $(window).height() + "px;text-align: center;background-color: rgba(0,0,0,0.6)'>" +
            "   <video class='video' preload='auto' controls='true' style='margin-top:30px;max-width:100%;max-height: 600px ' src='" + $(this).attr('video_url') + "'></video>" +
            "</div>";

        $(document.body).append(html);
    });

    $(document).on('click', '.video_bg', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.target.className === "video_bg")
            $(this).remove();
    })
};


EditorManager.prototype.enableImageEdit = function () {
    var self = this;
    //编辑器
    self.getFrameDocument().on((detectPlatform() === DEVICE_MOBILE ? config.MOUSE_LEAVE : config.MOUSE_CLICK), '.shiqi_image', function (e) {
        if (detectPlatform() === DEVICE_MOBILE && self.isScrolling === true) {
            var timerNUm = setTimeout(function () {
                clearTimeout(timerNUm);
                self.isScrolling = false;
            }, 400);
        } else {
            e.stopPropagation();
            self._current_edit_base64_image = $(this).attr('src');

            self._current_edit_upload_imageId = $(this).attr('ke_image_id')||self.createKeImagemageId(this);
            self._edit_type_image = "shiqi_image";
            self._imgController.setData({
                images: [{
                    image_id: self._current_edit_upload_imageId,
                    url: self._current_edit_base64_image
                }]
            });
            self._imgController.show(self.editCallback.bind(self));
        }
    });

    if (detectPlatform() === DEVICE_PC) {
        self.getFrameDocument().on(config.MOUSE_ENTER, '.shiqi_image', function (e) {
            self.getFrameDocumentBody().append('<img class="image_edit_tip" src="' + STATIC_DOMAIN + '/assets/img/icon_24.png" style="position:absolute;width:60px">');
        }).on(config.MOUSE_LEAVE, '.shiqi_image', function (e) {
            self.getFrameDocument().find('.image_edit_tip').remove();
        });

        self.getFrameDocument().on(config.MOUSE_MOVE, function (e) {
            self.getFrameDocument().find('.image_edit_tip').css('top', (e.pageY + 5) + 'px');
            self.getFrameDocument().find('.image_edit_tip').css('left', (e.pageX + 5) + 'px');
        });
    }

    $(document).on(config.MOUSE_CLICK, '.upload-thumb[type=image]', function (e) {
        e.stopPropagation();
        self._current_edit_base64_image = $(this).find('img[upload_image_id]').attr('upload_src');
        self._current_edit_upload_imageId = $(this).find('img[upload_image_id]').attr('upload_image_id');
        self._edit_type_image = "upload-thumb";

        self._imgController.setData({
            images: [{
                image_id: self._current_edit_upload_imageId,
                url: self._current_edit_base64_image
            }]
        });
        self._imgController.show(self.editCallback.bind(self));
    });
};


EditorManager.prototype.editCallback = function (result_base64_image) {
    var self = this;
    if (self._imgController) {
        self._imgController.hide();
        self._imgController.destroy();
    }

    if (self._edit_type_image === "upload-thumb")
        $('img[upload_image_id=' + self._current_edit_upload_imageId + ']').attr('upload_src', result_base64_image);
    else {
        var myFrame = document.getElementsByClassName("ke-edit-iframe")[0];
       var w= self.getFrameDocument().find('.shiqi_image[ke_image_id=' + self._current_edit_upload_imageId + ']').length;
        self.getFrameDocument().find('.shiqi_image[ke_image_id=' + self._current_edit_upload_imageId + ']').attr('src', result_base64_image);
    }
    self._current_edit_base64_image = null;
    self._current_edit_upload_imageId = null;
};

EditorManager.prototype.doImageUpload = function (content, callback) {
    var self = this;
    var selector = 'img[class*=shiqi][ke_image_id]';
    var image_length = content.find(selector).length;
    var image_num = 0;

    if (image_length > 0) {
        content.find(selector).each(function (index, value) {
            if ($(value).attr('src').indexOf('data:image/') > -1) {
                var base64_url = $(value).attr('src').split(',');
                var img_data = base64_url[1];
                var file_type = base64_url[0].split(';')[0].split('/')[1];
                var image_id = $(value).attr('ke_image_id');
                var blob = toBlob(img_data, file_type);

                self._fileController.createFileMD5(blob, function (content_md5) {
                    self._dataController.uploadImageToResServer(image_id, blob, content_md5, file_type, function (_image_id, data) {
                        image_num++;
                        var result = JSON.parse(data);
                        $(".ke-edit-iframe").contents().find('img[class*=shiqi][ke_image_id=' + _image_id + ']').attr('src', result.url).removeAttr('ke_image_id');
                        self.showStatus('图片上传(' + image_num + "/" + image_length + '),请稍等...');
                        if (image_num == image_length) {
                            $(".ke-edit-iframe").contents().find('button').remove();
                            callback();
                        }
                    }, function (XMLHttpRequest, textStatus, errorThrown, image_id) {
                        console.log('文件上传失败！' + image_id);
                        image_num++;
                        $(".ke-edit-iframe").contents().find('img[class*=shiqi][ke_image_id=' + image_id + ']').remove();
                        if (image_num == image_length) {
                            $(".ke-edit-iframe").contents().find('button').remove();
                            callback();
                        }
                    });
                });
            } else {
                image_num++;
                if (image_num == image_length) {
                    $(".ke-edit-iframe").contents().find('button').remove();
                    callback();
                }
            }
        });
    } else {
        callback();
    }

};

EditorManager.prototype.doVideoUpload = function (content, callback) {

    var self = this;
    var selector = 'img[class =shiqi_video][ke_image_id][video_url]';
    var video_length = content.find(selector).length;
    var video_num = 0;

    if (video_length > 0) {
        content.find(selector).each(function (index, value) {
            var video_url = $(this).attr('video_url');
            if (video_url.indexOf('blob:https://') > -1) {
                var image_id = $(value).attr('ke_image_id');
                var file = self._fileController.getVideoFileDataByID(image_id);
                self._fileController.createFileMD5(file, function (content_md5) {
                    var options={
                        type : "video",
                        file : file,
                        url:video_url,
                        callback : function(contentMD5,url, remoteURL){
                            replaceVideoURL(remoteURL,image_id)
                        } ,
                        errorCallback :function(){
                            replaceVideoURL(null,null)
                        } ,
                    }
                    self._fileUploader.upload(options,content_md5)
                });
            } else {
                replaceVideoURL(null, null);
            }
        });
    } else {
        callback();
    }

    function sliceVideoUpload(image_id, file, file_type, ctime, gmtDate,content_md5, position, callback, errCallback) {
        var perSize = 250 * 1024 * 1024;
        var sliceBlob = null;
        if (file.size > perSize) {
            var endPos = (position + perSize) >= file.size ? file.size : (position + perSize) ;
            sliceBlob = file.slice(position,endPos,file_type);
        } else {
            sliceBlob = file ;
        }
        self._dataController.uploadVideoToResServer(image_id, sliceBlob, position, ctime, gmtDate,content_md5, file_type, function (_image_id, data) {
            var result = JSON.parse(data);
            if (parseInt(result.position) >= file.size) {
                callback(result.url, _image_id);
            } else {
                sliceVideoUpload(image_id, file, file_type, ctime, gmtDate,content_md5,result.position, callback, errCallback)
            }
        }, function (_image_id, XMLHttpRequest, textStatus, errorThrown) {
            //文件已经传过了
            if (XMLHttpRequest.status === 409) {
                var responseText = JSON.parse(XMLHttpRequest.responseText);
                callback(responseText.url, _image_id);
            } else {
                errCallback()
            }
        });
    }

    function replaceVideoURL(url, _image_id) {
        video_num++;
        self.showStatus('视频上传(' + video_num + "/" + video_length + '),请稍等...');

        if (url && _image_id)
            $(".ke-edit-iframe").contents().find('.shiqi_video[ke_image_id=' + _image_id + '][video_url]').attr('video_url', url);
        if (video_num == video_length) {
            callback();
        }
    }
};

EditorManager.prototype.setCSSStyle = function () {
    $(".ke-edit-iframe").contents().find('.shiqi_music').css({
        "box-shadow": "0 0 10px #ccc",
        "border-bottom": '',
    });
};


EditorManager.prototype.scaleForAll = function (_width) {
    var self = this;
    var width = _width || self.getFrameDocument().find('.ke-content').width();
    var scale = width / 700 > 1 ? 1 : width / 700;
    $(".ke-edit-iframe").contents().find('.shiqi_music').css({
        "transform": 'scale(' + scale + ',' + scale + ')',
        "transform-origin": "0 0 0",
    });

    $(".ke-edit-iframe").contents().find('.shiqi_record').css({
        "transform": 'scale(' + scale + ',' + scale + ')',
        "transform-origin": "0 0 0",
    });

    $(".ke-edit-iframe").contents().find('.shiqi_music_wrapper').css("height", 120 * scale + 'px');
    $(".ke-edit-iframe").contents().find('.shiqi_record_wrapper').css("height", 120 * scale + 'px');
};


EditorManager.prototype.formatContent = function () {
    var self = this;
     $(".ke-edit-iframe").css('height','100%');
     $('.ke-edit-textarea').css('height','100%');
    $(".ke-edit-iframe").contents().find('br').each(function (index, value) {
        if ($(value).parent("p").length === 0 && $(value).parent("div[class*=paragraph_]").length === 0)
            $(value).wrap("<p></p>");
    });
    $(".ke-edit-iframe").contents().find('.shiqi_music_wrapper').attr('contenteditable', "false");
    $(".ke-edit-iframe").contents().find('p').css('font-family','"Courier New", 宋体');
    var arr=$(".ke-edit-iframe").contents().find('p');
    var len=$(".ke-edit-iframe").contents().find('p').length;
    if($(arr).eq(len-1).html()==''){
        $(".ke-edit-iframe").contents().find('p').eq(len-1).html('<br/>')
    }
    
    $(".ke-edit-iframe").contents().find('.ubook_content_image').each(function (index, value) {
        $(value).attr("class","shiqi_image") ;
    })
    
    self.setMusicStyle();
    //微信书图片编辑处理
    $(".ke-edit-iframe").contents().find('img[image_id]').each(function (index, value) {
        if ($(value).hasClass("shiqi_image")) {
        } else {
            if ($(value).hasClass("shiqi_video")) {
            } else {
                $(value).addClass("shiqi_image");
            }
        }
    });
};

EditorManager.prototype.stopMusic = function () {
    var self = this;
    if (self._cur_music_key !== null) {
        var music = $(document).find('#editor_music').get(0);
        music.pause();
        self.stopBykey(self._cur_music_key, self._cur_music_type);
        self._cur_music_key = null;
        self._cur_music_type = null;
    }
};

EditorManager.prototype.placeCaretAtEnd = function (el) {
    el.focus();
    var myFrame = document.getElementsByClassName("ke-edit-iframe")[0];
    if (typeof myFrame.contentWindow.getSelection != "undefined"
        && typeof myFrame.contentWindow.document.createRange != "undefined") {
        var range = myFrame.contentWindow.document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = myFrame.contentWindow.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof myFrame.contentWindow.document.body.createTextRange != "undefined") {
        var textRange = myFrame.contentWindow.document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
};

EditorManager.prototype.setEditorAudioClickEvent = function (callback) {
    var self = this;
    var myFrame = document.getElementsByClassName("ke-edit-iframe")[0];
    if ($(document).find('.editor_msc_soure').length === 0) {
        var audio_html = '<div class="editor_msc_soure" style="display:none;">'
            + '<audio id="editor_music" src="">你的浏览器不支持audio标签</audio>'
            + '</div>';
        $(document.body).append(audio_html);

        self.getFrameDocument().on(MOUSE_CLICK, '.shiqi_music_wrapper', function (e) {
            e.stopPropagation();
            clickHandler(this, e, "music");
            // self.ke.editor.exec('setcarsetposition');
            self.placeCaretAtEnd(myFrame.contentWindow.document.body);
        }).on(MOUSE_CLICK, '.shiqi_record_wrapper', function (e) {
            e.stopPropagation();
            clickHandler(this, e, "record");
            // self.ke.editor.exec('setcarsetposition');
            self.placeCaretAtEnd(myFrame.contentWindow.document.body);
        });
    }


    function clickHandler(target, e, type) {
        var selector = ".shiqi_" + type + '_play_btn';
        var _left = $(target).find(selector).offset().left;
        var _top = $(target).find(selector).offset().top;
        var _width = $(target).find(selector).width();
        var _height = $(target).find(selector).height();

        //鼠标或者触屏的节点的坐标
        var e_left = e.clientX || e.originalEvent.touches[0].clientX;
        var e_top = e.clientY || e.originalEvent.touches[0].clientY;

        //文档滚动的距离
        var s_left = self.getFrameDocument().scrollLeft();
        var s_top = self.getFrameDocument().scrollTop();

        if (e_left > _left && e_left - (_left - s_left) <= _width && e_top - _top - s_top <= _height) {
            var music = $(document).find('#editor_music').get(0);
            if ($(target).attr('key') === self._cur_music_key) {
                if (music.paused) {
                    music.play();
                    self.playBykey($(target).attr('key'), self._cur_music_type);
                    if (callback)
                        callback("play");
                } else {
                    music.pause();
                    self.stopBykey($(target).attr('key'), self._cur_music_type);
                    self._cur_music_key = null;
                    self._cur_music_type = null;

                    if (callback)
                        callback("stop");
                }
            } else {
                if (self._cur_music_key != null)
                    self.stopBykey(self._cur_music_key, self._cur_music_type);

                self._cur_music_key = $(target).attr('key');
                self._cur_music_type = type;
                self.playBykey(self._cur_music_key, self._cur_music_type);
                music.setAttribute('src', $(target).attr('music_url'));
                music.play();
                if (callback)
                    callback("play");
            }
        }
    }
};

EditorManager.prototype.stopBykey = function (key, type) {
    var self = this;
    if (type === "music") {
        self.getFrameDocument().find('.shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_play_btn').attr('src', self._play_btn_url);
        self.getFrameDocument().find('.shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_animal').hide();
    } else if (type === "record") {
        self.getFrameDocument().find('.shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_play_btn').attr('src', self._play_btn_url);
        self.getFrameDocument().find('.shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_animal').hide();
    }
    key = null;
    type = null;
};

EditorManager.prototype.playBykey = function (key, type) {
    var self = this;
    if (type === "music") {
        self.getFrameDocument().find('.shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_play_btn').attr('src', self._stop_btn_url);
        self.getFrameDocument().find('.shiqi_music_wrapper[key=' + key + ']').find('.shiqi_music_animal').show();
    } else if (type === "record") {
        self.getFrameDocument().find('.shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_play_btn').attr('src', self._stop_btn_url);
        self.getFrameDocument().find('.shiqi_record_wrapper[key=' + key + ']').find('.shiqi_record_animal').show();
    }
};

EditorManager.prototype.checkHasLayoutBykey = function (key) {
    var self = this;
    var length = self.getFrameDocument().find('.shiqi_music_wrapper[key=' + key + ']').length;
    if (length > 0)
        return true;
    return false;
};

EditorManager.prototype.checkContent = function (callback, err_callback) {
    var self = this;
    var content = self.getContent();
    content = content.replace(/" "/g, "");//去掉br标签
    if (content.trim().length === 0) {
        showConfirm('请输入文章内容', null, null, null, null, 'ok');
        showLoading('', false);
        if (err_callback)
            err_callback()
    } else {
        callback(content);
    }
};

EditorManager.prototype.hasContent = function () {
    var self = this;
    var content = self.getContent();
    if (content.trim().length === 0)
        return false;
    return true;
};
EditorManager.prototype.createKeImagemageId = function(el){
    var self = this;
   var ke_image_id= 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    $(el).attr('ke_image_id',ke_image_id);

    return ke_image_id;


};
EditorManager.prototype.setTitleChangeEvent = function(){
    var title_len = 20;//可输入标题的长度
    var cpLock = false;
    var maxLen = title_len;
    $('#title-input').off().on({
        compositionstart: function () {//中文输入开始
            cpLock = true;
        },
        compositionend: function () {//中文输入结束
            var $this = $(this), _val = $this.val();
            cpLock = false;
            $this.val(subString(_val, maxLen));
        },
        keydown: function(e) {
            if (e.keyCode === 13) {
                if (!maxLen) return true;
                if ($(e.target).val().match(/[\r\n]/g) && $(e.target).val().match(/[\r\n]/g).length == maxLen - 1) return false;
            }
        },
        input: function () {
            var $this = $(this), _val = $this.val();
            if (cpLock) {
                $this.val(_val);
            } else {
                if (getTextareaLen(_val) > maxLen) {
                    console.log(getTextareaLen(_val))
                    $this.val(subString(_val, maxLen));
                }
            }
        }
    });

    function getTextareaLen(str) {
        if (str == null || str == "") return 0;
        var len = 0;
        var repEnter = /[\&]/;  //  & 符号
        str = str.replace(/[\r\n]/g , '&');
        var strAttr = str.split('');
        strAttr.forEach(function(val, key){
            if (isHalfCount(val)) {
                len += 0.5;
            } else if (repEnter.test(val) ){
                maxLen++;
            } else{
                len += 1;
            }
        });
        return len;
    }
    function subString(str, maxLen) {
        var strAttr = str.split('').slice(0,maxLen);
        var len = maxLen;
        strAttr.forEach(function(val) {
            if (isHalfCount(val)) {
                len += 1;
            }
        });
        return str.substring(0, len);
    }
    function isHalfCount(val) {
        var repOne = /[0-9a-zA-Z|\s]/;  // 字母数字
        var repSign = /[\x00-\xff]+/;
        var repspecialSign=/[~!@#$%^&*()/|,.<>?"'();:_+\-=\[\]{}]/;
        return repOne.test(val) || repSign.test(val)||repspecialSign.test(val);
    }
};
