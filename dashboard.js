document.getElementById('search-button').addEventListener('click', function() {
    const inputCity = document.getElementById('search-input').value;

    //Validation input city
    if(!inputCity) {
        alert('Enter valid city');
    }

    getWeatherData(inputCity);
    document.getElementById('search-input').value = "";
});

const getWeatherData = async (cityName) => {

    const apiKey = '5c11e2726317d6be54e269d0335e5366';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        //Logging fetched data
        console.log(data);

        //Assigning variables
        const city = data.name;
        const tempInCelsius = (data.main.temp).toFixed(0);
        const tempInFahrenheit = ((data.main.temp * (9/5)) + 32).toFixed(0);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherCondition = data.weather[0].description;
        const weatherConditionIcon = data.weather[0].icon;

        //Logging data on variables
        console.log("City : " + city);
        console.log("Temperature in C: " + tempInCelsius);
        console.log("Temperature in F: " + tempInFahrenheit);
        console.log("Humidity % : " + humidity);
        console.log("Wind speed in m/s : " + windSpeed);
        console.log("Weather condition : " + weatherCondition);
        console.log("Weather icon : " + weatherConditionIcon);

        //Display on the webpage
        document.getElementById('city-name').innerText = `City : ${city}`;
        document.getElementById('temperatureC').innerText = `Temperature : ${tempInCelsius} °C`;
        document.getElementById('temperatureF').innerText = `Temperature : ${tempInFahrenheit} °F`;
        document.getElementById('humidity').innerText = `Humidity : ${humidity} %`;
        document.getElementById('wind-speed').innerText = `Wind Speed : ${windSpeed} m/s`;
        document.getElementById('Weather-condition').innerText = `Weather Condition : ${weatherCondition.toUpperCase()}`;
        
        //Set Weather condition icon
        const weatherConditionIconUrl = `https://openweathermap.org/img/wn/${weatherConditionIcon}.png`;
        document.getElementById('weather-icon').src = weatherConditionIconUrl;
        document.getElementById('weather-icon').alt = `${weatherCondition} image`;
        
    } catch (error) {
        console.log('Error', error);
    }
}
