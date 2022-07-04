// DOM Selectors
let form = document.querySelector("form");
let ul = document.querySelector('ul');

// variable assignment for latitude and longitude
let lat = document.querySelector("#lat");
let lon = document.querySelector("#lon");


// Event Listener on Submit
form.addEventListener("submit", (e) => {
    // prevent Default form action
    e.preventDefault();
    // Get lat and lon values
    let latitude = lat.value;
    let longitude = lon.value;
    // API URL
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m`;

    fetch(url).then(response => response.json()).then(data => {
        console.log(data);

        for (i=6; i<19; i++) {
            let dataArray = [data.hourly.time, data.hourly.temperature_2m, data.hourly.relativehumidity_2m, data.hourly.cloudcover_mid, data.hourly.windspeed_120m];

            let time = dataArray[0][i].slice(11);
            let temp = dataArray[1][i];
            let humidity = dataArray[2][i];
            let cloud = dataArray[3][i];
            let wind = dataArray[4][i];

            let li = document.createElement('li')
            li.className = 'item'

            li.innerHTML = `<div class="widget">
                                <div class="coord">
                                    <h1>${latitude}, ${longitude}</h1>
                                </div>
                                <div class="clearfix></div>
                                <div class="temp">
                                    <span>${temp}</span>
                                    <span></span>
                                </div>
                                <div class="wind">
                                    <span>${wind}</span>
                                    <span></span>
                                </div>
                                <div class="humidity">
                                    <span>${humidity}</span>
                                    <span></span>
                                </div>
                                <div class="cloud">
                                    <span>${cloud}</span>
                                    <span></span>
                                </div>
                                <div class="clearfix></div>
                                <div class="time">
                                    <span>${time}</span>
                                    <span></span>
                                </div>
                            </div>`

                 ul.appendChild(li)
        }

    }).catch(() => {
        //text reply
    })
})