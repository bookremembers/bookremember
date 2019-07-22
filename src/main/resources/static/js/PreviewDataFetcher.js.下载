/**
 * Created by naxiaoguang on 9/29/16.
 * app与web共同拥有的接口
 */
function PreviewDataFetcher() {
    this.API_BOOK_PAGE_LIST = '/v1/book/pagelist?';
    this.API_BOOK_PAGE_LIST_SHARE = '/v1/book/pagelist_public?';
    this.API_GET_BOOK_DETAIL = '/v1/book/get_attrs';
    this.API_GET_BOOK_CATALOG_PUBLIC = '/v1/book/catalogs_public';
    this.API_GET_BOOK_CATALOG = '/v1/book/catalogs';
    this.postData = function (post_data, callback, error_callback) {
        sendData({
            is_api: true,
            url: this.currentApi,
            method: 'post',
            data: post_data,
            callback: function (data) {
                if (callback)
                    callback(data);
            },
            errorFun: function (data) {
                if (error_callback)
                    error_callback(data);
            }
        })
    };
    this.getData = function (callback, err_callback, data) {
        var url;
        if (data) {
            var params = '';
            for (var i in data) {
                params += "&" + i + "=" + data[i];
            }
            params = params.replace('&', '?');
            url = this.currentApi + params;
        } else
            url = this.currentApi;
        sendData({
            is_api: true,
            url: url,
            method: 'get',
            callback: function (data) {
                if (callback)
                    callback(data);
            },
            errorFun: function (data) {
                if (err_callback)
                    err_callback(data);
            }
        })
    };
}
/**
 * 加载页面数据,每此请求总数为100页。
 * @param totalPage 总页数
 * @param perLoadComFun 每次请求成功毁掉
 * @param isPublic 是否为分享电子书
 *
 */
PreviewDataFetcher.prototype.getBookPageData = function (book, action, device, view_type, perRequestAmount, comCallback) {
    var self = this;
    var amount = perRequestAmount ;
    var step = Math.ceil(book.page_count / perRequestAmount);
    var version;
    reGetPageData();
    function reset() {
        version = null;
    }
    function reGetPageData(){
        reset();
        getVersion(function (data) {
            version = data.version;
            if(data.perRequestAmount){
                amount = data.perRequestAmount ;
                step = Math.ceil(book.page_count / amount);
            }
            getPageList();
        });
    }
    function getPageList() {
        var offset = 1;
        var page_list = [];
        var index = 0;
        var i ;
        var url ;
        var has_re_start = false ;
        for (i = 0; i < step; i++) {
            url = updateURL(offset, version);
            getPageData(i,url, function (result) {
                if(page_list){
                    page_list[result.back_data] = result;
                    index++;
                    if (index == step){
                        comCallback(page_list,step);
                    }
                }
            }, function (error) {
                if (error.err_code && error.err_code == 41) {
                    page_list = null ;
                    if(has_re_start == false){
                        has_re_start = true ;
                        reGetPageData();
                    }
                } else {
                    alert('获取电子书数据错误，请刷新重试！');
                }
            });
            offset += amount;
        }
    }
    function getVersion(callback, err_callback) {
        var version_url = action == config.ACTION_SHARE ?  ("/v1/book/page/version_public?cipher=" + book.cipher) : "/v1/book/page/version" ;
        sendData({
            is_api: true,
            url: version_url ,
            method: 'get',
            data: {book_id: book.book_id},
            callback: function (result) {
                callback(result);
            },
            errorFun: function (error) {
                err_callback(error);
            }
        });
    }
    function getPageData(index,url, callback, err_callback) {
        sendData({
            is_api: true,
            url: url,
            method: 'get',
            back_data: index,
            host:getBookApiDomain(),
            callback: function (result) {
                callback(result);
            },
            errorFun: function (data) {
                err_callback();
            }
        });
    }
    function updateURL(offset, version) {
        var url ;
        if (device == config.DEVICE_APP) {
            if(location.href.indexOf("preview/public") > -1)
                url = self.API_BOOK_PAGE_LIST_SHARE + 'cipher=' + book.cipher + '&start=' + offset + '&amount=' + amount;
            else
                url = self.API_BOOK_PAGE_LIST + 'book_id=' + book.book_id + '&start=' + offset + '&amount=' + amount;
        } else {
            if (action == config.ACTION_SHARE)
                url = self.API_BOOK_PAGE_LIST_SHARE + 'cipher=' + book.cipher + '&start=' + offset + '&amount=' + amount;
            else {
                if (view_type == null || view_type == "undefined")
                    url = self.API_BOOK_PAGE_LIST + 'book_id=' + book.book_id + '&start=' + offset + '&amount=' + amount;
                else
                    url = self.API_BOOK_PAGE_LIST + 'book_id=' + book.book_id + '&start=' + offset + '&amount=' + amount + '&type=' + view_type;
            }
        }
        if (version)
            url += "&version=" + version;
        return url ;
    }
};
/**
 * 获取书籍的属性
 * @param poat_data
 * @param callback
 */
PreviewDataFetcher.prototype.getBookAttr = function (post_data, callback) {
    this.currentApi = this.API_GET_BOOK_DETAIL;
    this.postData(post_data, callback);
};
PreviewDataFetcher.prototype.getCatalogPublicList = function (callback, err_callback, data) {
    this.currentApi = this.API_GET_BOOK_CATALOG_PUBLIC;
    this.getData(callback, err_callback, data);
};
PreviewDataFetcher.prototype.getCatalogList = function (callback, err_callback, data) {
    this.currentApi = this.API_GET_BOOK_CATALOG;
    this.getData(callback, err_callback, data);
};
