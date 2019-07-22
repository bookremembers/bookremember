/**
 * Created by naxiaoguang on 9/29/16.
 */
function EditDataFetcher() {
    this.API_BOOK_GET_CONTENT = '/v1/book/content/get/';
    this.API_BOOK_SAVE_CONTENT = '/v1/book/content/save/';
    this.API_BOOK_IMAGE_GROUP_LAYOUT = '/v1/book/content/image/group_style/list';
    this.API_BOOK_CHANGE_FILTER = '/v1/book/change_state/';
    this.API_BOOK_MOVE_CONTENT = '/v1/book/content/layout_position';
    this.API_BOOK_GET_CREATE_TIME = '/v1/book/create_time/get';
    this.API_BOOK_SET_CREATE_TIME = '/v1/book/create_time/set';
    this.API_BOOK_GET_AUTHOR_PHOTO = '/v1/book/author_avatar/get';
    this.API_BOOK_SET_AUTHOR_PHOTO = '/v1/book/author_avatar/set';
    this.API_BOOK_GET_FILTERS_BTN = '/v1/book/query_state';
    this.API_BOOK_CONTENT_DELETE = '/v1/book/contents/delete/' ;
    this.API_BOOK_GET_TEMPLATE_LIST = '/v1/book/template/list' ;
    this.API_BOOK_SET_TEMPLATE_LIST = '/v1/book/template/set' ;
    this.API_BOOK_GET_CATALOG_TEMPLATE_LIST = '/v1/book/tpl_image/list' ;//获取目录模板列表
    this.API_BOOK_SET_CATALOG_TEMPLATE='/v1/book/cus_catalogs/save';
    this.API_BOOK_GET_INDENT = '/v1/book/indent/get' ;
    this.API_BOOK_SET_INDENT = '/v1/book/indent/set' ;
    this.API_BOOK_INCREMENT_UPDATE = '/v1/thirdparty/increment_update' ;
    this.API_BOOK_GET_SIZE_LIST = '/v1/book/size/list' ;
    this.API_BOOK_SET_SIZE_LIST = '/v1/book/size/set' ;
    this.API_BOOK_TRASH_LIST = '/v1/trash/list' ;
    this.API_BOOK_TRASH_DELETE = '/v1/trash/delete' ;
    this.API_BOOK_TRASH_RESTORE = '/v1/trash/restore' ;
    this.API_BOOK_SET_FONT_SIZE = '/v1/book/fontsize/set' ;
    this.API_BOOK_GET_FONT_SIZE = '/v1/book/fontsize/list' ;
    this.API_BOOK_GET_ARTICLE_LIST = '/v1/article/list' ;
    this.API_BOOK_GET_ARTICLE_TIME_RANGE = '/v1/article/date_range/ubook' ;
    this.API_BOOK_GET_ARTICLE_TAGS = '/v1/tags/list/' ;
    this.API_BOOK_ADD_ARTICLE = '/v1/book/article/add' ;
    this.API_IMG_GROUP_STYLE = '/v1/book/content/image/group_style/list' ;
    this.API_IMG_GET_CUSTOM_STYLE_LIST = '/v1/book/content/image/custom_group_style/list' ;
    this.API_IMG_GROUP_STYLE_BATCH = '/v1/book/content/image/group_style/list/in_batch' ;
    this.currentApi ;
    PreviewDataFetcher.call(this);
}
EditDataFetcher.prototype = new PreviewDataFetcher();
/**
 * 根据content_id获取电子书文章的内容
 * @param content_id
 * @param callback
 */
EditDataFetcher.prototype.getContent = function (book_id,content_id, callback) {
    this.currentApi = this.API_BOOK_GET_CONTENT + book_id + '/' + content_id;
    this.getData(callback);
};
/**
 * 获取文章的列表
 * @param book_id
 * @param content_id
 * @param callback
 */
EditDataFetcher.prototype.getArticleList = function (post_data,callback) {
    this.currentApi = this.API_BOOK_GET_ARTICLE_LIST ;
    this.postData(post_data,callback);
};
/**
 *
 * @param last_article_id
 * @param amount
 * @param callback
 */
EditDataFetcher.prototype.getArticleRangeTime = function (callback) {
    this.currentApi = this.API_BOOK_GET_ARTICLE_TIME_RANGE ;
    this.getData(callback);
};
/**
 * 获取标签
 * @param callback
 */
EditDataFetcher.prototype.getArticleTags = function (callback) {
    this.currentApi = this.API_BOOK_GET_ARTICLE_TAGS ;
    this.getData(callback);
};
/**
 * @param callback
 */
EditDataFetcher.prototype.addArticleToBook = function (post_data,callback,error_callback) {
    this.currentApi = this.API_BOOK_ADD_ARTICLE ;
    this.postData(post_data,callback,error_callback);
};
/**
 * 获取电子书创作时间
 * @param data  {book_id:book_id}
 * @param callback
 */
EditDataFetcher.prototype.getBookCreateTime = function(post_data,callback){
    this.currentApi = this.API_BOOK_GET_CREATE_TIME ;
    this.postData(post_data,callback);
};
/**
 * 获取作者头像
 * @param post_data {book_id:book_id}
 * @param callback
 */
EditDataFetcher.prototype.getBookAuthorPhoto = function(post_data,callback){
    this.currentApi = this.API_BOOK_GET_AUTHOR_PHOTO ;
    this.postData(post_data,callback);
};
/**
 * 电子书文章二次编辑保存
 * @param content_id
 * @param data 向后端传递的参数 {title: title, content: content, date:article_date}
 * @param callback
 */
