//'use strict';

const deadline = '2023-04-2'; //отправная точка

function getTimeRemaining(endtime){

    const t = Date.parse(endtime) - Date.parse(new Date()),
     days = Math.floor( (t/(1000 *60 *60 * 24)) ),
    seconds = Math.floor( (t/ 1000) % 60 ),
    minutes = Math.floor( (t/ 1000 /60) % 60 ),
    hours = Math.floor( (t/(1000 * 60 * 60) % 24) );
                                                              //обшие каличество часов делим на 2
  timeInterval = setInterval(updateClock, 1000);



          return{    //возврашает нам функцию для переисползавания

            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          };
      }
function getZero(num){

  if(num >= 0 && num < 10){
  return `0 ${num}`;
}else{
  return num;
}
}



         function setClock(selector, endtime){  //арг для запуска функции

    const timer = document.querySelector(selector),
           days = timer.querySelector('#days'),
           hours = timer.querySelector('#hours'),
           minutes = timer.querySelector('#minutes'),
           seconds = timer.querySelector('#seconds');

           updateClock();

      function updateClock(){
       const t  = getTimeRemaining(endtime);

          days.innerHTML= t.days;  // каличество дней которые нужна отобразить на страницы
          hours.innerHTML= t.hours;
          minutes.innerHTML= t.minutes; 
          seconds.innerHTML= t.seconds; 

          if( t.total <= 0);{  //если время вышло тимер не оьнавляется
            clearInterval(timeInterval);
          }
          
        }
        
      }
      setClock('.timer', deadline);
         
        
