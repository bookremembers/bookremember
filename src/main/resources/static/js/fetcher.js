/**
 * Created by naxiaoguang on 2017/3/31.
 */
var Fetcher = (function () {
    function _sendData(options) {
        var is_api = options.is_api;
        var url = options.url;
        var host = options.host ;
        var data = options.data;
        var data_type = options.data_type;
        var method = options.method;
        var async = options.async;
        var callback = options.callback;
        var processFun = options.processFun;
        var errorFun = options.errorFun;
        var back_data = options.back_data;
        var headers = options.headers ;
        var content_type = options.content_type ;

        var auth = localStorage.getItem("Authorization") ;
        if(headers && auth !== null && auth !== "null")
            headers.Authorization = auth;

        if(host)
            url = host + url ;
        else
            url = is_api === true ? getCurrentAPIDomain() + url : getCurrentWWWDomain() + url;

        console.log('fetcher_url:' + url);
        // if(data)
        //     console.log('send-data:',data);

        var successFun = function (data, textStatus, xhr) {
            var auth = xhr.getResponseHeader("Authorization") ;
            if (auth)
                localStorage.setItem("Authorization",auth);
            data.back_data = back_data;
            if (typeof data === 'string')
                data = JSON.parse(data);
            // console.log("fetcher_receive-data:" + url);
            // console.log(data);
            if(data.err_code){
                if (data.err_code == 0) {
                    if (callback) {
                        callback(data);
                    }
                } else {
                    errFun(data);
                }
            }else{
                if (callback) {
                    callback(data);
                }
            }
        };

        var errFun = function (e) {
            if (errorFun)
                errorFun(e);
        };


        if (!window.XMLHttpRequest && window.XDomainRequest && navigator.userAgent.indexOf("MSIE") == -1) {

            // Add the iframe with a unique name
            var iframe = document.createElement("iframe");
            var uniqueString = "CHANGE_THIS_TO_SOME_UNIQUE_STRING";
            document.body.appendChild(iframe);
            iframe.style.display = "none";
            iframe.contentWindow.name = uniqueString;

            // construct a form with hidden inputs, targeting the iframe
            var form = document.createElement("form");
            form.target = uniqueString;
            form.action = url;
            form.method = "POST";

            // repeat for each parameter
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "INSERT_YOUR_PARAMETER_NAME_HERE";
            input.value = "INSERT_YOUR_PARAMETER_VALUE_HERE";
            form.appendChild(input);

            document.body.appendChild(form);

            for (var p in data) {
                // repeat for each parameter
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = p;
                input.value = data[p];
                form.appendChild(input);
            }

            form.submit();

            iframe.onload = function () {

                if (iframe.readyState == "complete") {
                    var result = iframe.contentWindow.document.body.innerHTML;
                    console.log(result);
                }
            };

        } else if (window.XMLHttpRequest) {

            var request = {};
            request['url'] = url;
            if(data)
                request['data'] = data;
            request['type'] = method || 'post';
            request['xhrFields'] = {
                withCredentials: true
            };
            request['crossDomain'] = true;
            request['success'] = successFun;
            request['error'] = errFun;
            request['async'] = async; //false为同步
            request['headers'] = headers ;

            if(content_type)
                request['contentType'] = content_type;

            if (data_type === "text") {
                request['processData'] = false;
                request['contentType'] = false;
                request['xhr'] = function () {            //在jquery函数中直接使用ajax的XMLHttpRequest对象
                    var xhr = new XMLHttpRequest();
                    for ( var i in headers ) {
                        xhr.setRequestHeader( i, headers[ i ] );
                        console.log(headers[ i ])
                    }
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round(evt.loaded * 100 / evt.total);

                            if (processFun)
                                processFun(percentComplete);
                        }
                    }, false);

                    return xhr;
                };
            }

            $.ajax(request);

        }

    }

    function _fetchData(api, host, method, send_data, callback, error_callback,content_type) {
        var fetch_url = api ;
        if (method === "get" && send_data) {
            var params = '';
            for (var i in send_data) {
                params += "&" + i + "=" + send_data[i];
            }
            params = params.replace('&', '?');
            params += "&" + "random" + "=" + Math.random();
            fetch_url += params;
        }

        var options = {
            is_api: true,
            url: fetch_url,
            method: method,
            callback: function (data, textStatus, xhr) {
                if (data.err_code && data.err_code !== 0) {
                    if (error_callback)
                        return error_callback(data);
                }
                if (callback)
                    callback(data);
            },
            errorFun: function (error) {
                if (error_callback)
                    error_callback(error);
            }
        };

        if (send_data && method === "post")
            options.data = send_data;
        if(host)
            options.host = host ;

        if(content_type)
            options.content_type = content_type ;
        _sendData(options);
    }


    function _uploadImageToResServer(file,Content_MD5,Content_Type,callback,errorcallback){

        var ctime = (new Date().getTime() * 1000).toString();
        var content_type = Content_Type.indexOf("image") < 0 ? ('image/'+ Content_Type) : Content_Type ;
        $.ajax({
            url:getResServerDomain() + "/v1/image/add",
            type:'PUT',
            crossDomain:true,
            data: file,
            processData:false,
            contentType:false,
            xhrFields:{
                withCredentials: true
            },
            headers:{
                "content-MD5":Content_MD5,
                "x-shiqi-ctime":ctime,
                "Content-Type":content_type,
                "Authorization":localStorage.getItem("Authorization")
            },
            success:function(data, textStatus, xhr){
                var auth = xhr.getResponseHeader("Authorization") ;
                if(auth)
                    localStorage.setItem("Authorization",auth);
                callback(data);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                errorcallback(XMLHttpRequest, textStatus, errorThrown);
            }
        });
    }


    function _uploadVideoToResServer(file,position,ctime,gmtDate,Content_MD5,Content_Type,callback,errorcallback){
        $.ajax({
            url:getResServerDomain() + "/v1/video/upload",
            type:'POST',
            crossDomain:true,
            data: file ,
            processData:false,
            contentType:false,
            xhrFields:{
                withCredentials: true
            },
            headers:{
                "x-shiqi-content-md5":Content_MD5,
                "x-shiqi-ctime":ctime,
                "x-shiqi-position":position,
                "content-type":Content_Type,
                "Authorization":localStorage.getItem("Authorization")
            },
            success:function(data, textStatus, xhr){
                var auth = xhr.getResponseHeader("Authorization") ;
                if(auth)
                    localStorage.setItem("Authorization",auth);
                callback(data);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                errorcallback(XMLHttpRequest, textStatus, errorThrown);
            }
        });
    }

    return {
        fetchData: function (api, host, method, send_data, callback, error_callback,content_type) {
            _fetchData(api, host, method, send_data, callback, error_callback,content_type)
        },
        fetchDataByJson: function (options) {
            _sendData(options)
        },
        uploadImageToResServer:function(file,Content_MD5,Content_Type,callback,errorcallback){
            _uploadImageToResServer(file,Content_MD5,Content_Type,callback,errorcallback)
        },
        uploadVideoToResServer:function(file,position,ctime,gmtDate,Content_MD5,Content_Type,callback,errorcallback){
            _uploadVideoToResServer(file,position,ctime,gmtDate,Content_MD5,Content_Type,callback,errorcallback)
        }
    }

})();