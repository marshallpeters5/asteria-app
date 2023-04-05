var selectedDateEl = document.querySelector('#input-date')
var selectedDate = dayjs(selectedDateEl.value).format('YYYY/MM/DD')
var apiKey = '0qMWKgY4Hc74rbHIH8PQajMGaFPK4oztpyJCkqS4';
var nextBtn = document.getElementById('next');
var prevBtn = document.getElementById('prev');



function getApi(event) {
    event.preventDefault();
    var queryUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?page=1&earth_date=' + selectedDateEl.value + '&api_key=' + `${apiKey}`;
    fetch(queryUrl)
        .then(function (response) { return response.json() })
        .then(async function (data) {
            var totalImages = data.photos.length
            var imageBankL = []
            for (i = 0; i < totalImages; i++) {
                imageBankL.push(data.photos[i].img_src);
                window.imageBankG = imageBankL;
            }
            var imgUrl = data.photos[0].img_src;
            openImageModal(imgUrl);
        })
        .catch(function () {
        });
}

var imageBankG
var xG = 0


nextBtn.addEventListener('click', function () {
    if (xG == imageBankG.length - 1) {
        nextBtn.disabled = true
    }
    else {
        prevBtn.disabled = false
        document.getElementById('img-modal-content').src = imageBankG[xG+=1];
    }
})

prevBtn.addEventListener('click', function () {
    if (xG == 0) {
        prevBtn.disabled = true
    }
    else {
        nextBtn.disabled = false
        document.getElementById('img-modal-content').src = imageBankG[xG-=1];
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
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});


document.getElementById("submit").addEventListener("click", getApi)