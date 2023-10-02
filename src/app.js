import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"

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
}

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
       <img class="rounded h-32 w-full sm:min-h-auto" src="${tour.image}"></div>

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
    <button class="bg-white border-2 rounded-lg border-indigo-700 text-xs text-indigo-800 pt-1 leading-normal p-1.5 hover:bg-indigo-800 hover:text-white w-28">Забронировать</button>
    <button class="bg-blue-800 border-2 rounded-lg border-indigo-800 text-xs text-white pt-1 leading-normal p-1.5 hover:bg-white hover:text-indigo-800 w-28">В избранное</button>
    </div>
    </div>
    
    </div>
    
    </div>

    
    
    
    `
    })
}

/* function filterCountry(tours, country){
if(country){
    const filterCountry = tours.filter((tour) =>{
        return tour.country === country
    })
    renderTours(filterTours)
}else{
    renderTours(tours)
}
} 

/* document.getElementById("Indonesia").addEventListener('click',() => (tours, "Индонезия"))
document.getElementById("Thailand").addEventListener('click',() => (tours, "Тайланд"))
document.getElementById("Maldives").addEventListener('click',() => (tours, "Мальдивы"))
document.getElementById("Egypt").addEventListener('click',() => (tours, "Египет"))
document.getElementById("All").addEventListener('click',() => filterCountry(tours)) */

init()
