document.getElementById('search-button').addEventListener('click', function() {
    const inputCity = document.getElementById('search-input').value;
    getWeatherData(inputCity);
});

const API_KEY = '5c11e2726317d6be54e269d0335e5366';

const getWeatherData = async(city) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();

        //Logging fetched data
        console.log(data);
        console.log("City : " + data.name)

        console.log("Temperature : " + data.main.temp);
        //Converting temperature to Celsius
        // const tempInCelsius = ((data.main.temp) - 273.15).toFixed(2);
        const tempInCelsius = Math.round((data.main.temp) - 273.15);
        console.log("Temperature in Celsius: " + tempInCelsius);
        //Converting temperature to Fahrenheit
        const tempInFahrenheit = Math.round((tempInCelsius * 9/5) + 32);
        console.log("Temperature in Fahrenheit: " + tempInFahrenheit);

        console.log("Humidity % : " + data.main.humidity);
        console.log("Wind speed : " + data.wind.speed);
        console.log("Weather condition : " + data.weather[0].description);

        //Display on the webpage
        document.getElementById('city-name').innerText = `City : ${data.name}`;
        document.getElementById('temperatureC').innerText = `Temperature : ${tempInCelsius} °C`;
        document.getElementById('temperatureF').innerText = `Temperature : ${tempInFahrenheit} °F`;
        document.getElementById('humidity').innerText = `Humidity : ${data.main.humidity} %`;
        document.getElementById('wind-speed').innerText = `Wind Speed : ${data.wind.speed} m/s`;
        document.getElementById('Weather-condition').innerText = `Weather Condition : ${data.weather[0].description.toUpperCase()}`;
        
        //Set Weather condition icon
        const weatherConditionIcon = data.weather[0].icon;
        console.log("Weather icon : " + weatherConditionIcon);

        //Set Weather Icon to empty initially
        document.getElementById('weather-icon').src = '';
        document.getElementById('weather-icon').alt = '';

        //Set Weather Icon to visible
        if (weatherConditionIcon){
            // https://openweathermap.org/img/wn/10d@2x.png
            const weatherConditionIconUrl = `https://openweathermap.org/img/wn/${weatherConditionIcon}.png`;
            document.getElementById('weather-icon').src = weatherConditionIconUrl;
        }
      
    } catch (error) {
        console.log(error);
    }
}
