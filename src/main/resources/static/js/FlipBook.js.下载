function FlipBook(container,display,width,height,pageInDom,zoom) {
    var _nodeName = container;
    var _filpBook = $(_nodeName);
    var _frontCoverCount = 0;
    var _backCoverCount = 0;
    var _contentPageCount = 0;
    var _contentLastPageCount = 0;
    var _catalogPageCount = 0;
    var _authorPageCount = 0;
    var _authorPageNum = 0;
    var _copyrightPageCount = 0;
    var _copyrightPageNum = 0 ;
    var _chapterPageCount = 0 ;
    var _prefacePageCount = 0 ;
    var _insertPageCount = 0 ;
    var _pagesInDOM = pageInDom || 4;
    var _display = display || 'double';
    var _width = width ;
    var _height = height ;
    var _enableKeyBoard = true ;
    var _totalPage = 0 ;
    var _current_views ;
    var _page_tips = {};
    var _addPage = function (flipPage,pageNum) {
        _totalPage++ ;
        if(pageNum)
            _filpBook.turn('addPage', flipPage, pageNum);
        else
            _filpBook.turn('addPage', flipPage);
    };
    this.getPageTip = function(page){
        return _page_tips[page] ;
    };
    this.addPage = function(flipPage,pageNum){
        _addPage(flipPage,pageNum)
    };
    this.setVisible = function(value){
        if(_filpBook.css('display') !== value)
            _filpBook.css('display',value);
    };
    this.getDisplay = function(){
        return _display ;
    };
    this.getWidth = function(){
        return _width ;
    };
    this.getHeight = function(){
        return _height ;
    };
    this.enableKeyBoard = function(value){
        _enableKeyBoard = value ;
    };
    this.getEnableKeyBoard = function(){
        return _enableKeyBoard  ;
    };
    this.getFirstContentPage = function () {
        return _frontCoverCount + _authorPageCount + _copyrightPageCount + _prefacePageCount + _catalogPageCount + 1;
    };
    this.getFrontCoverPageNum = function () {
        return _frontCoverCount;
    };
    this.getCoverPageNum = function () {
        return _frontCoverCount + _backCoverCount;
    };
    this.getCatalogPageNum = function () {
        return _catalogPageCount
    };
    this.getContentPageNum = function () {
        return _contentPageCount
    };
    this.getChapterPageNum = function () {
        return _chapterPageCount
    };
    this.getTotalPageNum = function () {
        return _totalPage ;//_filpBook.turn('pages');
    };
    this.getCurrentPageNum = function () {
        return _filpBook.turn('page');
    };
    this.getCurrentViews = function(){
        return _current_views ;
    };
    this.create = function (turningFun, turnedFun, startFun, endFun, missingFun) {
        _filpBook.turn({
            width: _width,
            height: _height,
            elevation: 50,
            duration: 1000,
            acceleration: !isChrome(),
            autoCenter:true ,
            gradients: true,
            pagesInDOM: _pagesInDOM,
            display:_display ,
            //zoom:zoom,
            when: {
                turning: function (event, page, pageObject) {
                    _current_views = pageObject ;
                    turningFun(event, page, pageObject);
                },
                turned: function (e, page, view) {
                    _current_views = view ;
                    turnedFun(e, page, view);
                },
                start: function (e, pageObj) {
                    startFun(e, pageObj);
                },
                end: function (e, pageObj) {
                    endFun(e, pageObj);
                },
                missing: function (e, pages) {
                    missingFun(e, pages);
                }
            }
        });
        _filpBook.addClass('animated');
        return this;
    };
    this.addCopyRightPage = function (flipPage, callBack) {
        _copyrightPageCount++;
        _addPage(flipPage);
        _copyrightPageNum = _totalPage ;
        _page_tips[_totalPage] = "版权";
        if(callBack)
            callBack();
    };
    this.addCatalogPage = function (flipPage, callBack) {
        _catalogPageCount++;
        _addPage(flipPage);
        _page_tips[_totalPage] = "目录";
        if(callBack)
            callBack();
    };
    this.addChapterPage = function (flipPage, callBack) {
        _chapterPageCount++;
        _addPage(flipPage);
        _page_tips[_totalPage] = "篇章";
        if(callBack)
            callBack();
    };
    this.addInsertPage = function (flipPage, callBack) {
        _insertPageCount++;
        _addPage(flipPage);
        _page_tips[_totalPage] = "插页";
        if(callBack)
            callBack();
    };
    this.addPrefacePage = function (flipPage, callBack) {
        _prefacePageCount++;
        _addPage(flipPage);
        _page_tips[_totalPage] = "序";
        if(callBack)
            callBack();
    };
    this.addAuthorPage = function (flipPage, callBack) {
        _addPage(flipPage);
        _authorPageCount++;
        _authorPageNum = _totalPage ;
        _page_tips[_totalPage] = "作者";
        if(callBack)
            callBack();
    };
    this.getAuthorPage = function(){
        return _authorPageNum ;
    };
    this.getCopyPage = function(){
        return _copyrightPageNum ;
    };
    this.addContentPage = function (flipPage, callBack) {
        _contentPageCount++;
        _addPage(flipPage);
        if(callBack)
            callBack(flipPage,_contentPageCount);
    };
    this.addContentLastPage = function (flipPage, callBack) {
        _contentLastPageCount++;
        _addPage(flipPage);
        if(callBack)
            callBack(flipPage,_contentPageCount);
    };
    this.getContentLastPageNum = function (){
        return _contentLastPageCount ;
    };
    this.toZoom = function(value){
        _filpBook.turn('zoom',0.5) ;
    };
    this.destory = function () {
        _filpBook.turn('destory');
    };
    /**
     * 添加封面,两页
     * @param FlipPage
     */
    this.addFrontCover = function (flipPage) {
        if(_display === 'single' && _frontCoverCount === 1)return ;
        if (_frontCoverCount === 2)return;
        _frontCoverCount++;
        var element = ($(flipPage)).get(0);
        $(element).attr('depth', 5);
        if (_frontCoverCount === 1) {
            $(element).append('<div class="side"></div>');
            _addPage(element,1);
        } else if (_frontCoverCount === 2 ) {
            $(element).addClass('front-side');
            $(element).html('<div class="depth1"></div>');
            _addPage(element);
        }
        _page_tips[_totalPage] = "封面";
    };
    this.addBackCover = function (flipPage) {
        _backCoverCount++;
        var element = ($(flipPage)).get(0);
        if(_display === "double"){
            if (_backCoverCount === 1) {
                $(element).addClass('back-side');
                // $(element).html('<div class="depth" style="display:none"></div>');
            } else if (_backCoverCount === 2) {
                $(element).addClass('back-side');
            }
        }
        _addPage(element);
        _page_tips[_totalPage] = "封底";
    };
    this.turnPre = function () {
        _filpBook.turn('previous');
    };
    this.turnNext = function () {
        _filpBook.turn('next');
    };
    this.turnTo = function (pageNum) {
        _filpBook.turn('page', pageNum);
    };
    this.getPageTipData = function(){
        return _page_tips
    };
    function isChrome() {
        return navigator.userAgent.indexOf('Chrome')!=-1;
    }
}