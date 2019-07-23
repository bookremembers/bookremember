var Util = (function Util(){
    function _getTop(target){
        var offset = target.offsetTop;
        if (target.offsetParent !== null) offset += _getTop(target.offsetParent);
        return offset;
    }
    function _getLeft(target){
        var offset = target.offsetLeft;
        if (target.offsetParent !== null) offset += _getLeft(target.offsetParent);
        return offset;
    }
    function _calBoundOffset(options,angle){
        var originArea  = _transform({top:0,left:0,width:options.width,height:options.height},0);
        var transArea =  _transform({top:0,left:0,width:options.width,height:options.height},angle);
        return {width:(transArea.width - originArea.width) / 2,height: (transArea.height - originArea.height) / 2};
    }
    function _transform(options,angle){
        var top = options.top ;
        var left = options.left ;
        var width = options.width ;
        var height = options.height ;
        var r = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
        var a = Math.atan(height / width) * 180 / Math.PI;
        var tlbra = 180 - angle - a;
        var trbla = a - angle;
        var ta = 90 - angle;
        var ra = angle;

        var halfWidth = width / 2;
        var halfHeight = height / 2;

        var middleX = left + halfWidth;
        var middleY = top + halfHeight;

        var topLeft = {
            left: Math.round(middleX + r * Math.cos(tlbra * Math.PI / 180)),
            top: Math.round(middleY - r * Math.sin(tlbra * Math.PI / 180)),
        };
        var top = {
            left: Math.round(middleX + halfHeight * Math.cos(ta * Math.PI / 180)),
            top: Math.round(middleY - halfHeight * Math.sin(ta * Math.PI / 180)),
        };
        var topRight = {
            left: Math.round(middleX + r * Math.cos(trbla * Math.PI / 180)),
            top: Math.round(middleY - r * Math.sin(trbla * Math.PI / 180)),
        };
        var right = {
            left: Math.round(middleX + halfWidth * Math.cos(ra * Math.PI / 180)),
            top: Math.round(middleY + halfWidth * Math.sin(ra * Math.PI / 180)),
        };
        var bottomRight = {
            left: Math.round(middleX - r * Math.cos(tlbra * Math.PI / 180)),
            top: Math.round(middleY + r * Math.sin(tlbra * Math.PI / 180)),
        };
        var bottom = {
            left: Math.round(middleX - halfHeight * Math.sin(ra * Math.PI / 180)),
            top: Math.round(middleY + halfHeight * Math.cos(ra * Math.PI / 180)),
        };
        var bottomLeft = {
            left: Math.round(middleX - r * Math.cos(trbla * Math.PI / 180)),
            top: Math.round(middleY + r * Math.sin(trbla * Math.PI / 180)),
        };
        var left = {
            left: Math.round(middleX - halfWidth * Math.cos(ra * Math.PI / 180)),
            top: Math.round(middleY - halfWidth * Math.sin(ra * Math.PI / 180)),
        };
        var minX = Math.min(topLeft.left, topRight.left, bottomRight.left, bottomLeft.left);
        var maxX = Math.max(topLeft.left, topRight.left, bottomRight.left, bottomLeft.left);
        var minY = Math.min(topLeft.top, topRight.top, bottomRight.top, bottomLeft.top);
        var maxY = Math.max(topLeft.top, topRight.top, bottomRight.top, bottomLeft.top);
        return {
            point: [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left],
            width: maxX - minX,
            height: maxY - minY,
            left: minX,
            right: maxX,
            top: minY,
            bottom: maxY,
            v_center:minY + height / 2,
            h_center:minX + width / 2,
        }
    }
    function _clone(obj) {
        var o;
        if (typeof obj === "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(_clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = _clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    }
    //get photo inner image top left width height ;
    function _getInnerData(imageW,imageH,frameW,frameH){
        var imgW = imageW ;
        var imgH = imageH ;
        var frameR = frameW / frameH ;
        var imageR = imgW / imgH ;

        var width = "100%";
        var height = "auto";
        var left = "0%";
        var top = "0%";

        if (imageR <= frameR) {
            var ratio_height = frameW / imageR;
            width = "100%";
            height = "auto";
            left = '0%';
            top = '-' + (parseInt((ratio_height - frameH) / 2) * 100/frameH) + '%' ;
        }else {
            width = "auto";
            height = "100%";
            var ratio_width = frameH * imageR;
            top = '0%';
            left = '-' + (parseInt((ratio_width - frameW) / 2)* 100/frameW) + '%' ;
        }
        return {innerTop:top,innerLeft: left,innerWidth:width,innerHeight:height};
    };
    /**
     * @description 射线法判断点是否在多边形内部
     * @param {Object} p 待判断的点，格式：{ x: X坐标, y: Y坐标 }
     * @param {Array} poly 多边形顶点，数组成员的格式同 p
     * @return {String} 点 p 和多边形 poly 的几何关系
     */
    function _checkInRect (p,poly){
        var px = p.left,
            py = p.top,
            flag = false ;
        for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
            var sx = poly[i].left,
                sy = poly[i].top,
                tx = poly[j].left,
                ty = poly[j].top;
            // 点与多边形顶点重合
            if((sx === px && sy === py) || (tx === px && ty === py)) {
                return 'on'
            }
            // 判断线段两端点是否在射线两侧
            if((sy < py && ty >= py) || (sy >= py && ty < py)) {
                // 线段上与射线 top 坐标相同的点的 left 坐标
                var left = sx + (py - sy) * (tx - sx) / (ty - sy) ;
                // 点在多边形的边上
                if(left === px) {
                    return 'on'
                }
                // 射线穿过多边形的边界
                if(left > px) {
                    flag = !flag
                }
            }
        }
        // 射线穿过多边形边界的次数为奇数时点在多边形内
        return flag ? 'in' : 'out'
    }
    function _uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data. At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }
    function _getImageSize(url,callback){
        var image = new Image();
        image.onload = function(){
            var width = this.width ;
            var height = this.height ;
            callback(width,height);
        };
        image.src = url ;
    }
    function _readFileAsBinary(file, callback) {
        if (window.File && window.FileList && window.FileReader && window.Blob) {
            var type = file.type ;
            var reader = new FileReader();
            reader.onload = function () {
                var binary_string = reader.content || reader.result;
                callback(binary_string,type);
            };
            //读取文件内容
            reader.readAsBinaryString(file);
        } else {
            callback(null);
        }
    };
    return {
        getTop:function(target){ return _getTop(target)},
        getLeft:function(target){ return _getLeft(target)},
        transform:function(options,angle){ return _transform(options,angle)},
        calBoundOffset:function(options,angle){ return _calBoundOffset(options,angle)},
        getInnerData: function(imageW,imageH,frameW,frameH) {return _getInnerData(imageW,imageH,frameW,frameH)},
        cloneObject:function(obj){return _clone(obj)},
        checkInRect:function(p,poly){return _checkInRect(p,poly)},
        uuid:function(len, radix){return _uuid(len, radix)},
        getImageSize:function(url,callback){_getImageSize(url,callback)},
        readFileAsBinary:function(file, callback){_readFileAsBinary(file, callback)}
    }
})();
function FileUploader() {
    this.client = null;
};
FileUploader.prototype.upload = function (options,contentMD5) {
    var self = this;
    var type = options.type,
        url = options.url,
        file = options.file,
        callback = options.callback ,
        progress = options.progress ,
        errorCallback = options.errorCallback ,
        onRemoteUrlGetHandler = options.onRemoteUrlGetHandler ;
    var position = 0;
    var result_data = {};
    var ctime = (new Date().getTime() * 1000).toString();
    self.getInit(type, ctime,contentMD5, function (data) {
        if (typeof(data) === 'string')
            result_data = JSON.parse(data);
        else
            result_data = data;
        position = result_data.data[0].position;
        var objectKey = result_data.data[0].object;
        var bucket = result_data.data[0].bucket;
        var remoteURL = result_data.data[0].url;

        if(onRemoteUrlGetHandler)
            onRemoteUrlGetHandler(url,remoteURL);

        if(type === "image"){
            //image res server upload
            self.uploadImageToResServer(file, ctime,contentMD5, file.type, function(){
                if(callback)
                    callback(contentMD5,url,remoteURL)
            }, function(){
                if(errorCallback)
                    errorCallback(url,contentMD5) ;
            });
        }else if(type === "video"){
            //video oss upload
            self.multipartUploadWithSts(contentMD5,url,bucket, objectKey, file, null ,function(){
                callback(contentMD5,url,remoteURL);
            },progress,function () {
                console.log("oss failed ! start res ...");
            });
        }
    });
};
FileUploader.prototype.getInit = function (type, ctime,contentMD5, callback, errorCallback) {
    var send_data = [{'ctime': ctime, 'content-md5': contentMD5}];
    Fetcher.fetchDataByJson({
        url: "/v1/" + type + "/init",
        host: getResServerDomain(),
        type: 'post',
        data: JSON.stringify(send_data),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        callback: function (data) {
            callback(data);
        },
        errorFun: function (XMLHttpRequest, textStatus, errorThrown) {
            if(errorCallback)
                errorCallback(XMLHttpRequest, textStatus, errorThrown);
        }
    })
};
FileUploader.prototype.createFileMD5 = function (file, callback) {
    Util.readFileAsBinary(file, function (binary_data) {
        if (binary_data !== null) {
            //计算图片服务需要的header
            var spark = new SparkMD5();
            spark.appendBinary(binary_data);
            var contentMD5 = window.btoa(spark.end(true));
            callback(contentMD5);
        }
    })
};
FileUploader.prototype.clientAuth = function (bucket, callback) {
    var self = this;
    Fetcher.fetchData("/v1/storage/upload/authorize", null, "POST", null, function (data) {
        if (!self.client) {
            self.client = new OSS({
                accessKeyId: data.AccessKeyId,
                accessKeySecret: data.AccessKeySecret,
                stsToken: data.SecurityToken,
                bucket: bucket,
                endpoint: 'https://shiqichuban.com'
            });
        }
        callback();
    });
};
FileUploader.prototype.multipartUploadWithSts = function (contentMD5,url,bucket, objectKey, file, cpt ,callback,progress,errCallback) {
    var self = this;
    self.clientAuth(bucket, function () {
        var checkpoint_temp;
        var option = {
            parallel: 6,
            fileSize: file.size,
            partSize: 1024 * 1024 * 5,
            progress: function (percent, cpt) {
                if(progress)
                    progress(contentMD5,url,percent) ;
                checkpoint_temp = cpt
            }
        };
        if (cpt)
            option.checkpoint = cpt;
        self.client.multipartUpload(objectKey, file, option).then(function (result) {
            if(callback){
                callback(result)
            }
        }).catch(function (err) {
            if(err){
                errCallback() ;
                self.client = null ;
            }
        });
    });
};
FileUploader.prototype.setCache = function(key,remoteURL){
    try{
        sessionStorage.setItem(key,remoteURL) ;
    } catch (e){
        sessionStorage.clear() ;
        sessionStorage.setItem(key,remoteURL) ;
    }
};
FileUploader.prototype.getCache = function(key){
    return sessionStorage.getItem(key) ;
};
FileUploader.prototype.compressImage = function(url,file,limit_w,limit_h,callback,errCallback){
    var self = this ;
    var image = new Image;
    image.onload = function () {
        // if(image.width > limit_w || image.height > limit_h){
        var fileData = self.drawCompressImage(image,image.width, image.height,limit_w,limit_h,file.type);
        callback(fileData);
        //     return ;
        // }
        // callback({url:url,file:file});
    };
    image.onerror = function(e){
        errCallback();
    };
    image.crossOrigin = "*" ;
    image.src = url ;
};
FileUploader.prototype.drawCompressImage = function(imageOrVideo,width,height,limit_w,limit_h,type) {
    var canvas = document.createElement("canvas");
    var resize_width = width;
    var resize_height = height;
    if (width > limit_w) {
        resize_width = limit_w;
        resize_height = resize_width * height / width;
    }else if(height > limit_h){
        resize_height = limit_h ;
        resize_width = resize_height *  width / height;
    }
    canvas.width = resize_width;
    canvas.height = resize_height;
    canvas.getContext('2d').drawImage(imageOrVideo, 0, 0, width, height, 0, 0, resize_width, resize_height);
    var data = canvas.toDataURL(type, 1);
    var base64_data = data.split(',')[1];
    var file = toBlob(base64_data, "jpeg");
    return {url:URL.createObjectURL(file),file:file,width:resize_width,height:resize_height};
};
FileUploader.prototype.uploadImageToResServer = function (file, ctime,contentMD5, contentType, callback, errorcallback) {
    $.ajax({
        url: getResServerDomain() + "/v1/image/add",
        type: 'PUT',
        crossDomain: true,
        data: file,
        processData: false,
        contentType: false,
        xhrFields: {
            withCredentials: true
        },
        headers: {
            "content-MD5": contentMD5,
            "x-shiqi-ctime": ctime,
            "Content-Type": contentType,
            "Authorization": localStorage.getItem("Authorization")
        },
        success: function (data, textStatus, xhr) {
            var auth = xhr.getResponseHeader("Authorization");
            if (auth)
                localStorage.setItem("Authorization", auth);
            callback(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorcallback(XMLHttpRequest, textStatus, errorThrown);
        }
    });
};
FileUploader.prototype.loadVideo = function(url,callback){
    window.URL = window.URL || window.webkitURL;
    var video = document.createElement('video');
    video.preload = 'auto';
    video.onloadeddata = function(){
        callback(this);
    };
    video.onerror = function(e){
        throw new Error('视频文件加载失败!');
    };
    video.src = url ;
};
FileUploader.prototype.drawVideoFirstFrame = function(video,file,callback){
    var self = this ;
    self.drawCompressVideoImage(video, video.videoWidth,video.videoHeight,file.type,function(imageData){
        callback(imageData.url,imageData.file) ;
    }) ;
};
FileUploader.prototype.drawCompressVideoImage = function(video,width,height,type,callback) {
    var videoWidth = width ;
    var videoHeight = height ;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var canvas_w = 1600 ;
    var canvas_h = 900 ;
    canvas.width = canvas_w;
    canvas.height = canvas_h;
    context.rect(0,0,canvas_w,canvas_h);
    context.fillStyle='#e6e8e9';
    context.fill();

    if(videoWidth > videoHeight)
        context.drawImage(video, 0, 0,videoWidth, videoHeight, 0, 0, canvas_w , canvas_h);
    else{
        var dw = parseInt(videoWidth * (canvas_w / canvas_h));
        var des_x = (canvas_w - dw) * 0.5 ;
        context.drawImage(video, 0, 0, videoWidth , videoHeight, des_x, 0, dw, canvas_h);
    }

    var play_btn_image = new Image;
    play_btn_image.crossOrigin = "*" ;
    play_btn_image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABOCAYAAAEStmnNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABCZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc3NUZFMzFFNTdDRjExRTc4RTYxREFGOEYwQTIwNzREIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc3NUZFMzFENTdDRjExRTc4RTYxREFGOEYwQTIwNzREIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWRjY2YxODEtMjI1Yy00ZDIwLThmYWEtOWYzOGY4MmYwMDFmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpk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" ;
    play_btn_image.onload = function(){
        var image_w = play_btn_image.width ;
        var des_x = (canvas_w - image_w) * 0.5 ;
        var des_y = (canvas_h - image_w) * 0.5 ;
        context.drawImage(play_btn_image, 0, 0, image_w, image_w, des_x, des_y, image_w , image_w);

        var data = canvas.toDataURL(type, 1);
        var base64_data = data.split(',')[1];
        var file = toBlob(base64_data, "jpeg");
        callback({url:URL.createObjectURL(file),file:file});
    };
};