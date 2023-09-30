import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"

let tours

async function  loadTours() {
    const response = await fetch('https://www.bit-by-bit.ru/api/student-projects/tours')
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
    <div class= "mt-12 gap-8 grid-cols-1 sm:grid-cols-2 w-1/4 h-full">
       <div class="bg-white shadow-lg rounded-lg h-96">

       <div class="p-2">
       <div><div class="bg-indigo-800 text-white w-8 text-center rounded-full absolute m-2">${tour.rating}</div>
       <img class="rounded h-36 w-full" src="${tour.image}"></div>
       <div class="text-xs text-slate-500 pt-3">${tour.country} - ${tour.city}</div>
       <div class="text-lg text-indigo-800 pt-3 font-semibold leading-normal">${tour.hotelName}</div>
       <div class="pt-3 font-semibold text-lg">${tour.price}</div>
       <div class="text-xs pt-3 text-slate-500">${format(new Date(tour.startTime), `dd MMMM yyyy`, 
       {locale: ru}
           )} - ${format(new Date(tour.endTime), `dd MMMM yyyy`, 
       {locale: ru }
       )} 
    Продплжительность: ${duration}</div>

    <div class="pt-3">
    <button class="bg-white border-2 rounded-lg border-indigo-700 text-xs text-indigo-800 pt-3 font-semibold leading-normal">Забронировать</button</div>
    
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
