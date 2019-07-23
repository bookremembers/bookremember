function PhotoUploadPlugin() {
    this.perMaxImageCount = 24;
    this.maxImageCount = this.perMaxImageCount;
    this.fileUploader = null;
    this.selectImageCount = 0;
    this.files = null;
    // this.uploadCompleteHandler = null;
    this.canSelectTotalImage = this.perMaxImageCount;
    this.title = '照片书';  // 弹框标题文字
    this.content_theme_type = 4;
    this.bookPageType = 1;  // 1为单页照片书，0为随机照片书
}

PhotoUploadPlugin.prototype.setImageUploadMaxCount = function (count) {
    this.maxImageCount = count;
    this.canSelectTotalImage = Math.min(this.maxImageCount, this.perMaxImageCount);
};
PhotoUploadPlugin.prototype.showModelView = function () {
    if (document.getElementsByClassName("photo-upload-plugin").length > 0) return;
    var html = "";
    html += '<div class="photo-upload-plugin" style="position:fixed;z-index:9007199254740991;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.55)">';
    html += '<div class="create_photo_book" style="position:absolute;width:597px;background:#fff;left:50%;top:100px;margin-left:-16%;border-radius:6px;;padding:12px 30px;">';
    html += '<div class="create_photo_book_tit" style="font-size:16px;color:#2c2c2c;border-bottom:1px solid #ccc;line-height:34px;height:34px;">照片书—选择单页/批量上传</div>';
    html += '<div class="create_photo_wrap" style="display: flex; flex-direction: row; justify-content: space-around; padding-bottom: 32px;">';
    html += '<div class="single" class="create_photo_left" style="display: flex; flex-direction: column; align-items: center;">';
    html += '<span class="single" style="margin-top: 16px; font-size: 12px; color: #333;">添加至单页</span>';
    html += '<img class="single" src="https://static.shiqichuban.com/assets/img/photo_upload/single1.png?t=1551947002" width="154px" height="198px">';
    html += '<div id="single" class="single" style="margin-top: 14px; display: flex;">';
    html += '<div class="radio_two single" style="position: relative; display: inline-block;  width: 12px; height: 12px; border: solid 1px #454545; border-radius: 8px;">';
    html += '<div class="single" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: inline-block; width: 8px; height: 8px; background-color: #454545; border-radius: 4px;"></div>';
    html += '</div>';
    html += '<div class="radio_one single" style="display: none;  width: 12px; height: 12px; border: solid 1px #454545; border-radius: 8px;"></div>';
    html += '<span class="single" style="color: #454545; font-size: 12px; letter-spacing: 6px; margin-left: 4px; line-height: 17px; position: relative; bottom: 2.5px;">选中</span>';
    html += '</div>';
    html += '<input class="cancel" type="button" value="取消" style="width: 92px; height: 30px; border-radius: 20px; letter-spacing: 4px; margin-top: 24px; background-color: #ABABAB; color: white; font-size: 12px;" />';
    html += '</div>';
    html += '<div class="create_photo_right" style="display: flex; flex-direction: column; align-items: center;">';
    html += '<span class="multi" style="margin-top: 16px; font-size: 12px; color: #333;">随机排版</span>';
    html += '<img class="multi" src="https://static.shiqichuban.com/assets/img/photo_upload/multy1.png?t=1551947002" width="279px" height="198px">';
    html += '<div id="multi" class="multi" style="margin-top: 14px; display: flex;">';
    html += '<div class="radio_two multi" style="position: relative; display: none;  width: 12px; height: 12px; border: solid 1px #454545; border-radius: 8px;">';
    html += '<div class="multi" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: inline-block; width: 8px; height: 8px; background-color: #454545; border-radius: 4px;"></div>';
    html += '</div>';
    html += '<div class="radio_one multi" style="display: inline-block;  width: 12px; height: 12px; border: solid 1px #454545; border-radius: 8px;"></div>';
    html += '<span class="multi" style="color: #454545; font-size: 12px; letter-spacing: 6px; margin-left: 4px; line-height: 17px; position: relative; bottom: 2.5px;">选中</span>';
    html += '</div>';
    html += '<input class="start_upload" type="button" value="开始上传" style="width: 92px; height: 30px; border-radius: 20px; letter-spacing: 2px; margin-top: 24px; background-color: #454545; color: white; font-size: 12px;" />';
    html += '</div></div></div></div>';
    var pan = document.createElement("div");
    pan.innerHTML = html;
    document.body.appendChild(pan);
    document.getElementsByClassName("photo-upload-plugin")[0].addEventListener('click', this.modelClickHandler.bind(this));
}

