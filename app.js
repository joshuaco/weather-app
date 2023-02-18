const container = document.querySelector('.card-box');
const search = document.querySelector('.search-box button');
const notFound = document.querySelector('.not-found');
const weatherBox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');

const API_KEY = '09bbc47d930f555a60b45865905cc68f';

search.addEventListener('click', () => {
  const city = document.querySelector('.search-box input').value;

  if (city === '') {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === '404') {
        error404();
        return;
      }

      console.log(data);

      notFound.style.display = 'none';
      notFound.classList.remove('fade-in');

      showWeather(data);
    });
});

const showWeather = (data) => {
  const image = document.querySelector('.weather-box img');

  switch (data.weather[0].main) {
    case 'Clear':
      image.src = './assets/img/clear.png';
      break;
    case 'Rain':
      image.src = './assets/img/rain.png';
      break;
    case 'Snow':
      image.src = './assets/img/snow.png';
      break;
    case 'Clouds':
      image.src = './assets/img/cloud.png';
      break;
    case 'Haze':
      image.src = './assets/img/mist.png';
      break;

    default:
      image.src = '';
  }

  image.alt = data.weather[0].main;

  innerData(data);

  weatherBox.style.display = '';
  weatherdetails.style.display = '';
  weatherBox.classList.add('fade-in');
  weatherdetails.classList.add('fade-in');
  container.style.height = 'auto';
};

const innerData = (data) => {
  const location = document.querySelector('.location');
  const temp = document.querySelector('.temperature');
  const desc = document.querySelector('.description');
  const humidity = document.querySelector('.humidity span');
  const wind = document.querySelector('.wind span');

  location.innerHTML = `${data.name}, ${data.sys.country}`;
  temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
  desc.innerHTML = data.weather[0].description;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${parseInt(data.wind.speed)} km/h`;
};

const error404 = () => {
  container.style.height = '400px';
  notFound.style.display = 'block';
  notFound.classList.add('fade-in');
};
