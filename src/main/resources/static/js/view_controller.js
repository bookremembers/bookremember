/**
 * Created by naxiaoguang on 2016/12/30.
 */
function EditorViewController(type) {
    this.type = type;
    //  this.save_box=true;
    //  this.save_book=true;
    this.save_box = true;
    this.save_book = true;
}

/**
 * 生成大编辑器所需要的布局
 * @param tags
 * @returns {string}
 */
EditorViewController.prototype.getWriteEditorLayout = function (save_box, save_book) {
    var self = this;
    var title_len = 20;//可输入标题的长度
    self.save_box = save_box;
    self.save_book = save_book;

    var add_bookto = '<div id="add_book" style="position:relative;height:50px;width:100%;padding:0 15px;background:#fff;"><span class="books_title" style="display:inline-block;border-bottom: 2px dotted #ccc;width:100%;line-height: 50px;color:#666; height: 50px;font-size: 18px;cursor:pointer;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">添加至书册</span><span style="position:absolute;right:0;top:16px;text-align:right;margin-right:20px;width:10%"><img src="https://static.shiqichuban.com/assets/img/icon/add_bookto.icon.png"></span></div>';
    var ke_title = '<div id="ke-title" style="position:relative">'; //position:absolute;top:41px
    ke_title += '<input id="title-input" placeholder="点击输入标题" style="height:50px;"/>' +
        '<label id="title_notice" style="position:absolute;right:15px;bottom:5px;font-size: 12px;color:#ccc"></label>' +
        '</div>';

    var img_preview =
        '<div id="pic_preview" style="position:absolute;display:none;width:100%;top:30px">' +
        '<div class="col-xs-12" style="padding:5px;position:absolute;background-color: rgba(209,209,209,0.9)">' +
        '<div style="overflow: hidden;width:0;height:0">' +
        '<input id="file_input" type="file" multiple style="" accept="image/jpeg,image/jpg,image/png,video/mp4,video/*"/>' +
        '</div>' +
        '<div id="thumb_preview" class="col-xs-12" style="margin-bottom: 5px">' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<div class="updata_img_tips" style="float:left;color:#fc6b6b;font-size: 14px;">温馨提示：每次最多只能上传9个媒体文件哦~</div>' +
        '<div id="add_to_content_btn" class="sq_btn sq_btn_black" style="float:right">确定</div>' +
        '<div id="cancel_add_to_content_btn" class="sq_btn sq_btn_black" style="float:right;margin-right:5px">取消</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    var mask_layer = '<div class="mask" style="display:none;width:100%;height:100%;position:absolute;top:0;left:0;background-color: rgba(0,0,0,0.5)"></div>';
    var layout = "";
    layout += '<div class="container">';
    layout += '<div class="toolbar"></div>';
    if (this.type != "zone")
        layout += add_bookto;

    layout += ke_title;
    layout += img_preview;
    layout += '<div class="edit"></div>';
    layout += this.getTagContainer();
    layout += '<div class="statusbar">';
    layout += '</div>';
    layout += mask_layer;
    layout += '</div>';
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
    return layout;
};

