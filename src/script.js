let tours = []

function showTours() {
    fetch("https://www.bit-by-bit.ru/api/student-projects/tours")
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
}
