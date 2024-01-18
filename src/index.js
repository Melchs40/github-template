import './style.css';
// eslint-disable-next-line import/no-cycle
import fetchWeather from './fetch-weather';

// create content and header container
const content = document.getElementById('content');
const topContainer = document.createElement('div');
content.appendChild(topContainer);

// create title
const title = document.createElement('h1');
title.innerHTML = 'QuickWeather';
topContainer.appendChild(title);

// create search box
export const inputBox = document.createElement('input');
inputBox.type = 'text';
inputBox.id = 'box';
inputBox.placeholder = 'Enter City Name...';
export let city = 'Oshkosh';
topContainer.appendChild(inputBox);

// create search button
const searchBtn = document.createElement('button');
searchBtn.innerHTML = 'Get Weather!';
topContainer.appendChild(searchBtn);

// create empty arrays for forecasts and icon placement
export let currentWeather = [];
export const futureForecasts = [];
export const currentIcon = document.createElement('img');
currentIcon.src = '';

export const infoDiv = document.createElement('div');
infoDiv.id = 'infoDiv';
export const currentInfo = document.createElement('div');

content.appendChild(infoDiv);

fetchWeather();

// create event listener to change weather to specific city
searchBtn.addEventListener('click', () => {
  while (infoDiv.firstChild) {
    infoDiv.removeChild(infoDiv.firstChild);
  }
  while (currentInfo.firstChild) {
    currentInfo.removeChild(currentInfo.firstChild);
  }
  city = inputBox.value;
  currentWeather = [];
  fetchWeather();
});
