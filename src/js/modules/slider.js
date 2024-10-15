 //slider первый вариант и второй вариант

const slides = document.querySelectorAll('.offer__slide'),
prev = document.querySelector('.offer__slider-prev'),
next = document.querySelector('.offer__slider-next'),  
total = document.querySelector('#total'),    //отвичает за сшет слидеров
current = document.querySelector('#current'),
slidesWrapper = document.querySelector('.offer__slider-wrapper'),
slidesField = document.querySelector('.offer__slider-inner'),
width= window.getComputedStyle(slidesWrapper).width; //вытаскиваем одно своиство width 

let slideIndex = 1;   //для счета слидеров
let offset = 0; // устанавливаеть размер элемента в наборе совпдающих элементов (ориентировка)

if(slides.length < 10) {     //eсли каличество слайдов меньши чем 10
total.textContent = `0${slides.length}`;  
current.textContent =  `0${slideIndex}`;                                         
}  else {
  total.textContent = slides.length;
  current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%'; //умнажаем каличество слайдав на 100%
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden'; //скрывает все что выходит из wrapper

slides.forEach(slide=>{      //Берем все слайды перибираем и каждему устанавливаем одну и туже шерину
slide.style.width = width;
});



next.addEventListener('click', () => {
if(offset == +width.replace(/\D/g, '') * (slides.length - 1)){
offset = 0;  //здесь будит 500 который будет умнажаться

}else{
offset += +width.replace(/\D/g, ''); //cлид будеть смещаса на опрделеную виличину

} 



slidesField.style.transform = `translateX(-${offset}px)`;
if(slideIndex == slides.length){
slideIndex = 1;
}else {
slideIndex++;
}
if(slides.length <10){
current.textContent = `0${slideIndex} `;
}
else{
current.textContent = slideIndex;
}
});


prev.addEventListener('click', () => {
if (offset == 0){
//здесь будит 500 который будет умнажаться
offset = +width.replace(/\D/g, '') * (slides.length - 1);
}else{
offset -= +width.replace(/\D/g, ''); //cлид будеть смещаса на опрделеную виличину

} 


slidesField.style.transform = `translateX(-${offset}px)`;

if(slideIndex == 1 ){
slideIndex = slides.length;
}else {
slideIndex--;
}
if(slides.length <10){
current.textContent = `0${slideIndex} `;
}
else{
current.textContent = slideIndex;
}
});



showSlides(slideIndex);   //помишаем 1 (slide index) чтобы скрыть все картинки

if(slides.length < 10) {     //eсли каличество слайдов меньши чем 10
total.textContent = `0${slides.length}`;  
                                        
}  else {
  total.textContent = slides.length;
}



function showSlides (n){    //отвичает за прокрутку слайдеров
if (n >  slides.length){
slideIndex= 1;

}
if (n < 1){

slideIndex = slides.length;
}
slides.forEach(item =>item.style.display = 'none ');//скрытия слидеров 

slides[slideIndex -1].style.display = 'block';

if(slides.length < 10) {     //eсли каличество слайдов меньши чем 10
current.textContent = `0${slideIndex}`;  
                                    // будет изминятся не только показ слида но и шетьчик   
}  else {
current.textContent = slideIndex;  
}
}

function plusSlides (n){
showSlides(slideIndex += n);


}
prev.addEventListener('click', () =>{
plusSlides(-1);

});

next.addEventListener('click', () =>{
plusSlides(1);

});