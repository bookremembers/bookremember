/**
 * Created by naxiaoguang on 2017/3/28.
 */
function GuideController(options,commandChannel){
    this.document_body = options.document_body ;
    this.document = options.document ;
    this.commandChannel = commandChannel ;
    this.window_h = options.window_h ;
}
GuideController.prototype.addGuide = function(vo){
    var self = this ;
    var guide_str = '' ;
    guide_str += '<div class="gui_box" style="z-index:'+ Z.GUIDE_INDEX +';position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:' +  this.window_h + 'px;background-color: rgba(0,0,0,0.6);">';
    guide_str += '  <img class="guide_img1" style="position: absolute;right:2%;bottom: 25%;width:50%" src="https://static.shiqichuban.com/assets/img/book/zhinan_pic_03.png"/>';
    guide_str += '</div>';
    self.document_body.append(guide_str);
    self.document.on(config.MOUSE_CLICK, '.gui_box', function (e) {
        e.stopPropagation();
        self.document.off(config.MOUSE_CLICK, '.gui_box');
        $(this).remove();
        self.commandChannel.postCommand(ModuleCommand.REMOVE_GUIDE);
    });
};