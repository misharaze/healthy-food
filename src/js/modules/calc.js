'use strict';
//calc


const result = document.querySelector('.calculating__result span');


let sex, height, weight, age, ratio   //хранилища элементов

if(localStorage.getItem('sex')){
     sex =(localStorage.getItem('sex'));
}else{

    sex='female'
    localStorage.setItem('sex','female');
}

if(localStorage.getItem('ratio')){
    ratio =(localStorage.getItem('ratio'));
}else{

   ratio=1.375;
   localStorage.setItem('ratio',1.375);
}


function calCtotal (){


    if(!sex || !height||!weight|| !ratio||!age  ){

    result.textContent = '____'; //что не получидась (text content получает то что написаНа на страницы )
      return;                            //значит 2700 толко в этом случие нечего если ползаватель не заполнин

    }
if(sex === 'female'){

result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);//yмнажаем формулу на ratio


}else{
    result.textContent = Math.round((88.36 + (13.4* weight ) + (4.8 * height) - (5.7 * age )) * ratio);
}




}
calCtotal();

function getStaticInformation(parentSelector, activeClass){
 const element= document.querySelectorAll(` ${parentSelector} div`);

 element.forEach(elem =>{    //обрабочик события чтобы когда ползаватель кликает все элементы не становятся активноми
 
elem.addEventListener('click', (e) => {
    if(e.target.getAttribute('data-ratio')){
        ratio =  +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
 } else{
    sex= e.target.getAttribute('id');
    localStorage.setItem('sex',e.target.getAttribute('id'));
 }



element.forEach(elem =>{    // перебираем все элементы и добавлем и убираем класс активности
elem.classList.remove(activeClass);

});

e.target.classList.add(activeClass);

calCtotal();

 });

   });

}
getStaticInformation('#gender','calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');


function getDynamicInformation(selector){

const input =document.querySelector(selector);

input.addEventListener('input', () =>{

if (input.value.match(/\D/g)) {  //условия если ползаватель ввель не цифры а буквы 

input.style.border = '1px solid red';

} else {
    
        input.style.border ='none';
}


   switch (input.getAttribute('id')){   

        case 'height':
        height = +input.value;
        break;
        case 'weight':
        weight = +input.value;
        break;
        case 'age':
        age = +input.value;
        break;
   }
   
   
   calCtotal(); //вызываем эту функцию что каждей раз перечитавать новые ланные которые ввел ползаватель

});

 
   
}
getDynamicInformation('#height');
getDynamicInformation('#weight'); // функции вызываем всегда в конце чтобы код запустился
getDynamicInformation('#age');  
