import {usePrecipitationUnit, useWindUnit} from "../../context/UnitsContext";
import {mapWeatherToIcon} from "../../helpers/mapWeatherToIcon";
import useCurrentWeather from "../../Hooks/useCurrentWeather";
import useIsMobile from "../../Hooks/useIsMobile";
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import StatCard from "./StatCard";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function WeatherDashboard() {
  const {isMediumMobile} = useIsMobile();
  const {activeWindSpeed} = useWindUnit();
  const {activePrecipitation} = usePrecipitationUnit();

  const {data: currentWeather, _} = useCurrentWeather("weather");
  const {data: forecastData} = useCurrentWeather("forecast");

  const weatherIcon = mapWeatherToIcon({
    main: currentWeather?.weather,
    clouds: currentWeather?.clouds,
  });

  const todayWeather = currentWeather?.main;
  const precipitation = getPrecipitation(
    currentWeather,
    activePrecipitation === "Millimeters (mm)" ? "mm" : "in"
  );

  const date = new Date();
  const weekDay = date.toLocaleString("default", {weekday: "short"});

  // console.log(forecastData);
  // console.log(weekDay);

  let dailyForecast = [];
  let itemDateCopy = new Date().getDate();
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  let clouds = 0;
  if (forecastData && forecastData.list) {
    forecastData.list.forEach((item, i, arr) => {
      const itemDate = new Date(item.dt * 1000).getDate();
      const itemWeekDay = new Date(item.dt * 1000).toLocaleString("default", {
        weekday: "short",
      });
      console.log(itemWeekDay);
      if (itemDate === itemDateCopy) {
        if (item.main.temp_min < min) min = item.main.temp_min;
        if (item.main.temp_max > max) max = item.main.temp_max;
        if (item.clouds.all > clouds) clouds = item.clouds.all;
      } else {
        const weather = item.weather;
        dailyForecast.push({
          tempMin: min,
          tempMax: max,
          weather: weather,
          clouds: clouds,
          day: itemWeekDay,
        });
        clouds = 0;
        min = Number.MAX_SAFE_INTEGER;
        max = Number.MIN_SAFE_INTEGER;
        itemDateCopy = itemDate;
      }
      if (i === arr.length - 1) {
        const weather = item.weather;
        dailyForecast.push({
          tempMin: min,
          tempMax: max,
          weather: weather,
          clouds: clouds,
          day: itemWeekDay,
        });
      }
    });
  }
  return (
    <div className="grid gap-3 mt-4 px-6 sm:grid-cols-8 md:mx-20">
      <div className="col-span-3 sm:col-span-5">
        <CurrentWeatherCard />
      </div>

      <div className="col-span-3 sm:col-span-5 place-items-stretch">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-between lg:justify-between ">
          <StatCard
            title="Feels like"
            content={`${Math.ceil(todayWeather?.feels_like)}°`}
          />
          <StatCard title="Humidity" content={`${todayWeather?.humidity}%`} />
          <StatCard
            title="Wind"
            content={`${currentWeather?.wind?.speed.toFixed(1)} ${activeWindSpeed}`}
          />
          <StatCard title="Precipitation" content={precipitation} />
        </div>
      </div>

      <div className="col-span-3 sm:col-span-5 md:col-span-8 lg:col-span-5">
        <p
          className={`text-neutral-100 mt-4 mb-2 ${
            isMediumMobile && "w-100"
          } w-75 md:w-full font-semibold mx-auto`}
        >
          Daily Forecast
        </p>
        <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start w-full lg:gap-9  md:justify-start md:flex-nowrap">
          <DailyForecast
            weekday={weekDay}
            climateIcon={`/src/assets/images/${weatherIcon}`}
            maxTemp={Math.ceil(todayWeather?.temp_max) + "°"}
            minTemp={Math.ceil(todayWeather?.temp_min) + "°"}
          />

          {dailyForecast.map((day, i) => {
            const weatherIcon = mapWeatherToIcon(day.weather[0], day.clouds);

            return (
              <DailyForecast
                key={i}
                weekday={day.day}
                climateIcon={`/src/assets/images/${weatherIcon}`}
                maxTemp={Math.ceil(day.tempMax) + "°"}
                minTemp={Math.ceil(day.tempMin) + "°"}
              />
            );
          })}
        </div>
      </div>
      <div className="col-span-3 sm:col-start-6 sm:row-start-1 sm:row-span-3 md:row-span-2 md:row-start-1 lg:row-span-3 lg:row-start-1">
        <HourlyForecast />
      </div>
    </div>
  );
}

export default WeatherDashboard;

function getPrecipitation(data, unit = "mm") {
  if (!data) return `0 ${unit}`;

  const rain = data.rain?.["1h"] ?? data.rain?.["3h"];
  const snow = data.snow?.["1h"] ?? data.snow?.["3h"];

  const value = rain ?? snow ?? 0;

  return `${value} ${unit}`;
}
