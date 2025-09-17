const weatherIcons = {
  clear: "icon-clear.webp",
  clouds: "icon-clouds.webp",
  drizzle: "icon-drizzle.webp",
  rain: "icon-rain.webp",
  snow: "icon-snow.webp",
  thunderstorm: "icon-thunderstorm.webp",
  fog: "icon-fog.webp",
  "party-cloudy": "icon-partly-cloudy.webp",
};

export function mapWeatherToIcon(weather, clouds = null) {
  const main = weather?.main;
  const cloudsValue = weather?.clouds?.all ?? clouds;

  switch (main) {
    case "Clear":
      return weatherIcons["clear"];

    case "Clouds":
      if (cloudsValue !== null && clouds < 50)
        return weatherIcons["party-cloudy"];
      return weatherIcons["clouds"];

    case "Drizzle":
      return weatherIcons["drizzle"];

    case "Rain":
      return weatherIcons["rain"];

    case "Snow":
      return weatherIcons["snow"];

    case "Thunderstorm":
      return weatherIcons["thunderstorm"];

    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
      return weatherIcons["fog"];

    case "Squall":
    case "Tornado":
      return weatherIcons["thunderstorm"];

    default:
      return weatherIcons["clear"];
  }
}
