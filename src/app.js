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

function renderTours(tours) {
    document.getElementById("containerTours").innerHTML = ""
    tours.forEach((tour) => {
        const duration = differenceInDays(
            new Date(tour.andTime), 
            new Date(tour.startTime)
            )
        document.getElementById("containerTours").innerHTML += `
    <div class="my-10">
       ${tour.country}, 
       ${tour.hotel}, 
       ${format(new Date(tour.startTime), `dd, MMMM, yyyy`, 
       {locale: ru}
           )} - ${format(new Date(tour.andTime), `dd, MMMM, yyyy`, 
       {locale: ru }
       )}, Продплжительность: ${duration}
    </div>
    `
    })
}

function filterCountry(tours, country) {
    if (country) {
        const filteredTours = tours.filter((tour) => {
            return tour.country === country
        })
        renderTours(filteredTours)
    } else {
        renderTours(tours)
    }
}

async function init() {
    const tours = await loadTours()
    renderTours(tours)

    document
        .getElementById("indonesia")
        .addEventListener("click", () => filterCountry(tours, "Индонезия"))
    document
        .getElementById("thailand")
        .addEventListener("click", () => filterCountry(tours, "Тайланд"))
    document
        .getElementById("Maldives")
        .addEventListener("click", () => filterCountry(tours, "Мальдивы"))
    document
        .getElementById("all")
        .addEventListener("click", () => filterCountry(tours))
        
        renderTours(tours)
}

init()
