import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"
import Swal from 'sweetalert2'

let tours = []

async function loadTours() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const data = await response.json()
    return data
}
// универсальная функция, отдает отфильтрованные туры
function filterByCountry(country) {
    if (country) {
        const filteredTours = tours.filter((tour) => {
            return tour.country === country
        })
        renderTours(filteredTours)
    } else {
        renderTours(tours)
    }
}

const ratingCheckboxes = document.querySelectorAll('.checkbox-input')
ratingCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () =>{
        const rating = parseFloat(checkbox.getAttribute('data-raiting'))
        filterByRating(rating)
    })
})

//под вопросом по рейтенгу
function filterByRating(minRating) {
  
ratingCheckboxes.forEach((checkbox) =>{
    checkbox.checked = false
})
const selectedCheckbox = document.getElementById(`checkbox${minRating}`)
if(selectedCheckbox){
    selectedCheckbox.checked = true

    if(minRating === 7.0){
        const filteredTours = tours.filter((tour) => tour.rating < 8.0)
        renderTours(filteredTours)
}else if(minRating === 8.0){
    const filteredTours = tours.filter((tour) => tour.rating >= 8.0 && tour.rating < 9.0)
    renderTours(filteredTours)
}
}else if(minRating === 9.0){
    const filteredTours = tours.filter((tour) => tour.rating >= 9.0)
    renderTours(filteredTours)
}}

function loader() {
    let loaderEl = document.getElementById("loader")
    loaderEl.classList.add("hidden")
    setTimeout(() => {
        loaderEl.remove()
    }, 1000)
}

async function init() {
    tours = await loadTours()
    renderTours(tours)
    loader()

const countries = [
    {
        id:'thailand',
        name:'Тайланд'

    },
    {
        id:'maldives',
        name:'Мальдивы'
    },
    {
        id:'indonesia',
        name:'"Индонезия'
    },
    {
        id:'egypt',
        name:'Египет'
    },
    {
        id:'mexiko',
        name:'Мексика'
    },
    {
        id:'cyprus',
        name:'Кипр'
    },
    {
        id:'tanzania',
        name:'Танзания'
    },
    {
        id:'all',
        name:'null'
    },
]
countries.forEach((country) => {
    const item = document.getElementById(country.id)
    if(item){
        item.addEventListener('click', () => filterByCountry(country.name))
    }
})

   /*  document
        .getElementById("thailand")
        .addEventListener("click", () => filterByCountry(tours, "Тайланд"))
    document
        .getElementById("maldives")
        .addEventListener("click", () => filterByCountry(tours, "Мальдивы"))
    document
        .getElementById("indonesia")
        .addEventListener("click", () => filterByCountry(tours, "Индонезия"))
    document
        .getElementById("egypt")
        .addEventListener("click", () => filterByCountry(tours, "Египет"))
    document
        .getElementById("mexiko")
        .addEventListener("click", () => filterByCountry(tours, "Мексика"))
    document
        .getElementById("cyprus")
        .addEventListener("click", () => filterByCountry(tours, "Кипр"))
    document
        .getElementById("tanzania")
        .addEventListener("click", () => filterByCountry(tours, "Танзания"))
    document
        .getElementById("all")
        .addEventListener("click", () => filterByCountry(tours))
 */
/* 
const countryButtons = Array.from(document.getElementsByClassName('country-filter'))
        countryButtons.forEach(countryButton =>{
            countryButton.addEventListener("click", () => filterByCountry(tours, countryButton.dateset.country))
        })

        const ratingCheckboxes = Array.from(document.getElementsByClassName('rating'))
        ratingCheckboxes.forEach(ratingCheckboxe => {
            ratingCheckbox.addEventListener("click", () => filterByRating(tours, ratingCheckbox.value))
        })  */

        const ratingCheckboxes = document.querySelectorAll('.checkbox-labels')
        ratingCheckboxes.forEach((checkbox) =>{
           checkbox.addEventListener('change', (event) =>{
                if(event.target.checked){
                    const rating = event.target.getAttribute(data-rating)
                    filterByRating(rating)
                }
            })
        })
}
init()

