/**
 * Include /assets/js/bootstraps3/bootstrap-datetimepicker.js',
 * Include /assets/js/bootstraps3/bootstrap-datetimepicker.zh-CN.js',
 * Include /assets/css/bootstrap3/bootstrap-datetimepicker.css',
 *
 * get book startTime and endTime--------
 *      BookDataHandler.getBookCreateTime(book_id,callback,err_callback)
 *      startTime: data.ctime_start.split(" ")[0]
 *      endTime: data.ctime_end.split(" ")[0]
 * set division--------------------------
 *      BookDataHandler.setBookDivision(book_id,start_time,end_time,book_title,callback,err_callback)
 *
 * var bookDivisionPlugin = new BookDivisionPlugin();
 * bookDivisionPlugin.onCancelClickHandler = function(){};
 * bookDivisionPlugin.onCancelClickHandler = function(){};
 * bookDivisionPlugin.setRangePage(min,max).setTitle(title).addView().registerEvent();
 * bookDivisionPlugin.setRangeTime(startTime,endTime).setTitle(title).addView().registerEvent();
 * bookDivisionPlugin.show();
 * bookDivisionPlugin.hide();
 * bookDivisionPlugin.destroy();
 */

function BookDivisionPlugin(){
    this._startValue = 0 ;
    this._endValue = 0 ;
    this._byType = 1 ;// 1按时间 2按页
    this._tip = "";
    this._title = "" ;
    this._maxTitleLength = 10 ;
    this.onSubmitClickHandler = null ;
    this.onCancelClickHandler = null ;
    this.BOOK_DIVISION_TYPE = {
        BY_TIME:1,
        BY_PAGE_NUM:2,
    };
}
BookDivisionPlugin.prototype.getRange = function(){
    return {
        start: $("#book-division-plugin .start-text").val() ,
        end: $("#book-division-plugin .end-text").val() ,
    }
};
BookDivisionPlugin.prototype.getTitle = function(){
    return  $("#book-division-plugin .new-title").val() ;
};
/**
 * @param value 最大页数
 */
BookDivisionPlugin.prototype.setRangePage = function(min,max){
    this._startValue = min ;
    this._endValue = max ;
    this._byType = this.BOOK_DIVISION_TYPE.BY_PAGE_NUM ;
    this.updateTip();
    this.updateRangeValue(min,max);
    return this ;
};
/**
 * @param startTime 按时间分册的起始时间
 * @param endTime 按时间分册的结束时间
 */
BookDivisionPlugin.prototype.setRangeTime = function(startTime,endTime){
    this._startValue = startTime ;
    this._endValue = endTime ;
    this._byType = this.BOOK_DIVISION_TYPE.BY_TIME ;
    this.updateTip();
    this.updateRangeValue(startTime,endTime);
    return this ;
};
/**
 * 设置区间起始值
 * @param startValue
 * @param endValue
 * @returns {BookDivisionPlugin}
 */
BookDivisionPlugin.prototype.updateRangeValue = function(startValue,endValue){
    if($("#book-division-plugin").length > 0){
        $("#book-division-plugin .start-text").val(startValue) ;
        $("#book-division-plugin .end-text").val(endValue) ;
    }
    return this ;
};
/**
 * 分册类型，时间或者页码
 * @param value  BookDivisionPlugin.BOOK_DIVISION_TYPE.BY_TIME || BookDivisionPlugin.BOOK_DIVISION_TYPE.BY_PAGE_NUM
 */
BookDivisionPlugin.prototype.updateTip = function(){
    this._tip = ((this._byType ===  this.BOOK_DIVISION_TYPE.BY_TIME) ? "通过时间节选文章" : "通过页数进行分册") + "，再创建一本书";
    if($("#book-division-plugin").length > 0){
        $("#book-division-plugin").find(".modify_title").html(this._tip) ;
    }
    return this ;
};
BookDivisionPlugin.prototype.setTitle = function(value){
    this._title = value ;
    if($("#book-division-plugin").length > 0){
        $("#book-division-plugin").find(".new-title").val(this._title) ;
    }
    return this ;
};
/**
 * 显示视图
 * @param defaultTitle 书的默认名字
 * @returns {string}
 */
