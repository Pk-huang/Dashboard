import { fetchWeatherByPosition } from './api.js';

export async function GeoWeather() {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  
    const { latitude, longitude } = position.coords;
    const weatherData = await fetchWeatherByPosition(latitude, longitude);
    return weatherData;
  }


  