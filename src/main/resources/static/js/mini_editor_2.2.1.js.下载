/**
 * Created by naxiaoguang on 6/14/16.
 */


var MyKindEditor = function (options) {

    var width = options.width;
    var height = options.height;
    var token = options.token;
    var dateTime = options.dateTime ;
    var audioHandler = options.audioHandler ;
    var items = options.items || ['upload_pic', 'upload_audio','|', 'justifyleft', 'justifycenter' ,'justifyright','|','fontname','forecolor'] ;

    var ke = this;
    var interval;
    var createComCallback;
    var isTopLevel = false;

    var _viewController = new EditorViewController();
    var _dataController = new EditorDataController();
    var _fileController = new EditorFileController();
    var _imageController = new BookImageEditController();
    var _editorManager = new EditorManager(ke,_dataController,_fileController,_imageController);

    this.initMini = function (selector,callback) {
        var keContent = "img{max-width:100%}";
        createComCallback = callback ;
        ke.editor = KindEditor.create(selector, {
            width: width,
            height: height,
            resizeType: 0,
            pasteType: 1,
            items: items,
            themesPath: KindEditor.basePath + 'themes/',
            themeType: 'shiqimini',
            cssData: keContent,
            extraFileUploadParams: {
                _token: token,
                category_id: 1
            },
            allowFileManager: false,
            allowImageRemote: false,
            minHeight: height,
            layout: _viewController.getMiniEditorLayout(options.save_box, options.save_book),
            afterCreate: ke.createMiniCom,
            afterChange:ke.afterChange
        });

        KindEditor.plugin('upload_pic', function (K) {
            var self = this, name = 'upload_pic';
            self.clickToolbar(name, function () {
                $('#file_input').trigger('click');
            });
        });
        KindEditor.plugin('upload_audio', function (K) {
            var self = this, name = 'upload_audio';
            self.clickToolbar(name, function () {
                if(_editorManager && _editorManager.checkOutOfAudioLimit() === true){
                    showConfirm("音频超出个数限制",null,null,null,null,'ok');
                    return ;
                }
                if(audioHandler)
                    audioHandler()
            });
        });

        Fetcher.fetchData(
            "/v1/font/list",
            null,
            'get',
            null,
            function (data) {
                var fonts = data.fonts ;
                var fonts_data = {};
                for(var i in fonts){
                    var font_name = fonts[i].font_name ;
                    fonts_data[font_name] = font_name;
                }

                KindEditor.lang({
                    upload_pic: '上传图片',
                    upload_audio: '上传音频',
                    'fontname.fontName' : fonts_data,
                });
            },
            function () {}
        );
    };

    this.enableUploadImageBtn = function(value){
        if(value === true)
            $("#mini-editor-pan").find("[data-name='upload_pic']").show();
        else if(value === false)
            $("#mini-editor-pan").find("[data-name='upload_pic']").hide();
    };

    this.enableAudioBtn = function(value){
        if(value === true)
            $("#mini-editor-pan").find("[data-name='upload_audio']").show();
        else if(value === false)
            $("#mini-editor-pan").find("[data-name='upload_audio']").hide();
    };
    this.enableAlignLeftBtn = function(value){
        if(value === true)
            $("#mini-editor-pan").find("[data-name='justifyleft']").show();
        else if(value === false)
            $("#mini-editor-pan").find("[data-name='justifyleft']").hide();
    };
    this.enableAlignCenterBtn = function(value){
        if(value === true)
            $("#mini-editor-pan").find("[data-name='justifycenter']").show();
        else if(value === false)
            $("#mini-editor-pan").find("[data-name='justifycenter']").hide();
    };
    this.enableAlignRightBtn = function(value){
        if(value === true)
            $("#mini-editor-pan").find("[data-name='justifyright']").show();
        else if(value === false)
            $("#mini-editor-pan").find("[data-name='justifyright']").hide();
    };
    this.enableFontNameBtn = function(value){
        if(value === true)
            $("#mini-editor-pan").find("[data-name='fontname']").show();
        else if(value === false)
            $("#mini-editor-pan").find("[data-name='fontname']").hide();
    };
    this.enableFontColorBtn = function(value){
        if(value === true)
            $("#mini-editor-pan").find("[data-name='forecolor']").show();
        else if(value === false)
            $("#mini-editor-pan").find("[data-name='forecolor']").hide();
    };


    this.setLimit = function(img_num,audio_num,audioDuration,video_num,videoDuration,_isTopLevel){
        isTopLevel = _isTopLevel !== 0 ;
        _editorManager.setLimit(img_num,audio_num,audioDuration,video_num,videoDuration);
    };

    this.clearFile = function(){
        $('.file_input').val('');
    };

    this.setTitle = function (val){
        $('#title-input').val(val) ;
    };

    this.getTitle = function(){
        return $('#title-input').val() ;
    };

    this.afterChange = function(){
        _editorManager.afterChange();
    };

    this.setMiniDate = function(date){
        clearInterval(interval);
        ke.setTimeDate(date) ;
    };

    this.clearMiniDate = function(){
        clearInterval(interval);
        interval = setInterval(ke.setTimeDate, 1000)
    };

    this.createMiniCom = function () {
        _editorManager.setFontStyle();
        ke.addThumbPreviewContainer();
        ke.addDateTimePicker();
        ke.refreshView();
        _editorManager.enableVideoImagePlay();
        _editorManager.enableImageEdit();
        _editorManager.setTitleChangeEvent();
        var ke_frame = $(".ke-edit-iframe").contents().find(".ke-content").get(0);
        var drag_area_mask ;
        document.addEventListener('dragenter',function(e){
            if (!drag_area_mask) {
                createArea('拖拽图片至此区域');
            } else {
                $(drag_area_mask).html('拖拽图片至此区域');
                $(drag_area_mask).show();
            }
        });

        ke_frame.addEventListener('dragenter',function(e){
            if (!drag_area_mask) {
                createArea('释放鼠标');
            } else {
                $(drag_area_mask).html('释放鼠标');
                $(drag_area_mask).show();
            }
        });

        $('#file_input').change(function(e){
            ke.selectFile(e);
        });

        //扔下
        ke_frame.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(drag_area_mask).hide();
            ke.selectFile(e);
        }, false);

        function createArea(text){
            $(ke_frame).css('position', 'relative');
            $(ke_frame).append('<div class="drag_area_mask" disabled="disabled"  style="position:absolute;top:0;left:0;width:100%;height:100%;line-height:200px;background-color: rgba(0,0,0,0.2);text-align: center">'+ text +'</div>');
            //拖离
            drag_area_mask = $(ke_frame).find('.drag_area_mask').get(0);

            drag_area_mask.addEventListener("dragenter",function(){
                $(drag_area_mask).html('释放鼠标');
            })
        }
        createComCallback();
    };

    this.addThumbPreviewContainer = function(){
        $('.ke-toolbar').append('<div id="pic_preview"><div id="thumb_preview"></div></div>');
    };

    this.refreshView = function(){
        //ios上编辑器被图片冲长问题解决
        $('.ke-edit').css({
            'height':($(window).height() - 300) + 'px',
            '-webkit-overflow-scrolling': 'touch'})
    };

    this.addDateTimePicker = function () {
        $('.ke-toolbar').append(_viewController.getMiniDataTimePicker(true));
        if (dateTime) {
            if (dateTime.indexOf('-') > -1) {
                var date = dateTime;
            } else {
                var date = new Date(parseInt(dateTime)).toLocaleDateString().replace(/\//g, "-");
            }
            _editorManager.addDateTimePicker(date);
        } else {
            _editorManager.addDateTimePicker(getCurrentDate(true));
        }
    };

    this.setTimeDate = function (val) {
        if (!val)
            val = getCurrentDate();
        $('.ke-date-input').val(val.split(" ")[0]);
        $('.ke-date-input').attr('_time',val);
        $('.form_datetime').datetimepicker('update');
    };

    this.selectFile = function (e) {
        showLoading('正在添加文件...',true);
        var files = e.target.files || e.dataTransfer.files ;
        var length = files.length ;
        _fileController.readFile(files, function (items) {
            if (!items) {
                _editorManager.showStatus('您的浏览器不支持此操作,推荐使用chorme、firefox、safair浏览器', 'red');
                return;
            }
            _editorManager.showStatus('', 'black');
            _editorManager.checkoutOutLimit(items,function(type){
                var str = "" ;
                if(type === "img" || type === "video" || type === "video_dur"){
                    if(type === "img")
                        str = "图片数量" ;
                    else if(type === "video")
                        str = "视频数量" ;
                    else if(type === "video_dur")
                        str = "视频时长" ;

                    if(isTopLevel === true){
                        str += "已达上限" ;
                    }else{
                        str += "已经超出限制～,申请或升级会员可享受更多权利" ;
                    }
                    showLoading("",false);
                    showConfirm(str,null,null,function(){
                    },function(){
                    },'ok');
                    ke.clearPreviewData();

                }else{
                    for (var index in items) {
                        (function(i){
                            var type = items[i].type;
                            if (type === "video")
                                $('#thumb_preview').append(_viewController.create_preview_thumb(items[i].thumb, items[i].origin, items[i].file_id, items[i].video_url));
                            else{
                                $('#thumb_preview').append(_viewController.create_preview_thumb(items[i].thumb, items[i].origin, items[i].file_id));
                            }
                        })(index)
                    }
                    _editorManager.insertImage(ke.editor, function(){
                        $('#thumb_preview').children().remove();
                        $('#file_input').val('');
                        showLoading('',false);
                    });
                }
            });

        },function(count){
            _editorManager.showStatus('读取图片进度:' + count + "/" + length, 'black');
        })
    };


    this.setContent =function(content){
        _editorManager.setContent(content);
    };

    this.getContent =function(){
        return _editorManager.getFormatContent();
    };

    this.addVideoPlayBtnToContent = function(){
        _editorManager.addVideoPlayBtnToContent();
    };

    this.initAudioClickEvent = function(){
        _editorManager.initAudioClickEvent();
    };

    this.formatContent = function(width){
        _editorManager.formatContent();
        _editorManager.scaleForAll(width);
    };

    this.uploadMediaFile= function(article_content,callback){
        _editorManager.showStatus('上传文件...');
        var self = this ;
        _editorManager.doVideoUpload($('<div>' + self.getContent() + '</div>'), function () {
            _editorManager.doImageUpload($('<div>' + self.getContent() + '</div>'), function () {
                callback();
            });
        });
    };

    this.showStatus = function (msg, color) {
        _editorManager.showStatus(msg, color);
    };

    this.stopMusic = function () {
        _editorManager.stopMusic();
    };

    this.addListItem = function(data){
        if(_editorManager.checkOutOfAudioLimit(data.length) === true){
            showConfirm("音频数量已经超出限制～,申请或升级会员可享受更多权利",null,null,function(){
                showLoading("",false);
            },function(){
                showLoading("",false);
            },'ok');
        }else{
            for(var i in data){
                ke.editor.insertHtml(data[i]);
                _editorManager.scaleForAll();
                _editorManager.setCSSStyle();
            }
        }
    };

    this.clearPreviewData = function(){
        $('#thumb_preview').children().remove();
        $('#file_input').val('');
        $('#pic_preview').hide();
    }
};
