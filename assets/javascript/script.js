var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?page=1&earth_date='+ selectedDate + '&api_key=0qMWKgY4Hc74rbHIH8PQajMGaFPK4oztpyJCkqS4'
var selectedDateEl = document.getElementById('input-date')
var selectedDate = dayjs(selectedDateEl.value).format('YYYY/MM/DD')
var submitDate = document.getElementById('submit')

function getApi(event) {
    event.preventDefault();
    fetch(url, {
//        earth_date: selectedDate,
//        page: 1,
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        });
}

submitDate.addEventListener("submit", getApi)