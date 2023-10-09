import { format, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';

let tours = []

async function loadTours() {
  const response = await fetch(
    'https://www.bit-by-bit.ru/api/student-projects/tours'
  );
  const data = await response.json()
  return data
}

async function init() {
  const tours = await loadTours()
  renderTours(tours)
  
}
init()

function renderTours(tours) {

    let containerTours = document.getElementById('containerTours')
    containerTours.innerHTML = '';
  tours.forEach((tour) => {
    const duration = differenceInDays(
      new Date(tour.endTime),
      new Date(tour.startTime)
    );
    containerTours.innerHTML += `
   
       <div id="tourID" class="bg-white shadow-lg rounded-lg overflow-hidden p-2 flex flex-col justify-between duration-{amount} transition duration-150 ease-in-out transform hover:scale-105">


       
       <div><div class="bg-indigo-800 text-white w-8 text-center rounded-full absolute m-2">${
         tour.rating
       }</div>
       <img class="rounded h-32 w-full sm:h-32 md:h-40" src="${
         tour.image
       }"></div>

       <div class="flex flex-col">
<div>



       <span class="text-xs text-slate-500 pt-3">${tour.country}</span>
${
  tour.city !== null
    ? `  <span class="text-slate-500 pt-6 px-1">&middot;
    </span>  
    <span class="text-xs text-slate-500 pt-3">${tour.city}</span>
    `
    : ''
}


     

    

       <div class="text-lg text-indigo-800 pt-3 font-semibold leading-normal">${
         tour.hotelName
       }</div>


       <div class="pt-3 font-semibold text-lg">${tour.price}</div>


       <div class="text-xs pt-3 text-slate-500">${format(
         new Date(tour.startTime),
         `dd MMMM yyyy`,
         { locale: ru }
       )} - ${format(new Date(tour.endTime), `dd MMMM yyyy`, { locale: ru })} 
    Продплжительность: ${duration}</div>
    </div>

    <div>

    <div class="pt-3 flex justify-between">
    <button id="btnReservation-${tour.id}" class="bg-white border-2 rounded-lg border-indigo-700 text-xs text-indigo-800 pt-1 leading-normal p-1.5 hover:bg-indigo-800 hover:text-white w-28">Забронировать</button>
    <button class="bg-blue-800 border-2 rounded-lg border-indigo-800 text-xs text-white pt-1 leading-normal p-1.5 hover:bg-white hover:text-indigo-800 w-28">В избранное</button>
    </div>
    </div>
    
    </div>
    
    </div>

    
    
    
    `;

    
    tours.forEach((tour) =>{
        const btnBook = document.getElementById(`btnReservation-${tour.id}`) 
      btnBook.addEventListener('click', () =>{
        openWindow(tour.id)  
      });
    })
  })}

const modalWindow = document.getElementById('modalWindow'); //окно
const сloseWindows = document.getElementById('BtnCloseWindows');//кнопка закрыть
const btnReservation = document.getElementById(`btnReservation-${tours.id}`); //кнопка забронировать т.е. открыть окно
const bookTourBtn = document.getElementById('btnToSend')

bookTourBtn.addEventListener('click',(event) => bookTour(event))
//открываем
let currentId;

function openWindow(id) {
  currentId = id;

  modalWindow.style.display = 'flex';

  tours.find((u) => {return u.id === id;});
  сloseWindows.addEventListener('click', сloseWindows)
 
}

function сloseWindows(){
    modalWindow.style.display='none'
}

async function bookTour(t){
    const form = document.getElementById('form')

    const userName = document.getElementById('name').value
    const userPhone = document.getElementById('phone').value
    const userEmail = document.getElementById('email').value
    const userComment = document.getElementById('comment').value
    
    let userData = {
        name: userName,
        phone: userPhone,
        email: userEmail,
        comment: userComment
    }

    const tourID = currentId

    const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${tourID}`
      
    let response = await fetch (url, {
        method: "POST", 
        body: JSON.stringify(userData)
      })
      if(response.ok){
        alert("Ваше обращение зарегистрировано")
        сloseWindows()
        let result = await response.json() 
        return result
      }else{
        alert("Повторите ещё раз! ПРОИЗОШЛА ОШИБКА")
      }
}

//очищение полей
function clearWindow() {
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
  document.getElementById('comment').value = '';
}




