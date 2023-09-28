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
    <div class="mt-12 gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
       ${tour.country},
       ${tour.city},
       ${tour.hotelName},
       ${tour.rating},
       ${tour.image},
       ${tour.price},
       ${format(new Date(tour.startTime), `dd, MMMM, yyyy`, 
       {locale: ru}
           )} - ${format(new Date(tour.endTime), `dd, MMMM, yyyy`, 
       {locale: ru }
       )}, Продплжительность: ${duration}
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
} */

/* document.getElementById("Indonesia").addEventListener('click',() => (tours, "Индонезия"))
document.getElementById("Thailand").addEventListener('click',() => (tours, "Тайланд"))
document.getElementById("Maldives").addEventListener('click',() => (tours, "Мальдивы"))
document.getElementById("Egypt").addEventListener('click',() => (tours, "Египет"))
document.getElementById("All").addEventListener('click',() => filterCountry(tours)) */


init()
