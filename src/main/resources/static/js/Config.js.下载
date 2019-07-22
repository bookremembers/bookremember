var componentType = {
    TEXT: 1,
    IMAGE: 2,
    VIDEO: 3,
    MUSIC: 4,
    RECORD: 5,
    TITLE: 6,//标题
    SUB_TITLE: 7,//副标题
    IMAGE_FRAME: 8,//照片书的图片
    IMAGE_DECORATE: 9,//装饰图片
    STICKER: 10,//贴纸
    WHITE_FRAME: 11,//照片冲印边框
    LOMO_IMAGE_FRAME: 12,//lomo卡照片
};
var subComponentType = {
    COVER_TITLE_TIP: 1,
    COVER_IMAGE: 11,
    COVER_TITLE: 12,
    COVER_AUTHOR: 13,
    COVER_IMAGE_FREEZE: 14,
    IMAGE_LOGO: 15,
    CHAPTER_TITLE: 16,
    COVER_TEXT_MULTI_LINE: 17,
    COVER_IMAGE_ONLY_DELETE: 18,
    PHOTO_PRINT: 19,//照片冲印
    CHAPTER_BG_IMAGE: 20,//照片冲印
};
var PageType = {
    CONTENT: 0,
    AUTHOR: 1,
    COPY_RIGHT: 2,
    CATALOG: 3,
    CATALOG_EMPTY: 4,
    COVER_FC: 5,
    COVER_BC: 6,
    CHAPTER: 7,
    PREFACE: 9,
    PREFACE_EMPTY: 10,
};
var ACTION = {
    NONE: 0,
    DELETE: 1,
    MOVE: 1 << 1,
    ROTATE: 1 << 2,
    SCALE: 1 << 3,
    SCALE_RATIO: 1 << 4,
    EDIT: 1 << 5,
    ADD: 1 << 6,
    SELECT: 1 << 7,
    LAYER: 1 << 8,
    EXCHANGE: 1 << 9,
    UPDATE: 1 << 10,
    TEMPLATE: 1 << 11,
    CHANGE_BG_COLOR: 1 << 12,
};
var PERMISSION = {
    NONE: 0,
    DELETE: 1,
    MOVE: 1 << 1,
    ROTATE: 1 << 2,
    SCALE: 1 << 3,
    SCALE_RATIO: 1 << 4,
    EDIT: 1 << 5, //４.１.１后续版本弃用
    MULTI_SELECT: 1 << 6,
    DOUBLE_CLICK: 1 << 7,
    CROP_RATIO: 1 << 8,
    ADD: 1 << 9,
    TEXT_MULTI_LINE: 1 << 10,
    TEXT_ALIGN: 1 << 11,
    TEXT_COLOR: 1 << 12,
    TEXT_FONT: 1 << 13,
    CROP: 1 << 14,
    ALIGN: 1 << 15,
    COPY: 1 << 16,
    LAYER: 1 << 17,
    TEXT_FONT_SIZE: 1 << 18,
};
var CONTENT_TYPE = {
    CATALOG: 0,
    CONTENT: 1,
    CHAPTER: 2,
    PREFACE: 3,
};

var CONTENT_THEME_TYPE_WECHAT = 1;
var CONTENT_THEME_TYPE_SHIQI = 2;
var CONTENT_THEME_TYPE_COLOR_SHIQI = 3;
var CONTENT_THEME_TYPE_SQUARE_PHOTO = 5;
var BookPageHeaderRule = {};
BookPageHeaderRule[CONTENT_THEME_TYPE_WECHAT << 8 | PageType.CONTENT] = 1;
BookPageHeaderRule[CONTENT_THEME_TYPE_SHIQI << 8 | PageType.CONTENT] = 1;
BookPageHeaderRule[CONTENT_THEME_TYPE_COLOR_SHIQI << 8 | PageType.CONTENT] = 1;
var BookPageFooterRule = {};
BookPageFooterRule[CONTENT_THEME_TYPE_WECHAT << 8 | PageType.CONTENT] = 1;
BookPageFooterRule[CONTENT_THEME_TYPE_SHIQI << 8 | PageType.CONTENT] = 1;
BookPageFooterRule[CONTENT_THEME_TYPE_COLOR_SHIQI << 8 | PageType.CONTENT] = 1;
BookPageFooterRule[CONTENT_THEME_TYPE_COLOR_SHIQI << 8 | PageType.PREFACE] = 1;

