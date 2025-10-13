import {API_KEY} from "../.env/apiKey";
const LIMIT = 5;
const URL = "https://api.openweathermap.org/geo/1.0/direct?q=";
export async function getCountryBySearch(countrySearched) {
  try {
    const res = await fetch(
      `${URL}${countrySearched}&limit=${LIMIT}&appid=${API_KEY}`
    );
    const data = res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
