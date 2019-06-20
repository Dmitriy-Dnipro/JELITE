var outerContent = $('.tabs-good-wrapper');
var innerContent = $('.tabs-goods');
           
outerContent.scrollLeft( (innerContent.width() - outerContent.width()) / 2);

$(function(){ 
    //making divs of similar height
    $.fn.equivalent = function (){
        //запишем значение jQuery выборки к которой будет применена эта функция в локальную переменную $blocks
        var $blocks = $(this),
            //примем за максимальную высоту - высоту первого блока в выборке и запишем ее в переменную maxH
        maxH    = $blocks.eq(0).height();
        //делаем сравнение высоты каждого блока с максимальной
        $blocks.each(function(){
            maxH = ( $(this).height() > maxH ) ? $(this).height() : maxH;
        });
        //устанавливаем найденное максимальное значение высоты для каждого блока jQuery выборки
        $blocks.height(maxH);
    }
    //применяем нашу функцию в элементам jQuery выборки - $('.nav')
    $('.feature-name').equivalent();
    $('.slider-nav-content').equivalent();
    $('.box-wrapper-item-image').equivalent();
    $('.box-wrapper-item-text').equivalent();
    $('.swiper-slide-inside').equivalent();
    $('.slick-slide .box-wrapper-item-text-sub').equivalent();
    $('.swiper-slide .box-wrapper-item-text-sub').equivalent();
    //$('.block-decision').equivalent();

    $('.adaptive-menu').click(function() {
        $('.mobile-menu').toggleClass('active-menu');
        $('.menu-button').toggleClass('active-menu-icon');
    });
});

(function($) {
    //$('.accordion > li:eq(0) a').addClass('active').nextAll(':lt(2)').slideDown();

    $('.accordion a').click(function(j) {
        var dropDown = $(this).closest('li').find('ul');
        var dropDownImage = $(this).closest('li').find('img');

        
        $(this).closest('.accordion').find('ul').not(dropDown).slideUp();
        $(this).closest('.accordion').find('img').not(dropDownImage).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();
        dropDownImage.stop(false, true).slideToggle();

        //actions with images to the left
        var tab_id = $(this).attr('data-image');
        console.log(tab_id);
        $('div.show-image').removeClass('show-image');
        $("#"+tab_id).addClass('show-image');


        j.preventDefault();
    });
})(jQuery);

$(function() {
    //caches a jQuery object containing the header element
    var header = $('header');
    var screenFirstHeight = $('#intro').height();
    console.log(screenFirstHeight);
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= screenFirstHeight - 100) {
            header.addClass('header-shadow');
        } else {
            header.removeClass('header-shadow');
        }
    });
});

$(function() {
    //slider tabs
    $('ul.tastes-list li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tastes-list li').removeClass('current');
		$('.tab-content-top').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
});

$(function() {
    //slider tabs
    $('ul.tabs-goods li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs-goods li').removeClass('current');
		$('.tab-content-choice ').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
});

$(function() {
    $('.tastes-heading').click(function(){
        $(this).toggleClass('tastes-heading-current');
        $(this).siblings('ul.tastes-list').toggleClass('tabs-active');
	});
});

//smooth anchor scroll
$('.hide-till-desktop .navigation-list .navigation-list-element a').click(function(){

    var headerHeight = $('header').height() + 15;
    
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - headerHeight
    }, 1000);
    
    // $('.mobile-menu').toggleClass('active-menu');
    // $('.menu-button').toggleClass('active-menu-icon');

    return false;
});

$('.hide-from-desktop .mobile-menu li a').click(function(){

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 54
    }, 1000);
    
    $('.mobile-menu').toggleClass('active-menu');
    $('.menu-button').toggleClass('active-menu-icon');

    return false;
});

$('.footer-menu li a').click(function(){
    
    var headerHeight = $('header').height();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - headerHeight
    }, 1000);
    
    return false;
});

$('.present-button').click(function() {
    
    if ($(window).width() < 376) {
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 90
            
        }, 1000);
    } else if($(window).width() < 769) {
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 104
            
        }, 1000);
    } else {
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 75
            
        }, 1000);
    }

});

$('.product-button').click(function() {
    
    if ($(window).width() < 376) {
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 90
            
        }, 1000);
    } else if($(window).width() < 769) {
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 104
            
        }, 1000);
    } else {
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 75
            
        }, 1000);
    }

});

$('.feature-image-svg-wrapper').click(function() {

    if ($(this).parent().parent().hasClass('feature-active')) {
        $(this).parent().parent().removeClass('feature-active');
    } else {
        $('.feature-active').removeClass('feature-active');
        $(this).parent().parent().toggleClass('feature-active');
    }

});

$('#mobile-logo').click(function(){
    
    var headerHeight = $('header').height();
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - headerHeight
    }, 1000);
    // $('.mobile-menu').toggleClass('active-menu');
    // $('.menu-button').toggleClass('active-menu-icon');
    return false;
});


$('.feature-arrow-bottom').click(function() {

    if ($(this).parent().hasClass('feature-active')) {
        $(this).parent().removeClass('feature-active');
    } else {
        $('.feature-active').removeClass('feature-active');
        $(this).parent().toggleClass('feature-active');
    }

});

$(document).mouseup(function(e) 
{
    var container = $('.feature');
    
    if (!container.is(e.target) && container.hasClass('feature-active') && container.has(e.target).length === 0) 
    {
        container.removeClass('feature-active');
    }
});

$('.box-wrapper-item').on('click tap', function() {
    $(this).children('button').css({
        'visibilty' : 'visible',
        'opacity' : 1
    }); 

    $(this).children('img').css({
        'visibilty' : 'visible',
        'opacity' : 1,
        'z-index' : 4
    }); 
});

$('.language-switcher').on('click tap', function() {
    $(this).toggleClass('show-language-switcher');
})