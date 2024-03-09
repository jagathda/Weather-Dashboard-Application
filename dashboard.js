document.getElementById('search-button').addEventListener('click', function(){
    const city = document.getElementById('search-input');
    getWeatherData(city.value);
})

const API_KEY = '5c11e2726317d6be54e269d0335e5366';


const getWeatherData = async(city) =>{
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        console.log(data);
        console.log("Temperature :" + data.main.temp);
        console.log("Humidity :" + data.main.humidity);
        console.log("Weather condition :" + data.weather[0].main);
        console.log("Weather condition :" + data.weather[0].description);
    } catch (error) {
        console.log(error);
    }
}

// getWeatherData();