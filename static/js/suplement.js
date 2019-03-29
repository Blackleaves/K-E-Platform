function blockFlow() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll < topSpace) {
        if (flowState != 0) {
            $('#buy-it-block').addClass('on-top').removeClass('on-flow').removeClass('on-bottom');
            flowState = 0;
            $('#buy-it-block').css("right",0);
        }
    } else {
        // visible part of footer should be less than bottomSpace
        if ( getVisibleHeight($('footer')) < bottomSpace ) {
            // than buy-it-block flow
            if (flowState != 1) {
                $('#buy-it-block').addClass('on-flow').removeClass('on-top').removeClass('on-bottom');
                flowState = 1;
                $('#buy-it-block').css("right",rightPadding);
            }
        } else {
            // otherwise buy-it-block should be blocked
            if (flowState != 2) {
            $('#buy-it-block').addClass('on-bottom').removeClass('on-top').removeClass('on-flow');
            flowState = 2;
            $('#buy-it-block').css("right",0);
            }
        }
    }
}

function calculateTopBottom() {
    topSpace = parseInt($("header")[0].scrollHeight) + parseInt($("content .wrapper").css("padding-top")) + parseInt($("content .wrapper .rating")[0].scrollHeight);
    bottomSpace = parseInt($(window).height()) - parseInt($("content .buy-it-block")[0].scrollHeight) - parseInt($("content .wrapper").css("padding-bottom")) - 20;
}

function calculateRightPadding() {
    if ( $("content .wrapper")[0].scrollWidth > $(window).width() ) {
        rightPadding = getVisibleWidth($("content .buy-it-wrapper")) - $("content .buy-it-wrapper")[0].scrollWidth;
    } else {
        rightPadding = ( $(window).width() - $("content .wrapper")[0].scrollWidth ) / 2;
    }
}


function getVisibleHeight(visibleObject) {    
    var $el = $('footer'),
        scrollTop = $(this).scrollTop(),
        scrollBot = scrollTop + $(this).height(),
        elTop = $el.offset().top,
        elBottom = elTop + $el.outerHeight(),
        visibleTop = elTop < scrollTop ? scrollTop : elTop,
        visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
    var result = visibleBottom - visibleTop;
    return result;
}
function getVisibleWidth(visibleObject) {    
    var $el = visibleObject,
        scrollLeft = $(this).scrollLeft(),
        scrollRight = scrollLeft + $(this).width(),
        elLeft = $el.offset().left,
        elRight = elLeft + $el.outerWidth(),
        visibleLeft = elLeft < scrollLeft ? scrollLeft : elLeft,
        visibleRight = elRight > scrollRight ? scrollRight : elRight;
    var result = visibleRight - visibleLeft;
    return result;
}