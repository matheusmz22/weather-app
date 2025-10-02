import {usePrecipitationUnit, useWindUnit} from "../../context/UnitsContext";
import {getPrecipitation} from "../../helpers/getPrecipitation";
import {groupForecastByDay} from "../../helpers/groupForecastByDay";
import {mapWeatherToIcon} from "../../helpers/mapWeatherToIcon";
import useCurrentWeather from "../../Hooks/useCurrentWeather";
import useIsMobile from "../../Hooks/useIsMobile";
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import StatCard from "./StatCard";

function WeatherDashboard() {
  const {isMediumMobile} = useIsMobile();
  const {activeWindSpeed} = useWindUnit();
  const {activePrecipitation} = usePrecipitationUnit();

  const {data: currentWeather, _} = useCurrentWeather("weather");
  const todayWeather = currentWeather?.main;

  const {data: forecastData} = useCurrentWeather("forecast");
  const dailyForecast = groupForecastByDay(forecastData?.list);

  const weatherIcon = mapWeatherToIcon({
    main: currentWeather?.weather,
    clouds: currentWeather?.clouds,
  });

  const precipitation = getPrecipitation(
    currentWeather,
    activePrecipitation === "Millimeters (mm)" ? "mm" : "in"
  );

  const date = new Date();
  const weekDay = date.toLocaleString("default", {weekday: "short"});

  return (
    <div className="grid gap-3 mt-4 sm:grid-cols-8 md:mx-20">
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
          className={`text-neutral-100 mt-2 mb-2 ${
            isMediumMobile && "w-100"
          } w-75 md:w-full font-semibold mx-auto`}
        >
          Daily Forecast
        </p>
        <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start w-full lg:gap-9  md:justify-start md:flex-nowrap">
          {!dailyForecast.some((day) => weekDay === day.day) && (
            <DailyForecast
              weekday={weekDay}
              climateIcon={`/src/assets/images/${weatherIcon}`}
              maxTemp={Math.ceil(todayWeather?.temp_max) + "°"}
              minTemp={Math.ceil(todayWeather?.temp_min) + "°"}
            />
          )}

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
