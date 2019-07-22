/**
 * Created by naxiaoguang on 2016/12/11.
 */
function PreviewViewController(){}
PreviewViewController.prototype.setOptions = function(book_manager,options){
    this.book_manager = book_manager ;
    this.device = options.device ;
    this.status = options.status ;
    this.action = options.action ;
    this.view_type = options.view_type ;
    this.book_theme = options.book_theme ;
    this.book_type = options.book_type ;
    this.book = options.book ;
};
/**
 * 添加电子书显示
 * @param container
 */
PreviewViewController.prototype.addBookWrapperDis = function(){
    var canvas =
        '<div id="canvas" style="padding:0 ;position:relative;margin:0 auto">' +
            '<div id="book-zoom">' +
                '<div class="sj-book-new" style="margin:auto"></div>' +
            '</div>' +
            '<div class="shadow"></div>' ;
    if(this.device === config.DEVICE_PC){
        canvas +='<img id="pre_btn" style="cursor:pointer;width:44px;position:absolute;left:-100px;top:45%;" src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_prepage.png" title="上一页"/>' ;
        canvas +='<img id="next_btn" style="cursor:pointer;width:44px;position:absolute;right:-100px;top:45%;" src="https://static.shiqichuban.com/assets/img/icon/icon_ebook_nextpage.png" title="下一页"/>';
    }
    canvas +=  '</div>';
    return canvas ;
};
/**
 * 添加滑条控制
 * @param bookContainer
 * @param posy
 */
PreviewViewController.prototype.addSliderBarDis = function(posy){
    var sliderBar = '' ;
    if(this.device == config.DEVICE_PC){
        sliderBar += '<div class="col-xs-8 col-xs-offset-1 col-sm-6 col-sm-offset-3 sliderbar_container" style="position:absolute;z-index:1000;top:'+ posy +'px;" >';
        sliderBar += '<div class="col-xs-8 col-xs-offset-1" style="margin-top: 10px;">';
    }else{
        sliderBar += '<div class="col-xs-12 col-sm-6 col-sm-offset-3 sliderbar_container" style="overflow:visible;position:fixed;z-index:1000;left:0;bottom:0;height:60px;padding-top:10px;background-color:white;box-shadow: 0 -2px 5px #ccc;" >';
        sliderBar += '<div class="col-xs-8" style="float:left;margin-left:10px;margin-top: 10px;">';
    }
    sliderBar += '<input class="col-xs-12 slider" style="">';
    sliderBar += '</div>';
    if(this.device == config.DEVICE_PC){
        sliderBar += '<input class="col-xs-1 col-sm-1 pageInput" placeholder="跳转" style="font-size:12px;text-align:center;margin-left:10px;width:50px;line-height:25px;height:25px;position:absolute;border-radius: 5px;outline: none;border:1px solid #ccc;">';
    }else
    sliderBar += '</div>';
    return sliderBar ;
};
PreviewViewController.prototype.getGroupWriteManagerPan = function(){
    var pan = "" ;
        pan +=
        "<div style='position:absolute;top:0;left:20px;background-color: white;border-radius: 2px;width:25px;font-size:16px;padding:5px;box-shadow: 2px 2px 4px #ccc'>" +
        "   <a href='"+ getCurrentWWWDomain() + "/book/zone" +"'>进入主题</a>" +
        "</div>" ;
    return pan ;
};
PreviewViewController.prototype.getFriendListPan = function(){
    var editPan =
        ' <div class="container-fluid friend_pan" style="z-index:2000;height:' + $(window).height() + 'px;width:100%;position:fixed;top:0;background-color: rgba(0,0,0,0.5);">' +
        ' <div id="friend_list_form" class="col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 60px"> ' +
        ' <div class="col-xs-12" style="position:relative;background-color: white;padding:20px 20px 0;border-radius: 5px"> ' +
        ' <img class="close_friend_list_btn" style="position:absolute;right:-15px;top:-15px;width:30px;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png" /> ' +
        ' <div style="margin-top:5px;width: 100% ;">好友列表</div> ' +
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div class="friend_list_container" style="height:'+ ($(window).height() - 200) +'px;overflow-y: auto"></div>' +
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div style="margin-top:5px;margin-bottom:5px;width: 100% ;text-align: center;overflow: auto">' ;
    // if(this.book.role == 1)
    //     editPan +='<img class="delete_friend_btn" src="/assets/img/icon/delete_icon.png" title="删除" style="float:right;margin:10px 0">' ;
    editPan +=' </div> ' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ';
    return editPan;
};
PreviewViewController.prototype.getInviteQRcodePan = function(){
    var editPan =
        ' <div class="container-fluid qr_pan" style="z-index:2000;height:' + $(window).height() + 'px;width:100%;position:fixed;top:0;background-color: rgba(0,0,0,0.5);">' +
        ' <div class="col-xs-12 col-sm-4 col-sm-offset-4" style="margin-top: 60px"> ' +
        ' <div class="col-xs-12" style="position:relative;background-color: white;padding:20px 20px 0;border-radius: 5px"> ' +
        ' <img class="close_qr_btn" style="position:absolute;right:-15px;top:-15px;width:30px;cursor: pointer;" src="https://static.shiqichuban.com/assets/img/icon/close_land.png" /> ' +
        ' <div style="margin-top:5px;width: 100% ;">方法一:  扫一扫邀请好友</div> ' +
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;"></div> ' +
        ' <div style="text-align: center">' +
            '<img class="qr_code_image" style="margin-top: 20px;width:200px">'+
            '<div style="margin-top: 20px;margin-bottom:20px;color:#333;font-size: 10px;">打开微信／QQ扫描二维码后<br>点击右上角进行分享</div>' +
        ' </div>' +
        ' <div style="margin-top:5px;width: 100% ;height: 1px ;background-color: #ccc;overflow: auto"></div> ' +
        ' <div style="width: 100%;margin-top:20px">方法二:  复制链接给好友</div>' +
        ' <div style="width: 100%;text-align: center;margin-top:20px;margin-bottom: 20px">' +
        ' <input id="qr_msg" style="display:inline-block;width: 78%;color:#333;outline: none;height:33px;line-height: 33px">' +
        ' <span class="sq_btn sq_btn_black copy_invite_btn" style="width:20%;border-radius: 2px;line-height: 30px;padding:0">复制链接</span>' +
        ' <div style="margin-top: 20px;margin-bottom:10px;font-size: 10px;text-align: left">把链接通过微信／QQ等方式发送给好友...</div>' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ' +
        ' </div> ';
    return editPan;
};
PreviewViewController.prototype.getFriendListItem = function(user){
    var self = this ;
    var item = "<div style='margin:15px 5px;line-height: 26px'>" ;
    item +=
        "<img src='"+ user.avatar +"' style='width:30px;border-radius: 15px;margin-right:20px;'>" +
        "<span>"+ user.name +"</span>" ;
    if(self.book.role == 1){
        if(user.role == 0)
            item +="<img class='delete_friend_item_btn' src='https://static.shiqichuban.com/assets/img/icon/delete_icon.png' id='"+ user.user_id +"' style='float:right;margin-top: 7px;'>" ;
    }
    item +="</div>" ;
    return item ;
};