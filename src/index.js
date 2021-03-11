import './stylesheets/index.scss';
import debounce from './utils/debounce';

const URI = 'https://api.openweathermap.org/data/2.5/weather';

const searchField = document.getElementById('search-field');
const weatherCity = document.getElementById('weather-city');
const weatherTemp = document.getElementById('weather-temp');
const weatherType = document.getElementById('weather-type');
const weatherMinTemp = document.getElementById('weather-min-temp');
const weatherMaxTemp = document.getElementById('weather-max-temp');
const errorDisplay = document.getElementById('error-display');

const populateWeatherInfo = ({ name, main, weather }) => {
  weatherCity.textContent = name;
  weatherType.textContent = weather[0].main;
  weatherTemp.children[0].textContent = main.temp;
  weatherMaxTemp.innerHTML = `${main.temp_max} &#176;c max`;
  weatherMinTemp.innerHTML = `${main.temp_min} &#176;c min`;
};

const fetchWeatherInfo = async (event) => {
  const { value } = event.target;
  errorDisplay.textContent = '';
  if (!value.length) return;

  try {
    const data = await fetch(`${URI}?q=${value}&units=metric&appid=${APPID}`);
    const res = await data.json();

    if (res.cod === 200) {
      const { name, main, weather } = res;
      populateWeatherInfo({ name, main, weather });
    } else {
      throw new Error('City not found. Please try again.');
    }
  } catch (error) {
    errorDisplay.textContent = error.message;
  }
};

searchField.addEventListener('input', debounce(fetchWeatherInfo));
