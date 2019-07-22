/**
 * Created by naxiaoguang on 2017/3/30.
 */
var BookDataHandler = (function () {
    //zone
    var GET_BOOK_LIST = "/v1/book/list";
    var GET_BOOK_ATTR = "/v1/book/get_attrs";
    var GET_PUBLIC_BOOK_ATTR = "/v1/book/get_attrs_public";
    var GET_INVITE_QRCODE = "/v1/qrcode/add";
    var GET_AUTHOR_LIST = "/v1/book/author/list";
    var SET_PERMIT_EDIT_STATUS = "/v1/book/content/permit_edit/update";
    var INVITE_CLOSE = "/v1/book/invite/close";
    var INVITE_UPDATE = "/v1/book/invite/url/update";
    var EDIT_STATE_UPDATE = "/v1/book/edit_state/update";
    var CHANGE_AUDIT_STATUS = "/v1/book/audit/set";
    var AUTHOR_DELETE = "/v1/book/author/delete";
    var CHANGE_AUTHOR_NAME = "/v1/book/author/meta/change";
    var CREATE_ZONE = "/v1/book/create/empty_mybook";
    var TRANS_PERMIT = "/v1/book/admin/change";
    var EXIT_ZONE = "/v1/book/batch_delete";
    var GET_ARTICLE_LIST = "/v1/book/article/list";
    var DRAFT_SAVE = "/v1/book/draft/save";
    var SAVE_DRAFT_TO_BOOK = "/v1/book/draft/commit";
    var AUTHOR_PERMIT_LIST = "/v1/book/author/permit/list";
    var BOOK_MEDIA_COUNT = "/v1/book/medias/count";
    var BOOK_ADD_PIC = "/v1/book/pics/add";
    //preview
    var API_BOOK_PAGE_LIST = '/v1/book/pagelist?';
    var API_BOOK_PAGE_LIST_SHARE = '/v1/book/pagelist_public?';
    var API_GET_BOOK_CATALOG_PUBLIC = '/v1/book/catalogs_public';
    var API_GET_BOOK_CATALOG = '/v1/book/catalogs';
    var API_GET_BOOK_VERSION = '/v1/book/page/version' ;
    var API_GET_BOOK_VERSION_PUBLIC = '/v1/book/page/version_public?cipher=' ;
    //edit
    var API_BOOK_ARTICLE_SAVE = '/v1/book/article/save';
    var API_BOOK_PREFACE_SAVE = '/v1/book/preface/save';
    var API_BOOK_CATALOG_ADJUST = '/v1/book/catalogs/adjust';
    var API_BOOK_SAVE_CONTENT = '/v1/book/content/save/';
    var API_BOOK_IMAGE_GROUP_LAYOUT = '/v1/book/content/image/group_style/list';
    var API_BOOK_CHANGE_FILTER = '/v1/book/change_state/';
    var API_BOOK_MOVE_CONTENT = '/v1/book/content/layout_position';
    var API_BOOK_GET_CREATE_TIME = '/v1/book/create_time/get';
    var API_BOOK_SET_CREATE_TIME = '/v1/book/create_time/set';
    var API_BOOK_GET_AUTHOR_PHOTO = '/v1/book/author_avatar/get';
    var API_BOOK_SET_AUTHOR_PHOTO = '/v1/book/author_avatar/set';
    var API_BOOK_GET_FILTERS_BTN = '/v1/book/query_state';
    var API_BOOK_CONTENT_DELETE = '/v1/book/contents/delete/';
    var API_BOOK_GET_TEMPLATE_LIST = '/v1/book/template/list';
    var API_BOOK_SET_TEMPLATE_LIST = '/v1/book/template/set';
    var API_BOOK_GET_INDENT = '/v1/book/indent/get';
    var API_BOOK_SET_INDENT = '/v1/book/indent/set';
    var API_BOOK_INCREMENT_UPDATE = '/v1/thirdparty/increment_update';
    var API_BOOK_GET_SIZE_LIST = '/v1/book/size/list';
    var API_BOOK_SET_SIZE_LIST = '/v1/book/size/set';
    var API_BOOK_TRASH_LIST = '/v1/trash/list';
    var API_BOOK_TRASH_DELETE = '/v1/trash/delete';
    var API_BOOK_TRASH_RESTORE = '/v1/trash/restore';
    var API_BOOK_SET_FONT_SIZE = '/v1/book/fontsize/set';
    var API_BOOK_GET_FONT_SIZE = '/v1/book/fontsize/list';
    var API_BOOK_GET_ARTICLE_LIST = '/v1/article/list';
    var API_BOOK_GET_ARTICLE_TIME_RANGE = '/v1/article/date_range/ubook';
    var API_BOOK_GET_ARTICLE_TAGS = '/v1/tags/list/';
    var API_BOOK_ADD_ARTICLE = '/v1/book/article/add';
    var API_IMG_GROUP_STYLE = '/v1/book/content/image/group_style/list';
    var API_IMG_GET_CUSTOM_STYLE_LIST = '/v1/book/content/image/custom_group_style/list';
    var API_IMG_GROUP_STYLE_BATCH = '/v1/book/content/image/group_style/list/in_batch';
    var API_BOOK_GET_AUTHORS = '/v1/book/content/user/get';
    var API_BOOK_GET_AUTHORS_PUBLIC = '/v1/book/content/user/get_public';
    var API_IMG_GROUP_LIST = '/v1/book/content/group/image/list';
    var API_IMG_RESIZE = '/v1/book/content/image/resize';
    var API_BOOK_BG_MUSIC_SET = '/v1/book/bgm/set';
    var API_BOOK_IMG_SCALE = '/v1/book/content/group/size/set';
    var API_BOOK_THEME = '/v1/book/layout/config/query';
    var API_BOOK_DIVISION_TIME = '/v1/book/import/date_range';
    var vo_book_list = {
        type: 1,
        count: 10,
        next_start: '',
        scope: 0
    };

    function _fetch(api,data,method,host,callback,err_callback){
        Fetcher.fetchData(
            api,
            host,
            method || "post",
            JSON.stringify(data),
            function (result) {
                callback(result);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            },
            "application/json"
        );
    }

    function _getBookAttr(book_ids, callback) {
        Fetcher.fetchData(
            GET_BOOK_ATTR,
            null,
            "post",
            {book_ids: book_ids},
            function (data) {
                var book_attr = data.book ? data.book : data.books[0];
                callback(book_attr);
            });
    }

    function _getPublicBookAttr(cipher, callback) {
        Fetcher.fetchData(
            GET_PUBLIC_BOOK_ATTR,
            null,
            "post",
            {cipher: cipher},
            function (data) {
                var book_attr = data.book ? data.book : data.books[0];
                callback(book_attr);
            });
    }

    function _getAuthorList(book_id, callback) {
        Fetcher.fetchData(
            GET_AUTHOR_LIST,
            getSocialServerDomain(),
            "post",
            JSON.stringify({
                book_id: parseInt(book_id),
                count: 0,
                next_start: null,
            }),
            function (data) {
                var authors = data.authors ? data.authors : [];
                callback(authors);
            });
    }

    function _getBookQRCode(invite_url, callback) {
        Fetcher.fetchData(
            GET_INVITE_QRCODE,
            getResServerDomain(),
            'post', JSON.stringify({
                logo_list: [],
                has_err_code: 1,
                req: [
                    {
                        type: 0,
                        msg: invite_url,
                        logo: 0
                    },
                ]
            }), function (data) {
                var url = data.data[0].url;
                var msg = data.data[0].msg;
                callback(url, msg);
            });
    }

    function _getBookList(callback, toReset) {
        Fetcher.fetchData(
            GET_BOOK_LIST,
            null,
            'get',
            vo_book_list,
            function (data) {
                if (toReset) {
                    vo_book_list.next_start = '';
                    $('.book_list_info').html('');
                } else {
                    vo_book_list.next_start = data.next_start;
                }

                callback(data);

            });
    }

    function _pagingBookList(callback, next_start) {

        vo_book_list.next_start = vo_book_list.next_start == '' ? next_start : vo_book_list.next_start;

        Fetcher.fetchData(
            GET_BOOK_LIST,
            null,
            'get',
            vo_book_list,
            function (data) {
                vo_book_list.next_start = data.next_start;
                callback(data);

            });
    }

    function _getArticleList(book_id, edit_state, scope, count, next_start, isdefault, callback) {

        Fetcher.fetchData(
            GET_ARTICLE_LIST,
            null,
            'get',
            {
                'book_id': book_id,
                'scope': scope,
                'count': count,
                'next_start': next_start
            },
            function (data) {

                next_start = data.next_start;

                callback(book_id, edit_state, scope, count, next_start, isdefault, data);
            });
    }

    function _changePermitManagerEdit(book_id, status, callback) {
        Fetcher.fetchData(
            SET_PERMIT_EDIT_STATUS,
            null,
            'post',
            {
                book_id: parseInt(book_id),
                permit_edit: parseInt(status)
            },
            function (data) {
                callback(status, data);
            });
    }

    function _changeCheckStatus(book_id, status, callback) {
        Fetcher.fetchData(
            CHANGE_AUDIT_STATUS,
            null,
            'post',
            JSON.stringify(
                {
                    "books": [
                        {
                            "book_id": parseInt(book_id),
                            "book_audit": parseInt(status),
                        }
                    ]
                }),

            function (data) {
                callback(status, data);
            });
    }

    function _closeInviteStatus(book_id, status, callback) {
        Fetcher.fetchData(
            INVITE_CLOSE,
            null,
            'post',
            {
                book_id: book_id,
            },
            function (data) {
                callback(status, data);
            });
    }

    function _updateInviteurl(book_id, status, callback) {
        Fetcher.fetchData(
            INVITE_UPDATE,
            null,
            'post',
            {
                book_id: book_id,
            },
            function (data) {
                callback(status, data);
            });
    }

    function _changeLockStatus(book_id, status, callback) {
        Fetcher.fetchData(
            EDIT_STATE_UPDATE,
            null,
            'post',
            {
                book_id: parseInt(book_id),
                edit_state: parseInt(status)
            },
            function (data) {
                callback(status, data);
            });
    }

    function _changeAuthorName(book_id, name, callback, err_callback) {
        Fetcher.fetchData(
            CHANGE_AUTHOR_NAME,
            getSocialServerDomain(),
            'post',
            JSON.stringify([{
                book_id: parseInt(book_id),
                name: name
            }]),
            function (data) {
                callback(name, data);
            }),
            function (error) {
                err_callback(error);
            }
        ;
    }

    function _createZone(title, callback) {
        var posdata = {
            type: parseInt(1)
        };
        if (title) {
            posdata.title = title;
        }

        Fetcher.fetchData(
            CREATE_ZONE,
            null,
            'post',
            posdata,
            function (data) {
                vo_book_list.next_start = '';
                callback(data);
            });
    }

    function _transPermit(book_id, user_id, callback) {
        Fetcher.fetchData(
            TRANS_PERMIT,
            getSocialServerDomain(),
            'post',
            JSON.stringify([
                {
                    book_id: parseInt(book_id),
                    user_id: parseInt(user_id)
                }
            ]),
            function (data) {
                callback(data);
            });
    }

    function _exitGroup(book_id, remove_article, callback, error_callback) {
        Fetcher.fetchData(
            EXIT_ZONE,
            null,
            'post',
            {
                book_ids: [parseInt(book_id)],
                delete_article: remove_article
            },
            function (data) {
                callback(data);
            },
            function (error) {
                error_callback(error);
            }
        );
    }

    function _deleteAuthor(book_id, user_id, callback) {
        Fetcher.fetchData(
            AUTHOR_DELETE,
            getSocialServerDomain(),
            'post',
            JSON.stringify({
                book_id: parseInt(book_id),
                user_id: parseInt(user_id),
                content_remove1: 1,
            }),
            function (data) {
                callback(data);
            });
    }

    function _saveToDraft(book_id, draft_id, title, date, content, content_id, update_check, callback, err_callback) {
        Fetcher.fetchData(
            DRAFT_SAVE,
            null,
            'post',
            {
                "book_id": parseInt(book_id),
                "draft_id": draft_id || 0,
                "title": title,
                "date": date,
                "content": content,
                "content_id": content_id || '',
                "update_check": update_check
            },
            function (data) {
                callback(data);
            },
            function (error) {
                err_callback(error);
            }
        );
    }

    function _saveDraftToBook(book_id, draft_id, title, date, content, content_id, callback, err_callback) {

        Fetcher.fetchData(
            SAVE_DRAFT_TO_BOOK,
            null,
            'post',
            {
                book_id: parseInt(book_id),
                draft_id: draft_id,
                title: title,
                date: date,
                content: content,
                content_id: content_id
            },
            function (data) {
                callback(data);
            },
            function (error) {
                err_callback(error);
            }
        );
    }

    function _getPermitEditAuthorList(book_id, callback, err_callback) {
        Fetcher.fetchData(
            AUTHOR_PERMIT_LIST,
            getSocialServerDomain(),
            'post',
            JSON.stringify({
                book_id: parseInt(book_id),
                permit_edit: 1,
            }),

            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            }
        );
    }

    function _getPublicCatalogListDataByCipher(cipher, type, callback, err_callback) {
        var data = {cipher: cipher};
        if (type != null)
            data.type = type;
        Fetcher.fetchData(
            API_GET_BOOK_CATALOG_PUBLIC,
            null,
            'get',
            data,

            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            }
        );
    }

    function _getCatalogListDataByID(book_id, type, callback, err_callback) {
        var data = {book_id: book_id};
        if (type != null)
            data.type = type;
        Fetcher.fetchData(
            API_GET_BOOK_CATALOG,
            null,
            'get',
            data,
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            }
        );
    }

    function _deleteBookContent(book_id, content_ids, images, delete_image_ids, delete_forward_ids, callback, err_callback) {
        Fetcher.fetchData(
            API_BOOK_DELETE_ARTICLE,
            null,
            'post',
            {
                book_id: book_id,
                content_ids: content_ids,
                images: images,
                delete_image_ids: delete_image_ids,
                delete_forward_ids: delete_forward_ids
            },
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            }
        );
    }

    function _resortCatalog(book_id, indexes, callback, err_callback) {
        Fetcher.fetchData(
            API_BOOK_CATALOG_ADJUST,
            null,
            'post',
            {
                book_id: book_id,
                indexes: indexes,
            },
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            }
        );
    }

    function _getBookAuthors(book_id, callback, err_callback) {
        Fetcher.fetchData(
            API_BOOK_GET_AUTHORS,
            null,
            'get',
            {
                book_id: book_id,
            },
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            });
    }

    function _getBookAuthorsPublic(cipher, callback, err_callback) {
        Fetcher.fetchData(
            API_BOOK_GET_AUTHORS_PUBLIC,
            null,
            'get',
            {
                cipher: cipher,
            },
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            });
    }

    function _getImageGroupList(book_id, content_id, image_group_id, callback, err_callback) {
        Fetcher.fetchData(
            API_IMG_GROUP_LIST,
            null,
            'get',
            {
                group_id: image_group_id,
                content_id: content_id,
                book_id: book_id
            },
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            }
        );
    }


    function _imageResize(book_id, content_id, image_group_id, image_id, pid, new_url, new_width, new_height, callback, err_callback) {
        Fetcher.fetchData(
            API_IMG_RESIZE,
            null,
            'post',
            {
                group_id: image_group_id,
                content_id: parseInt(content_id),
                book_id: parseInt(book_id),
                image_id: image_id,
                // pid: parseInt(pid),       // 群体书的paragraph_id，便于定位image，可选***
                new_url: new_url,
                new_width: parseInt(new_width),
                new_height: parseInt(new_height)
            },
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            }
        );
    }

    function _setBookBGMusic(book_id, url, callback, err_callback) {
        Fetcher.fetchData(
            API_BOOK_BG_MUSIC_SET,
            null,
            'post',
            {
                book_id: parseInt(book_id),
                bgm_url: url
            },
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            }
        );
    }

    function _getMusicDetailByUrl(url, callback, err_callback) {
        Fetcher.fetchData(
            '/v1/song/detail',
            null,
            'post',
            JSON.stringify({
                song_url: url,
            }),
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            },
            'application/json'
        );
    }

    function _bookImageScale(book_id, content_id, image_group_id, width, height, callback, err_callback) {
        var data = JSON.stringify({
            "book_id": parseInt(book_id),
            "content_id": parseInt(content_id),
            "group_id": image_group_id,
            "width": parseInt(width),
            "height": parseInt(height)
        });

        Fetcher.fetchData(
            API_BOOK_IMG_SCALE,
            null,
            'post',
            data,
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            },
            "application/json"
        );
    }

    function _bookTheme(book_id, callback, err_callback) {
        var data = JSON.stringify({"book_id": parseInt(book_id)});
        Fetcher.fetchData(
            API_BOOK_THEME,
            null,
            'post',
            data,
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            },
            "application/json"
        );
    }

    function _getBookMediaCount(book_id, callback, err_callback) {
        Fetcher.fetchData(
            BOOK_MEDIA_COUNT,
            null,
            'post',
            JSON.stringify({book_id: parseInt(book_id)}),
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            },
            "application/json"
        );
    };

    function _addPicToBook(book_id, urls, single_page, callback, err_callback) {
        Fetcher.fetchData(
            BOOK_ADD_PIC,
            null,
            'post',
            JSON.stringify({book_id: parseInt(book_id), pic_urls: urls, single_page: single_page}),
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            },
            "application/json"
        );
    }

    function _fetchBookTime(book_id, callback, err_callback) {
        Fetcher.fetchData(
            API_BOOK_GET_CREATE_TIME,
            null,
            "post",
            JSON.stringify({
                book_id: book_id
            }),
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            },
            "application/json"
        );
    };
    function _setBookDivision(book_id,start_time,end_time,book_title,callback,err_callback){
        Fetcher.fetchData(
            API_BOOK_DIVISION_TIME,
            null,
            "post",
            JSON.stringify({
                'book_id': book_id,
                'begin':start_time,
                'end':end_time,
                'book_title':book_title,
            }),
            function (data) {
                callback(data);
            },
            function (error) {
                if (err_callback)
                    err_callback(error);
            },
            "application/json"
        );
    };
    function _getPageList(book_id,page_count, action, device, view_type, perRequestAmount, comCallback) {
        var amount = perRequestAmount;
        var step = Math.ceil(page_count / perRequestAmount);
        var version;
        reGetPageData();

        function reset() {
            version = null;
        }

        function reGetPageData() {
            reset();
            getVersion(function (data) {
                version = data.version;
                if (data.perRequestAmount) {
                    amount = data.perRequestAmount;
                    step = Math.ceil(page_count / amount);
                }
                getPageList();
            });
        }

        function getPageList() {
            var offset = 1;
            var page_list = [];
            var index = 0;
            var i;
            var url;
            var has_re_start = false;
            for (i = 0; i < step; i++) {
                url = updateURL(offset, version);
                getPageData(i, url, function (result,order) {
                    if (page_list) {
                        page_list[order] = result;
                        index++;
                        if (index === step) {
                            comCallback(page_list, step);
                        }
                    }
                }, function (error) {
                    if (error.err_code && error.err_code == 41) {
                        page_list = null;
                        if (has_re_start == false) {
                            has_re_start = true;
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
            Fetcher.fetchData(
                (action === config.ACTION_SHARE ? API_GET_BOOK_VERSION_PUBLIC + book.cipher : API_GET_BOOK_VERSION),
                null,
                "get",
                {book_id: book_id},
                function (data) {
                    callback(data);
                },
                function (error) {
                    if (err_callback)
                        err_callback(error);
                }
            );
        }

        function getPageData(index, url, callback, err_callback) {
            Fetcher.fetchData(
                url,
                getBookApiDomain(),
                "get",
                {book_id: book_id},
                function (data) {
                    callback(data,index);
                },
                function (error) {
                    if (err_callback)
                        err_callback(error,index);
                }
            );
        }

        function updateURL(offset, version) {
            var url;
            if (device === config.DEVICE_APP) {
                if (location.href.indexOf("preview/public") > -1)
                    url = API_BOOK_PAGE_LIST_SHARE + 'cipher=' + book.cipher + '&start=' + offset + '&amount=' + amount;
                else
                    url = API_BOOK_PAGE_LIST + 'book_id=' + book.book_id + '&start=' + offset + '&amount=' + amount;
            } else {
                if (action === config.ACTION_SHARE)
                    url = API_BOOK_PAGE_LIST_SHARE + 'cipher=' + book.cipher + '&start=' + offset + '&amount=' + amount;
                else {
                    if (view_type == null || view_type === "undefined")
                        url = API_BOOK_PAGE_LIST + 'book_id=' + book.book_id + '&start=' + offset + '&amount=' + amount;
                    else
                        url = API_BOOK_PAGE_LIST + 'book_id=' + book.book_id + '&start=' + offset + '&amount=' + amount + '&type=' + view_type;
                }
            }
            if (version)
                url += "&version=" + version;
            return url;
        }
    };

    /**
     * "book_id": int64,
     * "user_id": int64,
     * "type": int, // 0为新文章，1已收录，2草稿箱，3审核类，4未收录
     * "book_article_id": int64,
     * "to_book": int,     // 0不做任何操作（default），非0表示提交至书中
     * "to_draft": int,    // 0不做任何操作（default），非0时表示保存为草稿
     * "to_article": int,  // 0不做任何操作（default），非0表示添加到个人文章列表
     * "article_tags": [ string ], // 保存到首页文章列表中的标签
     * "locate_id": int64, // 添加到书中的占位符
     * "direction": int,   // 添加到书中的占位方向*
     * "title": string,
     * "date": int64,
     * "content": string,
     * "update_check": string,
     */
    function _bookArticleSave(user_id,book_id,book_article_id,type,article_tags,direction,locate_id,title,date,content,update_check,to_article,callback,err_callback){
        var data = {
            "book_id": book_id,
            "book_article_id": book_article_id,
            "to_book": 1,     // 0不做任何操作（default），非0表示提交至书中
            "to_draft": 0,    // 0不做任何操作（default），非0时表示保存为草稿
            "to_article": to_article,  // 0不做任何操作（default），非0表示添加到个人文章列表
            "article_tags": article_tags, // 保存到首页文章列表中的标签
            "locate_id": locate_id, // 添加到书中的占位符
            "direction": direction,   // 添加到书中的占位方向*
            "title": title,
            "date": date,
            "content": content,
            "type":type,
        };
        if(user_id)
            data.user_id = user_id ;
        if(update_check)
            data.update_check = update_check ;
        _fetch(API_BOOK_ARTICLE_SAVE,data,'post',null,callback,err_callback);
    }

    /**
     *   content_id 说明 1、创建时不必传，2、切换模板是必须传，否则会认为创建，切换模板时会忽略title和content
     */

    function _bookPrefaceSave(book_id,template_id,content_id,title,content,callback,err_callback){
        var data = {
            book_id:book_id,
            template_id:template_id,
            title:title,
            content:content,
        };
        if(content_id != null)
            data.content_id = content_id ;
        _fetch(API_BOOK_PREFACE_SAVE,data,'post',null,callback,err_callback)
    }
    return {
        getBookAttr: _getBookAttr,
        getPageList:_getPageList,
        getPublicBookAttr: _getPublicBookAttr,
        getBookQRCode: _getBookQRCode,
        getAuthorList: _getAuthorList,
        changePermitManagerEdit: _changePermitManagerEdit,
        changeCheckStatus: _changeCheckStatus,
        changeInviteStatus: function (book_id, status, callback) {
            if (parseInt(status) === 0)
                _closeInviteStatus(parseInt(book_id), parseInt(status), callback);
            else
                _updateInviteurl(parseInt(book_id), parseInt(status), callback);
        },
        changeLockStatus: _changeLockStatus,
        exitGroup: _exitGroup,
        getBookList: _getBookList,
        changeAuthorName: _changeAuthorName,
        createZone: _createZone,
        transPermit: _transPermit,
        deleteAuthor: _deleteAuthor,
        getArticleList: _getArticleList,
        saveToDraft: _saveToDraft,
        saveDraftToBook: _saveDraftToBook,
        getPermitEditAuthorlist: _getPermitEditAuthorList,
        saveNewToBook: function () {},
        pagingBookList: _pagingBookList,
        getCatalogListData: _getCatalogListDataByID,
        getPublicCatalogListData: _getPublicCatalogListDataByCipher,
        deleteBookContent: _deleteBookContent,
        resortCatalog: _resortCatalog,
        getBookAuthors: _getBookAuthors,
        getBookAuthorsPublic: _getBookAuthorsPublic,
        getImageGroupList: _getImageGroupList,
        imageResize: _imageResize,
        setBookBGMusic: _setBookBGMusic,
        getMusicDetailByUrl: _getMusicDetailByUrl,
        bookImageScale: _bookImageScale,
        bookTheme: _bookTheme,
        bookArticleSave:_bookArticleSave,
        bookPrefaceSave:_bookPrefaceSave,
        getBookMediaCount: _getBookMediaCount,
        addPicToBook: _addPicToBook,
        getBookCreateTime: _fetchBookTime,
        setBookDivision: _setBookDivision,
    }
})();
