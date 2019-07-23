/**
 * Created by naxiaoguang on 2016/12/30.
 */
function EditorFileController(){
    this.thumb_size = 100 ;
    this.video_file_arr = [];
    this.image_file_arr = [];
}

/**
 * 生成oss服务器需要的header数据
 * @param file
 * @param callback
 */
EditorFileController.prototype.createFileMD5 = function (file, callback) {
    this.readFileAsBinary(file, function (binary_data) {
        if (binary_data !== null) {
            //计算图片服务需要的header
            var spark = new SparkMD5();
            spark.appendBinary(binary_data);
            var base64_md5 = window.btoa(spark.end(true));
            callback(base64_md5);
        }
    })
};

/**
 * 文件转换成二进制，及base64数据
 * @param file
 * @param callback
 */
EditorFileController.prototype.readFileAsBinary = function(file, callback) {
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




EditorFileController.prototype.readFile = function(files,callback,per_callback){
    if (window.File && window.FileList && window.FileReader && window.Blob) {
        var self = this ;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var item_data = [];
        var len = files.length;
        var count = 0;
        for (var i = 0; i < len; i++) {
            (function (index) {
                var file_type = files[index].type.toLowerCase();
                var file = files[index] ;
                if (file_type === "image/jpeg" || file_type === "image/png") {
                    self.readImageFile(file,file_type,canvas,context,self.thumb_size,function(data){
                        count++;
                        if(data != null){
                            data['file_id'] =  Date.now() + '' + i;
                            data['type'] = "image" ;
                            self.image_file_arr[data['file_id'].toString()] = file ;
                            item_data.push(data);
                        }

                        if(per_callback)
                            per_callback(count);
                        if(count === len){
                            callback(item_data);
                        }
                    })
                }else if(file_type === "video/mp4" || file_type === "video/ogg" || file_type === "video/webm"){
                    self.loadVideo(file,function(video){
                        self.createVideoImage(video,function(src){
                            if(src === null){
                                count++;
                                if(count === len){
                                    callback(item_data);
                                }
                            }else{
                                self.createImageData(src,canvas,context,file_type,1,function(data){
                                    count++;
                                    if(data !== null){
                                        data['video_url'] = window.URL.createObjectURL(file) ;
                                        data['file_id'] =  Date.now() + '' + index;
                                        data['type'] = "video" ;
                                        data['video_duration'] = video.duration ;
                                        self.video_file_arr[data['file_id'].toString()] = file ;
                                        item_data.push(data);
                                    }
                                    if(per_callback)
                                        per_callback(count);
                                    if(count === len){
                                        callback(item_data);
                                    }
                                },true);
                            }
                        });
                    });
                }else{
                    showConfirm('存在不支持的文件格式:' + file_type,null,null,function(){
                        count++;
                        if(count === len){
                            callback(item_data);
                            showLoading('',false);
                        }
                    },null,'ok');
                }
            })(i)
        }
    } else {
        callback(null);
    }
};

EditorFileController.prototype.loadVideo = function(file,cb){
    window.URL = window.URL || window.webkitURL;
    var video = document.createElement('video');
    video.preload = 'auto';
    video.onloadeddata = function(){
        cb(this);
    };
    video.onerror = function(e){
        throw new Error('视频文件加载失败!');
    };
    video.src = window.URL.createObjectURL(file);
};

/**
 * 生成视频的第一针图像
 * @param file
 * @param callback
 */
EditorFileController.prototype.createVideoImage = function(video,callback){
    if(video){
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth ;
        canvas.height = video.videoHeight ;
        if(canvas.width === 0 || canvas.height === 0){
            callback(null);
            return ;
        }
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        callback(canvas.toDataURL("image/jpeg"),video.src);
    }else{
        callback(null);
    }
};


/**
 * 绘制缩略图与大图数据
 * @param file
 * @param callback
 */
EditorFileController.prototype.readImageFile = function(file,file_type,canvas,context,thumb_size,callback){

    var self = this ;

    var size = (file.size / 1000000).toFixed(2);
    var quality = 1;

    if (size > 1) {
        var rate = 1 - size / 10;
        quality = rate < 0.5 ? 0.5 : rate;
    }

    var reader = new FileReader();
    reader.onload = (function () {
        self.createImageData(reader.result,canvas,context,file_type,quality,function(data){
            callback(data);
            reader = null ;
        })
    });
    //读取文件内容
    reader.readAsDataURL(file);
};

EditorFileController.prototype.createImageData = function(url,canvas,context,file_type,quality,callback,is_video){

    var self = this ;
    var image = new Image;
    image.onload = function () {
        var side = image.width >= image.height ? image.height : image.width;
        var data = {};
        data['thumb'] = self.drawThumbPic(image, canvas, context, side, self.thumb_size, file_type, quality);
        if(is_video)
            self.drawVideoPic(image, canvas,context, image.width, image.height, file_type, quality,function(url){
                data['origin'] = url ;
                callback(data);
            });
        else{
            data['origin'] = self.drawPic(image, canvas,context, image.width, image.height, file_type, quality);
            callback(data);
        }
    };

    image.onerror = function(e){
        callback(null);
    };
    if(url.indexOf('data:image') > -1){

    }else
        image.crossOrigin = "*" ;
    image.src = url ;
};


EditorFileController.prototype.drawThumbPic = function(image, canvas, context, side, size, type, quality) {
    canvas.width = size;
    canvas.height = size;
    context.drawImage(image, 0, 0, side, side, 0, 0, size, size);
    var data = canvas.toDataURL(type, quality);
    return data;
};

/**
 * 文件最大尺寸为2048
 * @param image
 * @param canvas
 * @param width
 * @param height
 * @param type
 * @param quality
 * @returns {string}
 */
EditorFileController.prototype.drawPic = function(image, canvas,context, width, height, type, quality) {
    var resize_width = width;
    var resize_height = height;
    if (width > 1080) {
        resize_width = 1080;
        resize_height = 1080 * height / width;
    }
    canvas.width = resize_width;
    canvas.height = resize_height;
    context.drawImage(image, 0, 0, width, height, 0, 0, resize_width, resize_height);
    var data = canvas.toDataURL(type, quality);
    return data;
};

/**
 * 绘制视频的组合图像
 * @param image
 * @param canvas
 * @param context
 * @param width
 * @param height
 * @param type
 * @param quality
 * @returns {string}
 */
EditorFileController.prototype.drawVideoPic = function(image, canvas,context, width, height, type, quality,callback) {

    var canvas_w = 1600 ;
    var canvas_h = 900 ;

    canvas.width = canvas_w;
    canvas.height = canvas_h;

    context.rect(0,0,canvas_w,canvas_h);
    context.fillStyle='#e6e8e9';
    context.fill();

    var des_x ;
    var des_y ;

    des_x = (canvas_w - width) * 0.5 ;
    des_y = (canvas_h - height) * 0.5 ;

    if(width > height)
        context.drawImage(image, 0, 0, width, height, 0, 0, canvas_w , canvas_h);
    else
        context.drawImage(image, 0, 0, width, height, des_x, des_y, width , height);


    var play_btn_image = new Image;
    play_btn_image.onload = function(){
        var image_w = play_btn_image.width ;
        des_x = (canvas_w - image_w) * 0.5 ;
        des_y = (canvas_h - image_w) * 0.5 ;
        context.drawImage(play_btn_image, 0, 0, image_w, image_w, des_x, des_y, image_w , image_w);
        var data = canvas.toDataURL(type, quality);
        callback(data);
    };
    play_btn_image.crossOrigin = "*" ;
    play_btn_image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABOCAYAAAEStmnNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABCZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc3NUZFMzFFNTdDRjExRTc4RTYxREFGOEYwQTIwNzREIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc3NUZFMzFENTdDRjExRTc4RTYxREFGOEYwQTIwNzREIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWRjY2YxODEtMjI1Yy00ZDIwLThmYWEtOWYzOGY4MmYwMDFmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpk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" ;
};

EditorFileController.prototype.reset = function(){
    this.video_file_arr = [];
    this.image_file_arr = [];
};


EditorFileController.prototype.getImageFileDataByID = function(id){
    return this.image_file_arr[id] ;
};


EditorFileController.prototype.getVideoFileDataByID = function(id){
    return this.video_file_arr[id] ;
};
