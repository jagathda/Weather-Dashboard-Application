//Current weather details

//Input city
document.getElementById('search-button').addEventListener('click', function() {
    console.log("Search button clicked");
    const inputCity = document.getElementById('search-input').value;

    //Validation input city
    if(!inputCity) {
        alert('Enter valid city');
        return; 
    }

    getWeatherData(inputCity);
    document.getElementById('search-input').value = "";
});

//Fetch weather data
const getWeatherData = async (cityName) => {
    console.log("Fetching weather data for", cityName); 
    const apiKey = '5c11e2726317d6be54e269d0335e5366';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if(response.status !== 200){
            alert("City not found or API unavailable");
            return;
        }
        const data = await response.json();

        // Display weather data
        displayWeatherData(data);
        console.log("Weather data displayed:", data); 
        
        getForecastData(cityName);

    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

//Display weather data
const displayWeatherData = (data) => {

    //Assign variables
    const city = data.name;
    const tempInCelsius = (data.main.temp).toFixed(0);
    const tempInFahrenheit = ((data.main.temp * (9/5)) + 32).toFixed(0);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherCondition = data.weather[0].description;
    const weatherConditionIcon = data.weather[0].icon;

    //Log data on variables
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
    document.getElementById('weather-condition').innerText = `Weather Condition : ${weatherCondition.toUpperCase()}`;
    
    //Set Weather condition icon
    const weatherConditionIconUrl = `https://openweathermap.org/img/wn/${weatherConditionIcon}.png`;
    document.getElementById('weather-icon').src = weatherConditionIconUrl;
    document.getElementById('weather-icon').alt = `${weatherCondition} image`;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Forecasting
const getForecastData = async (cityName) => {
    console.log("Fetching forecast data for", cityName);
    const apiKey = '5c11e2726317d6be54e269d0335e5366';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if(response.status !== 200){
            alert("Forcast City not found or API unavailable");
            return;
        }
        const data = await response.json();

        // Display forecast data
        displayForecastData(data);
        console.log("Forecast data displayed:", data);
        
    } catch (error) {
        console.log('Error fetching forecast data:', error);
    }
}

//Display forecast data
const displayForecastData = (data) => {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerText = ""; 
    
    // Store data in an array
    const forecast = [];

    for (let i = 0; i < 4; i++) {
        const forecastItem = data.list[i];
        const forecastDateTime = forecastItem.dt_txt;
        const forecastWeatherCondition = forecastItem.weather[0].description;

        forecast.push({
            dateTime: forecastDateTime,
            weatherCondition: forecastWeatherCondition
        });
    }

    // Display first 4 values
    // document.getElementById('forecast-header').innerText = "Forecast for the next hours";
    for (let i = 0; i < 4; i++) {
        const forecastItem = forecast[i];
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-item');
        forecastElement.innerHTML = `
            <p>Date Time: ${forecastItem.dateTime}</p>
            <p>Weather Condition: ${forecastItem.weatherCondition}</p>
        `;
        forecastContainer.appendChild(forecastElement);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//Clear button
document.getElementById('clear-button').addEventListener('click', function() {
    clearResult();
});

//Clear weather data
function clearResult() {
    document.getElementById('city-name').innerText = "";
    document.getElementById('temperatureC').innerText = "";
    document.getElementById('temperatureF').innerText = "";
    document.getElementById('humidity').innerText = "";
    document.getElementById('wind-speed').innerText = "";
    document.getElementById('weather-condition').innerText = "";
    document.getElementById('weather-icon').src = "";
    document.getElementById('weather-icon').alt = "";

    //Clear forecast data
    document.getElementById('forecast-container').innerText = "";
    // document.getElementById('forecast-header').innerText = "";
}