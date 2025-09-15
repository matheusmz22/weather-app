const API_KEY = "8e58d0a6c5d8a964536cdf8b2ccd65aa";

export async function getWeather(latitude, longitude, units = "metric") {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`
  );

  const data = await res.json();

  return data;
}