var componentPermission = {};

componentPermission[componentType.TEXT << 8 | 0] = PERMISSION.ADD | PERMISSION.MOVE | PERMISSION.DELETE | PERMISSION.SCALE |
    PERMISSION.EDIT | PERMISSION.MULTI_SELECT | PERMISSION.DOUBLE_CLICK | PERMISSION.TEXT_MULTI_LINE |
    PERMISSION.TEXT_ALIGN | PERMISSION.COPY | PERMISSION.LAYER | PERMISSION.TEXT_FONT_SIZE | PERMISSION.ALIGN |
    PERMISSION.TEXT_COLOR | PERMISSION.TEXT_FONT;

componentPermission[componentType.TEXT << 8 | subComponentType.COVER_TITLE] = PERMISSION.EDIT | PERMISSION.DOUBLE_CLICK | PERMISSION.TEXT_ALIGN | PERMISSION.TEXT_COLOR | PERMISSION.TEXT_FONT;
componentPermission[componentType.TEXT << 8 | subComponentType.COVER_AUTHOR] = PERMISSION.EDIT | PERMISSION.DOUBLE_CLICK | PERMISSION.TEXT_COLOR | PERMISSION.TEXT_FONT;
componentPermission[componentType.TEXT << 8 | subComponentType.COVER_TITLE_TIP] = PERMISSION.EDIT | PERMISSION.DOUBLE_CLICK | PERMISSION.TEXT_COLOR | PERMISSION.TEXT_FONT;
componentPermission[componentType.TEXT << 8 | subComponentType.CHAPTER_TITLE] = PERMISSION.EDIT | PERMISSION.DOUBLE_CLICK | PERMISSION.TEXT_FONT | PERMISSION.TEXT_COLOR ;
componentPermission[componentType.TEXT << 8 | subComponentType.COVER_TEXT_MULTI_LINE] = PERMISSION.EDIT | PERMISSION.DOUBLE_CLICK | PERMISSION.TEXT_MULTI_LINE | PERMISSION.TEXT_COLOR | PERMISSION.TEXT_FONT;

componentPermission[componentType.IMAGE << 8 | 0] = PERMISSION.ADD | PERMISSION.MOVE | PERMISSION.DELETE | PERMISSION.ROTATE | PERMISSION.SCALE_RATIO | PERMISSION.SCALE | PERMISSION.MULTI_SELECT | PERMISSION.DOUBLE_CLICK | PERMISSION.ALIGN | PERMISSION.CROP | PERMISSION.COPY | PERMISSION.LAYER;
componentPermission[componentType.IMAGE << 8 | subComponentType.COVER_IMAGE] = PERMISSION.DOUBLE_CLICK | PERMISSION.CROP_RATIO;
componentPermission[componentType.IMAGE << 8 | subComponentType.COVER_IMAGE_FREEZE] = PERMISSION.NONE;
componentPermission[componentType.IMAGE << 8 | subComponentType.IMAGE_LOGO] = PERMISSION.NONE;
componentPermission[componentType.IMAGE << 8 | subComponentType.COVER_IMAGE_ONLY_DELETE] = PERMISSION.DELETE;
componentPermission[componentType.IMAGE << 8 | subComponentType.PHOTO_PRINT] = PERMISSION.MOVE | PERMISSION.DOUBLE_CLICK | PERMISSION.SCALE | PERMISSION.SCALE_RATIO;
componentPermission[componentType.IMAGE_DECORATE << 8 | 0] = PERMISSION.NONE;
componentPermission[componentType.WHITE_FRAME << 8 | 0] = PERMISSION.NONE;

