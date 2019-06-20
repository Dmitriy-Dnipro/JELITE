class Gift {

    numberOfBasicProducts: number;
    numberOfAdditions: number;
    numberOfSingle: number;
    comment: string;

    constructor(numberOfBasicProducts: number, numberOfAdditions?: number, comment?:string) {
        this.numberOfBasicProducts  = numberOfBasicProducts;
        this.numberOfAdditions      = numberOfAdditions;
        this.comment                = comment;
    }

    basicGiftsList: Product[] = [];
    additionGiftsList: Product[] = [];

    public addElementToArray(_array, _element) {
        _array.push(_element);
    }

}

class Product {

    type: string;
    picture: string;
    name: string;
    subname: string;
    quantity: number;

    constructor(productType: string, productPicture: string, productName: string, productSubname: string, quantity?: number) {
        this.type = productType;
        this.picture = productPicture;
        this.name = productName;
        this.subname = productSubname;
        this.quantity = quantity;
    }

    showData() {
        return `url: ${this.picture}, product name: ${this.name}`;
    }
}

let gift: Gift;

let buttonsPresent      = document.querySelectorAll('.present-button');
let buttonPresentSpec   = document.getElementsByClassName('present-button-special')[0];
let additionTab         = document.getElementsByClassName('tab-link-addition')[0];
let sauceMeatTab        = document.getElementsByClassName('tab-link-sauce-meat')[0];
let jamTab              = document.getElementsByClassName('tab-link-jam')[0];

let orderSectionBig     = document.getElementById('order');
//кнопки добавления в корзину и их обертки
let buttonsWrappers     = document.querySelectorAll('.swiper-product-slide');
let buttons             = document.querySelectorAll('.product-button');

//кнопка редактирования заказа
let editOrderButton     = document.getElementsByClassName('edit-order')[0];
let wrapper             = document.getElementsByClassName('box')[0];

//обертка количества товаров в корзине
let orders              = document.getElementsByClassName('order-content')[0];

//обертки товаров
let boxesWrapps         = document.querySelectorAll('.box-wrapper-item');
let boxesWrappsAdaptive = document.querySelectorAll('.swiper-box-slide');

//поле в форме где будет комментарий
let formField           = document.getElementsByClassName('person-choise-comment')[0];

//заголовок формы
let formTitle           = document.getElementsByClassName('form-title')[0];

//let headerHeight;

