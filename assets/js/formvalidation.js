//import { throws } from "assert";

var refreshbutton = document.getElementById('refresh');

function checkOrder() {
    var form = $('#main-order');
    var form_data = form.serialize(); //собераем все данные из формы
    var name = $('#main-order').find('input[name=name]').val();
    var city = $('#main-order').find('input[name=city]').val();
    var phone = $('#main-order').find('input[name=tel]').val();
    var email = $('#main-order').find('input[name=email]').val();
    var number = $('#main-order').find('input[name=number]').val();
    var reTel = /^[\d ()+-]+$/;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    var errors = 0;
    $("#main-order :input").map(function(){
        if( !$(this).val() ) {
                $(this).css(
                    {
                        'border-bottom-color': 'red'
                    }
                )
              errors++;
        } else if(!reTel.test(phone)) {
            $('#result-box').html("Неправильный формат телефона, используйте только цифры, символы '+', '-' ");
    
            var headerHeight = $('header').height();
            console.log(headerHeight);
            $('html, body').animate({
                scrollTop: $( '#order' ).offset().top - headerHeight
            }, 500);
    
            return false;
    
        } else if (!re.test(email)) {
            $('#result-box').html("Неправильный формат электронной почты");
    
            var headerHeight = $('header').height();
            console.log(headerHeight);
            $('html, body').animate({
                scrollTop: $( '#order' ).offset().top - headerHeight
            }, 500);
    
            return false;
        } else if(number < 10) {
            $('#result-box').html("Недостаточное количество наборов");
    
            var headerHeight = $('header').height();
            console.log(headerHeight);
            $('html, body').animate({
                scrollTop: $( '#order' ).offset().top - headerHeight
            }, 500);
    
            return false;
        }
        else if ($(this).val()) {
              $(this).css(
                {
                    'border-bottom-color': '#dcdcdc'
                }
            )
        } else {
            $(this).css(
                {
                    'border-bottom-color': '#dcdcdc'
                }
            )
        } 
    });
    if(errors > 0){
        $('#result-box').html("Заполните все обязательные поля");
        return false;
    }
    
    
    // if(name.length == 0 || phone.length == 0 || city.length == 0) {

    //     // if(name.length == 0) {
    //     //     $('#order-form-name').css(
    //     //         {
    //     //             'border-bottom-color': 'red'
    //     //         }
    //     //     )
    //     // } else if(phone.length == 0) {
    //     //     $('#order-form-phone').css(
    //     //         {
    //     //             'border-bottom-color': 'red'
    //     //         }
    //     //     )
    //     // } else if(city.length == 0) {
    //     //     $('#order-form-city').css(
    //     //         {
    //     //             'border-bottom-color': 'red'
    //     //         }
    //     //     )
    //     // }

    //     $('#result-box').html("Заполните все обязательные поля");

    //     var headerHeight = $('header').height();
    //     $('html, body').animate({
    //         scrollTop: $( '#order' ).offset().top - headerHeight
    //     }, 500);

    //     return false;

    // } else if(!reTel.test(phone)) {
    //     $('#result-box').html("Неправильный формат телефона, используйте только цифры, символы '+', '-' ");

    //     $('#order-form-phone').css(
    //         {
    //             'border-bottom-color': 'red'
    //         }
    //     )

    //     var headerHeight = $('header').height();
    //     console.log(headerHeight);
    //     $('html, body').animate({
    //         scrollTop: $( '#order' ).offset().top - headerHeight
    //     }, 500);

    //     return false;

    // } else if (!re.test(email)) {
    //     $('#result-box').html("Неправильный формат электронной почты");

    //     $('#order-form-email').css(
    //         {
    //             'border-bottom-color': 'red'
    //         }
    //     )

    //     var headerHeight = $('header').height();
    //     console.log(headerHeight);
    //     $('html, body').animate({
    //         scrollTop: $( '#order' ).offset().top - headerHeight
    //     }, 500);

    //     return false;
    // } else if(number < 10) {
    //     $('#result-box').html("Недостаточное количество наборов");

    //     var headerHeight = $('header').height();
    //     console.log(headerHeight);
    //     $('html, body').animate({
    //         scrollTop: $( '#order' ).offset().top - headerHeight
    //     }, 500);

    //     return false;
    // } 

    setTimeout(function() { location.reload(); }, 1000);
    return true;
}

function checkSign() {
    var form = $('#sign-form');
    var form_data = form.serialize(); //собираем все данные из формы
    var name = $('#sign-form').find('input[name=name]').val();
    var phone = $('#sign-form').find('input[name=tel]').val();
    var email = $('#sign-form').find('input[name=email]').val();
    var reTel = /^[\d ()+-]+$/;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(name.length == 0 || phone.length == 0) {
        $('#result-sign').html("Заполните все обязательные поля");
        return false;
    } else if(!reTel.test(phone)) {
        $('#result-sign').html("Неправильный формат телефона, используйте только цифры, символы '+', '-' ");
        return false;
    } else if (!re.test(email)) {
        $('#result-sign').html("Неправильный формат электронной почты");
        return false;
    } 

    
    setTimeout(function() { location.reload(); }, 1000);
    return true;
}

function checkPopup() {
    var form = $('#form-popup');
    var form_data = form.serialize(); //собираем все данные из формы
    var name = $('#form-popup').find('input[name=name]').val();
    var phone = $('#form-popup').find('input[name=tel]').val();
    var reTel = /^[\d ()+-]+$/;
    if(name.length == 0 || phone.length == 0) {
        $('#result-popup').html("Заполните все обязательные поля");
        return false;
    } else if(!reTel.test(phone)) {
        $('#result-popup').html("Неправильный формат телефона, используйте только цифры, символы '+', '-' ");
        return false;
    }

    setTimeout(function() { location.reload(); }, 1000);
    return true;
}

function checkformInline() {
    var form = $('#line-form');
    var form_data = form.serialize(); //собираем все данные из формы
    var name = $('#line-form').find('input[name=name]').val();
    var phone = $('#line-form').find('input[name=tel]').val();
    //var email = $('#bottomForm').find('input[name=email]').val();
    var reTel = /^[\d ()+-]+$/;
    //var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(name.length == 0 || phone.length == 0) {
        $('#inline-result').html("Заполните все обязательные поля");
        return false;
    } else if(!reTel.test(phone)) {
        $('#inline-result').html("Неправильный формат телефона, используйте только цифры, символы '+', '-' ");
        return false;
    }

    setTimeout(function() { location.reload(); }, 1000);
    return true;
}