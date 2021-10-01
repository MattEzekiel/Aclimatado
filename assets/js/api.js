/**
 * variables ciudad
 * @type {string}
 */

let ciudad;

if(localStorage.getItem('json') !== null){
    localSeatch();
}else{
    ciudad = "Buenos%20Aires";
    /*theApi();*/
}
/**
 * Constantes y detección del onclick
 * @type {string}
 */
const API_KEY = "9d5daa90430e309a5143ebb868d0de95";
let API = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&APPID=${API_KEY}&lang=es`;
let button = document.getElementById('enviar');
let inputElement = document.getElementById('buscar');

/**
 * Evento click
 */
button.addEventListener('click', () => {
    /*console.log('valor', inputElement.value);*/
    /*loading();*/
    searchCity(inputElement.value);
});

/**
 * Fetch inicial de la API
 */
function theApi() {
    fetch(API)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (elJason) {
            /*console.log("El objeto",elJason);*/
            clouds(elJason.clouds);
            main(elJason.main);
            weather(elJason.weather);
            viento(elJason.wind);
            if(localStorage.getItem('ciudad') !== null){
                city(localStorage.getItem('ciudad'));
            }else{
                city('Buenos Aires');
            }
        })
        .catch(function (error) {
            console.log("El error: ",error);
        })
}

/**
 * Función probabilidad de lluvias
 * @param rain variable de lluvia
 */
function clouds(rain) {
    /*console.log("Nubes",nubes.all+"%");*/
    let lluvia = document.createTextNode(rain.all+"%");
    let add = document.getElementById('lluvia');
    add.innerText = 'Probabilidad de lluvia: ';
    add.appendChild(lluvia);
    add.innerHTML += '<img class="icono" src="https://img.icons8.com/color/50/000000/rainy-weather.png" alt="paraguas"/>'
}

/**
 * Función temperaturas
 * @param temperatuas todas las variables de temperaturas
 */
function main(temperatuas) {
    let celcius = 273.15;
    // console.log("Temperatura: ",temperatuas.temp - celcius+"°C");
    // console.log("Sensasión térmica :", temperatuas.feels_like - celcius+"°C");
    // console.log("Presión atmosférica :", temperatuas.pressure - celcius+"°C");
    // console.log("Humedad :", temperatuas.humidity - celcius+"°C");
    // console.log("temperatura máxima: ",temperatuas.temp_max - celcius+"°C");
    // console.log("temperatura mínima: ",temperatuas.temp_min - celcius+"°C");

    temperatura(temperatuas.temp,celcius);
    sensation(temperatuas.feels_like,celcius);
    precion(temperatuas.pressure);
    humedad(temperatuas.humidity,celcius);
    tempMaxima(temperatuas.temp_max,celcius);
    tempMinima(temperatuas.temp_min,celcius);
}

/**
 * Función Clima
 * @param clima descripción
 */
function weather(clima) {
    /*console.log("Nubocidad",clima[0].main);*/
    /*console.log("Descripción de nubocidad",clima[0].description);*/
    let description = document.getElementById('description');
    let hoy = document.createTextNode(clima[0].description);
    fondo(clima[0].main);
    description.innerText = 'Descripción para el día de hoy: ';
    description.appendChild(hoy);
    description.innerHTML += ' <img class="icono" src="http://openweathermap.org/img/wn/'+ clima[0].icon +'@2x.png" alt="icono clima">';
}

/**
 * Función Viento
 * @param velocidad del viento
 */
function viento(velocidad) {
    let speed = document.getElementById('speed');
    let resultado = document.createTextNode(parseInt(velocidad.speed * 3.6) + " km/h");
    speed.innerText = 'Velocidad del viento: ';
    speed.appendChild(resultado)
    speed.innerHTML += ' <img class="icono" src="https://img.icons8.com/color/64/000000/windy-weather--v1.png" alt="icono viento"/>';

}

/**
 * Función Nombre
 * @param nombre
 */
function city(nombre) {
    nombre = nombre.replace("%20", ' ');
    let tag = document.getElementById('ciudad');
    let span = document.createElement('span');
    nombre = document.createTextNode(nombre);
    tag.innerText = 'Ciudad de: ';
    span.appendChild(nombre);
    span.setAttribute("class","text-capitalize");
    tag.appendChild(span);
}

/**
 * Funciones que devuelven el clima
 * @param temp
 * @param grados
 */
function temperatura(temp,grados) {
    let t = document.getElementById('t');
    let resultado = document.createTextNode(parseFloat(temp-grados).toFixed(1)+"° T");
    // console.log(resultado);
    t.innerHTML = '<span class="sr-only">Temperatura actual:</span> ';
    t.appendChild(resultado);
}
function sensation(temp,grados) {
    let st = document.getElementById('st')
    let resultado = document.createTextNode(parseFloat(temp-grados).toFixed(1)+"° ST");
    // console.log(resultado);
    st.innerHTML = '<span class="sr-only">Sensación Térmica:</span> ';
    st.appendChild(resultado);
}
function precion(temp) {
    let hPa = document.getElementById('hPa');
    let resultado = document.createTextNode(parseFloat(temp).toFixed(2)+" hPa");
    // console.log(resultado);
    hPa.innerText = 'Presión Atmosférica: ';
    hPa.appendChild(resultado);
}
function humedad(temp) {
    let humedad = document.getElementById('humedad');
    let resultado = document.createTextNode(temp + "%");
    // console.log(resultado);
    humedad.innerText = 'Humedad: ';
    humedad.appendChild(resultado);
}
function tempMaxima(temp,grados) {
    let max = document.getElementById('max');
    let resultado = document.createTextNode(parseFloat(temp-grados).toFixed(1)+"°");
    // console.log(resultado);
    max.innerText = 'Temperatura máxima: ';
    max.appendChild(resultado);
    max.innerHTML += '<img class="icono" src="https://img.icons8.com/cotton/50/000000/thermometer-up--v1.png" alt="icono temperatura máxima"/>'
}
function tempMinima(temp,grados) {
    let min = document.getElementById('min');
    let resultado = document.createTextNode(parseFloat(temp-grados).toFixed(1)+"°");
    // console.log(resultado);
    min.innerText = 'Temperatura mínima: ';
    min.appendChild(resultado);
    min.innerHTML += '<img class="icono" src="https://img.icons8.com/cotton/50/000000/thermometer-down--v1.png" alt="icono temperatura minima"/>'
}

/**
 * Busca la ciudad
 * @param valor
 */
function searchCity(valor) {
    ciudad = valor.replace(/ /g, "%20");
    /*console.log(ciudad);*/
    let API = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&APPID=${API_KEY}&lang=es`;
    fetch(API)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (elJason) {
            /*console.log("El objeto",elJason);*/
            if (elJason.cod === "404"){
                /*alert('entré');*/
                errorMensaje();
            }else{
                clouds(elJason.clouds);
                main(elJason.main);
                weather(elJason.weather);
                viento(elJason.wind);
                city(valor);
                localStorage.clear();
                localStorage.setItem('json',JSON.stringify(elJason));
                localStorage.setItem('ciudad',ciudad);
            }
        })
        .catch(function (error) {
            console.log("El error: ",error);
        })
}