EditDataFetcher.prototype.saveContent = function (book_id,content_id, post_data, callback) {
    this.currentApi = this.API_BOOK_SAVE_CONTENT + book_id + '/' + content_id;
    this.postData(post_data,callback);
};
/**
 * 获取图片组合的样式数据
 * @param post_data {book_id: book_id,content_id: content_id ,group_id: image_group_id}
 * @param callback
 */
EditDataFetcher.prototype.getImageGroupLayout = function (post_data, callback) {
    this.currentApi = this.API_BOOK_IMAGE_GROUP_LAYOUT;
    this.postData(post_data,callback);
};
/**
 * 获取要现实过滤按钮数据
 * @param post_data {book_id: book_id}
 * @param callback
 */
EditDataFetcher.prototype.getfilterBtn = function (post_data, callback) {
    this.currentApi = this.API_BOOK_GET_FILTERS_BTN;
    this.postData(post_data,callback);
};
/**
 * 过滤文章内容的可执行动作,过滤扉页,过滤转载等
 * @param post_data
 * @param callback
 */
EditDataFetcher.prototype.filterContent = function (post_data, callback) {
    this.currentApi = this.API_BOOK_CHANGE_FILTER;
    this.postData(post_data,callback);
};
/**
 * 移动电子书文章,上移下移
 * @param post_data
 * params :
 {
     "book_id" : "200",
     "content_id" : "300",
     "layout_position" : "3", (1表示前移，3表示后移，2表示顺序放置)
 }
 * @param callback
 */
EditDataFetcher.prototype.moveContent = function(post_data,callback){
    this.currentApi = this.API_BOOK_MOVE_CONTENT ;
    this.postData(post_data,callback);
};
/**
 * 修改创作时间
 * @param post_data
 * {
        "book_id": "4788",
        "ctime_start": "2014-11-01 00:00:00",
        "ctime_end": "2010-11-01 00:00:00"
    }
 * @param callback
 */
EditDataFetcher.prototype.setCreateTime = function(post_data,callback){
    this.currentApi = this.API_BOOK_SET_CREATE_TIME ;
    this.postData(post_data,callback);
};
/**
 * 修改作者头像
 * @param post_data {
     "book_id": "4788",
     "avatar": "image_url"
    }
 * @param callback
 */
EditDataFetcher.prototype.setBookAuthorPhoto = function(post_data,callback){
    this.currentApi = this.API_BOOK_SET_AUTHOR_PHOTO ;
    this.postData(post_data,callback);
};
/**
 * 删除文章、图片数据等
 * @param data
 * @param callback
 */
EditDataFetcher.prototype.deleteContent = function(post_data,callback){
    this.currentApi = this.API_BOOK_CONTENT_DELETE ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.getImageGroupStyleByGroupID = function(post_data,callback){
    this.currentApi = this.API_IMG_GROUP_STYLE ;
    this.postData(post_data,callback)
};
EditDataFetcher.prototype.getCustomStyleList = function(post_data,callback){
    this.currentApi = this.API_IMG_GET_CUSTOM_STYLE_LIST;
    this.postData(post_data,callback)
};
EditDataFetcher.prototype.getImageGroupStyleByGroupIDs = function(post_data,callback){
    this.currentApi = this.API_IMG_GROUP_STYLE_BATCH ;
    this.postData(post_data,callback)
};
EditDataFetcher.prototype.getTemplateList = function(post_data,callback){
    this.currentApi = this.API_BOOK_GET_TEMPLATE_LIST ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.setTemplateList = function(post_data,callback){
    this.currentApi = this.API_BOOK_SET_TEMPLATE_LIST ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.getCatalogTemplateList = function(post_data,callback){
    this.currentApi = this.API_BOOK_GET_CATALOG_TEMPLATE_LIST ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.setCatalogTemplate = function(post_data,callback){
    this.currentApi = this.API_BOOK_SET_CATALOG_TEMPLATE ;
    this.postData(post_data,callback);
};

EditDataFetcher.prototype.getIndentBtn = function(post_data,callback){
    this.currentApi = this.API_BOOK_GET_INDENT ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.setIndentBtn = function(post_data,callback){
    this.currentApi = this.API_BOOK_SET_INDENT ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.increment_update = function(post_data,callback,err_callback){
    this.currentApi = this.API_BOOK_INCREMENT_UPDATE ;
    this.getData(callback,err_callback,post_data);
};
EditDataFetcher.prototype.getBookSizeList = function(post_data,callback){
    this.currentApi = this.API_BOOK_GET_SIZE_LIST ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.setBookSizeList = function(post_data,callback){
    this.currentApi = this.API_BOOK_SET_SIZE_LIST ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.getBookTrashList = function(post_data,callback){
    this.currentApi = this.API_BOOK_TRASH_LIST ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.deleteTrashList = function(post_data,callback){
    this.currentApi = this.API_BOOK_TRASH_DELETE ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.restoreTrashList = function(post_data,callback){
    this.currentApi = this.API_BOOK_TRASH_RESTORE ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.changeFontSize = function(post_data,callback){
    this.currentApi = this.API_BOOK_SET_FONT_SIZE ;
    this.postData(post_data,callback);
};
EditDataFetcher.prototype.getFontSize = function(post_data,callback){
    this.currentApi = this.API_BOOK_GET_FONT_SIZE ;
    this.getData(callback,null,post_data);
};
EditDataFetcher.prototype.constructor = EditDataFetcher;