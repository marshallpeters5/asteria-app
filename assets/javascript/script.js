var selectedDateEl = document.querySelector('#input-date')
var selectedDate = dayjs(selectedDateEl.value).format('YYYY/MM/DD')

function getApi(event) {
    event.preventDefault();
    var queryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?page=1&earth_date=' + selectedDateEl.value + '&api_key=0qMWKgY4Hc74rbHIH8PQajMGaFPK4oztpyJCkqS4'
    fetch(queryUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        });
}

document.getElementById("submit").addEventListener("click", getApi)