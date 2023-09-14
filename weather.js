const key = 'b84309687a14433fa40115400230209';
const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=London&days=1&aqi=no&alerts=no`;


const header = document.querySelector('.header');
const form = document.querySelector('.form');
const input = document.querySelector('.input');




function removeCard() {
    const cardNow = document.getElementById('cardNow');
    const error = document.getElementById('error');
    const cardTomorrow = document.getElementById('cardTomorrow');
    const btnShow = document.querySelector('.tomorrow')
    const showTbtn = document.getElementById('showT');
    const hideTbtn = document.getElementById('hideT');
    if (cardNow) cardNow.remove();
    if (cardTomorrow) cardTomorrow.remove();
    if (error) error.remove();
    if (btnShow) btnShow.remove();
    if (showTbtn) btnShow.remove();
    if (hideTbtn) hideTbtn.remove();
}


function showError() {
    const html = `<div class="error" id="error"> sorry, city was not found</div>`;
    header.insertAdjacentHTML('afterend', html);
}


function showCard({ name, country, tempNow, tempFeelNow, conditionNow, tempTomorrow, conditionTomorrow, imgNow, imgTomorrow,wind }) {
    const html = `
    <main class="main">

        <div class="card" id="cardNow">
            <h2 class="city">${name} now <span class="country">${country}</span></h2>

            <div class='info'>
                <div class="info-temp">
                <div class="temp" id="tempNow">${tempNow} <sup>°c</sup></div>
                <div class="temp-feel" id="tempFeelNow">feels like: ${tempFeelNow} <sup>°c</sup></div>
                <div class="temp-feel">wind ${wind} km/h</div>
            </div>
                <img class="card-img" id="imgToday" src="${imgNow}" alt="Weather">
            </div>
            <div class="description" id="descToday">${conditionNow}</div>
        </div>

        <button class="btn tomorrow" title="show tomorrow" id="showT">></button>

        <div class="card hide" id="cardTomorrow">
            <h2 class="city">${name} tomorrow<span class="country">${country}</span></h2>

            <div class='info'>
                <div class="info-temp">
                <div class="temp">${tempTomorrow} <sup>°c</sup></div>
             </div>
                <img class="card-img" id="imgTomorrow" src="${imgTomorrow}" alt="Weather">
                </div>
            <div class="description" id="descTomorrow">${conditionTomorrow}</div>
        </div>
        <button class="btn hide tomorrow" title="hide tomorrow" id="hideT"><</button>
    </main>
    `
    header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


form.onsubmit = async function (e) {
    e.preventDefault();

    let city = input.value.trim();

    const data = await getWeather(city);

    if (data.error) {
        removeCard();
        showError();
        input.value = "";
    } else {
        removeCard();

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            tempNow: data.current.temp_c,
            tempFeelNow: data.current.feelslike_c,
            conditionNow: data.current.condition.text,

            tempTomorrow: data.forecast.forecastday[0].day.avgtemp_c,
            conditionTomorrow: data.forecast.forecastday[0].day.condition.text,

            imgNow: data.current.condition.icon,
            imgTomorrow: data.forecast.forecastday[0].day.condition.icon,
            
            wind:data.current.wind_kph

        };

        showCard(weatherData);
        input.value = "";
    }

    const showTbtn = document.getElementById('showT');
    const hideTbtn = document.getElementById('hideT');
    const cardT = document.getElementById('cardTomorrow');

    if (showTbtn) {
        showTbtn.addEventListener('click', () => {
            cardT.classList.remove('hide');
            showTbtn.classList.add('hide');
            hideTbtn.classList.remove('hide');
        })
    }

    if (hideTbtn){
        hideTbtn.addEventListener('click',()=>{
            cardT.classList.add('hide');
            showTbtn.classList.remove('hide');
            hideTbtn.classList.add('hide');
        })
    }
}