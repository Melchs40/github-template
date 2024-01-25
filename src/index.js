import './style.css';
// eslint-disable-next-line import/no-cycle
import fetchWeather from './fetch-weather';

// create content and header container
const content = document.getElementById('content');
export const topContainer = document.createElement('div');
topContainer.id = 'header-container';
content.appendChild(topContainer);

// create title
const title = document.createElement('h1');
title.innerHTML = 'QuickWeather';
title.innerHTML += '<span class="material-icons">bolt</span>';
title.id = 'title';
topContainer.appendChild(title);

const searchBox = document.createElement('id');
searchBox.id = 'search-box';
topContainer.appendChild(searchBox);

// create search box
export const inputBox = document.createElement('input');
inputBox.type = 'text';
inputBox.id = 'box';
inputBox.placeholder = 'Enter City Name...';
export let city = 'Milwaukee';
searchBox.appendChild(inputBox);

// create search button
const searchBtn = document.createElement('button');
searchBtn.id = 'search-btn';
searchBtn.classList.add('material-icons');
searchBtn.innerHTML = 'search';
searchBox.appendChild(searchBtn);

// create empty arrays for forecasts and icon placement
export let currentWeather = [];
export const futureForecasts = [];
export const currentIcon = document.createElement('img');
currentIcon.src = '';

export const infoDiv = document.createElement('div');
infoDiv.id = 'info-div';
export const currentInfo = document.createElement('div');

content.appendChild(infoDiv);

const footer = document.createElement('footer');
footer.id = 'footer';
footer.innerHTML = "Copyright © Melchs40's Computer Whiz Coding 2024";
const body = document.getElementById('body');
body.appendChild(footer);

fetchWeather();

// create event listener to change weather to specific city
searchBtn.addEventListener('click', () => {
  while (infoDiv.firstChild) {
    infoDiv.removeChild(infoDiv.firstChild);
  }
  while (currentInfo.firstChild) {
    currentInfo.removeChild(currentInfo.firstChild);
  }
  while (topContainer.firstChild) {
    topContainer.removeChild(topContainer.firstChild);
  }
  topContainer.appendChild(title);
  topContainer.appendChild(searchBox);
  city = inputBox.value;
  currentWeather = [];
  fetchWeather();
});
