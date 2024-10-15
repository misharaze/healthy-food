'use strict';




const modal = require('./modules/modal'); //все файлы переносяться сюда
      slider = require('./modules/slider');
      calc = require('./modules/calc');
      timer = require('./modules/timer');

modal(); //здесь вызываюца все скрипты которые были зозданы
slider();
calc();
timer(); 

    
  // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
      bindpostData(item);
    });

    const postData = async (url, data) => {
    const res = await fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
     });

     return  await res.json();

    };

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); 
        
            const formData = new FormData(form);
             
             const json = JSON.stringify(Object.fromEntries(formData.entries())); //привращаем formdata в 
                                            //массив после классический обьект а после в json


            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

           postData(' http://localhost:3000', JSON.stringify(object))
            .then(data=>{
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
   fetch(' http://localhost:3000')
    .then(data => data.json())
    .then(res => console.log(res));




    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


   

 
  










//исползавание классов для картачек
class MenuCard {
    constructor(src, alt, title,descr,price, parentSelector,...classes){ //получаем радителя див при помоши рarentselector
    this.src = src;
    this.alt = alt;        //эта хранилища данных 
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.transfer= 27;
    this.classes= classes;
    this.parent = document.querySelector(parentSelector);
    this.changeToUAH();
    }
    
    changeToUAH (){
    this.price = this.price * this.transfer; // переводит курс
    
    
    }
    render(){
    const element = document.createElement('div'); //получаем элемент со страницы
    this.classes.forEach(classeName =>element.classList.add(classeName));
    element.innerHTML = `
    <img src=${this.src} alt=${this.alt}>
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>
   
    
    `;
    const getRessource = async (url) => {
        const res = await fetch(url)

        
        if (!res.ok){
         throw new error (`could not fetch ${url}, status: ${res.status} `);
            
        }
         return  await res.json();

        
    
        };
        //getRessource('http://localhost:3000/comments')
        //.then(data =>{
        //data.forEach(({img, altimg, title,descr,price} )=>{
     //new MenuCard(img, altimg, title,descr,price, '.menu .container').render();
          //  });
        //});

      //axios.get(' http://localhost:3000')
      //.then(data => {
       // data.data.forEach(({img, altimg, title,descr,price} )=>{
       // new MenuCard(img, altimg, title,descr,price, '.menu .container').render();
        // });

     // });



    

        function createCard(data){       
         data.forEach(({img, altimg, title,descr,price} )=>{ //диструктуризация данных
         const element = document.createElement('div');
         element.classList.add('menu__item');
         element.innerHTML = `
        <img src=${img} alt=${altimg}>
       <h3 class="menu__item-subtitle">${title}</h3>
      <div class="menu__item-descr">${descr}</div>
       <div class="menu__item-divider"></div>
        <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${price}</span> грн/день</div>
       </div>
   
    `;
    document.querySelector('.menu .container').append(element);
        });
        }
    
    
        this.parent.append(element);  //получаем родителя и ставим аппенд чтобы помисит элемент после родителя
    if(this.classes.length === 0 ){
        this.element = 'menu__item';
        element.classList.add(this.element);

    }else{
        this.classes.forEach(classeName =>element.classList.add(classeName));
    }
    }
}
    new MenuCard(         //настройка новых элементов
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',     //это шитается как две части нада ставить ‘снаружи
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
         9,
         '.menu .container',
         //'menu__item',
         //'big'
        ).render();
         
   //calc
   


