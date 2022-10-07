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
    // prevent Default form action
    e.preventDefault();
    // clear ul on each submit
    ul.innerHTML = '';

    // Get lat and lon values
    let latitude = lat.value;
    let longitude = lon.value;
    // API URL
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m`;

    fetch(url).then(response => response.json()).then(data => {
     //console.log(data);
        // Print Out a Key
        key.innerHTML = 'Key : Temp - <i class="fa-solid fa-temperature-half"></i>,  Wind Speed - <i class="fa-solid fa-wind"></i>, Relative Humidity - <i class="fa-solid fa-snowflake"></i>, Cloud Cover - <i class="fa-solid fa-cloud"></i>';

        // Put needed response into an array
        let dataArray = [data.hourly.time, data.hourly.temperature_2m, data.hourly.relativehumidity_2m, data.hourly.cloudcover_mid, data.hourly.windspeed_120m];

        // weather units
        let tempU = data.hourly_units.temperature_2m;
        let humidityU = data.hourly_units.relativehumidity_2m;
        let windU = data.hourly_units.windspeed_120m;
        let cloudU = data.hourly_units.cloudcover_mid;

        //Convert UTC time to Local AM-PM time
        let utc = data.hourly.time;
        let realDate = new Date();
        let realDateString = realDate.toLocaleDateString();
        let localTime = [];

        // Print Out the Date
        dateToday.textContent = `Today: ${realDateString}`;


        //Add 'Z' to time strings for convertion
        utc.forEach( t => {
            t += 'Z';
            let tt = new Date(t);
            t = tt.toLocaleString();
            localTime.push(t);
        });

        // Find index of 6am(start) and 6pm(stop)
        let h = localTime.indexOf(`${realDateString}, 6:00:00 AM`);
        let j = h + 13;

        // loop through each hour from 6AM - 6PM
        for (let i=h; i<j; i++) {
            // Weather condition varables
            let time = localTime[i];
            let temp = dataArray[1][i];
            let humidity = dataArray[2][i];
            let cloud = dataArray[3][i];
            let wind = dataArray[4][i]; 

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
                                    <span><h2>${time}</h2></span>
                                    <span></span>
                                </div>
                            </div>`;

                 ul.appendChild(li);
        }

    }).catch(() => {
        msg.textContent = "Please check your Internet Connection 😩";
    })
    // reset input values
    form.reset();
    msg.textContent = '';
});