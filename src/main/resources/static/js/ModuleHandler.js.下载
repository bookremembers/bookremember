/**
 * Created by naxiaoguang on 2017/3/29.
 */
function ModuleHandler(book,book_controller,book_manager){
    this.processList = [
        {command:ModuleCommand.START,call:this.start.bind(this)},
        {command:ModuleCommand.REMOVE_GUIDE,call:this.removeGuide.bind(this)},
        {command:ModuleCommand.ADD_CATALOG,call:this.addCatalog.bind(this)},
        {command:ModuleCommand.ADD_STEP_BTN,call:this.addStepBtn.bind(this)},
        {command:ModuleCommand.SHOW_CATALOG,call:this.showCatalog.bind(this)},
        {command:ModuleCommand.SHOW_AUDIO_LIST,call:this.showAudioList.bind(this)},
        {command:ModuleCommand.HIDE_CATALOG,call:this.hideCatalog.bind(this)},
        {command:ModuleCommand.TOGGLE_CATALOG,call:this.toggleCatalog.bind(this)},
        {command:ModuleCommand.SHOW_SINGLE_ING_EDIT_PAN,call:this.showSingleImageEditPan.bind(this)},
        {command:ModuleCommand.SHOW_SINGLE_ING_SCALE_PAN,call:this.showSingleImageScalePan.bind(this)},
        {command:BookCommand.SORT_CATALOG,call:this.sortCatalog.bind(this)},
        {command:BookCommand.FLIP_TO_PAGE,call:this.flipToPage.bind(this)},
        {command:BookCommand.GESTURE_FLIP_PAGE,call:this.gestureFlipPage.bind(this)},
        {command:BookCommand.REMOVE_CONTENT,call:this.removeBookContent.bind(this)},
        {command:BookCommand.RECOVER_CONTENT,call:this.recoverBookContent.bind(this)},
        {command:BookCommand.SUBMIT_BOOK_CHANGE,call:this.submitBookChange.bind(this)},
        {command:BookCommand.UPLOAD_EDIT_IMAGE,call:this.uploadEditImage.bind(this)},
        {command:BookCommand.BOOK_BG_MUSIC,call:this.bookBGMusic.bind(this)},//电子书背景音乐
        {command:BookCommand.BOOK_AUDIO_ACTION,call:this.bookAudioMusic.bind(this)},//电子书里文章
        {command:BookCommand.CANCEL_BOOK_AUDIO,call:this.cancelBGMusic.bind(this)},//电子书里文章
    ];
    this.book = book ;
    this.book_controller = book_controller ;
    this.book_manager = book_manager ;
    this.options = null ;
    this.isFetchingData = false ;
    this.bookMusicPlaying = false ;
    this.hasBookMusicAlreadyPlaying = false ;
    this.bgMusicPlaying = false ;
}
ModuleHandler.prototype.registerController = function(options,commandChannel){
    var self = this ;
    self.options = options ;
    if(self.options.action === config.ACTION_SHARE)
        self.guide_ctrl = new GuideController(options,commandChannel);//引导界面
    if(self.options.is_show_banner === config.SHOW_WECHAT_BANNER)
        self.wechat_ctrl = new WechatController(options,commandChannel);//微信分享的banner
    if (self.options.device !== config.DEVICE_APP) {
        self.catalog_ctrl = new CatalogController(self.book,options,commandChannel);
        self.step_btn_ctrl = new StepBtnController(self.book,options,commandChannel)
    }//目录控制器
    if(self.options.device === config.DEVICE_APP)return ;
    if(self.options.status === config.STATUS_EDIT){
        self.book_img_edit_ctrl = new BookImageEditController(self.book,options,commandChannel) ;
        self.editor_file_ctrl = new EditorFileController();
        self.editor_data_ctrl = new EditorDataController();
        self.audio_list_ctrl = new AudioListController();
    }//web端电子书图片编辑
};
ModuleHandler.prototype.start = function(vo){
    var self = this ;
    if(self.guide_ctrl)
        self.guide_ctrl.addGuide(vo);
    if(self.wechat_ctrl)
        self.wechat_ctrl.appendBanner($(document.body));
    if(self.book.type === config.BOOK_TYPE_GROUP){
        if(self.options.action === config.ACTION_SHARE){
            BookDataHandler.getBookAuthorsPublic(self.options.cipher,function(data){
                self.book_controller.setGroupBookUsers(data.users);
            },function(error){
            })
        }else{
            BookDataHandler.getBookAuthors(self.book.book_id,function(data){
                self.book_controller.setGroupBookUsers(data.users);
            },function(error){
            })
        }
    }
};
ModuleHandler.prototype.flipToPage = function(vo){
    var self = this ;
    var page = vo.content_page ;//正文不包含非正文页
    if(page)
        self.book_controller.turnToPage(self.book_controller.getFirstContentPage() + page - 1);
};
ModuleHandler.prototype.removeGuide = function(){};
ModuleHandler.prototype.submitBookChange = function(vo){
    var self = this ;
    if(self.isFetchingData === true)return;
    self.isFetchingData = true ;
    if(vo) {
        var content_ids = vo.content_ids;
        var images = vo.images;
        var delete_image_ids = vo.delete_image_ids;
        var delete_forward_ids = vo.delete_forward_ids;
    }
    var catalog_sort = self.book_controller.catalog_sort ;
    if(catalog_sort){
        BookDataHandler.resortCatalog(self.book.book_id,catalog_sort,function(data){
            self.book_controller.catalog_sort = null ;
            if(vo){
                self.deleteBookContent(content_ids,images,delete_image_ids,delete_forward_ids);
            }else{
                self.book_manager.reloadAfterDelete(self.book.book_id, data.minPage);
            }
        },function(error){
            self.isFetchingData = false ;
            if(error.err_code)
                showAlert(error.err_msg)
        });
    }else{
        if(vo){
            self.deleteBookContent(content_ids,images,delete_image_ids,delete_forward_ids);
        }
    }
};
ModuleHandler.prototype.deleteBookContent = function(content_ids,images,delete_image_ids,delete_forward_ids){
    var self = this ;
    if(self.book_controller.checkEditDataIsEmpty() === true)return ;
    BookDataHandler.deleteBookContent(self.book.book_id,content_ids,images,delete_image_ids,delete_forward_ids,function(data){
        self.book_manager.reloadAfterDelete(self.book.book_id, data.minPage);
    },function(error){
        self.isFetchingData = false ;
        if(error.err_code)
            showAlert(error.err_msg)
    });
};
ModuleHandler.prototype.removeBookContent = function(vo){
    var self = this ;
    self.book_controller.removeContentByID(vo.content_id,function(data){
        self.book_manager.changeSaveBtnDisplay(data);
    });
    if(self.catalog_ctrl)
        self.catalog_ctrl.check(vo.content_id);
};
ModuleHandler.prototype.recoverBookContent = function(vo){
    var self = this ;
    self.book_controller.recoverContentByID(vo.content_id,function(data){
        self.book_manager.changeSaveBtnDisplay(data);
    });
    if(self.catalog_ctrl)
        self.catalog_ctrl.unCheck(vo.content_id);
};
ModuleHandler.prototype.addCatalog = function(vo){
    var self = this ;
    if(self.catalog_ctrl){
        if(self.options.action === config.ACTION_SHARE){
            BookDataHandler.getPublicCatalogListData(self.options.cipher,self.options.view_type,function(data){
                self.catalog_ctrl.setListData(data);
                self.catalog_ctrl.createView().addTo(vo.parent) ;
            });
        }else{
            BookDataHandler.getCatalogListData(self.book.book_id,self.options.view_type,function(data){
                self.catalog_ctrl.setListData(data);
                self.catalog_ctrl.createView().addTo(vo.parent) ;
            });
        }
    }
};
ModuleHandler.prototype.toggleCatalog = function(){
    var self = this ;
 if(self.catalog_ctrl.isShow === false)
     self.catalog_ctrl.showCatalog();
 else
     self.catalog_ctrl.hideCatalog();
};
ModuleHandler.prototype.showCatalog = function(vo){
    var self = this ;
    if(self.catalog_ctrl){
        if(self.options.status === config.STATUS_EDIT){
            self.catalog_ctrl.setRemoveArticleData(self.book_controller.getDeleteArticleData());
        }
        self.catalog_ctrl.showCatalog();
    }
};
ModuleHandler.prototype.hideCatalog = function(vo){
    var self = this ;
    self.catalog_ctrl.hideCatalog();
};
ModuleHandler.prototype.sortCatalog = function(vo){
    var self = this ;
    var sort = vo.sort ;
    var hasChange = vo.hasChange ;
    if(hasChange)
        self.book_controller.catalog_sort = sort ;
    else
        self.book_controller.catalog_sort = null ;
    if(self.book_controller.checkEditDataIsEmpty() && hasChange == false)
        self.book_manager.hideSaveBtn();
    else
        self.book_manager.showSaveBtn();
};
ModuleHandler.prototype.showSingleImageEditPan = function(vo){
    var self = this ;
    var image_group_id = vo.image_group_id ;
    var content_id = vo.content_id ;
    if(self.isFetchingData === true)return ;
    self.isFetchingData = true ;
    BookDataHandler.getImageGroupList(self.book.book_id,content_id,image_group_id,function(data){
        self.isFetchingData = false ;
        self.book_img_edit_ctrl.setData(data,content_id,image_group_id);
        self.book_img_edit_ctrl.show(function(base64_image){
            var buffer = base64_image.split(',')[1];
            var type = base64_image.split(';')[0].split('/')[1];
            var blob = toBlob(buffer,type);
            if(blob){
                self.book_img_edit_ctrl.loadImage(base64_image,function(url,width,height){
                    self.uploadEditImage({
                        blob:blob,
                        width:width,
                        height:height,
                        content_id:self.book_img_edit_ctrl.current_content_id ,
                        image_group_id :self.book_img_edit_ctrl.current_image_group_id ,
                        image_id:self.book_img_edit_ctrl.current_selected_image_id,
                        pid:null,
                    });
                },function(error){
                    console.log(error);
                });
            }
        });
    },function(error){
        self.isFetchingData = false ;
    })
};
ModuleHandler.prototype.showSingleImageScalePan = function(vo){
    var self = this ;
    var image_group_id = vo.image_group_id ;
    var content_id = vo.content_id ;
    var data = {
        image_url:vo.image_url,
        image_group_id:vo.image_group_id,
        image_width:vo.image_width,
        image_height:vo.image_height,
    } ;
    self.book_img_edit_ctrl.setData(data,content_id,image_group_id,'scale');
    self.book_img_edit_ctrl.show(function(data){
        if(self.isFetchingData === true)return ;
        showLoading("正在保存修改",true);
        self.isFetchingData = true ;
        BookDataHandler.bookImageScale(data.book_id,data.content_id,data.group_id,data.width,data.height,function(data){
            self.book_manager.toReload(self.book.book_id,data.minPage + self.book_controller.flipBook.getFrontCoverPageNum());
        },function(error){
            showLoading("正在保存修改",false);
            self.isFetchingData = false ;
            showAlert('数据保存失败');
        })
    },"scale");
};
ModuleHandler.prototype.uploadEditImage = function(vo){
    var self = this ;
    if(self.book_img_edit_ctrl.isFetchingData === true)return ;
    showLoading('正在提交数据...',true);
    self.book_img_edit_ctrl.isFetchingData = true ;
    var file = vo.blob ;
    var image_group_id = vo.image_group_id ;
    var content_id = vo.content_id ;
    var image_id = vo.image_id ;
    var pid = vo.pid ;
    var width = vo.width ;
    var height = vo.height ;
    self.editor_file_ctrl.createFileMD5(file, function (content_md5){
        self.editor_data_ctrl.uploadImageToResServer(image_id,file,content_md5,'jpeg',function(image_id,data){
            var url = JSON.parse(data).url ;
            BookDataHandler.imageResize(self.book.book_id,content_id,image_group_id,image_id,pid,url,width,height,function(data){
                self.book_manager.toReload(self.book.book_id,data.minPage + self.book_controller.flipBook.getFrontCoverPageNum());
            },function(error){
                self.book_img_edit_ctrl.isFetchingData = false ;
                showLoading('正在提交数据...',false);
            })
        },function(error){
            self.book_img_edit_ctrl.isFetchingData = false ;
            showLoading('正在提交数据...',false);
        });
    });
};
ModuleHandler.prototype.addStepBtn = function(vo){
    var self = this ;
    if(self.options.status === config.STATUS_PREVIEW) {
        self.step_btn_ctrl.activeStepBtn(self.step_btn_ctrl.getPreviewStepBtnDis());
    }else{
        self.step_btn_ctrl.activeStepBtn(self.step_btn_ctrl.addEditStepBtnDis());
    }
    if(self.step_btn_ctrl && self.options.action !== config.ACTION_SHARE){
        self.step_btn_ctrl.playDefaultBgMusic();
    }
    self.book_manager.autoFixView();
};
ModuleHandler.prototype.gestureFlipPage = function(vo){
    var self = this ;
    var pos = vo.pos ;
    //手机上，如果显示目录的话就先隐藏目录
    if(self.options.device === config.DEVICE_MOBILE && self.catalog_ctrl.isShow)
        return self.hideCatalog();
    if(pos === -1)
        self.book_controller.flipPre();
    else if(pos === 1)
        self.book_controller.flipNext();
    else if(pos === 0){
        //隐藏或显示控制栏
        if(self.step_btn_ctrl && self.options.device === config.DEVICE_MOBILE){
            self.step_btn_ctrl.hideMobileStepBtn();
        }
    }
    if (self.options.device === config.DEVICE_APP) {
        noticeToApp('flipPage', self.book_controller.getCurrentPageNum() + ',' + self.book_controller.getFirstContentPage());
    }
};
ModuleHandler.prototype.showAudioList = function(vo){
    var self = this ;
    var type = vo.type ;
    var songs = [];
    self.audio_list_ctrl.setSelectType(type) ;
    self.audio_list_ctrl.setSelectedComEvent(function(data){
        if(type ==="single"){
            var url = $($('<div>' + data + '</div>').find('.shiqi_music_wrapper').get(0)).attr('music_url');
            BookDataHandler.setBookBGMusic(self.book.book_id,url,function(data){
                self.book_manager.toReload(self.book.book_id,data.minPage + self.book_controller.flipBook.getFrontCoverPageNum());
            });
        }else if(type === "multi"){
            if(self.options.status === config.STATUS_EDIT)
                self.book_manager.getEditor().addListItem(data);//想编辑器添加item元素
        }
    });
    //设置鼠标点击后的回调方法
    self.audio_list_ctrl.setClickCallback(function(){
        self.book_controller.bookAudioController.stopMusic();//停止电子书里的音乐
        if(self.options.status === config.STATUS_EDIT)
            self.book_manager.getEditor().stopMusic();//停止编辑器里的音乐
        if(self.step_btn_ctrl){
            self.step_btn_ctrl.stopMusic();
        }//停止电子书背景音乐
    });
    self.audio_list_ctrl.addView();
    self.audio_list_ctrl.getAudioListData(function(data){
        $('.audio_manage_pan').css('z-index',parseInt($('.edit_first_pan').css('z-index')) + 1);
        if(type ==="single"){
            if(self.book.bg_music !== null && self.book.bg_music !== ""){
                BookDataHandler.getMusicDetailByUrl(self.book.bg_music,function(default_data){
                    songs.push(default_data);
                    songs.push({
                        "name": '不添加音乐',
                        "singer": '',
                        "online_url": '',
                        "album": '',
                        "image": '',
                        "interval": 0,
                    });
                    self.audio_list_ctrl.addListData(songs.concat(data.songs));
                    self.audio_list_ctrl.setAudioListClickEvent();
                })
            }else{
                self.audio_list_ctrl.addListData(data.songs);
                self.audio_list_ctrl.setAudioListClickEvent();
            }
        }else{
            self.audio_list_ctrl.addListData(data.songs);
            self.audio_list_ctrl.setAudioListClickEvent();
        }
    });
};
ModuleHandler.prototype.bookBGMusic = function(vo){
    var self = this ;
    var type = vo.type ;
    if(self.hasBookMusicAlreadyPlaying === true){
        //只要书里的音乐播放过就一直播放书里的音乐
        if(self.step_btn_ctrl)
            self.step_btn_ctrl.stopMusic();//停止电子书背景音乐
        if(self.bookMusicPlaying){
            self.book_controller.bookAudioController.stopMusic();
            if(self.step_btn_ctrl)
                self.step_btn_ctrl.changeBGMusicBtn('pause');
            self.bookMusicPlaying = false ;
        }else{
            self.book_controller.bookAudioController.playMusic();
            if(self.step_btn_ctrl)
                self.step_btn_ctrl.changeBGMusicBtn('play');
            self.bookMusicPlaying = true ;
        }
    }else{
        if(type === "play"){
            if(self.options.status === config.STATUS_EDIT && self.book_manager.getEditor() != null)
                self.book_manager.getEditor().stopMusic();//停止编辑器里的音乐
        }else{
            if(self.step_btn_ctrl)
                self.step_btn_ctrl.stopMusic();//停止电子书背景音乐
        }
        if(self.step_btn_ctrl){
            self.step_btn_ctrl.changeBGMusicBtn(type);
        }
    }
};
ModuleHandler.prototype.bookAudioMusic = function(vo){
    var self = this ;
    var type = vo.type ;
    if(type === "play"){
        self.bookMusicPlaying = true ;
        self.hasBookMusicAlreadyPlaying = true ;
        if(self.options.status === config.STATUS_EDIT)
            self.book_manager.getEditor().stopMusic();//停止编辑器里的音乐
        if(self.step_btn_ctrl)
            self.step_btn_ctrl.stopMusic();//停止电子书背景音乐
    }else{
        self.bookMusicPlaying = false ;
    }
    if(self.step_btn_ctrl)
        self.step_btn_ctrl.changeBGMusicBtn(type);
};
ModuleHandler.prototype.cancelBGMusic = function(){
    var self = this ;
    BookDataHandler.setBookBGMusic(self.book.book_id,"",function(data){
        self.book_manager.toReload(self.book.book_id,data.minPage + self.book_controller.flipBook.getFrontCoverPageNum());
    });
};
ModuleHandler.prototype.playDefaultBgMusic = function(){
    var self = this ;
    if(self.step_btn_ctrl)
        self.step_btn_ctrl.playDefaultBgMusic();
};