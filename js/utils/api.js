const API_KEY = "d67a906df3f7b73e26ea640be6c92395"

// export async function fetchWeatherData(city="taipei") {

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   } 
// }


export async function fetchWeatherByPosition(lat, lon) {

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error("定位天氣失敗");

    const data = await response.json();
    return data;
  }
  catch (err) {
    console.log(err.message);
  }

}