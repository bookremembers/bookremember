/**
 * Created by zhh on 2018/8/30.
 */
function BookViewController(option) {

}

BookViewController.prototype.setCreateView = function (data) {


};
var thumb_size=100;
var image_file_arr=[];
var upload_images=[];
var cur_len=0;
var cur_book_id;
$(document).on(MOUSE_CLICK,'.photos_book_btn', function (e) {
    e.preventDefault();
    e.stopPropagation()
    var html= setAddImagesView();

    $(document.body).append(html);

}).on('click','.default_add_images',function(e){
    e.preventDefault();
    e.stopPropagation();
    upload_images=[];
    $('.file_upload').eq(0).trigger('click');
}).on(MOUSE_CLICK,'.close_full_mask',function(e){
    e.preventDefault();
    e.stopPropagation()
    cur_len=0;
    $('.full_page_mask').remove();
}).on(MOUSE_CLICK,'.images_upload',function(e){
    e.preventDefault();
    e.stopPropagation()

    showLoading("加载中...", true);

    if($('.singe_image').length>30){
        alert('单次最多可上传30张图片');
        showLoading("加载中...", false);
        return;
    }
    if($('.singe_image').length === 0){
        showLoading("加载中...", false);
        $('.full_page_mask').remove();
        return;
    }
    doImageUpload(function(data){

        console.log('全部上传完毕')
        var api_url='/v1/book/create/empty_mybook';
        if(cur_book_id){
            api_url='/v1/book/pics/add';
        }
       var  pic_urls=[];
        for(var i=0;i<data.length;i++){
            pic_urls.push(data[i]);
            if(i==data.length-1){
                if(cur_book_id){
                    var posdata={
                        'book_id': cur_book_id,
                        'pic_urls':pic_urls,
                    }
                }else{
                    var posdata={
                        'content_theme_type': 4,
                        'type':parseInt(0),
                        'pic_urls':pic_urls,
                    }
                }
                Fetcher.fetchData(
                    api_url,
                    null,
                    'post',
                    JSON.stringify(posdata),
                    function (data) {
                        if(data.err_code==0){
                            showLoading("", false);
                            if(cur_book_id){
                                $('.full_page_mask').remove();
                                location.href='https://www.shiqichuban.com/book/new_contents/'+cur_book_id+'#page/'+(data.minPage+2);
                                location.reload();
                            }else{
                                location.href='https://www.shiqichuban.com/book/new_contents/'+data.book_id;
                            }

                        }

                    },
                    function (data) {
                        showLoading("", false);
                        console.log(data)
                    },
                    "application/json");
            }
        }
    })


}).on(MOUSE_CLICK,'.cancle_image',function(e){
    e.preventDefault();
    e.stopPropagation();

    $(this).parent('.singe_image').remove();
    $('.image_num span').html($('.singe_image').length);
    $('.bar_num').html($('.singe_image').length+'/'+$('.singe_image').length);
    cur_len--;

}).on('change','.file_upload',function(e){
    e.preventDefault();
    e.stopPropagation();

    var files = e.target.files || e.dataTransfer.files ;
    var length = files.length ;
    var cur_num=parseInt($('.image_num span').html());

    cur_len+=length;

    if(cur_len>30){
        cur_len-=length;
        alert('单次最多可上传30张图片');
        return;
    }
    readFile(files,function(items){

        $('.file_upload').val('');
        if (!items) {
            alert('您的浏览器不支持此操作,推荐使用chorme、firefox、safair浏览器');
            return;
        }
        for (var index in items) {
            (function(i){
                var type = items[i].type;

                $('.photo_list').prepend(create_preview_thumb(items[i]));

            })(index)
        }
    },function(count){

        cur_num++;

        $('.image_num span').html(cur_num);

        $('.bar_num').html(cur_num+'/'+cur_len);
        $('.pro_bar').css('width',cur_num/cur_len*100+'%')
    })

}).on(MOUSE_CLICK,'.images_upload',function(e){
    e.preventDefault();
    e.stopPropagation();


})
function create_preview_thumb(items){
    var html='';
        html+= "<div class='singe_image' style='position: relative;float: left;margin-top: 12px;margin-right: 8px;cursor: pointer'>"

        html+=     "<img class='cancle_image' style='position: absolute;width: 16px;height: 16px;right: -8px;top:-8px; border-radius: 8px;;'  src='https://static.shiqichuban.com/assets/img/icon/cancle_image_upload.png'>"
        html+=      "<img class='upload_pic' src='"+items.thumb+"' _width='"+items.width+"' _height='"+items.height+"' img-src='"+items.origin+"' style='width: 100px;height: 100px;border-radius: 4px'>"
        if(items.width<700||items.height<900){
            html+=      "<span class='images_tips' style='position:absolute;left:0;top:0;color:#fff;letter-spacing:2px;height: 100px;line-height: 20px;font-size:12px;background:rgba(0,0,0,0.47);padding:35px;text-align: center'>像素过低</span>"

        }else{
            html+=      "<span class='images_tips' style='display: none;position:absolute;left:0;top:0;color:#fff;letter-spacing:2px;height: 100px;line-height: 20px;font-size:12px;background:rgba(0,0,0,0.47);padding:35px;text-align: center'>像素过低</span>"

        }

        html+=   "</div>";

    return html;
}
function readFile(files,callback,per_callback){
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
                    readImageFile(file,file_type,canvas,context,thumb_size,function(data){
                        count++;
                        if(data != null){
                            data['file_id'] =  Date.now() + '' + i;
                            data['type'] = "image" ;
                            image_file_arr[data['file_id'].toString()] = file ;
                            item_data.push(data);
                        }

                        if(per_callback)
                            per_callback(count);
                        if(count === len){
                            callback(item_data);
                        }
                    })
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

function readImageFile(file,file_type,canvas,context,thumb_size,callback){

    var self = this ;

    var size = (file.size / 1000000).toFixed(2);
    var quality = 1;

    if (size > 1) {
        var rate = 1 - size / 10;
        quality = rate < 0.5 ? 0.5 : rate;
    }

    var reader = new FileReader();
    reader.onload = (function () {

        createImageData(reader.result,canvas,context,file_type,quality,function(data){
            callback(data);
            reader = null ;
        })
    });
    //读取文件内容
    reader.readAsDataURL(file);
};

function createImageData(url,canvas,context,file_type,quality,callback,is_video){

    var self = this ;
    var image = new Image;
    image.onload = function () {
        var side = image.width >= image.height ? image.height : image.width;
       var data = {};
        data['thumb'] = drawThumbPic(image, canvas, context, side, thumb_size, file_type, quality);

        data['origin'] = drawPic(image, canvas,context, image.width, image.height, file_type, quality);
        data['width']=image.width;
        data['height']=image.height;
        callback(data);

    };

    image.onerror = function(e){
        callback(null);
    };
    if(url.indexOf('data:image') > -1){

    }else
        img.crossOrigin = "*" ;
    image.src = url ;
};


function drawThumbPic (image, canvas, context, side, size, type, quality) {
    canvas.width = size;
    canvas.height = size;
    context.drawImage(image, 0, 0, side, side, 0, 0, size, size);
    var data = canvas.toDataURL(type, quality);
    return data;
};

function drawPic (image, canvas,context, width, height, type, quality) {
    var resize_width = width;
    var resize_height = height;
    if (width > 2700) {
        resize_width = 2700;
        resize_height = 2700 * height / width;
    }
    canvas.width = resize_width;
    canvas.height = resize_height;
    context.drawImage(image, 0, 0, width, height, 0, 0, resize_width, resize_height);
    var data = canvas.toDataURL(type, quality);
    return data;
};

function doImageUpload(callback) {
    var self = this;
    var selector = $('.singe_image');
    var image_length = selector.length;
    var image_num = 0;

    if (image_length > 0) {
        selector.each(function (index, value) {

            if ($(value).find('.upload_pic').attr('img-src').indexOf('data:image/') > -1) {
                var base64_url = $(value).find('.upload_pic').attr('img-src').split(',');
                var img_data = base64_url[1];
                var file_type = base64_url[0].split(';')[0].split('/')[1];
                var image_id = $(value).index();
                var blob = toBlob(img_data, file_type);

                createFileMD5(blob, function (content_md5) {
                    uploadImageToResServer(image_id, blob, content_md5, file_type, function (_image_id, data) {
                        image_num++;
                        var result = JSON.parse(data);
                        result.width=parseInt($(value).find('.upload_pic').attr('_width'));
                        result.height=parseInt($(value).find('.upload_pic').attr('_height'));


                        upload_images.push(result);
                        console.log('图片上传(' + image_num + "/" + image_length + '),请稍等...');
                        if (image_num == image_length) {
                            callback(upload_images);
                        }
                    }, function (XMLHttpRequest, textStatus, errorThrown, image_id) {
                        console.log('文件上传失败！' + image_id);
                        image_num++;

                        if (image_num == image_length) {

                            callback();
                        }
                    });
                });
            }
        });
    }
};
function createFileMD5(file, callback) {
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

function readFileAsBinary(file, callback) {
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

function uploadImageToResServer(image_id,file,Content_MD5,Content_Type,callback,errorcallback){

    Fetcher.uploadImageToResServer(file,Content_MD5,Content_Type,function(data){
        callback(image_id,data);
    },function(XMLHttpRequest, textStatus, errorThrown){
        errorcallback(XMLHttpRequest, textStatus, errorThrown,image_id);
    });
};
function setAddImagesView(book_id) {
    if(book_id){
        cur_book_id=book_id;
    }

    var html="";
        html+="<div class='full_page_mask' style='position: fixed;z-index:99999;top:0;left:0;right: 0;bottom: 0;background: rgba(0,0,0,0.55)'>";
        html+=      "<div class='create_photo_book' style='position: absolute;width:600px;background: #fff;left:50%;top:100px;margin-left: -16%;border-radius:6px;;padding:12px 30px;'>";
        html+=              "<div class='create_photo_book_tit' style='font-size: 16px;color: #2c2c2c;border-bottom: 1px solid #ccc;line-height: 34px;height:34px;'>"
        html+=                      "选择上传的图片"
        html+=              "</div>";
        html+=              "<div class='photo_list' style='height: 386px;padding-top: 16px;overflow:auto;' >"
        //html+=                      "<div class='singe_image' style='position: relative;float: left;margin-top: 12px;margin-right: 8px;cursor: pointer'>"
        //html+=                              "<img class='cancle_image' style='position: absolute;width: 16px;height: 16px;right: -8px;top:-8px; border-radius: 8px;;'  src='https://static.shiqichuban.com/assets/img/icon/cancle_image_upload.png'>"
        //html+=                              "<img src='https://static.shiqichuban.com/assets/img/icon/images_list.png' style='width: 100px;height: 100px;border-radius: 4px'>"
        //html+=                              "<span class='images_tips' style='position:absolute;left:0;top:0;color:#fff;font-size:12px;height:30px;padding:35px;text-align: center'>像素过低</span>"
        //html+=                      "</div>";
        html+=                      "<div style='float: left;margin-top: 12px;cursor: pointer'>"
        html+=                              "<img class='default_add_images' src='https://static.shiqichuban.com/assets/img/icon/default_add_images_icon.png' style='width: 100px;height: 100px;border-radius: 4px'>"
        html+=                              "<input type='file' class='file_upload' style='display: none;overflow:hidden;' multiple='multiple' accept='image/jpeg,image/jpg,image/png'>"
        html+=                      "</div>";
        html+=              "</div>";
        html+=              "<div class='create_photo_book_footer' style='color: #2c2c2c;font-size: 12px;height:30px;padding:12px 0 16px;'>";

        html+=                      "<div class='image_num' style='float: left;line-height: 30px;height: 30px'>*单次最多可上传30张图片，已上传<span style='color: #f83b3b'>0</span>张</div>";

        html+=                      "<div class='image_bar' style='float: left;margin-left: 55px;width: 116px;height: 30px;position: relative'>"
        html+=                              "<span style='height: 4px;background: #dcdcdc;border-radius: 2px;position: absolute;left:0;width:100%;top:50%;margin-top: -2px;'></span>"
        html+=                              "<span class='pro_bar' style='height: 4px;background: #454545;border-radius: 2px;position: absolute;left:0;width:0;top:50%;margin-top: -2px;'></span>"
        html+=                              "<span class='bar_num' style='position: absolute;right:-40px;width:24px; height: 16px; margin-top: 7px;'>0/0</span>"
        html+=                       "</div>";

        html+=                      "<div class='images_upload' style='float: right;margin-left: 30px;cursor: pointer'>"
        html+=                          "<span style='display: block;border-radius:6px;height: 30px;line-height:30px;text-align:center;width: 92px;background: #454545;font-size: 12px;color: #fff'>确定上传</span>"
        html+=                      "</div>"

        html+=               "</div>";
        html+=                "<div class='close_full_mask' style='position: absolute;right: -10px;top: -10px; width: 30px;'>";
        html+=                      "<img src='https://static.shiqichuban.com/assets/img/icon/close_land.png'>";
        html+=                 "</div>";
        html+=    "</div>";
        html+="</div>";

        return html;
}