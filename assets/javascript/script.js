var selectedDateEl = document.querySelector('#input-date');
var selectedDate = dayjs(selectedDateEl.value).format('YYYY-MM-DD');
var nasaApiKey = '0qMWKgY4Hc74rbHIH8PQajMGaFPK4oztpyJCkqS4';
var weatherApiKey = '66e72c1c25d39f1f6a1cdad30c8547f8';
var nextBtn = document.getElementById('next');
var prevBtn = document.getElementById('prev');
var imgDisplay = document.getElementById('img-modal-content')
var roverNameId = document.getElementById('rover-name');
var roverStatusId = document.getElementById('rover-status');
var roverNamesList = ['curiosity', 'perseverance']
var generateRoverG;
var imageBankG;
var xG = 0;
var roverNameG = "";
var roverStatusG = "";

var curiosityLaunchDate = '1322283600';
var perseveranceLaunchDate = '1596081600';
var capeLat = '28.396837'
var capeLon ='-80.605659'
var weatherApiCape = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ capeLat +'&lon='+ capeLon + '&appid=' + weatherApiKey;

fetch(weatherApiCape)
.then(function(response){return response.json()})
.then(function(reponseData){
    var tempK = reponseData.list[0].main.temp
    var windSpeed = reponseData.list[0].wind.speed
    var humidity = reponseData.list[0].main.humidity;
})

function pickRandomRover(lengthData) {
    var resultRover = Math.floor(Math.random() * lengthData.length);
    var rName = roverNamesList[resultRover];
    window.generateRoverG = rName;
}

function getNasaApi(event) {
    event.preventDefault();
    pickRandomRover(roverNamesList);
    var selectedDate = dayjs(selectedDateEl.value).format('YYYY-MM-DD');
    var nasaQueryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + `${generateRoverG}` + '/photos?page=1&earth_date=' + selectedDate + '&api_key=' + `${nasaApiKey}`;
    fetch(nasaQueryUrl)
        .then(function (response) { return response.json() })
        .then(function (data) {
            if (data.photos.length == 0) {
                var nasaQueryUrlOne = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?page=1&earth_date=' + selectedDate + '&api_key=' + `${nasaApiKey}`;
                fetch(nasaQueryUrlOne)
                    .then(function (response) { return response.json() })
                    .then(function (data) {
                        roverInfo(data);
                        roverInfoTextChanger();
                        window.xG = 0;
                        var imgUrl = data.photos[0].img_src;
                        openImageModal(imgUrl);
                        var totalImages = data.photos.length
                        var imageBankL = []
                        for (i = 0; i < totalImages; i++) {
                            imageBankL.push(data.photos[i].img_src);
                            window.imageBankG = imageBankL;
                        }
                        window.imageBankG = imageBankL;
                        document.getElementById('img_counter').textContent = `${xG + 1}` + "/" + `${imageBankG.length}`
                    })
            } else {
            roverInfo(data);
            roverInfoTextChanger();
            window.xG = 0;
            var imgUrl = data.photos[0].img_src;
            openImageModal(imgUrl);
            var totalImages = data.photos.length
            var imageBankL = []
            for (i = 0; i < totalImages; i++) {
                imageBankL.push(data.photos[i].img_src);
                window.imageBankG = imageBankL;
            }
            window.imageBankG = imageBankL;
            document.getElementById('img_counter').textContent = `${xG + 1}` + "/" + `${imageBankG.length}`
        }})
        .catch(function () {
        });
    }


function roverInfo(jsonData) {
    window.roverNameG = jsonData.photos[0].rover.name;
    window.roverStatusG = jsonData.photos[0].rover.status;
}
function roverInfoTextChanger() {
    roverNameId.textContent = 'Rover: ' + roverNameG;
    roverStatusId.textContent = 'Status: ' + roverStatusG.charAt(0).toUpperCase() + roverStatusG.slice(1);

}


nextBtn.addEventListener('click', function () {
    if (xG == imageBankG.length - 1) {
        nextBtn.disabled = true
    }
    else {
        prevBtn.disabled = false
        document.getElementById('img-modal-content').src = imageBankG[xG += 1];
        document.getElementById('img_counter').textContent = `${xG + 1}` + "/" + `${imageBankG.length}`
    }
})

prevBtn.addEventListener('click', function () {
    if (xG == 0) {
        prevBtn.disabled = true
    }
    else {
        nextBtn.disabled = false
        document.getElementById('img-modal-content').src = imageBankG[xG -= 1];
        document.getElementById('img_counter').textContent = `${xG + 1}` + "/" + `${imageBankG.length}`
    }
})


function openImageModal(img) {
    document.getElementById('img-modal-content').src = img
}

//Launch Modal

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        $trigger.addEventListener('click', () => {
            document.getElementById('img-modal-content').src = 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png';
            selectedDateEl.value = null;
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            closeAllModals();
        }
    });
});

document.getElementById("submit").addEventListener("click", getNasaApi)

//js for form-kinson
var sndMessage = document.querySelector('#sendMessagebtn',);
var marsEmail = document.querySelector('#mars');
var mmarsTextarea = document.querySelector('#textareamars');
sndMessage.addEventListener('click', function (event) {
    event.preventDefault(); // prevent the default form submission behavior
    var inputValue = document.querySelector('#my-input').value;
    var inputEmailValue = document.querySelector('#my-input2').value;
    var inputtextareaValue = document.querySelector('#textarea').value;
    localStorage.setItem('myData', inputValue);
    localStorage.setItem('emailData', inputEmailValue);
    localStorage.setItem('textareaData', inputtextareaValue);
});