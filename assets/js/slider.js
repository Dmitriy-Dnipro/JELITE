var swiper = new Swiper('.swiper-logos', {
    slidesPerView: 3,
    slidesPerColumn: 2,
    //spaceBetween: 40,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            slidesPerColumn: 3,
            //spaceBetween: 20
        },
    }
});

var swiper1 = new Swiper('.box-swiper', {
    slidesPerView: 2,
    slidesPerColumn: 2,
    spaceBetween: 30,
    pagination: {
        type: 'bullets',
        el: '.swiper-pagination-1',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
            slidesPerColumn: 1,
            spaceBetween: 10,
            dynamicBullets: true,
            dynamicMainBullets: 3
        },
    }
});

var swiper2 = new Swiper('.swiper-goods', {
    spaceBetween: 15,
    loop: false,
    breakpointsInverse: true,
    breakpoints: {
        320: {
            slidesPerView: 3
        },
        1024: {
            slidesPerView: 6
        }
    },
    navigation: {
        nextEl: '.swiper-button-next-2',
        prevEl: '.swiper-button-prev-2',
    },
    
});

var swiper3 = new Swiper('.swiper-sauces', {
    spaceBetween: 15,
    breakpointsInverse: true,
    //slidesPerView: 5,
    breakpoints: {
        320: {
            slidesPerView: 3,
            navigation: {
                nextEl: '.swiper-button-next-3',
                prevEl: '.swiper-button-prev-3',
            }
        },
        1024: {
            slidesPerView: 5,
            navigation: false
        }
    },
    
});

var swiper4 = new Swiper('.swiper-additions', {
    spaceBetween: 15,
    breakpointsInverse: true,
    //slidesPerView: 5,
    breakpoints: {
        320: {
            slidesPerView: 3,
            navigation: {
                nextEl: '.swiper-button-next-4',
                prevEl: '.swiper-button-prev-4',
            }
        },
        1024: {
            slidesPerView: 5,
            navigation: false
        }
    },
    
});

var swiper5 = new Swiper('.swiper-sauces-meat', {
    spaceBetween: 15,
    breakpointsInverse: true,
    //slidesPerView: 4,
    breakpoints: {
        320: {
            slidesPerView: 3,
            navigation: {
                nextEl: '.swiper-button-next-5',
                prevEl: '.swiper-button-prev-5',
            }
        },
        1024: {
            slidesPerView: 4
        }
    },
    
});


$('.blocks-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.blocks-navigation'
});
$('.blocks-navigation').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.blocks-slider',
    arrows: true,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true
});

/////////////////////////

$('.goods-carousel').slick({
    slidesToShow: 1,
    slidesPerRow: 1,
    rows: 3,
    arrows : false,
    asNavFor: '.slider-goods-carousel'
});
$('.slider-goods-carousel').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.goods-carousel',
    arrows: true,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true
});

$('.sauces-carousel').slick({
    slidesToShow: 1,
    slidesPerRow: 1,
    rows: 3,
    arrows : false,
    asNavFor: '.slider-sauces-carousel'
});
$('.slider-sauces-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.sauces-carousel',
    arrows: true,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true
});


$('.sauces-meat-carousel').slick({
    slidesToShow: 1,
    slidesPerRow: 1,
    rows: 3,
    arrows : false,
    asNavFor: '.slider-sauces-meat-carousel'
});
$('.slider-sauces-meat-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.sauces-meat-carousel',
    arrows: true,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true
});
////////

$('.additions-carousel').slick({
    slidesToShow: 1,
    slidesPerRow: 1,
    rows: 2,
    arrows : false,
    asNavFor: '.slider-additions-carousel'
});
$('.slider-additions-carousel').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.additions-carousel',
    arrows: true,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true
});

$('.slider-for-1').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: false
});
$('.slider-for-6').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: false
});

$('.slider-for-7').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: false
});