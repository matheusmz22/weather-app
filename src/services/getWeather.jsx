import {API_KEY} from "../.env/apiKey";

export async function getWeather(
  latitude,
  longitude,
  units = "metric",
  endpoint = "forecast"
) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`
  );

  const data = await res.json();

  return data;
}