PhotoUploadPlugin.prototype.modelClickHandler = function (e) {
    var target = e.target;
    var className = target.className;
    var self = this;

    function switchRadio(radio) {
        if (radio === 'single') {
            $('#single .radio_one').css('display', 'none');
            $('#single .radio_two').css('display', 'block');
            $('#multi .radio_two').css('display', 'none');
            $('#multi .radio_one').css('display', 'block');
        }
        if (radio === 'multi') {
            $('#single .radio_one').css('display', 'block');
            $('#single .radio_two').css('display', 'none');
            $('#multi .radio_two').css('display', 'block');
            $('#multi .radio_one').css('display', 'none');
        }
        self.bookPageType = self.bookPageType === 1 ? 0 : 1;
    }
    if (className.indexOf('single') > -1) {
        switchRadio('single');
    }
    if (className.indexOf('multi') > -1) {
        switchRadio('multi');
    }
    if (className.indexOf('cancel') > -1) {
        var child = document.getElementsByClassName("photo-upload-plugin")[0];
        child.parentNode.removeChild(child);
    }
    if (className.indexOf('start_upload') > -1) {
        var child = document.getElementsByClassName("photo-upload-plugin")[0];
        child.parentNode.removeChild(child);
        this.showView();
    }
};

PhotoUploadPlugin.prototype.showView = function () {
    if (document.getElementsByClassName("photo-upload-plugin").length > 0) return;
    var self = this;
    if (self.bookPageType === 1) {
        self.canSelectTotalImage = 5;
    }
    var html = '';
    html += "<div class='photo-upload-plugin' style='position:fixed;z-index:" + Number.MAX_SAFE_INTEGER + ";top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.55)'>";
    html += "<div class='create_photo_book' style='position:absolute;width:660px;background:#fff;left:50%;top:100px;margin-left:-16%;border-radius:6px;;padding:12px 30px;'>";
    html += "<div class='create_photo_book_tit' style='font-size:16px;color:#2c2c2c;border-bottom:1px solid #ccc;line-height:34px;height:34px;'>";
    html += "选择上传的图片";
    html += "</div>";
    html += "<div id='photo-upload-plugin-photo-list' style='height:386px;padding-top:16px;overflow:auto;' >";
    html += "<div style='float:left;margin-top:12px;cursor:pointer'>";
    html += "<img class='photo-upload-plugin-add-images' src='https://static.shiqichuban.com/assets/img/icon/default_add_images_icon.png' style='width:100px;height:100px;border-radius:4px'>";
    html += "<input type='file' id='photo-upload-plugin-file-input' style='display:none;overflow:hidden;' multiple='multiple' accept='image/jpeg,image/jpg,image/png'>";
    html += "</div>";
    html += "</div>";
    html += "<div class='create_photo_book_footer' style='color:#2c2c2c;font-size:12px;height:30px;padding:12px 0 16px;'>";
    html += "<div class='image_num' style='float:left;line-height:30px;height:30px'>*单次最多可上传" + self.canSelectTotalImage + "张图片，已上传<span style='color:#f83b3b'>" + self.selectImageCount + "</span>张</div>";
    html += "<div class='image_bar' style='float:left;margin-left:55px;width:116px;height:30px;position:relative'>";
    html += "<span style='height:4px;background:#dcdcdc;border-radius:2px;position:absolute;left:0;width:100%;top:50%;margin-top:-2px;'></span>";
    html += "<span class='pro_bar' style='height:4px;background:#454545;border-radius:2px;position:absolute;left:0;width:0;top:50%;margin-top:-2px;'></span>";
    html += "<span class='bar_num' style='position:absolute;right:-40px;width:24px; height:16px; margin-top:7px;'>" + self.selectImageCount + "/" + self.canSelectTotalImage + "</span>";
    html += "</div>";
    html += "<div class='photo-upload-plugin-images-upload' style='float:right;margin-left:30px;cursor:pointer'>";
    html += "<span style='display:block;border-radius:6px;height:30px;line-height:30px;text-align:center;width:92px;background:#454545;font-size:12px;color:#fff;pointer-events: none'>确定上传</span>";
    html += "</div>";
    html += "</div>";
    html += "<div class='photo-upload-plugin-close-full-mask' style='position:absolute;right:-10px;top:-10px; width:30px;cursor: pointer'>";
    html += "<img src='https://static.shiqichuban.com/assets/img/icon/close_land.png' style='pointer-events: none'>";
    html += "</div>";
    html += "</div>";

    var pan = document.createElement("div");
    pan.innerHTML = html;
    document.body.appendChild(pan);

    self.fileUploader = new FileUploader();
    self.files = {};
    document.getElementsByClassName("photo-upload-plugin")[0].addEventListener('click', self.clickHandler.bind(self));
    document.getElementsByClassName("photo-upload-plugin")[0].addEventListener('change', self.selectFileHandler.bind(self));
};
PhotoUploadPlugin.prototype.uploadCompleteHandler = function (urls) {
    var postData = {};
    postData.content_theme_type = this.content_theme_type;
    postData.pic_urls = urls;
    postData.single_page = this.bookPageType;
    if (this.cus_cover) {
        postData.cus_cover = 1;
    }
    Fetcher.fetchData(
        '/v1/book/create/empty_mybook',
        null,
        'post',
        JSON.stringify(postData),
        function (data) {
            if (data.err_code == 0) {
                console.log(data);
                location.href = data.edit_url;
            }

        },
        function (data) {
            console.log(data)
        },
        "application/json");
};
PhotoUploadPlugin.prototype.destroy = function () {
    var self = this;
    document.getElementsByClassName("photo-upload-plugin")[0].removeEventListener("click", self.clickHandler);
    document.getElementsByClassName("photo-upload-plugin")[0].removeEventListener('change', self.selectFileHandler);
    var child = document.getElementsByClassName("photo-upload-plugin")[0];
    child.parentNode.removeChild(child);
    self.perMaxImageCount = 30;
    self.maxImageCount = self.perMaxImageCount;
    self.fileUploader = null;
    self.selectImageCount = 0;
    self.canSelectTotalImage = self.perMaxImageCount;
    self.files = null;
};
PhotoUploadPlugin.prototype.clickHandler = function (event) {
    var self = this;
    var target = event.target;
    var className = target.className;
    if (className === "photo-upload-plugin-add-images") {
        event.stopPropagation();
        document.getElementById("photo-upload-plugin-file-input").click();
    } else if (className === "photo-upload-plugin-image-remove") {
        event.stopPropagation();
        var url = target.getAttribute("url");
        self.removeThumb(url);
        $(target).parents('.photo-upload-plugin-image-item').remove();
        if ($(".photo-upload-plugin-add-images").is(':hidden')) {
            $(".photo-upload-plugin-add-images").show();
        }
        $(".bar_num").html(self.selectImageCount + "/" + self.canSelectTotalImage);
    } else if (className === "photo-upload-plugin-close-full-mask") {
        event.stopPropagation();
        self.destroy();
    } else if (className === "photo-upload-plugin-images-upload") {
        event.stopPropagation();
        if (!self.files || self.files.length === 0) {
            showAlert("请选择图片");
            return;
        } else {
            showLoading("正在上传图片！", true);
            var urls = [];
            var arr = [];
            for (var key in self.files) {
                if (!self.files.hasOwnProperty(key)) {
                    continue;
                }
                var item = {};
                item.url = key;
                item.file = self.files[key].file;
                item.width = self.files[key].width;
                item.height = self.files[key].height;
                arr.push(item);
            }
            self.uploadFile(0, arr, urls);
        }
    }
};
PhotoUploadPlugin.prototype.uploadFile = function (index, arr, urls) {
    var self = this;
    if (!arr[index]) return;
    var file = arr[index].file;
    var url = arr[index].url;
    var width = arr[index].width;
    var height = arr[index].height;
    self.fileUploader.createFileMD5(file, function (base64_md5) {
        var options = {
            type: "image",
            url: url,
            file: file,
            progress: function (md5, url, percent) { },
            callback: function (md5, url, remoteUrl) {
                urls.push({ url: remoteUrl, width: width, height: height });
                index++;
                if (self.uploadCompleteHandler && index === self.selectImageCount) {
                    self.uploadCompleteHandler(urls)
                } else {
                    self.uploadFile(index, arr, urls);
                }
            },
            errCallback: function (md5, url) {
                alert(file.name + "上传失败!");
                index++;
                if (self.uploadCompleteHandler && index === self.selectImageCount) {
                    self.uploadCompleteHandler(urls);
                } else {
                    self.uploadFile(index, arr, urls);
                }
            }
        };
        self.fileUploader.upload(options, base64_md5);
    });
};
PhotoUploadPlugin.prototype.selectFileHandler = function (event) {
    var self = this;
    var target = event.target;
    var id = target.id;
    if (id === "photo-upload-plugin-file-input") {
        event.stopPropagation();
        event.preventDefault();
        var files = event.target.files || event.dataTransfer.files;
        var index = 0;
        var parent = document.getElementById("photo-upload-plugin-photo-list");
        if (!parent) return;
        while (self.selectImageCount + index < self.canSelectTotalImage && index < files.length) {
            var file = files[index];
            var url = URL.createObjectURL(file);
            self.fileUploader.compressImage(url, file, 2700, 2700, function (compressData) {
                if (self.files[compressData.url] == null) {
                    $(parent).prepend(self.thumbView(compressData));
                    self.files[compressData.url] = { file: compressData.file, width: compressData.width, height: compressData.height };
                    self.selectImageCount++;

                    $(".bar_num").html(self.selectImageCount + "/" + self.canSelectTotalImage);
                    if (self.selectImageCount >= self.canSelectTotalImage) {
                        $(".photo-upload-plugin-add-images").hide();
                    }
                }
            }, function () {
                alert("图片压缩失败");
            });
            index++;
        }
        document.getElementById("photo-upload-plugin-file-input").value = "";

    }
};
PhotoUploadPlugin.prototype.thumbView = function (items) {
    console.log(items);
    
    var html = '';
    html += "<div class='photo-upload-plugin-image-item' style='position: relative;float: left;margin-top: 12px;margin-right: 8px;cursor: pointer'>";
    html += "   <img class='photo-upload-plugin-image-remove' url=" + items.url + " style='position: absolute;width: 16px;height: 16px;right: -8px;top:-8px; border-radius: 8px;' src='https://static.shiqichuban.com/assets/img/icon/cancle_image_upload.png' />";
    html += "   <img class='upload_pic' style='width: 100px;height: 100px;border-radius: 4px' src=" + items.url + " />";
    if (items.width < 700 || items.height < 700) {
        html += "<span class='images_tips' style='position:absolute;left:0;top:0;color:#fff;letter-spacing:2px;height: 100px;line-height: 20px;font-size:12px;background:rgba(0,0,0,0.47);padding:35px;text-align: center'>像素过低</span>"
    }
    html += "</div>";
    return html;
};

PhotoUploadPlugin.prototype.removeThumb = function (url) {
    var self = this;
    if (self.files[url]) {
        self.selectImageCount--;
        delete self.files[url];
    }
};