function updateHeader() {
    var page_header_wrappers = $('.page.even').find('[class="page_header_wrapper ubook_header"]').hide() ;
    $.each(page_header_wrappers,function(index,page_header_wrapper){
        $(page_header_wrapper).addClass('is_set');
        var type_id = $(page_header_wrapper).attr("type_id") ;
        if(type_id === "double_line" || type_id === "gradual_line"){
            $(page_header_wrapper).css({"right":"","left":$(page_header_wrapper).css("right")}) ;
            var page_header_bgs = $(page_header_wrapper).find('.page_header_bg') ;
            $.each(page_header_bgs,function(index,page_header_bg){
                $(page_header_bg).css({"left":$(page_header_bg).css('right'),"right":""}) ;
                if(type_id === "gradual_line"){
                    var srcs =  $(page_header_bg).attr("data-src") ;
                    var leftLine = srcs.split(",")[1] ;
                    $(page_header_bg).attr("src",leftLine) ;
                }
            });
            var page_header_titles = $(page_header_wrapper).find('.page_header_title') ;
            $.each(page_header_titles,function(index,page_header_title){
                $(page_header_title).css({"left":$(page_header_title).css('right'),"right":""}) ;
                if(type_id === "gradual_line"){
                    $(page_header_title).css({"text-align":"left"}) ;
                }
            });
        }
        $(page_header_wrapper).show();
    });
    $('.page.odd').find('[class="page_header_wrapper ubook_header"]').each(function(index,page_header_wrapper){
        $(page_header_wrapper).hide();
        $(page_header_wrapper).addClass('is_set');
        var type_id = $(page_header_wrapper).attr("type_id") ;
        if(type_id === "double_line"){
            $(page_header_wrapper).find('.page_header_title').each(function(index,page_header_title){
                var title_width = parseInt($(page_header_title).css('width'));
                var title_top = parseInt($(page_header_title).css('top'));
                var title_font_size = parseInt($(page_header_title).css('font-size'));
                var font_size_offset ;
                if($(page_header_title).hasClass("v3")){
                    if(title_font_size === 12)
                        font_size_offset = -10 ;
                    else if (title_font_size === 14)
                        font_size_offset = -13 ;
                }else{
                    if(title_font_size === 12)
                        font_size_offset = 8 ;
                    else if (title_font_size === 14)
                        font_size_offset = 4 ;
                    else if (title_font_size === 16)
                        font_size_offset = 2 ;
                }
                $(page_header_title).css({
                    "right": (title_font_size + font_size_offset - title_width) + "px",
                    "top": (title_top + 4 + title_font_size) + "px",
                    "-webkit-transform-origin": "0% 0% 0px",
                    "-moz-transform-origin": "0% 0% 0px",
                    "-ms-transform-origin": "0% 0% 0px",
                    "-o-transform-origin": "0% 0% 0px",
                    "transform-origin": "0% 0% 0px"
                }) ;
            });
        }else if(type_id === "gradual_line"){
            var page_header_bgs = $(page_header_wrapper).find('.page_header_bg') ;
            $.each(page_header_bgs,function(index,page_header_bg){
                var srcs =  $(page_header_bg).attr("data-src") ;
                var leftLine = srcs.split(",")[0] ;
                $(page_header_bg).attr("src",leftLine) ;
            });
        }
        $(page_header_wrapper).show();
    });
}
function updateFooter() {
    $(".page-wrapper").not('[is_set]').each(function (index,value) {
        $(value).attr("is_set",1);
        var page = parseInt($(value).attr("page"));
        var isRightPage = ((page + 2) % 2 !== 0) ;
        $(this).find('[class="page_footer_wrapper"],[class="page_footer_wrapper v3"]').each(function(index,page_footer_wrapper){
            $(page_footer_wrapper).hide();
            var type_id = $(page_footer_wrapper).attr("type_id") ;
            if(!isRightPage){
                if(type_id === "double_long"){}else{
                    $(page_footer_wrapper).css({"right":"","left": $(page_footer_wrapper).css("right")});
                }
                $(page_footer_wrapper).find('[class=page_footer_bg]').each(function(index,page_footer_bg){
                    if(type_id === "double_long"){}else{
                        $(page_footer_bg).css({"left": $(page_footer_bg).css('right'),"right":""});
                        $(page_footer_bg).attr("src", $(page_footer_bg).attr('data-src').split(",")[0]);
                    }
                });
                $(page_footer_wrapper).find('[class=page_footer_title]').each(function(index,page_footer_title){
                    if(type_id === "double_long"){
                    }else if(type_id === "pen_line"  || type_id === "double_line"){
                        $(page_footer_title).css({"left": $(page_footer_title).css('right'),"right":""});
                    }else{
                        $(page_footer_title).css({"text-align":"left","left": $(page_footer_title).css('right'),"right":""});
                    }
                });
            }else{
                $(page_footer_wrapper).find('[class=page_footer_bg]').each(function(index,page_footer_bg){
                    if(type_id === "double_long"){}else{
                        $(page_footer_bg).attr("src", $(page_footer_bg).attr('data-src').split(",")[1]);
                    }
                });
            }
            $(page_footer_wrapper).show();
        });
    });
}
function updateAppBookHeader(content_theme_type){
    $('.page').find('[class="page_header_wrapper ubook_header"]').each(function(index,page_header_wrapper){
        $(page_header_wrapper).hide();
        $(page_header_wrapper).addClass('is_set');
        var type_id = $(page_header_wrapper).attr("type_id") ;
        if(type_id === "double_line"){
            $(page_header_wrapper).find('.page_header_title').each(function(index,page_header_title){
                var title_width = parseInt($(page_header_title).css('width'));
                var title_top = parseInt($(page_header_title).css('top'));
                var title_font_size = parseInt($(page_header_title).css('font-size'));
                $(page_header_title).css({
                    "right": (title_font_size + 4 - title_width) + "px",
                    "top": (title_top + 4 + title_font_size) + "px",
                    "-webkit-transform-origin": "0% 0% 0px",
                    "-moz-transform-origin": "0% 0% 0px",
                    "-ms-transform-origin": "0% 0% 0px",
                    "-o-transform-origin": "0% 0% 0px",
                    "transform-origin": "0% 0% 0px"
                }) ;
            });
        }else if(type_id === "gradual_line"){
            $(page_header_wrapper).find('.page_header_bg').each(function(index,page_header_bg){
                var srcs =  $(page_header_bg).attr("data-src") ;
                var leftLine = srcs.split(",")[0] ;
                $(page_header_bg).attr("src",leftLine) ;
            });
        }
        $(page_header_wrapper).show();
    });
    if(content_theme_type === 3) {
        setHeaderTitle();
    }
}
function updateAppBookFooter(){
    if($('.page').find('.v_3').length > 0 ){
        $('.page').find('[class=page_footer_wrapper],[class="page_footer_wrapper v3"]').each(function(index,page_footer_wrapper){
            var type_id = $(page_footer_wrapper).attr("type_id") ;
            $(page_footer_wrapper).hide();
            $(page_footer_wrapper).addClass('is_set') ;
            $(page_footer_wrapper).find('[class=page_footer_bg]').each(function(index,page_footer_bg){
                if(type_id === "double_long"){}else{
                    $(page_footer_bg).attr("src", $(page_footer_bg).attr('data-src').split(",")[1]);
                }
            });
            $(page_footer_wrapper).show();
        });
    }
}
function setHeaderTitle(){
    $(".page[header-title]").each(function(){
        var title = $(this).attr("header-title") ;
        $(this).find(".page_header_title").html(title);
    })
}
function getPageNumStr(page){
    var page_num =  page ;
    var page_str = "" ;
    if(page_num < 10){
        page_str = "00" + page_num ;
    }else if(page_num >= 10 && page_num < 100)
        page_str = "0" + page_num ;
    else
        page_str = "" + page_num ;
    return page_str ;
}