import CurrentWeatherCard from "./CurrentWeatherCard";
import DailyForecast from "./DailyForecast";
import StatCard from "./StatCard";

function WeatherDashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 text-amber-50 sm:grid-cols-8 sm:gap-6 sm:mx-20 justify-items-center sm:justify-items-stretch sm:gap-x-10 xl:mx-auto xl:max-w-[90rem]">
      {/* LEFT COLUMN */}
      <div className="sm:col-span-5 lg:col-span-6 xl:col-span-6 sm:space-y-3 min-w-0 ">
        {/* MAIN WEATHER CARD */}
        <CurrentWeatherCard />

        {/* STATS - SUBGRID 4 COLUMNS */}
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 mt-4">
          <StatCard title="Feels like" content="64°" />
          <StatCard title="Humidity" content="46%" />
          <StatCard title="Wind" content="9 mph" />
          <StatCard title="Precipitation" content="0 in" />
        </div>

        <p className="mt-4 mb-2 font-semibold">Daily forecast</p>
        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] grid-cols-3 gap-4">
          {/* DAILY FORECAST, 7*/}
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

      {/* Right Column, Forecast by hour */}
      <div className="col-span-3 lg:col-span-2 xl:col-span-2">
        {/* <HourlyForecast/> */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 w-full h-full mt-4">
          <p className="text-lg font-semibold">Hourly forecast (placeholder)</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
