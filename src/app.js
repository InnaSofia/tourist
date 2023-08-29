/* 
async function tours(){
    const response = await fetch('https://www.bit-by-bit.ru/api/student-projects/tours')
    const data = await response.json()

    return data
}


const containerTours = document.getElementById('containerTours');//конт где все туры
//показать туры
function showTours(){
    containerTours.innerHTML = ''
    tours.forEach((tour) => {
        containerTours.innerHTML += `
        <div class="mt-12 gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div>${tour.country}</div>
        <div>${tour.city}</div>
        <div>${tour.hotelName}</div>
        <div>${tour.rating}</div>
        <div>${tour.image}</div>
        <div>${tour.price}</div> 
        <div>${tour.startTime} - ${tour.endTime}</div>
        </div>
        `
    });
}

showTours() */



function showTours() {
    fetch('https://www.bit-by-bit.ru/api/student-projects/tours')
    .then((response) =>{
        return response.json()
    })
    .then((data) =>{
        console.log (data)
    })
}
