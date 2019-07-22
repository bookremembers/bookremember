/**
 * Created by naxiaoguang on 2017/3/6.
 */
function Book(device,device_w,device_h,option) {
    this.type = option.type;// 0 private | 1 group
    this.book_id = parseInt(option.book_id) ;//
    this.binding_id = parseInt(option.binding_id) ;//
    this.page_count = parseInt(option.page_count) ;//
    this.type = parseInt(option.type) ;//
    this.price = option.price ;//
    this.size_info = option.size_info ;
    this.book_display = device === config.DEVICE_PC ? config.BOOK_DISPLAY_DOUBLE : config.BOOK_DISPLAY_SINGLE;
    this.page_width = device === config.DEVICE_PC ? option.width * 2 : option.width ;
    this.page_height = option.height ;//
    this.scale = 1 ;
    if(device === config.DEVICE_PC){
        if(this.page_width / 2 <= this.page_height){
            if((this.page_height + 250) < device_h)
                this.scale = Math.min(1,this.page_height / device_h) ;
            else
                this.scale = Math.min(1,device_h / (this.page_height + 250)) ;
        }else{
            this.scale = this.page_width / device_w ;
        }
        this.scale = Math.max(0.6,this.scale);
    }else{
        this.scale = (device_w - 10) / this.page_width;
    }
    this.author  = option.author ;//作者
    this.title = option.title ;//
    this.platform = option.platform ;//wechat | ubbok
    this.cover = option.cover + "?type=cover_fc";//封面
    this.thumbnail = option.thumbnail ;//书架上的缩略图
    this.book_tips = option.book_tips ;//
    this.content_theme_type = option.content_theme_type ;// 1微博书 2拾柒书,3拾柒所见所得 4,照片书
    this.ebook_download = option.ebook_download ;//
    this.ebook_price = option.ebook_price ;//
    this.ebook_tips = option.ebook_tips ;//
    this.edit_access = option.edit_access ;//
    this.edit_state = parseInt(option.edit_state) ;//
    this.permit_edit = parseInt(option.permit_edit) ;//
    this.edited = option.edited ;//
    this.invite_msg = option.invite_msg ;//
    this.invite_state = parseInt(option.invite_state) ;//
    this.invite_url = option.invite_url ;//
    this.role = option.role ;//
    this.size_id = option.size_id ;//
    this.size_verified = option.size_verified ;//
    this.permit_authors = [] ;
    this.cipher = option.cipher || "" ;
    this.show_pen_name = Boolean(option.show_pen_name) || false ;
    this.include_mode = option.include_mode ;
    this.bg_music = option.bgm_url ;
    this.header_layout = option.page_style.header || '';
    this.footer_layout= option.page_style.footer || '';
    this.audios = 0 ;
    this.images = 0 ;
    this.videos = 0 ;
    this.isPicTheme = (this.content_theme_type === 4 || this.content_theme_type === 5 || this.content_theme_type === 7);
    this.isColorBook = (this.content_theme_type >= 3);
    this.bookTotalMinPage = (this.content_theme_type === 5 || this.content_theme_type === 7) ? 35 : 30 ; //最小印制页数
}
Book.prototype.setMediaCount = function(audios,images,videos){
    this.audios = audios ;
    this.images = images;
    this.videos = videos ;
};
/**
 * 检测文章是否可允许编辑,管理员通过permit_authors列表获取可编辑的作者文章,参与者只能编辑自己的
 * @param current_user_id
 * @param owner_id
 * @returns {boolean}
 */
Book.prototype.userCanEditContent = function(current_user_id,owner_id){
    var self = this ;
    var canEdit = false ;
    if(!current_user_id)
        showAlert('获取用户id失败');
    if(self.type === config.BOOK_TYPE_GROUP){
        if(!owner_id)
            canEdit = false ;
        else if(self.role === 0 && parseInt(owner_id) === parseInt(current_user_id))
            canEdit = true ;
        else if(self.role === 1){
            if(self.permit_authors[parseInt(owner_id)] != null || parseInt(owner_id) === parseInt(current_user_id))
                canEdit = true ;
        }
    }else
        canEdit = true ;
    return canEdit ;
};