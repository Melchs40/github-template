import './style.css';

const content = document.getElementById('content');
let currentWeather = [];
const currentIcon = document.createElement('img');
currentIcon.src = '';
const futureForecasts = [];
let city = 'Chicago';
const inputBox = document.createElement('input');
inputBox.type = 'text';
inputBox.id = 'box';
const searchBtn = document.createElement('button');
searchBtn.innerHTML = 'Search';
const infoDiv = document.createElement('div');
const currentInfo = document.createElement('div');
content.appendChild(inputBox);
content.appendChild(searchBtn);
content.appendChild(infoDiv);

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a9a835bcf54a452985d185926233012&q=${city}&days=3`
    );
    const weatherData = await response.json();

    console.log(weatherData);
    currentWeather.push(`Location: ${weatherData.location.name}`);
    currentWeather.push(`Condition: ${weatherData.current.condition.text}`);
    currentIcon.src = `https:${weatherData.current.condition.icon}`;
    currentWeather.push(`Temperature: ${weatherData.current.temp_f}`);
    currentWeather.push(`Feels like: ${weatherData.current.feelslike_f}`);
    currentWeather.push(`Wind: ${weatherData.current.wind_mph}`);
    currentInfo.innerHTML = `${currentWeather[0]}, ${currentWeather[1]}, ${
      currentWeather[2].split('.')[0]
    }, ${currentWeather[3].split('.')[0]}, ${currentWeather[4].split('.')[0]}`;
    infoDiv.appendChild(currentInfo);
    infoDiv.appendChild(currentIcon);

    for (let i = 0; i < 3; i++) {
      const forecastData = [];
      const futureIcon = document.createElement('img');
      futureIcon.src = '';
      forecastData.push(
        `Condition: ${weatherData.forecast.forecastday[i].day.condition.text}`
      );
      futureIcon.src = `https:${weatherData.forecast.forecastday[i].day.condition.icon}`;
      forecastData.push(
        `High Temp: ${weatherData.forecast.forecastday[i].day.maxtemp_f}`
      );
      forecastData.push(
        `Low Temp: ${weatherData.forecast.forecastday[i].day.mintemp_f}`
      );
      forecastData.push(
        `Max Wind: ${weatherData.forecast.forecastday[i].day.maxwind_mph}`
      );

      const forecastInfo = document.createElement('div');
      forecastInfo.innerHTML = `${forecastData[0]}, ${
        forecastData[1].split('.')[0]
      }, ${forecastData[2].split('.')[0]}, ${forecastData[3].split('.')[0]}`;
      infoDiv.appendChild(forecastInfo);
      infoDiv.appendChild(futureIcon);
      futureForecasts.push(forecastData);
    }
  } catch (error) {
    console.log(error);
  } finally {
    inputBox.value = '';
  }
}

fetchWeather();

searchBtn.addEventListener('click', () => {
  while (infoDiv.firstChild) {
    infoDiv.removeChild(infoDiv.firstChild);
  }
  city = inputBox.value;
  currentWeather = [];
  fetchWeather();
});