for (let i = 0; i < buttonsPresent.length; i++) {
    buttonsPresent[i].addEventListener("click", () => {

        let numberOfBasicProducts    = +buttonsPresent[i].getAttribute('data-basicnumber');
        let numberOfAdditions        = +buttonsPresent[i].getAttribute('data-additionnumber');
        let comment                  = buttonsPresent[i].getAttribute('data-comment');
        let commentInner             = document.createTextNode(comment);
        
        formField.innerHTML = '';



        gift = new Gift(numberOfBasicProducts, numberOfAdditions, comment);
        clearCart();
        console.log(numberOfBasicProducts, numberOfAdditions,  comment);

        let paragraph = document.getElementsByClassName('insert-text')[0];
        paragraph.innerHTML = '';
        let text;
        let textHeader;

        if(numberOfAdditions != 0) {
            text = document.createTextNode('Ваш набор из ' + numberOfBasicProducts + ' баночек и ' + numberOfAdditions + '  дополнения');
            additionTab.style.display = "flex";
        } else if (numberOfBasicProducts == 0) {
            text = document.createTextNode('Ваш набор должен состоять из не менее чем 30 баночек');
            additionTab.style.display = "none";
            if(additionTab.classList.contains('current')) {
                additionTab.classList.remove('current');
                //jamTab.classList.add('current');
                jamTab.click();
            }
        } else if (numberOfBasicProducts == 3) {
            text = document.createTextNode('Ваш набор из ' + numberOfBasicProducts + ' баночек');
            additionTab.style.display = "none";
            sauceMeatTab.style.display = 'none';
            if(additionTab.classList.contains('current')) {
                additionTab.classList.remove('current');
                jamTab.click();
            } else if(sauceMeatTab.classList.contains('current')) {
                sauceMeatTab.classList.remove('current');
                jamTab.click();
            }
        } else if(numberOfAdditions == 0 && numberOfBasicProducts == 2) {
            text = document.createTextNode('Ваш набор из ' + numberOfBasicProducts + ' баночек');
            additionTab.style.display = "none";
            sauceMeatTab.style.display = 'none';
            if(additionTab.classList.contains('current')) {
                additionTab.classList.remove('current');
                jamTab.click();
            } else if(sauceMeatTab.classList.contains('current')) {
                sauceMeatTab.classList.remove('current');
                jamTab.click();
            }
        } else {
            text = document.createTextNode('Ваш набор из ' + numberOfBasicProducts + ' баночек');
            additionTab.style.display = "none";
            sauceMeatTab.style.display = "flex";
            if(additionTab.classList.contains('current')) {
                additionTab.classList.remove('current');
                jamTab.click();
            };
        }
        
        paragraph.appendChild(text);
        formField.appendChild(commentInner);

        let orderSection = document.getElementById('order-range');
        orderSection.classList.add('show-section');

        buttonsWrappers.forEach(element => {
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
}

//вешаю цикл по прикрутке события обработки клика на кажжую кнопку
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {

        //достаю дата-аттрибуты
        let name    = buttons[i].getAttribute('data-name');
        let subname = buttons[i].getAttribute('data-subname');
        let type    = buttons[i].getAttribute('data-type');
        let url     = buttons[i].getAttribute('data-url');

        //создается объект товара
        let product: Product = new Product(type, url, name, subname, 1);

        //показываю хтмл корзины и выбираю саму коробку чтобы в нее добавлять хтмл товаров
        orderSectionBig.classList.add('show-section');
        // let wrapper = document.getElementsByClassName('box')[0];

        switch(type) { 
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

        if(gift.comment === 'соусы и джемы поштучно') {
            buttons[i].style.pointerEvents = 'none';
            orderSectionBig.style.backgroundImage = 'none';
        } else {
            orderSectionBig.style.backgroundImage = '';
        }
        
    });
}

function calcHeaderHeight() {
    let height = document.getElementsByTagName('header')[0].offsetHeight;
    return height;
}

function addElementToArray(_array: Array, _number: Number, _product: Product, _wrapper, _name, _subname, _type, _url, _quantity?) {

    if (gift.numberOfBasicProducts != 0) {

        // console.log(_array.length);
        // console.log(_array);

        if (_array.length < _number) {
            //renderHTML(true);
            //объект пихается в массив товаров в корзине
            gift.addElementToArray(_array, _product);
    
            //создаётся обёртка для товара в корзине
            let itemWrapper = document.createElement('div');
            itemWrapper.classList.add('item-placeholder');
            _wrapper.appendChild(itemWrapper);
    
            //обертка изображения в корзине
            let productImageWrapper = document.createElement('div');
            productImageWrapper.classList.add('image-wrapper');
            itemWrapper.appendChild(productImageWrapper);
    
            //изображение товара в корзине
            let productImage = document.createElement('img');
            productImage.src = _url;
            productImageWrapper.appendChild(productImage);
    
            //обертка текста и кнопок
            let textWrap = document.createElement('div');
            textWrap.classList.add('text-wrap');
            itemWrapper.appendChild(textWrap);
    
            //создаётся абстрактный фрагмент в который я помещу текст и кнопки
            var fragment = document.createDocumentFragment();
    
            //начинка обертки -- текст
            let upperParagraph = document.createElement('p');
            upperParagraph.classList.add('upper-text');
            let upperParagraphText = document.createTextNode(_name);
            upperParagraph.appendChild(upperParagraphText);
    
            let bottomParagraph = document.createElement('p');
            bottomParagraph.classList.add('bottom-text');
            let bottomParagraphText = document.createTextNode(`"${_subname}"`);
            bottomParagraph.appendChild(bottomParagraphText);
    
            //начинка обертки -- кнопка удаления товара
            let buttonDelete = document.createElement('button');
            buttonDelete.classList.add('button-delete');
            buttonDelete.setAttribute('data-delete', _subname);
            let buttonDeleteText = document.createTextNode('Удалить');
            buttonDelete.appendChild(buttonDeleteText);
    
            buttonDelete.addEventListener('click', () => {
                let data = buttonDelete.getAttribute('data-delete');
                let parentBlock = buttonDelete.parentNode;
                let hugeParentBlock = parentBlock.parentNode;
    
                let result = _array.find(obj => {
                    return obj.subname === data;
                });
    
                let indexOfDeleted = _array.indexOf(result);
                _array.splice(indexOfDeleted, 1);
    
                removeBox(hugeParentBlock);
    
                console.log(hugeParentBlock);
                console.log(_array);
            });
    
            //вставляем абстрактный фрагмент
            fragment.appendChild(upperParagraph);
            fragment.appendChild(bottomParagraph);
            fragment.appendChild(buttonDelete);
    
            textWrap.appendChild(fragment);
    
        } else {
            //выбираем попап который будет появляться если пользователь будет добавлять больше товаров корзину чем она вмещает
            $('#modalFormFullCart').modal('show');
        }
    } else {
        gift.addElementToArray(_array, _product);
    
        //создаётся обёртка для товара в корзине
        let itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-placeholder');
        _wrapper.appendChild(itemWrapper);

        //обертка изображения в корзине
        let productImageWrapper = document.createElement('div');
        productImageWrapper.classList.add('image-wrapper');
        itemWrapper.appendChild(productImageWrapper);

        //изображение товара в корзине
        let productImage = document.createElement('img');
        productImage.src = _url;
        productImageWrapper.appendChild(productImage);

        //обертка текста и кнопок
        let textWrap = document.createElement('div');
        textWrap.classList.add('text-wrap');
        itemWrapper.appendChild(textWrap);

        //создаётся абстрактный фрагмент в который я помещу текст и кнопки
        var fragment = document.createDocumentFragment();

        //начинка обертки -- текст
        let upperParagraph = document.createElement('p');
        upperParagraph.classList.add('upper-text');
        let upperParagraphText = document.createTextNode(_name);
        upperParagraph.appendChild(upperParagraphText);

        let bottomParagraph = document.createElement('p');
        bottomParagraph.classList.add('bottom-text');
        let bottomParagraphText = document.createTextNode(`"${_subname}"`);
        bottomParagraph.appendChild(bottomParagraphText);

        //начинка оберкти -- блок с увеличением / уменьшением количества товара
        let singleBlock = document.createElement('div');
        singleBlock.classList.add('number-block');

        let blockFragment = document.createDocumentFragment();

        //начинка обертки -- кнопка уменьшения количества товара
        let buttonDecrease = document.createElement('button');
        buttonDecrease.classList.add('button-decrease');
        let buttonDecreaseText = document.createTextNode('-');
        buttonDecrease.setAttribute('data-target', _subname);
        buttonDecrease.appendChild(buttonDecreaseText);
        

        buttonDecrease.addEventListener('click', () => {

            let data = buttonIncrease.getAttribute('data-target');
            let result = _array.find(obj => {
                return obj.subname === data;
            });

            if(result.quantity > 1) {
                result.quantity = result.quantity - 1;

                let inner = document.createTextNode(result.quantity);
                quantityProduct.innerHTML = '';
                quantityProduct.appendChild(inner);
            }
            
        });

        //начинка обертки -- количество товара
        let quantityProduct = document.createElement('p');
        quantityProduct.classList.add('quantity');
        let quantityProductNumber = document.createTextNode(_quantity);
        quantityProduct.appendChild(quantityProductNumber );

        //начинка обертки -- кнопка увеличения количества товара
        let buttonIncrease = document.createElement('button');
        buttonIncrease.classList.add('button-increase');
        let buttonIncreaseText = document.createTextNode('+');
        buttonIncrease.setAttribute('data-target', _subname);
        buttonIncrease.appendChild(buttonIncreaseText);

        buttonIncrease.addEventListener('click', () => {

            let data = buttonIncrease.getAttribute('data-target');
            let result = _array.find(obj => {
                return obj.subname === data;
            });

            result.quantity = result.quantity + 1;

            let inner = document.createTextNode(result.quantity);
            quantityProduct.innerHTML = '';
            quantityProduct.appendChild(inner);
        });

        blockFragment.appendChild(buttonDecrease);
        blockFragment.appendChild(quantityProduct);
        blockFragment.appendChild(buttonIncrease);

        singleBlock.appendChild(blockFragment);

        //начинка обертки -- кнопка удаления товара
        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('button-delete');
        buttonDelete.setAttribute('data-delete', _subname);
        let buttonDeleteText = document.createTextNode('Удалить');
        buttonDelete.appendChild(buttonDeleteText);

        buttonDelete.addEventListener('click', () => {
            let data = buttonDelete.getAttribute('data-delete');
            let parentBlock = buttonDelete.parentNode;
            let hugeParentBlock = parentBlock.parentNode;
            let necOrderButtons = document.querySelectorAll('[data-subname = ' + data + ']');

            //console.log(necOrderButton);

            

            let result = _array.find(obj => {
                return obj.subname === data;
            });

            //console.log(result);

            let indexOfDeleted = _array.indexOf(result);

            //console.log(indexOfDeleted);
            _array.splice(indexOfDeleted, 1);

            removeBox(hugeParentBlock);

            necOrderButtons.forEach(element => {
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
    
}

function renderElementInFinalCart(_array, flag) {

    if (flag === true) {
        _array.forEach(element => {

            //создаётся обёртка для товара в корзине
            let productWrapperBig = document.createElement('div');
            productWrapperBig.classList.add('order-product');
            orders.appendChild(productWrapperBig);
    
            let fragment = document.createDocumentFragment();
    
            let numberInnerBlock = document.createElement('div');
            numberInnerBlock.classList.add('order-product-number');
    
            let textInnerBlock = document.createElement('div');
            textInnerBlock.classList.add('order-product-text');
    
            let textInner = document.createElement('p');
            let text = document.createTextNode(`${element.name} "${element.subname}"`);
            textInner.appendChild(text);
    
            let numberInner = document.createElement('p');
            let number = document.createTextNode(`${element.quantity} шт.`);
            numberInner.appendChild(number);
    
            textInnerBlock.appendChild(textInner);
            numberInnerBlock.appendChild(numberInner);
    
            fragment.appendChild(textInnerBlock);
            fragment.appendChild(numberInnerBlock);
            productWrapperBig.appendChild(fragment);
            
            
        });
    } else {
        _array.forEach(element => {

            //создаётся обёртка для товара в корзине
            let productWrapperBig = document.createElement('div');
            productWrapperBig.classList.add('order-product');
            orders.appendChild(productWrapperBig);
    
            let fragment = document.createDocumentFragment();
    
            let textInnerBlock = document.createElement('div');
            textInnerBlock.classList.add('order-product-text');
    
            let textInner = document.createElement('p');
            let text = document.createTextNode(`${element.name} "${element.subname}"`);
            textInner.appendChild(text);
    
            textInnerBlock.appendChild(textInner);
    
            fragment.appendChild(textInnerBlock);
            productWrapperBig.appendChild(fragment);
            
            
        });
    }

    
};

function removeBox(_block) {
    if (gift.basicGiftsList.length == 0 && gift.additionGiftsList.length == 0) {

        let headerHeight = calcHeaderHeight();

        $('html, body').animate({
            scrollTop: $( '#order-range' ).offset().top - headerHeight
        }, 500);

        orderSectionBig.classList.remove('show-section');
    }

    _block.remove();
}

function clearCart() {
    gift.basicGiftsList.length = 0;
    gift.additionGiftsList.length = 0;

    let itemWrappers = document.getElementsByClassName('item-placeholder');
    
    if(itemWrappers.length > 0) {
        console.log(itemWrappers);
        while(itemWrappers.length > 0) {
            itemWrappers[0].remove();
        }
        
        orderSectionBig.classList.remove('show-section');
    }
}

function renderFormOrder(_sum?) {
    let itemWrappers    = document.getElementsByClassName('item-placeholder');
    let hiddenElements  = document.querySelectorAll('.box .hide');
    let box             = document.getElementsByClassName('box')[0];
    let form            = document.getElementById('main-order');
    let numberInput     = document.getElementsByName('number')[0];
        
    if(itemWrappers.length > 0) {
        console.log(itemWrappers);
        while(itemWrappers.length > 0) {
            itemWrappers[0].remove();
        }
    }

    for(let i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].classList.remove('hide');
        hiddenElements[i].classList.add('shown');
    }

    box.classList.add('box-form');

    if(gift.comment === 'соусы и джемы поштучно') {
        numberInput.setAttribute('value', _sum);
        numberInput.readOnly = true;

        renderElementInFinalCart(gift.basicGiftsList, true);
        renderElementInFinalCart(gift.additionGiftsList, true);
    } else {
        numberInput.setAttribute('value', '10');
        renderElementInFinalCart(gift.basicGiftsList, false);
        renderElementInFinalCart(gift.additionGiftsList, false);
    }

    

    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute('name', 'arrays');
    input.setAttribute('value', JSON.stringify(gift.basicGiftsList));

    console.log(gift.basicGiftsList);
    form.appendChild(input);

    let inputAddition = document.createElement("input");
    inputAddition.setAttribute("type", "hidden");
    inputAddition.setAttribute('name', 'arrays-addition');
    inputAddition.setAttribute('value', JSON.stringify(gift.additionGiftsList));

    form.appendChild(inputAddition);

    console.log(input);
    console.log(inputAddition);

    

    makeOrderButtons[0].classList.add('hide');
    makeOrderButtons[1].classList.remove('hide');
}

let makeOrderButtons = document.getElementsByClassName('make-order');

makeOrderButtons[0].addEventListener('click', () => {

    switch(gift.comment) { 
        case 'соусы и джемы поштучно': { 
            let sum = 0;

            gift.basicGiftsList.forEach(element => {
                sum = sum + element.quantity;
            });
        
            console.log(sum);
        
            if (sum < 30) {
                $('#modalFormNotFullCart').modal('show');
            } else {
                renderFormOrder(sum);
                
                let headerHeight = calcHeaderHeight();

                $('html, body').animate({
                    scrollTop: $( '#order' ).offset().top - headerHeight
                }, 500);

                boxesWrapps.forEach(element => {
                    element.style.pointerEvents = 'none';
                });

                boxesWrappsAdaptive.forEach(element => {
                    element.style.pointerEvents = 'none';
                });

                buttonsWrappers.forEach(element => {
                    element.style.pointerEvents = 'none';
                });
            }

            break;
        } 
        default: { 

            if (gift.basicGiftsList.length < gift.numberOfBasicProducts || gift.additionGiftsList.length < gift.numberOfAdditions) {
                $('#modalFormNotFullCart').modal('show');
            } else {
                renderFormOrder();


                let headerHeight = calcHeaderHeight();

                $('html, body').animate({
                    scrollTop: $( '#order' ).offset().top - headerHeight
                }, 500);

                boxesWrapps.forEach(element => {
                    element.style.pointerEvents = 'none';
                });

                boxesWrappsAdaptive.forEach(element => {
                    element.style.pointerEvents = 'none';
                });

                buttonsWrappers.forEach(element => {
                    element.style.pointerEvents = 'none';
                });
            }

           break; 
        } 
    }

});

editOrderButton.addEventListener('click', () => {
    let shownElements  = document.querySelectorAll('.box .shown');
    //let addedElements  = document.querySelectorAll('.order-content .order-product');

    boxesWrapps.forEach(element => {
        element.style.pointerEvents = 'auto';
    });

    boxesWrappsAdaptive.forEach(element => {
        element.style.pointerEvents = 'auto';
    });

    buttonsWrappers.forEach(element => {
        element.style.pointerEvents = 'auto';
    });

    shownElements.forEach(element => {
        element.classList.add('hide');
    });

    orders.innerHTML = '';



    if(gift.comment === 'соусы и джемы поштучно') {
            
        gift.basicGiftsList.forEach(element => {
            renderWidenHTML(element, wrapper, gift.basicGiftsList);
        });

    }else {
        gift.basicGiftsList.forEach(element => {
            renderBasicHTML(element, wrapper, gift.basicGiftsList);
        });
    
        gift.additionGiftsList.forEach(element => {
            renderBasicHTML(element, wrapper, gift.additionGiftsList);
        });
    }

    

    wrapper.classList.remove('box-form');

    makeOrderButtons[1].classList.add('hide');
    makeOrderButtons[0].classList.remove('hide');
});

function renderBasicHTML(_array, _wrapper, _array1) {

    
        //создаётся обёртка для товара в корзине
        let itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-placeholder');
        _wrapper.appendChild(itemWrapper);

        //обертка изображения в корзине
        let productImageWrapper = document.createElement('div');
        productImageWrapper.classList.add('image-wrapper');
        itemWrapper.appendChild(productImageWrapper);

        //изображение товара в корзине
        let productImage = document.createElement('img');
        productImage.src = _array.picture;
        productImageWrapper.appendChild(productImage);

        //обертка текста и кнопок
        let textWrap = document.createElement('div');
        textWrap.classList.add('text-wrap');
        itemWrapper.appendChild(textWrap);

        //создаётся абстрактный фрагмент в который я помещу текст и кнопки
        var fragment = document.createDocumentFragment();

        //начинка обертки -- текст
        let upperParagraph = document.createElement('p');
        upperParagraph.classList.add('upper-text');
        let upperParagraphText = document.createTextNode(_array.name);
        upperParagraph.appendChild(upperParagraphText);

        let bottomParagraph = document.createElement('p');
        bottomParagraph.classList.add('bottom-text');
        let bottomParagraphText = document.createTextNode(`"${_array.subname}"`);
        bottomParagraph.appendChild(bottomParagraphText);

        //начинка обертки -- кнопка удаления товара
        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('button-delete');
        buttonDelete.setAttribute('data-delete', _array.subname);
        let buttonDeleteText = document.createTextNode('Удалить');
        buttonDelete.appendChild(buttonDeleteText);

        buttonDelete.addEventListener('click', () => {
            let data = buttonDelete.getAttribute('data-delete');
            let parentBlock = buttonDelete.parentNode;
            let hugeParentBlock = parentBlock.parentNode;

            let result = _array1.find(obj => {
                return obj.subname === data;
            });

            //console.log(result);

            let indexOfDeleted = _array1.indexOf(result);

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
    let itemWrapper = document.createElement('div');
    itemWrapper.classList.add('item-placeholder');
    _wrapper.appendChild(itemWrapper);

        //обертка изображения в корзине
        let productImageWrapper = document.createElement('div');
        productImageWrapper.classList.add('image-wrapper');
        itemWrapper.appendChild(productImageWrapper);

        //изображение товара в корзине
        let productImage = document.createElement('img');
        productImage.src = _array.picture;
        productImageWrapper.appendChild(productImage);

        //обертка текста и кнопок
        let textWrap = document.createElement('div');
        textWrap.classList.add('text-wrap');
        itemWrapper.appendChild(textWrap);

        //создаётся абстрактный фрагмент в который я помещу текст и кнопки
        var fragment = document.createDocumentFragment();

        //начинка обертки -- текст
        let upperParagraph = document.createElement('p');
        upperParagraph.classList.add('upper-text');
        let upperParagraphText = document.createTextNode(_array.name);
        upperParagraph.appendChild(upperParagraphText);

        let bottomParagraph = document.createElement('p');
        bottomParagraph.classList.add('bottom-text');
        let bottomParagraphText = document.createTextNode(`"${_array.subname}"`);
        bottomParagraph.appendChild(bottomParagraphText);

        //начинка оберкти -- блок с увеличением / уменьшением количества товара
        let singleBlock = document.createElement('div');
        singleBlock.classList.add('number-block');

        let blockFragment = document.createDocumentFragment();

        //начинка обертки -- кнопка уменьшения количества товара
        let buttonDecrease = document.createElement('button');
        buttonDecrease.classList.add('button-decrease');
        let buttonDecreaseText = document.createTextNode('-');
        buttonDecrease.setAttribute('data-target', _array.subname);
        buttonDecrease.appendChild(buttonDecreaseText);
        

        buttonDecrease.addEventListener('click', () => {

            if(_array.quantity > 1) {
                _array.quantity = _array.quantity - 1;

                let inner = document.createTextNode(_array.quantity);
                quantityProduct.innerHTML = '';
                quantityProduct.appendChild(inner);
            }
            
        });

        //начинка обертки -- количество товара
        let quantityProduct = document.createElement('p');
        quantityProduct.classList.add('quantity');
        let quantityProductNumber = document.createTextNode(_array.quantity);
        quantityProduct.appendChild(quantityProductNumber );

        //начинка обертки -- кнопка увеличения количества товара
        let buttonIncrease = document.createElement('button');
        buttonIncrease.classList.add('button-increase');
        let buttonIncreaseText = document.createTextNode('+');
        buttonIncrease.setAttribute('data-target', _array.subname);
        buttonIncrease.appendChild(buttonIncreaseText);

        buttonIncrease.addEventListener('click', () => {

            let data = buttonIncrease.getAttribute('data-target');
            

            _array.quantity = _array.quantity + 1;

            let inner = document.createTextNode(_array.quantity);
            quantityProduct.innerHTML = '';
            quantityProduct.appendChild(inner);
        });

        blockFragment.appendChild(buttonDecrease);
        blockFragment.appendChild(quantityProduct);
        blockFragment.appendChild(buttonIncrease);

        singleBlock.appendChild(blockFragment);

        //начинка обертки -- кнопка удаления товара
        let buttonDelete = document.createElement('button');
        buttonDelete.classList.add('button-delete');
        buttonDelete.setAttribute('data-delete', _array.subname);
        let buttonDeleteText = document.createTextNode('Удалить');
        buttonDelete.appendChild(buttonDeleteText);

        buttonDelete.addEventListener('click', () => {
            let data = buttonDelete.getAttribute('data-delete');
            let parentBlock = buttonDelete.parentNode;
            let hugeParentBlock = parentBlock.parentNode;
            let necOrderButtons = document.querySelectorAll('[data-subname=' + data +']');

            let result = _arrayOfProducts.find(obj => {
                return obj.subname === data;
            });

            //console.log(result);

            let indexOfDeleted = _arrayOfProducts.indexOf(result);

            //console.log(indexOfDeleted);
            _arrayOfProducts.splice(indexOfDeleted, 1);

            removeBox(hugeParentBlock);

            necOrderButtons.forEach(element => {
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