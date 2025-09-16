const weatherIcons = {
  clear: "icon-clear.webp",
  clouds: "icon-sunny.webp",
  drizzle: "icon-drizzle.webp",
  rain: "icon-rain.webp",
  snow: "icon-snow.webp",
  thunderstorm: "icon-thunderstorm.webp",
  fog: "icon-fog.webp",
};

export function mapWeatherToIcon(weather) {
  const main = weather?.main;
  const clouds = weather.clouds?.all ?? null;

  switch (main) {
    case "Clear":
      return weatherIcons["clear"];

    case "Clouds":
      if (clouds !== null && clouds < 50) return "party-cloudy";
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
