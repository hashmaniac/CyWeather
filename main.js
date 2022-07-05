// DOM Selectors
let form = document.querySelector("form");
let msg = document.querySelector(".msg");
let dateToday = document.querySelector(".date");
let key = document.querySelector(".key");
let ul = document.querySelector('ul');

// variable assignment for latitude and longitude
let lat = document.querySelector("#lat");
let lon = document.querySelector("#lon");


// Event Listener on Submit
form.addEventListener("submit", (e) => {
    // clear ul on each submit
    ul.innerHTML = '';
    // prevent Default form action
    e.preventDefault();
    // Get lat and lon values
    let latitude = lat.value;
    let longitude = lon.value;
    // API URL
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m`;

    fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        //get current date
        let date = data.hourly.time[0].slice(0,10);
        // Print Out the Date
        dateToday.textContent = `Today: ${date}`;
        // Print Out a Key
        key.innerHTML = 'Key : Temp - <i class="fa-solid fa-temperature-half"></i>,  Wind Speed - <i class="fa-solid fa-wind"></i>, Relative Humidity - <i class="fa-solid fa-snowflake"></i>, Cloud Cover - <i class="fa-solid fa-cloud"></i>';

        // loop through each hour from 6AM - 6PM
        for (i=6; i<19; i++) {
            let dataArray = [data.hourly.time, data.hourly.temperature_2m, data.hourly.relativehumidity_2m, data.hourly.cloudcover_mid, data.hourly.windspeed_120m];

            let time = dataArray[0][i].slice(11);
            let temp = dataArray[1][i];
            let humidity = dataArray[2][i];
            let cloud = dataArray[3][i];
            let wind = dataArray[4][i];

            // weather units
            let tempU = data.hourly_units.temperature_2m;
            let humidityU = data.hourly_units.relativehumidity_2m;
            let windU = data.hourly_units.windspeed_120m;
            let cloudU = data.hourly_units.cloudcover_mid; 

            // create list item widget for each hour
            let li = document.createElement('li');
            li.className = 'item';

            li.innerHTML = `<div class="widget">
                                <div class="coord">
                                    <h2>Lat:${latitude}, Lon: ${longitude}</h2>
                                </div>
                                <div class="clearfix"></div>
                                <div class="temp float">
                                    <i class="fa-solid fa-temperature-half"></i>
                                    <span>${temp}</span>
                                    <span>${tempU}</span>
                                </div>
                                <div class="wind float">
                                    <i class="fa-solid fa-wind"></i>
                                    <span>${wind}</span>
                                    <span>${windU}</span>
                                </div>
                                <div class="humidity float">
                                    <i class="fa-solid fa-snowflake"></i>
                                    <span>${humidity}</span>
                                    <span>${humidityU}</span>
                                </div>
                                <div class="cloud float">
                                    <i class="fa-solid fa-cloud"></i>
                                    <span>${cloud}</span>
                                    <span>${cloudU}</span>
                                </div>
                                <div class="clearfix"></div>
                                <div class="time">
                                    <span><h2>${time} (UTC)</h2></span>
                                    <span></span>
                                </div>
                            </div>`;

                 ul.appendChild(li);
        }

    }).catch(() => {
        msg.textContent = "Please enter valid coordinates 😩";
    })
    // reset input values
    form.reset();
    msg.textContent = '';
})