/**
 * Mostrar el mensaje de error
 */
function errorMensaje() {
    let tag = document.getElementById('form-ciudad');
    tag.innerHTML = '<div class="alert alert-danger text-center">La ciudad <b>"'+ inputElement.value +'"</b> no ha sido encontrada</div>';
    console.log('el mensaje');
    return borrarError();
}

/**
 * Borrar el error
 */
function borrarError() {
    let error = document.getElementsByClassName('alert-danger');
    let resultados = document.getElementById('resultados');
    resultados.style.opacity = 0.3;
    for (let i = 0; i < error.length; i++){
        setTimeout(function (){
            error[i].classList.add("fade");
        }, 3500);
    setInterval(function () {
            error[i].remove();
            window.location.reload();
        },5000);
    }
}

/**
 * Buscando en el local storage
 */
function localSeatch() {
    let elstorage = localStorage.getItem('json');
    let valor =  localStorage.getItem('ciudad');
    elstorage = JSON.parse(elstorage)
    clouds(elstorage.clouds);
    main(elstorage.main);
    weather(elstorage.weather);
    viento(elstorage.wind);
    city(valor);
    /*console.log('Activado local search');*/
}

/**
 * Cambio de fondos
 * @param main fondo
 */
function fondo(main) {
    let video = document.getElementById('video');
    let source = document.createElement('source');
    source.setAttribute('type','video/mp4');
    colorFondo(main);
    switch (main){
        case 'Thunderstorm':
            source.setAttribute('src','assets/videos/thunders.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Squall':
            source.setAttribute('src','assets/videos/thunders.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Drizzle':
            source.setAttribute('src','assets/videos/drizzle.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Rain':
            source.setAttribute('type','video/webm');
            source.setAttribute('src','assets/videos/rain.webm');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Snow':
            source.setAttribute('src','assets/videos/snow.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Mist':
            source.setAttribute('src','assets/videos/fog.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Fog':
            source.setAttribute('src','assets/videos/fog.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Smoke':
            source.setAttribute('src','assets/videos/smoke.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Ash':
            source.setAttribute('src','assets/videos/smoke.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Haze':
            source.setAttribute('src','assets/videos/smoke.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Dust':
            source.setAttribute('src','assets/videos/smoke.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Sand':
            source.setAttribute('src','assets/videos/sand.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Tornado':
            source.setAttribute('src','assets/videos/tornado.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        case 'Clouds':
            source.setAttribute('src','assets/videos/clouds.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
        break;
        default:
            source.setAttribute('src','assets/videos/clear.mp4');
            video.load();
            video.innerText = '';
            video.appendChild(source);
    }
}

/**
 * Función color de fondo
 * @param tipo de fondo
 */
function colorFondo(tipo) {
    let container = document.getElementsByClassName('container')[0];
    container.setAttribute('class','container '+tipo);
}