componentPermission[componentType.TITLE << 8 | 0] = PERMISSION.EDIT | PERMISSION.DOUBLE_CLICK | PERMISSION.TEXT_ALIGN;
componentPermission[componentType.SUB_TITLE << 8 | 0] = PERMISSION.NONE;
componentPermission[componentType.IMAGE_FRAME << 8 | 0] = PERMISSION.ADD | PERMISSION.MOVE | PERMISSION.DELETE | PERMISSION.ROTATE | PERMISSION.SCALE_RATIO | PERMISSION.SCALE | PERMISSION.MULTI_SELECT | PERMISSION.DOUBLE_CLICK | PERMISSION.ALIGN | PERMISSION.CROP | PERMISSION.COPY | PERMISSION.LAYER;
componentPermission[componentType.IMAGE_FRAME << 8 | subComponentType.CHAPTER_BG_IMAGE] = PERMISSION.DOUBLE_CLICK | PERMISSION.DELETE;
componentPermission[componentType.LOMO_IMAGE_FRAME << 8 | 0] = PERMISSION.ADD | PERMISSION.MOVE | PERMISSION.SCALE_RATIO | PERMISSION.SCALE | PERMISSION.MULTI_SELECT | PERMISSION.DOUBLE_CLICK | PERMISSION.ALIGN | PERMISSION.CROP | PERMISSION.COPY | PERMISSION.LAYER;

componentPermission[componentType.STICKER << 8 | 0] = PERMISSION.ADD | PERMISSION.MOVE | PERMISSION.DELETE | PERMISSION.SCALE | PERMISSION.SCALE_RATIO | PERMISSION.ROTATE | PERMISSION.MULTI_SELECT | PERMISSION.COPY | PERMISSION.LAYER | PERMISSION.ALIGN;
componentPermission[componentType.VIDEO << 8 | 0] = PERMISSION.ADD | PERMISSION.MOVE | PERMISSION.DELETE | PERMISSION.MULTI_SELECT | PERMISSION.COPY | PERMISSION.LAYER | PERMISSION.ALIGN;
componentPermission[componentType.RECORD << 8 | 0] = PERMISSION.ADD | PERMISSION.MOVE | PERMISSION.DELETE | PERMISSION.MULTI_SELECT | PERMISSION.COPY | PERMISSION.LAYER | PERMISSION.ALIGN;
componentPermission[componentType.MUSIC << 8 | 0] = PERMISSION.ADD | PERMISSION.MOVE | PERMISSION.DELETE | PERMISSION.MULTI_SELECT | PERMISSION.COPY | PERMISSION.LAYER | PERMISSION.ALIGN;


var componentDataRule = {};
componentDataRule[componentType.TEXT << 8 | 0] =
    componentDataRule[componentType.TITLE << 8 | 0] =
    componentDataRule[componentType.SUB_TITLE << 8 | 0] =
    componentDataRule[componentType.TEXT << 8 | subComponentType.COVER_TITLE] =
    componentDataRule[componentType.TEXT << 8 | subComponentType.COVER_TITLE_TIP] =
    componentDataRule[componentType.TEXT << 8 | subComponentType.CHAPTER_TITLE] =
    componentDataRule[componentType.TEXT << 8 | subComponentType.COVER_AUTHOR] =
    componentDataRule[componentType.TEXT << 8 | subComponentType.COVER_TEXT_MULTI_LINE] = {
        property: ["clientWidth@width", "clientHeight@height", "offsetTop@top", "offsetLeft@left", "textContent@text", "innerHTML"],
        attr: ["childCount", "index", "rotate", "length", "key", "follow_cover_color@@number"],
        style: ["fontSize@@number", "fontFamily", "color", "lineHeight", "letterSpacing@@number", "textAlign"],
    };
