export function groupForecastByDay(forecastList = []) {
  let dailyForecast = [];
  let itemDateCopy = null;
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  let clouds = 0;
  let weather;

  forecastList.forEach((item, i, arr) => {
    const date = new Date(item.dt * 1000);
    const itemDate = date.getDate();
    const itemWeekDay = date.toLocaleString("default", {
      weekday: "short",
    });

    if (itemDateCopy === null) itemDateCopy = itemDate;

    if (itemDate === itemDateCopy) {
      if (item.main.temp_min < min) min = item.main.temp_min;
      if (item.main.temp_max > max) max = item.main.temp_max;
      if (item.clouds.all > clouds) clouds = item.clouds.all;
      weather = item.weather;
    } else {
      dailyForecast.push({
        tempMin: min,
        tempMax: max,
        weather: weather,
        clouds: clouds,
        // prettier-ignore
        day: new Date(item.dt * 1000 - 86400000).toLocaleString("default", {weekday: "short", }),
      });

      clouds = item.clouds.all;
      min = item.main.temp_min;
      max = item.main.temp_max;
      itemDateCopy = itemDate;
      weather = item.weather;
      itemDateCopy = itemDate;
    }

    // Last day
    if (i === arr.length - 1) {
      dailyForecast.push({
        tempMin: min,
        tempMax: max,
        weather: weather,
        clouds: clouds,
        day: itemWeekDay,
      });
    }
  });

  return dailyForecast;
}