EditorViewController.prototype.getMiniEditorLayout = function (save_box, save_book) {
    var self = this;
    var title_len = 20;//可输入标题的长度
    self.save_box = save_box;
    self.save_book = save_book;

    var ke_title = '<div id="ke-title" style="position:relative">'; //position:absolute;top:41px

    ke_title += '<input id="title-input" placeholder="输入标题,少于' + title_len + '个字" style="height:50px;"/>' +
        '<label id="title_notice" style="position:absolute;right:15px;bottom:5px;font-size: 12px;color:#ccc"></label>' +
        '</div>';

    var img_preview =
        '<div id="pic_preview" style="position:absolute;display:none;width:100%;top:30px">' +
        '<div class="col-xs-12" style="padding:5px;position:absolute;background-color: rgba(209,209,209,0.9)">' +
        '<div style="overflow: hidden;width:0;height:0">' +
        '<input id="file_input" type="file" multiple style="" accept="image/jpeg,image/jpg,image/png,video/mp4,video/*"/>' +
        '</div>' +
        '<div id="thumb_preview" class="col-xs-12" style="margin-bottom: 5px">' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<div class="updata_img_tips" style="float:left;color:#fc6b6b;font-size: 14px;">温馨提示：每次最多只能上传9个媒体文件哦~</div>' +
        '<div id="add_to_content_btn" class="sq_btn sq_btn_black" style="float:right">确定</div>' +
        '<div id="cancel_add_to_content_btn" class="sq_btn sq_btn_black" style="float:right;margin-right:5px">取消</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    var mask_layer = '<div class="mask" style="display:none;width:100%;height:100%;position:absolute;top:0;left:0;background-color: rgba(0,0,0,0.5)"></div>';
    var layout = "";
    layout += '<div class="container">';
    layout += '<div class="toolbar"></div>';
    layout += ke_title;
    layout += img_preview;
    layout += '<div class="edit"></div>';
    layout += '<div class="statusbar">';
    layout += '</div>';
    layout += mask_layer;
    layout += '</div>';
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
    return layout;
};
EditorViewController.prototype.getTagContainer = function () {

    var self = this;
    var tag_len = 14;//每一个标签的可输入长度

    var tagContainer;
    if (this.type != "zone") {
        tagContainer =
            '<div class="tag_container" id="tag_container">' +
            '<div class="h_tag" style="overflow: auto;padding:0 15px">' +
            '<div style="border-bottom: 1px dotted #ccc;border-top: 2px dotted #ccc;overflow: hidden">' +
            '<div class="selected_tag_container" style="float:left;margin-bottom: 5px;"></div>' +
            '<div>' +
            '<img src="' + STATIC_DOMAIN + "/assets/img/tag.png" + '" style="width: 15px;float:left;margin-top: 12px;margin-left:10px;"/>' +
            '<input class="input_tag" contenteditable="false" maxlength="' + tag_len + '" placeholder="输入文字,按回车键添加标签,小于' + tag_len + '个字符"' +
            ' style="float:left;width:50%;padding:10px 15px;outline: none;border:none"/>' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-12 tag_bar" style="height:60px;overflow-y: scroll ;">' +
            '<div class="col-xs-12 col-sm-1" style="text-align:left ;margin-top: 15px;">历史标签:</div>' +
            '<div class="col-xs-12 col-sm-10 tag_thumb_container" style="text-align: left;margin-bottom:10px;padding:0">' +
            '</div>' +
            '</div>' +
            '<div style="border-top:1px dotted #ccc ;clear: both;">' +
            '<div class="sq_btn sq_btn_black submit_btn" style="margin: 5px;float:right;">保存文章</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    } else {
        tagContainer =
            '<div class="tag_container">';
        tagContainer += "   <div style='text-align: right;border-top: 1px dotted #c8c8c8;padding:10px 0;'>";
        if (self.save_box == true || self.save_box == undefined) {
            tagContainer += "       <span class='sq_btn sq_btn_gray saveToBoxBtn'>保存到草稿箱</span>";
        }

        if (self.save_book == true || self.save_book == undefined) {
            tagContainer += "       <span class='sq_btn sq_btn_black saveToBookBtn' style='margin:10px 10px'>保存到本书</span>";
        }


        tagContainer += "   </div>";
        tagContainer += '</div>';
    }
    return tagContainer;
};

EditorViewController.prototype.createTags = function (tags) {

    var createTag = function (val, id) {

        return '<div id="ke_tag_' + id + '"class="sq_tag ke_history_tag " style="cursor: pointer;">' + val + '</div>';
    };

    var tags_sign = '';

    if (tags) {

        for (var i in tags) {
            tags_sign += createTag(tags[i], i);
        }
    }

    return tags_sign;
};

/**
 * 返回时间控件ui
 * @returns {string}
 */
