/**
 * Created by naxiaoguang on 2016/12/30.
 */
function EditorDataController(){
    this.domain = getResServerDomain() ;
}

/**
 * 上传到资源服务器
 * @param file
 * @param Content_MD5
 * @param Content_Type
 * @param callback
 */
EditorDataController.prototype.uploadImageToResServer = function(image_id,file,Content_MD5,Content_Type,callback,errorcallback){

    Fetcher.uploadImageToResServer(file,Content_MD5,Content_Type,function(data){
        callback(image_id,data);
    },function(XMLHttpRequest, textStatus, errorThrown){
        errorcallback(XMLHttpRequest, textStatus, errorThrown,image_id);
    });
};

EditorDataController.prototype.getVideoInit = function(ctime,content_md5,callback,errorcallback){

    var send_data = [{'ctime':ctime,'content-md5':content_md5}] ;
    Fetcher.fetchDataByJson({
        url:"/v1/video/init",
        host:getResServerDomain(),
        type:'post',
        data: JSON.stringify(send_data),
        async:false ,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        callback:function(data){
            callback(data);
        },
        errorFun:function(XMLHttpRequest, textStatus, errorThrown){
            errorcallback(XMLHttpRequest, textStatus, errorThrown);
        }
    })
};

EditorDataController.prototype.uploadVideoToResServer = function(image_id,file,position,ctime,gmtDate,Content_MD5,Content_Type,callback,errorcallback){
    Fetcher.uploadVideoToResServer(file,position,ctime,gmtDate,Content_MD5,Content_Type,function(data){
        callback(image_id,data);
    },function(XMLHttpRequest, textStatus, errorThrown){
        errorcallback(image_id,XMLHttpRequest, textStatus, errorThrown);
    });
};

EditorDataController.prototype.saveArticle = function(options,callback){

    var article_data = {
        title: options.title,
        content: options.content,
        weather: options.weather || '',
        tags: options.tags,
        date: options.date,
        book_ids:options.book_ids,
    };

    var url = API_ARTICLE_SAVE;
    if (options.article_id)
        url += options.article_id;

    sendData({
        is_api: true,
        url: url,
        data: article_data,
        method:'post',
        callback: function (data) {
        	console.log(data);
            if (callback)
                callback(data);
        }
    });
};

EditorDataController.prototype.bookArticleSave = function(article_data,callback,err_callback){
    sendData({
        is_api: true,
        url: API_BOOK_ARTICLE_SAVE,
        data: article_data,
        method:'post',
        callback: function (data) {
            if (callback)
                callback(data);
        },
        errorFun:function(error){
            if(err_callback)
                err_callback(error)
        }
    });
};
