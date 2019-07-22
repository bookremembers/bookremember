/**
 * Created by naxiaoguang on 2017/3/28.
 */
function CatalogController(book, options, commandChannel) {
    this.document_body = options.document_body;
    this.document = options.document;
    this.commandChannel = commandChannel;
    this.window_h = options.window_h;
    this.device = options.device;
    this.status = options.status;
    this.action = options.action;
    this.book = book;
    this.catalog_pan_view = null;
    this.catalog_pan = null;
    this.catalog_item_container = null;
    this.isShow = false ;
    this.isScrolling = false;
    this.item_list_data = null;
    this.remove_list_data = null;
    this.isEdit = false;
    this.drag_target = null ;
    this.item_len = 0 ;
    this.long_touch_delta = 400 ;
    this.interval_time_delta = 200 ;
    this.delete_img = '     <img src="' + STATIC_DOMAIN + '/assets/img/icon/delete_icon.png" title="批量删除">';
    this.sort_img = '     <img src="' + STATIC_DOMAIN + '/assets/img/book/sort_catalog.png" title="排序">';
    this.confirm_img = '     <img src="' + STATIC_DOMAIN + '/assets/img/icon/confirm_icon.png" title="确认">';
}
CatalogController.prototype.setListData = function (data) {
    var self = this;
    self.item_list_data = data;
};
CatalogController.prototype.setRemoveArticleData = function (data) {
    var self = this;
    self.remove_list_data = data;
};
CatalogController.prototype.createView = function () {
    var self = this;
    if (self.catalog_pan_view) {
        return self;
    }
    self.catalog_pan_view = '';
    if (self.device == config.DEVICE_MOBILE){
        self.catalog_pan_view += '<div id="catalog_pan" class="col-xs-8 col-xs-offset-4" style="display:none;z-index:'+ Z.CATALOG_INDEX +';position:absolute;height:400px;bottom:80px;background-color:white;border-radius:5px;box-shadow: 0px 0px 10px #e8e8e8;">';
    }else{
        if(self.book.content_theme_type === 3){
            if (this.action === config.ACTION_SHARE){
                self.catalog_pan_view += '<div id="catalog_pan" style="display:none;z-index:'+ Z.CATALOG_INDEX +';position:absolute;bottom:-50%;right:100px;width:300px;height:400px;background-color:white;border-radius:5px;box-shadow: 0px 0px 10px #e8e8e8;">';
            }else{
                self.catalog_pan_view += '<div id="catalog_pan" style="display:none;z-index:'+ Z.CATALOG_INDEX +';position:absolute;bottom:25px;right:-300px;width:300px;height:400px;background-color:white;border-radius:5px;box-shadow: 0px 0px 10px #e8e8e8;">';
            }
        }else{
            self.catalog_pan_view += '<div id="catalog_pan" style="display:none;z-index:'+ Z.CATALOG_INDEX +';position:absolute;bottom:-50%;right:100px;width:300px;height:400px;background-color:white;border-radius:5px;box-shadow: 0px 0px 10px #e8e8e8;">';
        }
    }
    self.catalog_pan_view += '<p style="width:100%;height:50px;border-bottom:1px solid #ccc;font-size:16px;text-align:center;line-height:50px;">目&nbsp&nbsp录</p>';
    self.catalog_pan_view += '<div id="catalog_item_container" style="width:100%;height:75%;overflow:auto;-webkit-overflow-scrolling:touch">';
    self.catalog_pan_view += '</div>';
    if (
        self.status == config.STATUS_EDIT && self.device == config.DEVICE_PC &&
        (self.book.type == config.BOOK_TYPE_SELF ||
        (self.book.type == config.BOOK_TYPE_GROUP && self.book.role == 1))
    ) {
        self.catalog_pan_view += '<p style="width:100%;height:50px;border-top:1px solid #ccc;text-align:center;">';
        self.catalog_pan_view += ' <span id="batch_catalog" style="float:right;width:18px;height:16px;cursor:pointer;margin:4%">';
        self.catalog_pan_view += self.delete_img ;
        self.catalog_pan_view += ' </span>';
        self.catalog_pan_view += ' <span id="sort_catalog" style="float:right;width:18px;height:16px;cursor:pointer;margin:4%">';
        self.catalog_pan_view += self.sort_img ;
        self.catalog_pan_view += ' </span>';
        self.catalog_pan_view += '</p>';
    } else
        self.catalog_pan_view += '<p style="width:100%;height:50px;border-top:1px solid #ccc;text-align:center;"></p>';
    self.catalog_pan_view += '</div>';
    return self;
};
CatalogController.prototype.addTo = function (parent) {
    var self = this;
    if (parent) {
        if (self.catalog_pan == null) {
            parent.append(self.catalog_pan_view || '');
            self.catalog_pan = $('#catalog_pan');
            self.catalog_item_container = $('#catalog_item_container');
            self.updateItemList(self.item_list_data.catalogs, self.item_list_data.pre_page_count);
            self.addFlipEvent();
            if (self.status == config.STATUS_PREVIEW) {
            }
            else if (self.status == config.STATUS_EDIT)
                self.addEditEvent();
        }
    }
};
CatalogController.prototype.showCatalog = function () {
    var self = this;
    self.isShow = true ;
    self.catalog_pan.show();
};
CatalogController.prototype.hideCatalog = function () {
    var self = this;
    if(self.drag_target)return ;
    self.catalog_pan.hide();
    self.isShow = false ;
};
CatalogController.prototype.updateItemList = function (item_array, pre_page_count) {
    var self = this;
    self.item_len = item_array.length ;
    var catalog_list = '';
    for (var i in item_array) {
        var page = item_array[i].page;
        var content_id = item_array[i].content_ids;
        var title = item_array[i].catalog;
        var index = item_array[i].index;
        var cell = '';
        cell += '<div class="catalog_item" origin_sort="'+ i +'" index="'+ index +'" content_id="' + content_id + '" page="' + page + '" flipPage="' + (page + pre_page_count) + '" style="width:100%;height:30px;cursor:pointer;overflow: hidden;padding:0 5%;">';
        cell += '   <p class="catalog_jump" style="float:left;width:80%;height:100%;line-height:30px;letter-spacing:1px;font-size:14px;white-space:nowrap;text-overflow:ellipsis;overflow: hidden; " >' + title + '</p>';
        cell += '   <p class="catalog_page" disabled="disabled" style="float:right;line-height:30px">' + page + '</p>';
        cell += '</div>';
        catalog_list += cell;
    }
    if (self.catalog_item_container) {
        self.catalog_item_container.children().remove();
        self.catalog_item_container.append(catalog_list);
    }
};
CatalogController.prototype.addFlipEvent = function () {
    var self = this;
    if (self.device == config.DEVICE_MOBILE) {
        self.catalog_item_container.on(config.EVENT_SCROLL, function () {
            self.isScrolling = true;
        });
        $('.catalog_item').on(config.TOUCHE_END, self.clickCatalogItem.bind(this));
    } else if (self.device == config.DEVICE_PC) {
        $('.catalog_item')
            .on(config.MOUSE_ENTER, function (e) {
                e.stopPropagation();
                if (!$(this).hasClass('catalog_item_selected')) {
                    $(this).css('background', '#f2f2f2');
                }
            }).on(config.MOUSE_LEAVE, function (e) {
            e.stopPropagation();
            if (!$(this).hasClass('catalog_item_selected')) {
                $(this).css('background', 'none');
            }
        });
        if (self.status == config.STATUS_PREVIEW)
            $('.catalog_item').on(config.MOUSE_CLICK, self.clickCatalogItem.bind(this));
    }
};
CatalogController.prototype.clickCatalogItem = function (e) {
    e.stopPropagation();
    var self = this;
    if (e.type == config.TOUCHE_END) {
        if (self.isScrolling == true) {
            var timerNUm = setTimeout(function () {
                clearTimeout(timerNUm);
                self.isScrolling = false;
            }, 400);
        } else
            self.updateSelectedItem($(e.currentTarget));
    } else if (e.type == config.MOUSE_CLICK) {
        self.updateSelectedItem($(e.currentTarget));
    }
};
CatalogController.prototype.updateSelectedItem = function (item) {
    var self = this;
    var page = parseInt(item.attr('page'));
    $('.catalog_item_selected')
        .removeClass('catalog_item_selected')
        .css('background-color', 'white');
    item
        .addClass('catalog_item_selected')
        .css('background-color', '#e8e8e8');
    self.commandChannel.postCommand(BookCommand.FLIP_TO_PAGE, {content_page: page});
};
CatalogController.prototype.addEditEvent = function () {
    var self = this;
    var start_time = 0;
    var timer;
    var range = {x: 0, y: 0};//鼠标元素偏移量
    var lastPos = {x: 0, y: 0, x1: 0, y1: 0}; //拖拽对象的四个坐标
    var tarPos = {x: 0, y: 0, x1: 0, y1: 0}; //目标元素对象的坐标初始化
    var move = false;//拖拽对象 拖拽状态
    var theDivId = 0, theDivHeight = 0, theDivHalf = 0, tarFirstY = 0; //拖拽对象的索引、高度、的初始化。
    var tarDiv = null, tarFirst, tempDiv;  //要插入的目标元素的对象, 临时的虚线对象
    var can_sort = false ;
    $('#batch_catalog').on(config.MOUSE_CLICK, function (e) {
        e.stopPropagation();
        var status = $(this).attr("status");
        if (status == null) {
            if( self.isEdit == true){
                showAlert('有操作未完成');
                return ;
            }
            self.isEdit = true;
            $(this).attr("status", '1');
            $(this).html(self.confirm_img);
            var len = $('.catalog_item').length;
            $('.catalog_item').each(function (index, value) {
                var content_id = $(value).attr('content_id');
                if (self.remove_list_data && self.remove_list_data[content_id])
                    $(value).prepend('<input class="input_item" content_id="' + content_id + '" type="checkbox" checked="checked" style="float:left;margin:10px 5px 10px 0;">');
                else
                    $(value).prepend('<input class="input_item" content_id="' + content_id + '" type="checkbox" style="float:left;margin:10px 5px 10px 0;">');
                if (index == len - 1) {
                    $('.input_item').on(config.MOUSE_CLICK, function (e) {
                        e.stopPropagation();
                        var is_sel = $(this).prop('checked');
                        var contend_id = $(this).attr('content_id');
                        if (is_sel == true) {
                            self.commandChannel.postCommand(BookCommand.REMOVE_CONTENT, {content_id: contend_id});
                        } else {
                            if (self.remove_list_data[contend_id]) {
                                self.commandChannel.postCommand(BookCommand.RECOVER_CONTENT, {content_id: contend_id});
                            }
                        }
                    })
                }
            });
        } else if (status == '1') {
            self.isEdit = false ;
            $('.input_item').off(config.MOUSE_CLICK);
            $('.input_item').remove();
            $(this).removeAttr("status");
            $(this).html(self.delete_img);
        }
    });
    $('#sort_catalog').on(config.MOUSE_CLICK, function (e) {
        e.stopPropagation();
        var status = $(this).attr("status");
        if (status == null) {
            if( self.isEdit == true){
                showAlert('有操作未完成');
                return ;
            }
            self.isEdit = true ;
            can_sort = true ;
            $('.catalog_page').html('<img src="https://static.shiqichuban.com/assets/img/book/catalog_line.png"/>') ;
            $(this).attr("status", '1');
            $(this).html(self.confirm_img);
        }else if(status == '1'){
            can_sort = false ;
            self.isEdit = false ;
            $(this).removeAttr("status");
            $(this).html(self.sort_img);
            $('.catalog_page').each(function(index,value){
                $(this).html($(this).parent().attr('page'))
            });
        }
    });
    $('.catalog_item').on(config.MOUSE_DOWN, function (event) {
        event.stopPropagation();
        event.preventDefault();
        var item = $(this);
        if(!can_sort){
            self.updateSelectedItem(item);
            return ;
        }
        timer = setInterval(function () {
            start_time += self.interval_time_delta;
            if (start_time > self.long_touch_delta) {
                clearInterval(timer);
                self.drag_target = item ;
                self.drag_target.css('border','1px dotted red');
                //鼠标元素相对偏移量
                range.x = event.pageX - self.drag_target.offset().left;
                range.y = event.pageY - self.drag_target.offset().top;
                theDivId = self.drag_target.index();
                theDivHeight = self.drag_target.height();
                theDivHalf = theDivHeight / 2;
                move = true;
                // 创建新元素 插入拖拽元素之前的位置(虚线框)
                $("<div class='dash' style='background-color: red;height:1px'></div>").insertBefore(self.drag_target);
                tempDiv = $(".dash"); //获得临时 虚线框的对象
            }
        }, self.interval_time_delta)
    });
    $(document).mousemove(function (event) {
        event.stopPropagation();
        if (!move) return false;
        if(!self.drag_target)return ;
        lastPos.x = event.pageX - range.x;
        lastPos.y = event.pageY - range.y;
        // lastPos.y1 = lastPos.y + theDivHeight;
        // 拖拽元素随鼠标移动
        self.drag_target.css({left: lastPos.x + 'px', top: lastPos.y + 'px'});
        // 拖拽元素随鼠标移动 查找插入目标元素
        var $main = $('.catalog_item'); // 局部变量：按照重新排列过的顺序  再次获取 各个元素的坐标，
        $main.each(function () {
            tarDiv = $(this);
            tarPos.x = tarDiv.offset().left;
            tarPos.y = tarDiv.offset().top;
            if(lastPos.y >= tarPos.y && lastPos.y <= tarPos.y + theDivHalf){
                tempDiv.insertAfter(tarDiv);
            }else if(lastPos.y > tarPos.y - theDivHalf && lastPos.y <= tarPos.y + theDivHeight){
                tempDiv.insertBefore(tarDiv);
            }
        });
    }).mouseup(function (event) {
        event.stopPropagation();
        clearInterval(timer);
        if (start_time > self.long_touch_delta){
            start_time = 0 ;
            if (self.drag_target) {
                self.drag_target.css('border','none');
                self.drag_target.insertBefore(tempDiv);  // 拖拽元素插入到 虚线div的位置上
                tempDiv.remove(); // 删除新建的虚线div
                tempDiv = null ;
                move = false;
                var timeout = setTimeout(function(){
                    clearTimeout(timeout) ;
                    self.drag_target = null ;
                    var sort = [] ;
                    var hasChange = false ;
                    $('.catalog_item').each(function(index,value){
                        var origin_index = parseInt($(value).attr('index'));
                        var origin_sort = parseInt($(value).attr('origin_sort'));
                        sort.push(origin_index);
                        if(origin_sort != (index)){
                            hasChange = true ;
                        }
                        if(index == (self.item_len - 1)){
                            self.commandChannel.postCommand(BookCommand.SORT_CATALOG,{sort:sort,hasChange:hasChange});
                        }
                    });
                },self.interval_time_delta);
            }
        }else{
            start_time = 0 ;
            if(self.drag_target){
                self.updateSelectedItem(self.drag_target);
                var timeout = setTimeout(function(){
                    self.drag_target = null ;
                    clearTimeout(timeout) ;
                },self.interval_time_delta)
            }else{
                if(
                    event.target.className == "catalog_jump" ||
                    event.target.className == "catalog_page"
                ){
                    self.updateSelectedItem($(event.target).parent());
                }else if(event.target.className == "catalog_item"){
                    self.updateSelectedItem($(event.target));
                }
            }
        }
    });
};
CatalogController.prototype.check = function (content_id) {
    $('.input_item[content_id=' + content_id + ']').prop('checked', true);
};
CatalogController.prototype.unCheck = function (content_id) {
    $('.input_item[content_id=' + content_id + ']').prop('checked', false);
};
