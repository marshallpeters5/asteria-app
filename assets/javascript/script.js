var key = '0qMWKgY4Hc74rbHIH8PQajMGaFPK4oztpyJCkqS4';
var selectedDate = document.getElementById('input-date')
var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + selectedDate + '&page=1&api_key='

function getApi(event){
fetch(url + key, {
    earth_date: selectedDate,
})
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
    });
}

function submitDateEventListener(){
    const submitDate = document.getElementById('submit')
    submitDate.addEventListener("submit", getApi)
    console.log(submitDate)
}
console.log(earth_date)