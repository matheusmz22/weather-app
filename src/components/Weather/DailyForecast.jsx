import {useGeolocation} from "../../context/GeolocationContext";
import useCurrentWeather from "../../Hooks/useCurrentWeather";

function DailyForecast({weekday, climateIcon, maxTemp, minTemp}) {
  const {coords} = useGeolocation();
  const {data, isLoading} = useCurrentWeather(
    coords?.latitude,
    coords?.longitude
  );

  return (
    <div className="h-32 w-22 md:h-30 md:max-w-19 lg:max-w-30 lg:w-30  bg-neutral-700 border-2 border-neutral-600 rounded-2xl flex flex-col  items-center justify-center text-neutral-100 text-lg  sm:text-xl">
      {isLoading || (
        <>
          <header>{weekday}</header>
          <img src={climateIcon} alt="TODO" className="w-15" />
          <div className="flex items-center justify-between sm:text-lg text-[16px] sm:gap-4 gap-2">
            <p>{maxTemp}</p>
            <p className="opacity-75">{minTemp}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default DailyForecast;
