var key = '0qMWKgY4Hc74rbHIH8PQajMGaFPK4oztpyJCkqS4';
var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2022-5-11&api_key='

fetch(url + key)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
    });