componentDataRule[componentType.IMAGE << 8 | 0] = {
    property: ["clientWidth@width", "clientHeight@height", "offsetTop@top", "offsetLeft@left"],
    attr: ["childCount", "index", "rotate", "key", "origin_width@@number", "origin_height@@number","origin_width@origin_width_string@number", "origin_height@origin_height_string@number", "source_url"],
    child: [{
        className: 'ubook_content_image',
        attr: ["img-src@url"],
        style: ["width@innerWidth", "height@innerHeight", "top@innerTop", "left@innerLeft"]
    }]
};
componentDataRule[componentType.STICKER << 8 | 0] = {
    property: ["clientWidth@width", "clientHeight@height", "offsetTop@top", "offsetLeft@left"],
    attr: ["childCount", "index", "rotate", "key", "origin_width@@number", "origin_height@@number","origin_width@origin_width_string@number", "origin_height@origin_height_string@number"],
    child: [{
        className: 'ubook_paster_image',
        attr: ["src@url", "width@innerWidth", "height@innerHeight", "top@innerTop", "left@innerLeft"]
    }]
};
componentDataRule[componentType.IMAGE_DECORATE << 8 | 0] = componentDataRule[componentType.IMAGE << 8 | 0]
componentDataRule[componentType.IMAGE << 8 | subComponentType.COVER_IMAGE] = componentDataRule[componentType.IMAGE << 8 | 0]
componentDataRule[componentType.IMAGE << 8 | subComponentType.COVER_IMAGE_ONLY_DELETE] = componentDataRule[componentType.IMAGE << 8 | 0]
componentDataRule[componentType.IMAGE << 8 | subComponentType.PHOTO_PRINT] = componentDataRule[componentType.IMAGE << 8 | 0]
componentDataRule[componentType.IMAGE_FRAME << 8 | 0] = componentDataRule[componentType.IMAGE << 8 | 0]
componentDataRule[componentType.IMAGE_FRAME << 8 | subComponentType.CHAPTER_BG_IMAGE] = componentDataRule[componentType.IMAGE << 8 | 0]
componentDataRule[componentType.LOMO_IMAGE_FRAME << 8 | 0] = componentDataRule[componentType.IMAGE << 8 | 0]
componentDataRule[componentType.IMAGE << 8 | subComponentType.COVER_IMAGE_FREEZE] = componentDataRule[componentType.IMAGE << 8 | 0]
componentDataRule[componentType.IMAGE << 8 | subComponentType.IMAGE_LOGO] = componentDataRule[componentType.IMAGE << 8 | 0]

componentDataRule[componentType.MUSIC << 8 | 0] = {
    property: ["clientWidth@width", "clientHeight@height", "offsetTop@top", "offsetLeft@left"],
    attr: ["music_url@url", "key", "name", "childCount", "index", "rotate"],
    child: [
        { className: 'shiqi_music_img', attr: ["src@thumb_url"] },
        { className: 'shiqi_music_qrcode', attr: ["src@qrcode"] },
        { className: 'shiqi_music_name', property: ["textContent@name"] },
        { className: 'shiqi_music_author', property: ["textContent@author"] },
        { className: 'shiqi_music_duration', property: ["textContent@duration"] },
    ]
};
componentDataRule[componentType.RECORD << 8 | 0] = {
    property: ["clientWidth@width", "clientHeight@height", "offsetTop@top", "offsetLeft@left"],
    attr: ["record_url@url", "key", "childCount", "index", "rotate"],
    child: [
        { className: 'shiqi_record_qrcode', attr: ["src@qrcode"] },
        { className: 'shiqi_record_duration', property: ["textContent@duration"] },
    ]
};
componentDataRule[componentType.VIDEO << 8 | 0] = {
    property: ["clientWidth@width", "clientHeight@height", "offsetTop@top", "offsetLeft@left"],
    attr: ["childCount", "index", "rotate", "key"],
    child: [
        { className: 'shiqi_video', attr: ["video_url@url", "src@thumb_url"] },
        { className: 'shiqi_video_code', attr: ["src@qrcode"] },
    ]
};

var componentUpdateStyleRule = {
    fontSize: 1,
    lineHeight: 1,
    letterSpacing: 1,
    fontFamily: 1,
    color: 1,
    textAlign: 1,
    width: 1,
    height: 1,
    top: 1,
    left: 1,
    rotate: 1,
    innerHeight: "ubook_content_image@height",
    innerWidth: "ubook_content_image@width",
    innerLeft: "ubook_content_image@left",
    innerTop: "ubook_content_image@top",
};

var componentUpdateAttrRule = {
    key: 1,
    name: 1,
    origin_width: 1,
    origin_height: 1,
    source_url: 1,
    content_id: 1,
    url: "ubook_content_image@img-src,src;shiqi_video@video_url;ubook_paster_image@src;record_url;music_url",
    thumb_url: 'shiqi_music_img@src;shiqi_video@src',
    qrcode: 'shiqi_music_qrcode@src;shiqi_record_qrcode@src;shiqi_video_code@src',
};

var componentUpdatePropertyRule = {
    text: 1,
    name: "shiqi_music_name@textContent",
    author: "shiqi_music_author@textContent",
    duration: "shiqi_music_duration@textContent;shiqi_record_duration@textContent",
};