BookDivisionPlugin.prototype.addView = function(){
    var self = this ;
    if($("#book-division-plugin").length === 0){
        var view='';
        view += '<div id="book-division-plugin" style="z-index:999999;width:100%;position: fixed;top:0;left: 0;background-color: rgba(0,0,0,0.5); height:' + $(document).height() + 'px;">';
        view +=       '<div class="modify_pan" style="width:460px;position:fixed;top: 30%;left: 50%;margin-left: -200px;padding: 24px 40px;border-radius:10px;background-color: #fff;">';
        view +=            '<div class="modify_title" style="font-size: 18px;color:#2c2c2c;margin-bottom: 20px;height:24px;line-height: 24px">';
        view +=             this._tip;
        view +=             '</div>' ;
        view +=             '<div class="modify_time" style="margin-bottom:25px;font-size:0;">';
        view +=                 '<p style="font-size:14px;color:#454545;margin-bottom:20px;">请选择</p>';
        view +=                 '<p class="time_content" style="position:relative;margin-bottom:20px">';
        if(this._byType === this.BOOK_DIVISION_TYPE.BY_TIME){
            view +=                     '<input type="datetime" data-format="yyyy-MM-dd" class="start-text" readonly value="' + ((self._startValue).split(" ")[0]) + '" style="display:inline-block;width:160px;line-height:26px;border:1px solid #c3c3c3;border-radius:10px;text-align:center;cursor:pointer;color:#5d5c5c;letter-spacing:2px;font-size:14px;"> ';
            view +=                     '<span style="display:inline-block;vertical-align:middle;width:40px;margin:0 10px 10px 10px;height:1px;background-color:#c3c3c3;overflow:hidden;"></span>';
            view +=                     '<input type="datetime" data-format="yyyy-MM-dd" class="end-text" readonly value="' + (self._endValue.split(" ")[0]) + '" style="display:inline-block;width:160px;line-height:26px;border:1px solid #c3c3c3;border-radius:10px;text-align:center;cursor:pointer;color:#5d5c5c;letter-spacing:2px;font-size:14px;">';
        }else if(this._byType === this.BOOK_DIVISION_TYPE.BY_PAGE_NUM){
            view +=                     '<input onafterpaste="this.value=this.value.replace(/\\D/g,\'\')" class="start-text" value="' + this._startValue + '" style="display:inline-block;width:160px;line-height:26px;border:1px solid #c3c3c3;border-radius:10px;text-align:center;cursor:pointer;color:#5d5c5c;letter-spacing:2px;font-size:14px;"> ';
            view +=                     '<span style="display:inline-block;vertical-align:middle;width:40px;margin:0 10px 10px 10px;height:1px;background-color:#c3c3c3;overflow:hidden;"></span>';
            view +=                     '<input onafterpaste="this.value=this.value.replace(/\\D/g,\'\')" class="end-text" value="' + this._endValue + '" style="display:inline-block;width:160px;line-height:26px;border:1px solid #c3c3c3;border-radius:10px;text-align:center;cursor:pointer;color:#5d5c5c;letter-spacing:2px;font-size:14px;">';
        }
        view +=                 '</p>' ;
        view +=                 '<p style="font-size:14px;color:#454545;margin-bottom:20px;">点击可修改书名:</p>';
        view +=                 '<p style="font-size:14px;margin-bottom:0"><input class="new-title" style="border:none;background:#eee;color:#666;font-size:12px;line-height:32px;border-radius:6px;padding-left:5px;width:300px" type="text" value="'+ this._title +'"></p>';
        view +=            '</div>' ;
        view +=            '<div class="modify_operation" style="margin-bottom:10px;text-align: center;border-top:1px solid #ccc;padding-top:20px">' ;
        view +=                 '<span class="cancel" style="display:inline-block;font-size:12px;line-height:30px;border-radius:15px;background:#ccc;padding:0 26px;color:#fff;margin-right:10px;cursor:pointer;">';
        view +=                      '取消';
        view +=                 '</span>' ;
        view +=                 '<span class="submit" style="display: inline-block;font-size:12px;line-height: 30px;border-radius: 15px;background: #000;padding: 0 26px;color: #fff;margin-left: 10px;cursor: pointer;">';
        view +=                      '点击创建';
        view +=                 '</span>' ;
        view +=              '</div>' ;
        view +=       '</div>' ;
        view += '</div>' ;
    }
    $(document.body).append(view) ;
    if(this._byType ===  this.BOOK_DIVISION_TYPE.BY_TIME){
        var config = {
            format: 'yyyy-mm-dd',
            language: 'fr',
            weekStart: 1,
            autoclose: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        };
        $('#book-division-plugin .start-text').datetimepicker(config);
        $('#book-division-plugin .end-text').datetimepicker(config);
    }
    return this ;
};
/**
 * 显示
 */
