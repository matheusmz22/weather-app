function DailyForecast({weekday, climateIcon, maxTemp, minTemp}) {
  return (
    <div className="h-32 w-20 md:w-full md:max-w-22 lg:max-w-24 bg-neutral-700 border-2 border-neutral-600 rounded-2xl flex flex-col items-center justify-center">
      <header>{weekday}</header>
      <img src={climateIcon} alt="TODO" className="w-15" />
      <div className="flex items-center justify-between text-sm gap-5">
        <p>{maxTemp}</p>
        <p className="opacity-85">{minTemp}</p>
      </div>
    </div>
  );
}

export default DailyForecast;
