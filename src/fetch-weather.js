import {
  currentWeather,
  currentIcon,
  currentInfo,
  infoDiv,
  inputBox,
  futureForecasts,
  city,
} from '.';

export default async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a9a835bcf54a452985d185926233012&q=${city}&days=3`
    );
    const weatherData = await response.json();

    infoDiv.appendChild(currentInfo);
    currentInfo.appendChild(currentIcon);
    currentInfo.id = 'current-info';

    console.log(weatherData);
    currentWeather.push(`${weatherData.location.name}`);
    const location = document.createElement('div');
    location.id = 'current-location';
    location.innerHTML = `${currentWeather[0]}`;
    currentInfo.appendChild(location);

    currentWeather.push(`Condition: ${weatherData.current.condition.text}`);
    const condition = document.createElement('div');
    condition.id = 'current-condition';
    condition.innerHTML = `${weatherData.current.condition.text}`;
    currentInfo.appendChild(condition);

    currentIcon.src = `https:${weatherData.current.condition.icon}`;
    currentIcon.id = 'current-icon';

    currentWeather.push(`Temperature: ${weatherData.current.temp_f}`);
    const temp = document.createElement('div');
    temp.id = 'current-temp';
    temp.innerHTML = `${weatherData.current.temp_f}°`;
    currentInfo.appendChild(temp);

    currentWeather.push(`Feels like: ${weatherData.current.feelslike_f}`);
    const feelsLike = document.createElement('div');
    feelsLike.id = 'current-feels';
    feelsLike.innerHTML = `${Math.floor(weatherData.current.feelslike_f)}°`;
    currentInfo.appendChild(feelsLike);

    currentWeather.push(`Wind: ${weatherData.current.wind_mph}`);
    const wind = document.createElement('div');
    wind.id = 'current-wind';
    wind.innerHTML = `${Math.floor(weatherData.current.wind_mph)} ${
      weatherData.current.wind_dir
    }`;
    currentInfo.appendChild(wind);
    // currentInfo.innerHTML = `${currentWeather[0]}, ${currentWeather[1]}, ${
    //   currentWeather[2].split('.')[0]
    // }, ${currentWeather[3].split('.')[0]}, ${currentWeather[4].split('.')[0]}`;

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
