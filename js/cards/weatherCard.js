// weatherCard.js

import{ GeoWeather } from '../utils/geo.js'; 

export async function weatherCard() {
  const weatherCard = document.querySelector('#weather-card');
  weatherCard.innerHTML = "Loading weather data...";

  try {
    const weatherData =  await GeoWeather();
    const iconCode = weatherData.weather[0].icon;
    const isNight = iconCode.endsWith('n');

    const iconEmoji = isNight ? '🌙' : '☀️';

    weatherCard.innerHTML = ` <h2>${iconEmoji} ${weatherData.name}</h2>
      <p>氣溫：${weatherData.main.temp}°C</p>
      <p>天氣：${weatherData.weather[0].description}</p>`

  }catch (error) {
    console.error('Error fetching weather data:', error);
    weatherCard.innerHTML = "Error loading weather data.";      
    
  }
}
 