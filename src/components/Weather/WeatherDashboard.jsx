import useIsMobile from "../../Hooks/useIsMobile";
import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import StatCard from "./StatCard";

function WeatherDashboard() {
  const {isMediumMobile} = useIsMobile();

  return (
    <div className="grid gap-3 mt-4 px-6 sm:grid-cols-8 md:mx-20">
      <div className="col-span-3 sm:col-span-5">
        <CurrentWeatherCard />
      </div>

      <div className="col-span-3 sm:col-span-5 place-items-stretch">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-between lg:justify-between ">
          <StatCard title="Feels like" content="18°" />
          <StatCard title="Humidity" content="46%" />
          <StatCard title="Wind" content="14km/h" />
          <StatCard title="Precipitation" content="0mm" />
        </div>
      </div>
      {/*  */}

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
            weekday="Tue"
            climateIcon="/src/assets/images/icon-rain.webp"
            maxTemp="68°"
            minTemp="57°"
          />
          <DailyForecast
            weekday="Wed"
            climateIcon="/src/assets/images/icon-rain.webp"
            maxTemp="68°"
            minTemp="57°"
          />
          <DailyForecast
            weekday="Thu"
            climateIcon="/src/assets/images/icon-rain.webp"
            maxTemp="68°"
            minTemp="57°"
          />
          <DailyForecast
            weekday="Fri"
            climateIcon="/src/assets/images/icon-rain.webp"
            maxTemp="68°"
            minTemp="57°"
          />
          <DailyForecast
            weekday="Sat"
            climateIcon="/src/assets/images/icon-rain.webp"
            maxTemp="68°"
            minTemp="57°"
          />
          <DailyForecast
            weekday="Sun"
            climateIcon="/src/assets/images/icon-rain.webp"
            maxTemp="68°"
            minTemp="57°"
          />
          <DailyForecast
            weekday="Mon"
            climateIcon="/src/assets/images/icon-rain.webp"
            maxTemp="68°"
            minTemp="57°"
          />
        </div>
      </div>
      <div className="col-span-3 sm:col-start-6 sm:row-start-1 sm:row-span-3 md:row-span-2 md:row-start-1 lg:row-span-3 lg:row-start-1">
        <HourlyForecast />
      </div>
    </div>
  );
}

export default WeatherDashboard;
