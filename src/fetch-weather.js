import { getDate, getDay, getMonth } from 'date-fns';
import {
  currentWeather,
  currentIcon,
  currentInfo,
  infoDiv,
  inputBox,
  futureForecasts,
  city,
  topContainer,
} from '.';

export default async function fetchWeather() {
  try {
    // infoDiv.classList.add('testing');

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a9a835bcf54a452985d185926233012&q=${city}&days=3`
    );

    const weatherData = await response.json();

    infoDiv.appendChild(currentInfo);
    currentInfo.appendChild(currentIcon);
    currentInfo.id = 'current-info';
    const backgroundDiv = document.createElement('div');
    backgroundDiv.id = 'background-div';
    currentInfo.appendChild(backgroundDiv);

    console.log(weatherData);
    currentWeather.push(
      `${weatherData.location.name}, ${weatherData.location.country}`
    );
    const location = document.createElement('div');
    location.id = 'current-location';
    location.innerHTML = `${currentWeather[0]}`;
    topContainer.appendChild(location);

    const topDate = document.createElement('div');
    topDate.id = 'current-date';
    const currentDate = new Date(weatherData.location.localtime);
    const dayResult = getDay(currentDate);
    const monthResult = getMonth(currentDate);
    const dateResult = getDate(currentDate);
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Novemeber',
      'December',
    ];
    topDate.innerHTML = `${daysOfWeek[dayResult]} ${months[monthResult]}, ${dateResult}`;
    topContainer.appendChild(topDate);

    currentWeather.push(`Condition: ${weatherData.current.condition.text}`);
    const condition = document.createElement('div');
    condition.id = 'current-condition';
    condition.innerHTML = `${weatherData.current.condition.text}`;
    currentInfo.appendChild(condition);

    currentIcon.src = `https:${weatherData.current.condition.icon}`;
    currentIcon.id = 'current-icon';

    const tempText = document.createElement('div');
    tempText.id = 'temp-text';
    tempText.innerHTML = 'Currently:';
    currentInfo.appendChild(tempText);

    currentWeather.push(`Temperature: ${weatherData.current.temp_f}`);
    const temp = document.createElement('div');
    temp.id = 'current-temp';
    temp.innerHTML = `${Math.floor(weatherData.current.temp_f)}°F`;
    currentInfo.appendChild(temp);

    const feelsText = document.createElement('div');
    feelsText.id = 'feels-text';
    feelsText.innerHTML = 'Feels like:';
    currentInfo.appendChild(feelsText);

    currentWeather.push(`Feels like: ${weatherData.current.feelslike_f}`);
    const feelsLike = document.createElement('div');
    feelsLike.id = 'current-feels';
    feelsLike.innerHTML = `${Math.floor(weatherData.current.feelslike_f)}°F`;
    currentInfo.appendChild(feelsLike);

    const windText = document.createElement('div');
    windText.id = 'wind-text';
    windText.innerHTML = 'Wind speeds:';
    currentInfo.appendChild(windText);

    currentWeather.push(`Wind: ${weatherData.current.wind_mph}`);
    const wind = document.createElement('div');
    wind.id = 'current-wind';
    wind.innerHTML = `${Math.floor(weatherData.current.wind_mph)} mph ${
      weatherData.current.wind_dir
    }`;
    currentInfo.appendChild(wind);

    for (let i = 0; i < 3; i++) {
      const forecastDiv = document.createElement('div');
      forecastDiv.id = `forecast-div-${i}`;
      forecastDiv.classList.add('forecasts');
      infoDiv.appendChild(forecastDiv);
      const background = document.createElement('div');
      background.classList.add('forecast-background');
      forecastDiv.appendChild(background);
      const forecastContainer = document.createElement('div');
      forecastContainer.classList.add('forecast-container');
      forecastDiv.appendChild(forecastContainer);
      const forecastData = [];
      const futureIcon = document.createElement('img');
      futureIcon.id = `future-icon-${i}`;
      futureIcon.src = '';

      if (i === 0) {
        const date = document.createElement('div');
        date.id = `forecast-date-${i}`;
        date.innerHTML = `${
          weatherData.forecast.forecastday[i].date.split('-')[1]
        }/${weatherData.forecast.forecastday[i].date.split('-')[2]}`;
        forecastContainer.appendChild(date);
      } else if (i === 1) {
        const date = document.createElement('div');
        date.id = `forecast-date-${i}`;
        date.innerHTML = `${
          weatherData.forecast.forecastday[i].date.split('-')[1]
        }/${weatherData.forecast.forecastday[i].date.split('-')[2]}`;
        forecastContainer.appendChild(date);
      } else {
        const date = document.createElement('div');
        date.id = `forecast-date-${i}`;
        date.innerHTML = `${
          weatherData.forecast.forecastday[i].date.split('-')[1]
        }/${weatherData.forecast.forecastday[i].date.split('-')[2]}`;
        forecastContainer.appendChild(date);
      }

      futureIcon.src = `https:${weatherData.forecast.forecastday[i].day.condition.icon}`;
      forecastContainer.appendChild(futureIcon);

      forecastData.push(
        `Condition: ${weatherData.forecast.forecastday[i].day.condition.text}`
      );

      const forecastCondition = document.createElement('div');
      forecastCondition.id = `forecast-condition-${i}`;
      forecastCondition.innerHTML = `${weatherData.forecast.forecastday[i].day.condition.text}`;
      forecastContainer.appendChild(forecastCondition);

      forecastData.push(
        `High Temp: ${weatherData.forecast.forecastday[i].day.maxtemp_f}`
      );
      const forecastHigh = document.createElement('div');
      forecastHigh.id = `forecast-high-${i}`;
      forecastHigh.innerHTML = `High ${Math.floor(
        weatherData.forecast.forecastday[i].day.maxtemp_f
      )}°F`;
      forecastContainer.appendChild(forecastHigh);

      forecastData.push(
        `Low Temp: ${weatherData.forecast.forecastday[i].day.mintemp_f}`
      );
      const forecastLow = document.createElement('div');
      forecastLow.id = `forecast-low-${i}`;
      forecastLow.innerHTML = `Low ${Math.floor(
        weatherData.forecast.forecastday[i].day.mintemp_f
      )}°F`;
      forecastContainer.appendChild(forecastLow);

      forecastData.push(
        `Max Wind: ${weatherData.forecast.forecastday[i].day.maxwind_mph}`
      );
      const forecastWind = document.createElement('div');
      forecastWind.id = `forecast-wind-${i}`;
      forecastWind.innerHTML = `Max wind ${Math.floor(
        weatherData.forecast.forecastday[i].day.maxwind_mph
      )} mph`;
      forecastContainer.appendChild(forecastWind);

      futureForecasts.push(forecastData);
    }
  } catch (error) {
    if (error.constructor === TypeError) {
      alert(
        'We were not able to find this city, please double check your spelling or try another city.'
      );
      console.log(error);
    } else {
      console.log(error);
    }
  } finally {
    inputBox.value = '';
    infoDiv.classList.remove('testing');
  }
}
