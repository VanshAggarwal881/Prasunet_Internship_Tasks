const inputbox = document.querySelector('.input_box');
const weather_img = document.querySelector('.weather_img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const searchbtn = document.getElementById('searchbtn');
const windspeed = document.getElementById('windspeed');
const notfound =  document.querySelector('.notfound');
const weather_body =  document.querySelector('.weather_body');

async function checkweather(city){
    const api_key = "b9e79a9351f251d6a4b61508fdc2dcf1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    // console.log(weather_data);

    if (weather_data.cod == '404') {
        // console.log('error');
        notfound.style.display = 'flex';
        weather_body.style.display = 'none';

        return
    }
    weather_body.style.display = 'flex';
    notfound.style.display = 'none';
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    // weather is an array ... checked in the console
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windspeed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){

case "Clouds" :
            weather_img.src = "cloud_weather_icon.png";
            break
case "Light Rain" :
                weather_img.src = "cloud_drizzle_rain_weather_icon.png";
                break
case "Rain" :
            weather_img.src = "cloud_heavy rain_rain_weather_icon.png";
            break

case "Moderate Rain" :
                weather_img.src = "cloud_drizzle_rain_weather_icon.png";
                break


case "Clear Sky" :
                weather_img.src = "hot_sun_weather_icon.png";
                break
case "Clear" :
                weather_img.src = "hot_sun_weather_icon.png";
                break
case "Overcast Clouds" :
                    weather_img.src = "cloud_weather_icon.png";
                    break
case "Clouds" :
                    weather_img.src = "cloud_weather_icon.png";
                    break
    
                        
    }
}

searchbtn.addEventListener('click' , ()=>{
    checkweather(inputbox.value);
})