EditorViewController.prototype.getDataTimePicker = function (show_border) {

    var border_css = "";
    if (show_border === true)
        border_css += "border:1px solid #ccc;border-radius:20px";
    var datetime_input =
        '<div class="ke-outline-time col-xs-6 col-xs-offset-4 col-sm-3 col-sm-offset-0" style="float:right;position:relative;' + border_css + '">' +
        '   <div class="input-group date form_datetime" style="width:87%;display: inline-block;position:absolute;padding-right:42px;right:0;" value="1979-09-16" data-date-format="yyyy-MM-dd HH:mm">' +
        '       <input class="ke-date-input" type="text" style="height: 24px;border: 0;background: transparent ;outline: none;text-align: right">' +
        '       <span class="input-group-addon" style="top:0;width:100%;opacity:0;position: absolute;z-index: 2"><span class="glyphicon glyphicon-th"></span></span>' +
        '   </div>' +
        '   <span style="color: #aaaaaa;cursor: pointer;position:absolute;right:15px;">▼</span>' +
        '</div>';

    return datetime_input;
};


EditorViewController.prototype.getMiniDataTimePicker = function (show_border) {

    var border_css = "";
    if (show_border === true)
        border_css += "border:1px solid #ccc;border-radius:20px";
    var datetime_input =
        '<div class="ke-outline-time col-xs-6 col-xs-offset-4 col-sm-3 col-sm-offset-0" style="float:right;position:relative;' + border_css + '">' +
        '<div class="input-group date form_datetime" style="width:100%" value="1979-09-16" data-date-format="yyyy-MM-dd HH:mm">' +
        '<input class="ke-date-input" type="text" style="height: 16px;border: 0;background: transparent ;outline: none;text-align: left">' +
        '<span class="input-group-addon" style="top:0;width:100%;opacity:0;position: absolute;z-index: 2"><span class="glyphicon glyphicon-th"></span></span>' +
        '</div>' +
        '</div>';

    return datetime_input;
};

EditorViewController.prototype.create_preview_thumb = function (base64_url, upload_base64_url, id, video_url) {

    var type = 'img';
    var img_tag = "";
    if (video_url != null) {
        img_tag += '<div class="upload-thumb" type="video" style="position:relative;width:100px;height:100px;float:left;margin-left:5px">';
    } else {
        img_tag += '<div class="upload-thumb" type="image" style="position:relative;width:100px;height:100px;float:left;margin-left:5px">';
    }

    if (video_url != null) {
        type = "video";
        img_tag +=
            '<img title="视频" alt="视频" style="max-width:100%;max-height:100%;border-radius:5px" video_url="' + video_url + '" upload_image_id="' + id + '" src="' + base64_url + '" upload_src="' + upload_base64_url + '" alt=""/>';
    } else {
        img_tag +=
            '<img title="点击编辑图片" alt="图片" style="max-width:100%;max-height:100%;border-radius:5px" upload_image_id="' + id + '" src="' + base64_url + '" upload_src="' + upload_base64_url + '" alt=""/>';
    }

    img_tag +=
        '<div class="remove_img_btn" style="cursor:pointer;text-align:center;top:-5px;right:-5px;width: 20px;height:20px;background-color: white;border-radius: 10px;position:absolute">×</div>';
    if (type == "video") {
        img_tag += '<div class="remove_img_btn" style="cursor:pointer;text-align:center;bottom:0;width: 100%;line-height:12px;background-color: rgba(0,0,0,0.5);border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;position:absolute;font-size: 12px;"><img style="padding:3px 0;width:40px" src="' + STATIC_DOMAIN + '/assets/img/icon_05.png"/></div>';
    } else {
        img_tag += '<div class="remove_img_btn" style="cursor:pointer;text-align:center;bottom:0;width: 100%;line-height:12px;background-color: rgba(0,0,0,0.5);border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;position:absolute;font-size: 12px;"><img  style="padding:3px 0;width:40px" src="' + STATIC_DOMAIN + '/assets/img/icon_03.png"/></div>';
    }
    img_tag += '</div>';

    return img_tag;
};