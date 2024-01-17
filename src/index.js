import './style.css';

const content = document.getElementById('content');
const currentData = [];
const todayData = [];
const tomorrowData = [];
const nextDayData = [];
const conditionImage = document.createElement('img');
conditionImage.src = '';
const conditionImage1 = document.createElement('img');
conditionImage1.src = '';
const conditionImage2 = document.createElement('img');
conditionImage2.src = '';
const conditionImage3 = document.createElement('img');
conditionImage3.src = '';

async function fetchWeather() {
  try {
    const response = await fetch(
      'https://api.weatherapi.com/v1/forecast.json?key=a9a835bcf54a452985d185926233012&q=oshkosh&days=3'
    );
    const weatherData = await response.json();
    console.log(weatherData);
    currentData.push(`Location: ${weatherData.location.name}`);
    currentData.push(`Condition: ${weatherData.current.condition.text}`);
    conditionImage.src = `https:${weatherData.current.condition.icon}`;
    currentData.push(`Temperature: ${weatherData.current.temp_f}`);
    currentData.push(`Feels like: ${weatherData.current.feelslike_f}`);
    currentData.push(`Wind: ${weatherData.current.wind_mph}`);
    const currentInfo = document.createElement('div');
    currentInfo.innerHTML = currentData;
    content.appendChild(currentInfo);
    content.appendChild(conditionImage);
    for (let i = 0; i < 3; i++) {
      if (i == 0) {
        todayData.push(
          `Condition: ${weatherData.forecast.forecastday[0].day.condition.text}`
        );
        conditionImage1.src = `https:${weatherData.forecast.forecastday[0].day.condition.icon}`;
        todayData.push(
          `High Temp: ${weatherData.forecast.forecastday[0].day.maxtemp_f}`
        );
        todayData.push(
          `Low Temp: ${weatherData.forecast.forecastday[0].day.mintemp_f}`
        );
        todayData.push(
          `Max Wind: ${weatherData.forecast.forecastday[0].day.maxwind_mph}`
        );
        const todayInfo = document.createElement('div');
        todayInfo.innerHTML = todayData;
        content.appendChild(todayInfo);
        content.appendChild(conditionImage1);
      } else if (i == 1) {
        tomorrowData.push(
          `Condtion: ${weatherData.forecast.forecastday[1].day.condition.text}`
        );
        conditionImage2.src = `https:${weatherData.forecast.forecastday[1].day.condition.icon}`;
        tomorrowData.push(
          `High Temp: ${weatherData.forecast.forecastday[1].day.maxtemp_f}`
        );
        tomorrowData.push(
          `Low Temp: ${weatherData.forecast.forecastday[1].day.mintemp_f}`
        );
        tomorrowData.push(
          `Max Wind: ${weatherData.forecast.forecastday[1].day.maxwind_mph}`
        );
        const tomorowInfo = document.createElement('div');
        tomorowInfo.innerHTML = tomorrowData;
        content.appendChild(tomorowInfo);
        content.appendChild(conditionImage2);
      } else if (i == 2) {
        nextDayData.push(
          `Condition: ${weatherData.forecast.forecastday[2].day.condition.text}`
        );
        conditionImage3.src = `https:${weatherData.forecast.forecastday[2].day.condition.icon}`;
        nextDayData.push(
          `High Temp: ${weatherData.forecast.forecastday[2].day.maxtemp_f}`
        );
        nextDayData.push(
          `Low Temp: ${weatherData.forecast.forecastday[2].day.mintemp_f}`
        );
        nextDayData.push(
          `Max Wind: ${weatherData.forecast.forecastday[2].day.maxwind_mph}`
        );
        const nextDayInfo = document.createElement('div');
        nextDayInfo.innerHTML = nextDayData;
        content.appendChild(nextDayInfo);
        content.appendChild(conditionImage3);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

fetchWeather();
