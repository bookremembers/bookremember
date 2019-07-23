/**
 * Created by naxiaoguang on 2017/2/28.
 */
function BookContentController(options) {
    this.book_doc = options.book_doc;
    this.view_type = options.view_type;
    this.app_version = options.app_version;
    this.device = options.device;
    this.status = options.status;
    this.action = options.action;
    this.book = options.book ;
    this.user_id = options.user_id ;
    this.book_manager = options.book_manager ;
    this.current_content_id = null;
    this.delete_content_ids = [];
    this.origin_content_title = null ;
    this.origin_content_article = null ;
}
BookContentController.prototype.getContentByPageNum = function (flip_book, callback) {
    var self = this;
    var content_ids = [];
    var page_nums = flip_book.getCurrentViews();
    for (var i in page_nums) {
        var page_selector = $('.page-wrapper[page=' + page_nums[i] + ']');
        if(self.book.content_theme_type === 3){
            var content_id = page_selector.find('.ubook_header').length > 0 ? page_selector.find('.page').attr('content_id') : null;
        }else{
            var content_id = page_selector.find('.ubook_header').length > 0 ? page_selector.find('.ubook_content').first().attr('content_id') : null;
        }
        var length = content_ids.length;
        if(content_id !== null){
            if (length === 0 || (length === 1 && content_id !== content_ids[0]))
                content_ids.push(content_id);
        }
    }
    if (content_ids.length === 0) {
        //不存在IDS就翻到第一页
        if (flip_book.getCurrentPageNum() >= flip_book.getTotalPageNum())
            flip_book.turnTo(flip_book.getFirstContentPage());
        else
            flip_book.turnTo(flip_book.getCurrentPageNum() + 1);
        self.getContentByPageNum(flip_book, callback);
    } else {
        callback(content_ids, page_nums);
    }
};
BookContentController.prototype.addContentEditBtnsEvent = function (handler) {
    var self = this ;
    var btns_list = {
        register: [
            {event_type: config.MOUSE_CLICK, target_name: '.editContent'},
            {event_type: config.MOUSE_CLICK, target_name: '.removeContent'},
            {event_type: config.MOUSE_CLICK, target_name: '.addNewContent'},
            {event_type: config.MOUSE_CLICK, target_name: '.recoverContent'},
            {event_type: config.MOUSE_CLICK, target_name: '.moveContent'},
        ]
    };
    for (var i in btns_list.register) {
        (function(index){
            var register = btns_list.register[index];
            $(document).on(register.event_type, register.target_name, function (e) {
                e.stopPropagation();
                self.current_content_id = $(this).attr('content_id') ;
                handler({
                    content_id: self.current_content_id,
                    event_type: register.event_type,
                    target_name:register.target_name,
                    target:this ,
                });
                if(self.device === config.DEVICE_MOBILE){
                    $(this).parents('#edit_btn_list').remove();
                }else{
                    if (register.target_name === '.removeContent' || register.target_name === '.recoverContent') {
                        var str = $(this).find('.text').html() === '撤销删除' ? '删除文章' : '撤销删除';
                        var src = $(this).find('.removeArticleImg').attr('src') == 'https://static.shiqichuban.com/assets/img/icon/genggai_icon_06.png' ? 'https://static.shiqichuban.com/assets/img/icon/genggai_icon_05.png' : 'https://static.shiqichuban.com/assets/img/icon/genggai_icon_06.png';
                        var class_str = $(this).attr('class') === 'removeArticle' ? 'recoverArticle' : 'removeArticle';
                        $(this).find('.text').html(str);
                        $(this).attr('class', class_str);
                        $(this).find('.removeArticleImg').attr('src', src);
                    }
                }
                $(this).parents('#edit_btn_list').remove();
            })
        })(i)
    }
};
BookContentController.prototype.addOverPageEvent = function(handler){
    var self = this ;
    $(document).on(config.MOUSE_CLICK, '.over_page', function(e) {
        e.stopPropagation();
        if (self.device === config.DEVICE_APP && self.status === config.STATUS_EDIT) {
            noticeToApp('addNewPage', "addNewPage");
        } else {
            handler({target_name:'.over_page',content_id:null,direction:1});
        }
    })
};
