//! counter damit die clearIntervalfunktion erst nach dem ersten durchlauf aufgerufen wird
let counter = 0   


//!definition der onClick Funktion
const check = () => {


 //! HTML Elemente
    let input = document.getElementById('input').value
    let cityOutput = document.getElementById('cityName')                           
    let countryOutput = document.getElementById('countryCodeBox')
    let weatherIconOutput = document.getElementById('icon')
    let tempOutput = document.getElementById('temperatur')
    let timeOutput = document.getElementById('timeBox')
    let windOutput = document.getElementById('windBox')
    let cloudsOutput = document.getElementById('cloudsBox')
    let pressureOutput = document.getElementById('pressureBox')
    let humitidyOutput = document.getElementById('humitidyBox')
    let sunriseOutput = document.getElementById('sunriseBox')
    let sunsetOutput = document.getElementById('sunsetBox')
    let coordyOutput = document.getElementById('coordsBox')


//! fetch für Wetterdaten aus API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=4bcea2e105b56117dc4f5cdd3a2391fd`)
.then((response) => response.json())
.then((data) => {                                    


        //! aufruf der clearInterval Funktion erst nach dem ersten Durchlauf
        if(counter > 0){clearInterval(refresh)}


        //!Variable für Zeit in setInterval Methode alle 1000 millisekunden um jede sekunde zu aktuallisieren
        refresh = setInterval(() => {                   //? wenn als variable definiert funktioniert es nicht
            let currentdate = new Date()
            let seconds = currentdate.getTime()
            let time = new Date(seconds-3600000+data.timezone*1000).toLocaleTimeString()
            timeOutput.innerHTML = `<p>${time}</p>`
        },1000)


        //! nach dem ersten aufruf dieser Operation wird die clearInterval funktion aufgerufen
        counter += 1    


        //! variablen in denen die Wetterdaten gespeichert werden 
        let weatherIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let temp = Math.round(data.main.temp - 273.15) + "°"
        let windSpeed = `${data.wind.speed} (${data.wind.deg})`
        let clouds = data.weather[0].description
        let pressure = data.main.pressure + " hpa"
        let humitidy = data.main.humidity + " %"
        let sunrise = new Date(data.sys.sunrise).toLocaleTimeString()
        let sunset = new Date(data.sys.sunset).toLocaleTimeString()
        let coordyX = data.coord.lat
        let coordyY = data.coord.lon
        let city = data.name
        let country = data.sys.country


        //! Einfügen der entsprechenden Wetterdaten in der HTML
        weatherIconOutput.setAttribute("src", weatherIcon)
        cityOutput.innerHTML = `<p>${city}</p>`
        countryOutput.innerHTML = `<p>${country}</p>`
        tempOutput.innerHTML = `<p>${temp}</p>`
        windOutput.innerHTML = `<p>${windSpeed}</p>`
        cloudsOutput.innerHTML = `<p>${clouds}</p>`
        pressureOutput.innerHTML = `<p>${pressure}</p>`    
        humitidyOutput.innerHTML =`<p>${humitidy}</p>`
        sunriseOutput.innerHTML = `<p>${sunrise}</p>`
        sunsetOutput.innerHTML = `<p>${sunset}</p>`
        coordyOutput.innerHTML = `<p>${coordyX}, ${coordyY}</p>`
})
}