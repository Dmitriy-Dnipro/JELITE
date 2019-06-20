var Gift = /** @class */ (function () {
    function Gift(numberOfBasicProducts, numberOfAdditions, comment) {
        this.basicGiftsList = [];
        this.additionGiftsList = [];
        this.numberOfBasicProducts = numberOfBasicProducts;
        this.numberOfAdditions = numberOfAdditions;
        this.comment = comment;
    }
    Gift.prototype.addElementToArray = function (_array, _element) {
        _array.push(_element);
    };
    return Gift;
}());
var Product = /** @class */ (function () {
    function Product(productType, productPicture, productName, productSubname, quantity) {
        this.type = productType;
        this.picture = productPicture;
        this.name = productName;
        this.subname = productSubname;
        this.quantity = quantity;
    }
    Product.prototype.showData = function () {
        return "url: " + this.picture + ", product name: " + this.name;
    };
    return Product;
}());
var gift;
var buttonsPresent = document.querySelectorAll('.present-button');
var buttonPresentSpec = document.getElementsByClassName('present-button-special')[0];
var additionTab = document.getElementsByClassName('tab-link-addition')[0];
var sauceMeatTab = document.getElementsByClassName('tab-link-sauce-meat')[0];
var jamTab = document.getElementsByClassName('tab-link-jam')[0];
var orderSectionBig = document.getElementById('order');
//кнопки добавления в корзину и их обертки
var buttonsWrappers = document.querySelectorAll('.swiper-product-slide');
var buttons = document.querySelectorAll('.product-button');
//кнопка редактирования заказа
var editOrderButton = document.getElementsByClassName('edit-order')[0];
var wrapper = document.getElementsByClassName('box')[0];
//обертка количества товаров в корзине
var orders = document.getElementsByClassName('order-content')[0];
//обертки товаров
var boxesWrapps = document.querySelectorAll('.box-wrapper-item');
var boxesWrappsAdaptive = document.querySelectorAll('.swiper-box-slide');
//поле в форме где будет комментарий
var formField = document.getElementsByClassName('person-choise-comment')[0];
//заголовок формы
var formTitle = document.getElementsByClassName('form-title')[0];
var _loop_1 = function (i) {
    buttonsPresent[i].addEventListener("click", function () {
        var numberOfBasicProducts = +buttonsPresent[i].getAttribute('data-basicnumber');
        var numberOfAdditions = +buttonsPresent[i].getAttribute('data-additionnumber');
        var comment = buttonsPresent[i].getAttribute('data-comment');
        var commentInner = document.createTextNode(comment);
        formField.innerHTML = '';
        gift = new Gift(numberOfBasicProducts, numberOfAdditions, comment);
        clearCart();
        console.log(numberOfBasicProducts, numberOfAdditions, comment);
        var paragraph = document.getElementsByClassName('insert-text')[0];
        paragraph.innerHTML = '';
        var text;
        var textHeader;
        if (numberOfAdditions != 0) {
            text = document.createTextNode('Ваш набор из ' + numberOfBasicProducts + ' баночек и ' + numberOfAdditions + '  дополнения');
            additionTab.style.display = "flex";
        }
        else if (numberOfBasicProducts == 0) {
            text = document.createTextNode('Ваш набор должен состоять из не менее чем 30 баночек');
            additionTab.style.display = "none";
            if (additionTab.classList.contains('current')) {
                additionTab.classList.remove('current');
                //jamTab.classList.add('current');
                jamTab.click();
            }
        }
        else if (numberOfBasicProducts == 3) {
            text = document.createTextNode('Ваш набор из ' + numberOfBasicProducts + ' баночек');
            additionTab.style.display = "none";
            sauceMeatTab.style.display = 'none';
            if (additionTab.classList.contains('current')) {
                additionTab.classList.remove('current');
                jamTab.click();
            }
            else if (sauceMeatTab.classList.contains('current')) {
                sauceMeatTab.classList.remove('current');
                jamTab.click();
            }
        }
        else if (numberOfAdditions == 0 && numberOfBasicProducts == 2) {
            text = document.createTextNode('Ваш набор из ' + numberOfBasicProducts + ' баночек');
            additionTab.style.display = "none";
            sauceMeatTab.style.display = 'none';
            if (additionTab.classList.contains('current')) {
                additionTab.classList.remove('current');
                jamTab.click();
            }
            else if (sauceMeatTab.classList.contains('current')) {
                sauceMeatTab.classList.remove('current');
                jamTab.click();
            }
        }
        else {
            text = document.createTextNode('Ваш набор из ' + numberOfBasicProducts + ' баночек');
            additionTab.style.display = "none";
            sauceMeatTab.style.display = "flex";
            if (additionTab.classList.contains('current')) {
                additionTab.classList.remove('current');
                jamTab.click();
            }
            ;
        }
        paragraph.appendChild(text);
        formField.appendChild(commentInner);
        var orderSection = document.getElementById('order-range');
        orderSection.classList.add('show-section');
        buttonsWrappers.forEach(function (element) {
            element.style.pointerEvents = 'auto';
        });
        // if (gift.basicGiftsList.length < numberOfBasicProducts || gift.additionGiftsList.length < numberOfAdditions) {
        //     formTitle.innerHTML = '';
        //     textHeader = document.createTextNode('Ваш набор еще не заполнен');
        //     formTitle.appendChild(textHeader);
        // } else {
        //     formTitle.innerHTML = '';
        //     textHeader = document.createTextNode('Ваш набор полон!');
        //     formTitle.appendChild(textHeader);
        // }
    });
};
//let headerHeight;
for (var i = 0; i < buttonsPresent.length; i++) {
    _loop_1(i);
}
var _loop_2 = function (i) {
    buttons[i].addEventListener("click", function () {
        //достаю дата-аттрибуты
        var name = buttons[i].getAttribute('data-name');
        var subname = buttons[i].getAttribute('data-subname');
        var type = buttons[i].getAttribute('data-type');
        var url = buttons[i].getAttribute('data-url');
        //создается объект товара
        var product = new Product(type, url, name, subname, 1);
        //показываю хтмл корзины и выбираю саму коробку чтобы в нее добавлять хтмл товаров
        orderSectionBig.classList.add('show-section');
        // let wrapper = document.getElementsByClassName('box')[0];
        switch (type) {
            case "jam": {
                console.log('call render function for basic list');
                addElementToArray(gift.basicGiftsList, gift.numberOfBasicProducts, product, wrapper, name, subname, type, url, 1);
                break;
            }
            case "sauce": {
                console.log('call render function for basic list');
                addElementToArray(gift.basicGiftsList, gift.numberOfBasicProducts, product, wrapper, name, subname, type, url, 1);
                break;
            }
            case "addition": {
                console.log('call render function for additional list');
                addElementToArray(gift.additionGiftsList, gift.numberOfAdditions, product, wrapper, name, subname, type, url);
                break;
            }
        }
        if (gift.comment === 'соусы и джемы поштучно') {
            buttons[i].style.pointerEvents = 'none';
            orderSectionBig.style.backgroundImage = 'none';
        }
        else {
            orderSectionBig.style.backgroundImage = '';
        }
    });
};
//вешаю цикл по прикрутке события обработки клика на кажжую кнопку
for (var i = 0; i < buttons.length; i++) {
    _loop_2(i);
}
function calcHeaderHeight() {
    var height = document.getElementsByTagName('header')[0].offsetHeight;
    return height;
}
function addElementToArray(_array, _number, _product, _wrapper, _name, _subname, _type, _url, _quantity) {
    if (gift.numberOfBasicProducts != 0) {
        // console.log(_array.length);
        // console.log(_array);
        if (_array.length < _number) {
            //renderHTML(true);
            //объект пихается в массив товаров в корзине
            gift.addElementToArray(_array, _product);
            //создаётся обёртка для товара в корзине
            var itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item-placeholder');
            _wrapper.appendChild(itemWrapper);
            //обертка изображения в корзине
            var productImageWrapper = document.createElement('div');
            productImageWrapper.classList.add('image-wrapper');
            itemWrapper.appendChild(productImageWrapper);
            //изображение товара в корзине
            var productImage = document.createElement('img');
            productImage.src = _url;
            productImageWrapper.appendChild(productImage);
            //обертка текста и кнопок
            var textWrap = document.createElement('div');
            textWrap.classList.add('text-wrap');
            itemWrapper.appendChild(textWrap);
            //создаётся абстрактный фрагмент в который я помещу текст и кнопки
            var fragment = document.createDocumentFragment();
            //начинка обертки -- текст
            var upperParagraph = document.createElement('p');
            upperParagraph.classList.add('upper-text');
            var upperParagraphText = document.createTextNode(_name);
            upperParagraph.appendChild(upperParagraphText);
            var bottomParagraph = document.createElement('p');
            bottomParagraph.classList.add('bottom-text');
            var bottomParagraphText = document.createTextNode("\"" + _subname + "\"");
            bottomParagraph.appendChild(bottomParagraphText);
            //начинка обертки -- кнопка удаления товара
            var buttonDelete_1 = document.createElement('button');
            buttonDelete_1.classList.add('button-delete');
            buttonDelete_1.setAttribute('data-delete', _subname);
            var buttonDeleteText = document.createTextNode('Удалить');
            buttonDelete_1.appendChild(buttonDeleteText);
            buttonDelete_1.addEventListener('click', function () {
                var data = buttonDelete_1.getAttribute('data-delete');
                var parentBlock = buttonDelete_1.parentNode;
                var hugeParentBlock = parentBlock.parentNode;
                var result = _array.find(function (obj) {
                    return obj.subname === data;
                });
                var indexOfDeleted = _array.indexOf(result);
                _array.splice(indexOfDeleted, 1);
                removeBox(hugeParentBlock);
                console.log(hugeParentBlock);
                console.log(_array);
            });
            //вставляем абстрактный фрагмент
            fragment.appendChild(upperParagraph);
            fragment.appendChild(bottomParagraph);
            fragment.appendChild(buttonDelete_1);
            textWrap.appendChild(fragment);
        }
        else {
            //выбираем попап который будет появляться если пользователь будет добавлять больше товаров корзину чем она вмещает
            $('#modalFormFullCart').modal('show');
        }
    }
    else {
        gift.addElementToArray(_array, _product);
        //создаётся обёртка для товара в корзине
        var itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-placeholder');
        _wrapper.appendChild(itemWrapper);
        //обертка изображения в корзине
        var productImageWrapper = document.createElement('div');
        productImageWrapper.classList.add('image-wrapper');
        itemWrapper.appendChild(productImageWrapper);
        //изображение товара в корзине
        var productImage = document.createElement('img');
        productImage.src = _url;
        productImageWrapper.appendChild(productImage);
        //обертка текста и кнопок
        var textWrap = document.createElement('div');
        textWrap.classList.add('text-wrap');
        itemWrapper.appendChild(textWrap);
        //создаётся абстрактный фрагмент в который я помещу текст и кнопки
        var fragment = document.createDocumentFragment();
        //начинка обертки -- текст
        var upperParagraph = document.createElement('p');
        upperParagraph.classList.add('upper-text');
        var upperParagraphText = document.createTextNode(_name);
        upperParagraph.appendChild(upperParagraphText);
        var bottomParagraph = document.createElement('p');
        bottomParagraph.classList.add('bottom-text');
        var bottomParagraphText = document.createTextNode("\"" + _subname + "\"");
        bottomParagraph.appendChild(bottomParagraphText);
        //начинка оберкти -- блок с увеличением / уменьшением количества товара
        var singleBlock = document.createElement('div');
        singleBlock.classList.add('number-block');
        var blockFragment = document.createDocumentFragment();
        //начинка обертки -- кнопка уменьшения количества товара
        var buttonDecrease = document.createElement('button');
        buttonDecrease.classList.add('button-decrease');
        var buttonDecreaseText = document.createTextNode('-');
        buttonDecrease.setAttribute('data-target', _subname);
        buttonDecrease.appendChild(buttonDecreaseText);
        buttonDecrease.addEventListener('click', function () {
            var data = buttonIncrease_1.getAttribute('data-target');
            var result = _array.find(function (obj) {
                return obj.subname === data;
            });
            if (result.quantity > 1) {
                result.quantity = result.quantity - 1;
                var inner = document.createTextNode(result.quantity);
                quantityProduct_1.innerHTML = '';
                quantityProduct_1.appendChild(inner);
            }
        });
        //начинка обертки -- количество товара
        var quantityProduct_1 = document.createElement('p');
        quantityProduct_1.classList.add('quantity');
        var quantityProductNumber = document.createTextNode(_quantity);
        quantityProduct_1.appendChild(quantityProductNumber);
        //начинка обертки -- кнопка увеличения количества товара
        var buttonIncrease_1 = document.createElement('button');
        buttonIncrease_1.classList.add('button-increase');
        var buttonIncreaseText = document.createTextNode('+');
        buttonIncrease_1.setAttribute('data-target', _subname);
        buttonIncrease_1.appendChild(buttonIncreaseText);
        buttonIncrease_1.addEventListener('click', function () {
            var data = buttonIncrease_1.getAttribute('data-target');
            var result = _array.find(function (obj) {
                return obj.subname === data;
            });
            result.quantity = result.quantity + 1;
            var inner = document.createTextNode(result.quantity);
            quantityProduct_1.innerHTML = '';
            quantityProduct_1.appendChild(inner);
        });
        blockFragment.appendChild(buttonDecrease);
        blockFragment.appendChild(quantityProduct_1);
        blockFragment.appendChild(buttonIncrease_1);
        singleBlock.appendChild(blockFragment);
        //начинка обертки -- кнопка удаления товара
        var buttonDelete_2 = document.createElement('button');
        buttonDelete_2.classList.add('button-delete');
        buttonDelete_2.setAttribute('data-delete', _subname);
        var buttonDeleteText = document.createTextNode('Удалить');
        buttonDelete_2.appendChild(buttonDeleteText);
        buttonDelete_2.addEventListener('click', function () {
            var data = buttonDelete_2.getAttribute('data-delete');
            var parentBlock = buttonDelete_2.parentNode;
            var hugeParentBlock = parentBlock.parentNode;
            var necOrderButtons = document.querySelectorAll('[data-subname = ' + data + ']');
            //console.log(necOrderButton);
            var result = _array.find(function (obj) {
                return obj.subname === data;
            });
            //console.log(result);
            var indexOfDeleted = _array.indexOf(result);
            //console.log(indexOfDeleted);
            _array.splice(indexOfDeleted, 1);
            removeBox(hugeParentBlock);
            necOrderButtons.forEach(function (element) {
                element.style.pointerEvents = 'auto';
            });
            console.log(hugeParentBlock);
            console.log(_array);
        });
        //вставляем абстрактный фрагмент
        fragment.appendChild(upperParagraph);
        fragment.appendChild(bottomParagraph);
        fragment.appendChild(singleBlock);
        fragment.appendChild(buttonDelete_2);
        textWrap.appendChild(fragment);
    }
}
function renderElementInFinalCart(_array, flag) {
    if (flag === true) {
        _array.forEach(function (element) {
            //создаётся обёртка для товара в корзине
            var productWrapperBig = document.createElement('div');
            productWrapperBig.classList.add('order-product');
            orders.appendChild(productWrapperBig);
            var fragment = document.createDocumentFragment();
            var numberInnerBlock = document.createElement('div');
            numberInnerBlock.classList.add('order-product-number');
            var textInnerBlock = document.createElement('div');
            textInnerBlock.classList.add('order-product-text');
            var textInner = document.createElement('p');
            var text = document.createTextNode(element.name + " \"" + element.subname + "\"");
            textInner.appendChild(text);
            var numberInner = document.createElement('p');
            var number = document.createTextNode(element.quantity + " \u0448\u0442.");
            numberInner.appendChild(number);
            textInnerBlock.appendChild(textInner);
            numberInnerBlock.appendChild(numberInner);
            fragment.appendChild(textInnerBlock);
            fragment.appendChild(numberInnerBlock);
            productWrapperBig.appendChild(fragment);
        });
    }
    else {
        _array.forEach(function (element) {
            //создаётся обёртка для товара в корзине
            var productWrapperBig = document.createElement('div');
            productWrapperBig.classList.add('order-product');
            orders.appendChild(productWrapperBig);
            var fragment = document.createDocumentFragment();
            var textInnerBlock = document.createElement('div');
            textInnerBlock.classList.add('order-product-text');
            var textInner = document.createElement('p');
            var text = document.createTextNode(element.name + " \"" + element.subname + "\"");
            textInner.appendChild(text);
            textInnerBlock.appendChild(textInner);
            fragment.appendChild(textInnerBlock);
            productWrapperBig.appendChild(fragment);
        });
    }
}
;
function removeBox(_block) {
    if (gift.basicGiftsList.length == 0 && gift.additionGiftsList.length == 0) {
        var headerHeight = calcHeaderHeight();
        $('html, body').animate({
            scrollTop: $('#order-range').offset().top - headerHeight
        }, 500);
        orderSectionBig.classList.remove('show-section');
    }
    _block.remove();
}
function clearCart() {
    gift.basicGiftsList.length = 0;
    gift.additionGiftsList.length = 0;
    var itemWrappers = document.getElementsByClassName('item-placeholder');
    if (itemWrappers.length > 0) {
        console.log(itemWrappers);
        while (itemWrappers.length > 0) {
            itemWrappers[0].remove();
        }
        orderSectionBig.classList.remove('show-section');
    }
}
function renderFormOrder(_sum) {
    var itemWrappers = document.getElementsByClassName('item-placeholder');
    var hiddenElements = document.querySelectorAll('.box .hide');
    var box = document.getElementsByClassName('box')[0];
    var form = document.getElementById('main-order');
    var numberInput = document.getElementsByName('number')[0];
    if (itemWrappers.length > 0) {
        console.log(itemWrappers);
        while (itemWrappers.length > 0) {
            itemWrappers[0].remove();
        }
    }
    for (var i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].classList.remove('hide');
        hiddenElements[i].classList.add('shown');
    }
    box.classList.add('box-form');
    if (gift.comment === 'соусы и джемы поштучно') {
        numberInput.setAttribute('value', _sum);
        numberInput.readOnly = true;
        renderElementInFinalCart(gift.basicGiftsList, true);
        renderElementInFinalCart(gift.additionGiftsList, true);
    }
    else {
        numberInput.setAttribute('value', '10');
        renderElementInFinalCart(gift.basicGiftsList, false);
        renderElementInFinalCart(gift.additionGiftsList, false);
    }
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute('name', 'arrays');
    input.setAttribute('value', JSON.stringify(gift.basicGiftsList));
    console.log(gift.basicGiftsList);
    form.appendChild(input);
    var inputAddition = document.createElement("input");
    inputAddition.setAttribute("type", "hidden");
    inputAddition.setAttribute('name', 'arrays-addition');
    inputAddition.setAttribute('value', JSON.stringify(gift.additionGiftsList));
    form.appendChild(inputAddition);
    console.log(input);
    console.log(inputAddition);
    makeOrderButtons[0].classList.add('hide');
    makeOrderButtons[1].classList.remove('hide');
}
var makeOrderButtons = document.getElementsByClassName('make-order');
makeOrderButtons[0].addEventListener('click', function () {
    switch (gift.comment) {
        case 'соусы и джемы поштучно': {
            var sum_1 = 0;
            gift.basicGiftsList.forEach(function (element) {
                sum_1 = sum_1 + element.quantity;
            });
            console.log(sum_1);
            if (sum_1 < 30) {
                $('#modalFormNotFullCart').modal('show');
            }
            else {
                renderFormOrder(sum_1);
                var headerHeight = calcHeaderHeight();
                $('html, body').animate({
                    scrollTop: $('#order').offset().top - headerHeight
                }, 500);
                boxesWrapps.forEach(function (element) {
                    element.style.pointerEvents = 'none';
                });
                boxesWrappsAdaptive.forEach(function (element) {
                    element.style.pointerEvents = 'none';
                });
                buttonsWrappers.forEach(function (element) {
                    element.style.pointerEvents = 'none';
                });
            }
            break;
        }
        default: {
            if (gift.basicGiftsList.length < gift.numberOfBasicProducts || gift.additionGiftsList.length < gift.numberOfAdditions) {
                $('#modalFormNotFullCart').modal('show');
            }
            else {
                renderFormOrder();
                var headerHeight = calcHeaderHeight();
                $('html, body').animate({
                    scrollTop: $('#order').offset().top - headerHeight
                }, 500);
                boxesWrapps.forEach(function (element) {
                    element.style.pointerEvents = 'none';
                });
                boxesWrappsAdaptive.forEach(function (element) {
                    element.style.pointerEvents = 'none';
                });
                buttonsWrappers.forEach(function (element) {
                    element.style.pointerEvents = 'none';
                });
            }
            break;
        }
    }
});
editOrderButton.addEventListener('click', function () {
    var shownElements = document.querySelectorAll('.box .shown');
    //let addedElements  = document.querySelectorAll('.order-content .order-product');
    boxesWrapps.forEach(function (element) {
        element.style.pointerEvents = 'auto';
    });
    boxesWrappsAdaptive.forEach(function (element) {
        element.style.pointerEvents = 'auto';
    });
    buttonsWrappers.forEach(function (element) {
        element.style.pointerEvents = 'auto';
    });
    shownElements.forEach(function (element) {
        element.classList.add('hide');
    });
    orders.innerHTML = '';
    if (gift.comment === 'соусы и джемы поштучно') {
        gift.basicGiftsList.forEach(function (element) {
            renderWidenHTML(element, wrapper, gift.basicGiftsList);
        });
    }
    else {
        gift.basicGiftsList.forEach(function (element) {
            renderBasicHTML(element, wrapper, gift.basicGiftsList);
        });
        gift.additionGiftsList.forEach(function (element) {
            renderBasicHTML(element, wrapper, gift.additionGiftsList);
        });
    }
    wrapper.classList.remove('box-form');
    makeOrderButtons[1].classList.add('hide');
    makeOrderButtons[0].classList.remove('hide');
});
function renderBasicHTML(_array, _wrapper, _array1) {
    //создаётся обёртка для товара в корзине
    var itemWrapper = document.createElement('div');
    itemWrapper.classList.add('item-placeholder');
    _wrapper.appendChild(itemWrapper);
    //обертка изображения в корзине
    var productImageWrapper = document.createElement('div');
    productImageWrapper.classList.add('image-wrapper');
    itemWrapper.appendChild(productImageWrapper);
    //изображение товара в корзине
    var productImage = document.createElement('img');
    productImage.src = _array.picture;
    productImageWrapper.appendChild(productImage);
    //обертка текста и кнопок
    var textWrap = document.createElement('div');
    textWrap.classList.add('text-wrap');
    itemWrapper.appendChild(textWrap);
    //создаётся абстрактный фрагмент в который я помещу текст и кнопки
    var fragment = document.createDocumentFragment();
    //начинка обертки -- текст
    var upperParagraph = document.createElement('p');
    upperParagraph.classList.add('upper-text');
    var upperParagraphText = document.createTextNode(_array.name);
    upperParagraph.appendChild(upperParagraphText);
    var bottomParagraph = document.createElement('p');
    bottomParagraph.classList.add('bottom-text');
    var bottomParagraphText = document.createTextNode("\"" + _array.subname + "\"");
    bottomParagraph.appendChild(bottomParagraphText);
    //начинка обертки -- кнопка удаления товара
    var buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button-delete');
    buttonDelete.setAttribute('data-delete', _array.subname);
    var buttonDeleteText = document.createTextNode('Удалить');
    buttonDelete.appendChild(buttonDeleteText);
    buttonDelete.addEventListener('click', function () {
        var data = buttonDelete.getAttribute('data-delete');
        var parentBlock = buttonDelete.parentNode;
        var hugeParentBlock = parentBlock.parentNode;
        var result = _array1.find(function (obj) {
            return obj.subname === data;
        });
        //console.log(result);
        var indexOfDeleted = _array1.indexOf(result);
        //console.log(indexOfDeleted);
        _array1.splice(indexOfDeleted, 1);
        removeBox(hugeParentBlock);
        console.log(hugeParentBlock);
        console.log(_array);
    });
    //вставляем абстрактный фрагмент
    fragment.appendChild(upperParagraph);
    fragment.appendChild(bottomParagraph);
    fragment.appendChild(buttonDelete);
    textWrap.appendChild(fragment);
}
function renderWidenHTML(_array, _wrapper, _arrayOfProducts) {
    //создаётся обёртка для товара в корзине
    var itemWrapper = document.createElement('div');
    itemWrapper.classList.add('item-placeholder');
    _wrapper.appendChild(itemWrapper);
    //обертка изображения в корзине
    var productImageWrapper = document.createElement('div');
    productImageWrapper.classList.add('image-wrapper');
    itemWrapper.appendChild(productImageWrapper);
    //изображение товара в корзине
    var productImage = document.createElement('img');
    productImage.src = _array.picture;
    productImageWrapper.appendChild(productImage);
    //обертка текста и кнопок
    var textWrap = document.createElement('div');
    textWrap.classList.add('text-wrap');
    itemWrapper.appendChild(textWrap);
    //создаётся абстрактный фрагмент в который я помещу текст и кнопки
    var fragment = document.createDocumentFragment();
    //начинка обертки -- текст
    var upperParagraph = document.createElement('p');
    upperParagraph.classList.add('upper-text');
    var upperParagraphText = document.createTextNode(_array.name);
    upperParagraph.appendChild(upperParagraphText);
    var bottomParagraph = document.createElement('p');
    bottomParagraph.classList.add('bottom-text');
    var bottomParagraphText = document.createTextNode("\"" + _array.subname + "\"");
    bottomParagraph.appendChild(bottomParagraphText);
    //начинка оберкти -- блок с увеличением / уменьшением количества товара
    var singleBlock = document.createElement('div');
    singleBlock.classList.add('number-block');
    var blockFragment = document.createDocumentFragment();
    //начинка обертки -- кнопка уменьшения количества товара
    var buttonDecrease = document.createElement('button');
    buttonDecrease.classList.add('button-decrease');
    var buttonDecreaseText = document.createTextNode('-');
    buttonDecrease.setAttribute('data-target', _array.subname);
    buttonDecrease.appendChild(buttonDecreaseText);
    buttonDecrease.addEventListener('click', function () {
        if (_array.quantity > 1) {
            _array.quantity = _array.quantity - 1;
            var inner = document.createTextNode(_array.quantity);
            quantityProduct.innerHTML = '';
            quantityProduct.appendChild(inner);
        }
    });
    //начинка обертки -- количество товара
    var quantityProduct = document.createElement('p');
    quantityProduct.classList.add('quantity');
    var quantityProductNumber = document.createTextNode(_array.quantity);
    quantityProduct.appendChild(quantityProductNumber);
    //начинка обертки -- кнопка увеличения количества товара
    var buttonIncrease = document.createElement('button');
    buttonIncrease.classList.add('button-increase');
    var buttonIncreaseText = document.createTextNode('+');
    buttonIncrease.setAttribute('data-target', _array.subname);
    buttonIncrease.appendChild(buttonIncreaseText);
    buttonIncrease.addEventListener('click', function () {
        var data = buttonIncrease.getAttribute('data-target');
        _array.quantity = _array.quantity + 1;
        var inner = document.createTextNode(_array.quantity);
        quantityProduct.innerHTML = '';
        quantityProduct.appendChild(inner);
    });
    blockFragment.appendChild(buttonDecrease);
    blockFragment.appendChild(quantityProduct);
    blockFragment.appendChild(buttonIncrease);
    singleBlock.appendChild(blockFragment);
    //начинка обертки -- кнопка удаления товара
    var buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button-delete');
    buttonDelete.setAttribute('data-delete', _array.subname);
    var buttonDeleteText = document.createTextNode('Удалить');
    buttonDelete.appendChild(buttonDeleteText);
    buttonDelete.addEventListener('click', function () {
        var data = buttonDelete.getAttribute('data-delete');
        var parentBlock = buttonDelete.parentNode;
        var hugeParentBlock = parentBlock.parentNode;
        var necOrderButtons = document.querySelectorAll('[data-subname=' + data + ']');
        var result = _arrayOfProducts.find(function (obj) {
            return obj.subname === data;
        });
        //console.log(result);
        var indexOfDeleted = _arrayOfProducts.indexOf(result);
        //console.log(indexOfDeleted);
        _arrayOfProducts.splice(indexOfDeleted, 1);
        removeBox(hugeParentBlock);
        necOrderButtons.forEach(function (element) {
            element.style.pointerEvents = 'auto';
        });
        console.log(hugeParentBlock);
        console.log(_array);
    });
    //вставляем абстрактный фрагмент
    fragment.appendChild(upperParagraph);
    fragment.appendChild(bottomParagraph);
    fragment.appendChild(singleBlock);
    fragment.appendChild(buttonDelete);
    textWrap.appendChild(fragment);
}