function renderTours(tours) {
    let containerTours = document.getElementById("containerTours")
    containerTours.innerHTML = ""
    tours.forEach((tour) => {
        const duration = differenceInDays(
            new Date(tour.endTime),
            new Date(tour.startTime)
        )
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
        ? `  
    
    <span class="text-slate-500 pt-6 px-1">&middot;
    </span>  
    <span class="text-xs text-slate-500 pt-3">${tour.city}</span>

    `
        : ""
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
    <button id="btnReservation-${
        tour.id
    }" class="bg-white border-2 rounded-lg border-indigo-700 text-xs text-indigo-800 pt-1 leading-normal p-1.5 hover:bg-indigo-800 hover:text-white w-28">Забронировать</button>
    <button class="bg-blue-800 border-2 rounded-lg border-indigo-800 text-xs text-white pt-1 leading-normal p-1.5 hover:bg-white hover:text-indigo-800 w-28">В избранное</button>
    </div>
    </div>
    
    </div> 
    
    </div>

    
    
    
    `
    })

    tours.forEach((tour) => {
        const btnBook = document.getElementById(`btnReservation-${tour.id}`)
        btnBook.addEventListener("click", () => {
            openWindow(tour.id)
        })
    })
}

const modalWindow = document.getElementById("modalWindow") //окно
//const btnReservation = document.getElementById(`btnReservation-${tours.id}`) //кнопка забронировать т.е. открыть окно
const bookTourBtn = document.getElementById("btnToSend")

bookTourBtn.addEventListener("click", bookTour)
//открываем
let currentId

function openWindow(id) {
    currentId = id

    modalWindow.style.display = "flex"

    const currentTour = tours.find((u) => {
        return u.id === id
    })

    document.getElementById("tour-info").innerHTML = `
    <div>
    <div class="flex m-2 flex-col items-center"><img class ="rounded w-52" src="${
        currentTour.image
    }"/></div>
    <p class="text-slate-700">Страна тура</p>
    <div class="text-sm shadow-sm select-none text-indigo-700 my-0 sm:mb-3 w-full pl-1">${
        currentTour.country
    }</div>
    <p class="text-slate-700">Город тура</p>
    <div class="text-sm shadow-sm text-indigo-700 my-0 sm:mb-3 w-full pl-1">${
        currentTour.city
    }</div>
    
    <p class="text-slate-700">Название отеля</p>
    <div class="text-sm shadow-sm text-indigo-700 my-0 sm:mb-3 w-full pl-1">
    ${currentTour.hotelName}
    </div>
    <p class="text-slate-700">Бронируемые даты поездки</p>
    <div class="text-sm shadow-sm select-none text-indigo-700 my-0 sm:mb-3 w-full pl-1">
    ${format(new Date(currentTour.startTime), `dd MMMM yyyy`, {
        locale: ru
    })} - ${format(new Date(currentTour.endTime), `dd MMMM yyyy`, {
        locale: ru
    })}</div>
    

    </div>
    `

    const сloseWindowsButton = document.getElementById("btnCloseWindows") //кнопка закрыть
    сloseWindowsButton.addEventListener("click", сloseWindows)
}

function сloseWindows() {
    modalWindow.style.display = "none"
}

async function bookTour() {
    const userName = document.getElementById("name").value
    const userPhone = document.getElementById("phone").value
    const userEmail = document.getElementById("email").value
    const userComment = document.getElementById("comment").value

    let userData = {
        customerName: userName,
        phone: userPhone,
        email: userEmail,
        comment: userComment
    }

    const tourID = currentId

    const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${tourID}`

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userData)
    })
    if (response.ok) {
     /*    document.getElementById("registered").style.display = "flex" */
     Swal.fire({
        title: "Ваша заявка зарегистрирована",
        text: "Наш менеджер с вами скоро свяжется",
        icon: "info"
      });


        сloseWindows()
        clearWindow()
    } else {
       /*  document.getElementById("error").style.display = "flex" */

       Swal.fire({
        icon: "error",
        title: "Заполните пожалуйста все поля!",
        text: "Ждём вашу заявку с нетерпением",
       
      });
    }
}

/* //закрывается окно о том что все зарегестрированно
document.getElementById("registeredBtnClose").addEventListener("click", () => {
    document.getElementById("registered").style.display = "none"
}) */
//errorBtnClose кнопка закрыть ошибку
//error окно ошибки
//функция для закрытия ошибки при введения поля
const errorClose = document.getElementById("errorBtnClose") //кнопка закрыть
errorClose.addEventListener("click", сloseError)

function сloseError() {
    error.style.display = "none"
}

//очищение полей
function clearWindow() {
    document.getElementById("name").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("comment").value = ""
}
