import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"
import { differenceInDays } from 'date-fns'

let tours 


async function loadTours() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const data = await response.json()
    return data
}

async function init() {
    const tours = await loadTours()
    renderTours(tours)
}init()

function renderTours(tours) {
    document.getElementById("containerTours").innerHTML = ""
    tours.forEach((tour) => {
        const duration = differenceInDays(
            new Date(tour.endTime),
            new Date(tour.startTime)
        )
        document.getElementById("containerTours").innerHTML += `
   
       <div class="bg-white shadow-lg rounded-lg overflow-hidden p-2 flex flex-col justify-between duration-{amount} transition duration-150 ease-in-out transform hover:scale-105">


       
       <div><div class="bg-indigo-800 text-white w-8 text-center rounded-full absolute m-2">${
           tour.rating
       }</div>
       <img class="rounded h-32 w-full sm:h-32 md:h-40" src="${tour.image}"></div>

       <div class="flex flex-col">
<div>



       <span class="text-xs text-slate-500 pt-3">${tour.country}</span>
${
    tour.city !== null ? 
    `  <span class="text-slate-500 pt-6 px-1">&middot;
    </span>  
    <span class="text-xs text-slate-500 pt-3">${tour.city}</span>
    ` : ""
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
    <button id="BtnReservation" class="bg-white border-2 rounded-lg border-indigo-700 text-xs text-indigo-800 pt-1 leading-normal p-1.5 hover:bg-indigo-800 hover:text-white w-28">Забронировать</button>
    <button class="bg-blue-800 border-2 rounded-lg border-indigo-800 text-xs text-white pt-1 leading-normal p-1.5 hover:bg-white hover:text-indigo-800 w-28">В избранное</button>
    </div>
    </div>
    
    </div>
    
    </div>

    
    
    
    `
    })
    
}

const modalWindow = document.getElementById('modalWindow')//окно
const BtnReservation = document.getElementById('BtnReservation')//кнопка забронировать т.е. открыть окно

//открываем
let currentId
function OpenWindow(id){
    currentId = id
    document.getElementById("modalWindow").style.display = "flex"

    let tour = tours.find((u) => {
        return u.id === id
    })
    ValueGet(tour)
}

//данные карточек тура
function ValueGet(tour){
     const startDateFmtd = format(new Date(tour.startTime), "dd MMMM yyyy",{
        locale: ru,
    })
    const endDateFmtd = format(new Date(tour.endTime), "dd MMMM yyyy",{
        locale: ru,
    }) 
    document.getElementById("country").value = tour.country
    document.getElementById("city").value = tour.city
    document.getElementById("hotelName").value = tour.hotelName
    document.getElementById("startTime").value = tour.startTime
    document.getElementById("endTime").value = tour.endTime
}
//очищение полей
function clearWindow(){
    document.getElementById("Name").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("comment").value = ""
}

function CloseWindows(){
    document.getElementById("modalWindow").style.display = "none"
}
const BtnCloseWindows = document.getElementById("CloseWindows")
BtnCloseWindows.addEventListener("click",CloseWindows)

loadTours()


const parametrs = {
    Name: document.getElementById("Name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    comment: document.getElementById("comment").value,

}

 