BookDivisionPlugin.prototype.show = function(){
    $("#book-division-plugin").show();
    return this ;
};
/**
 * 隐藏
 */
BookDivisionPlugin.prototype.hide = function(){
    $("#book-division-plugin").hide();
    return this ;
};
/**
 * 销毁
 */
BookDivisionPlugin.prototype.destroy = function(){
    if(this._byType ===  this.BOOK_DIVISION_TYPE.BY_TIME){
        $('#book-division-plugin .start-text').datetimepicker('remove');
        $('#book-division-plugin .end-text').datetimepicker('remove');
    }
    $("#book-division-plugin").off("click");
    $("#book-division-plugin").off("focusout");
    $("#book-division-plugin").off("compositionstart");
    $("#book-division-plugin").off("compositionend");
    $("#book-division-plugin").remove();
    return this ;
};
/**
 * 注册按钮点击事件，输入框时间
 */
BookDivisionPlugin.prototype.registerEvent = function(){
    var self = this ;
    var input_status = false;
    $("#book-division-plugin").on("click", ".submit", function (event) {
        event.stopPropagation();
        event.preventDefault();
        var startValue = $("#book-division-plugin .start-text").val();
        var endValue = $("#book-division-plugin .end-text").val();
        if(self.checkValue(startValue,endValue) === false){
            showAlert("输入数值错误!");
            return ;
        }
        var newTitle = $("#book-division-plugin .new-title").val();
        if(self.onSubmitClickHandler)
            self.onSubmitClickHandler(startValue,endValue,newTitle) ;
    }).on("click", ".cancel", function (event) {
        event.stopPropagation();
        event.preventDefault();
        if(self.onCancelClickHandler)
            self.onCancelClickHandler() ;
    }).on('focusout', '.new-title', function (event) {
        event.stopPropagation();
        event.preventDefault();
        var inputTitle = $(this).val();
        var data = self.subInputTitle(inputTitle);
        $(this).val(data.value);
    }).on('compositionstart', '.new-title', function (event) {
        event.stopPropagation();
    }).on('compositionend', '.new-title', function (event) {
        event.stopPropagation();
    });

    if(this._byType ===  this.BOOK_DIVISION_TYPE.BY_PAGE_NUM){
        $("#book-division-plugin .start-text").keyup(function(){
            var minValue = this.value.replace(/\D/g,'') ;
            $("#book-division-plugin .start-text").val(minValue) ;
        });
        $("#book-division-plugin .end-text").keyup(function(){
            var maxValue= this.value.replace(/\D/g,'') ;
            $("#book-division-plugin .end-text").val(maxValue) ;
        });
    }
    return this ;
};
BookDivisionPlugin.prototype.checkValue = function(startValue,endValue){
    if(startValue < this._startValue || startValue > this._endValue) return false ;
    if(endValue < this._startValue || endValue > this._endValue) return false ;
    if(startValue > endValue) return false ;
    return true ;
};
/**
 * 标题字数计算
 * @param text
 * @returns {{value: string, num: number}}
 */
BookDivisionPlugin.prototype.subInputTitle = function (text) {
    var num = 0, str_val = '';
    for (var i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 255) {
            num += 1;
            str_val += text[i];
        } else {
            str_val += text[i];
            num += 0.5;
        }
        if (num >= this._maxTitleLength) {
            break;
        }
    }
    return {
        value: str_val,
        num: num
    };
};