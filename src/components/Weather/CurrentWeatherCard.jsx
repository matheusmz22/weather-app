import {useGeolocation} from "../../context/GeolocationContext";
import {getCountryName} from "../../helpers/getCountryNameByCode";
import {mapWeatherToIcon} from "../../helpers/mapWeatherToIcon";
import useCurrentWeather from "../../Hooks/useCurrentWeather";
import useIsMobile from "../../Hooks/useIsMobile";

function CurrentWeatherCard() {
  const {isMediumMobile} = useIsMobile();
  const {_, city} = useGeolocation();
  const {data, isLoading} = useCurrentWeather("weather");

  const todayWeather = data?.main;
  const currentTemp = Math.ceil(todayWeather?.temp);
  const weatherIcon = mapWeatherToIcon({
    main: todayWeather?.main,
    clouds: todayWeather?.clouds,
  });

  const date = new Date();
  const day = date.toLocaleString("default", {weekday: "long"});
  const month = date.toLocaleString("default", {month: "short"});
  const monthDay = date.getDate();
  const year = date.getFullYear();

  if (isLoading) {
    return (
      <div
        className={`relative ${
          isMediumMobile ? "w-105" : "w-75"
        }  sm:w-full md:w-full h-80 mx-auto sm:mx-0 rounded-2xl`}
      >
        <div className="items-center gap-10 justify-center flex flex-col bg-neutral-700 rounded-2xl absolute inset-0">
          <span className="loader" />
          <span className="text-3xl text-neutral-0 font-semibold">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className={`relative ${
          isMediumMobile ? "w-105" : "w-75"
        }  sm:w-full md:w-full h-80 mx-auto sm:mx-0 rounded-2xl`}
      >
        <div className="items-center gap-10 justify-center flex flex-col bg-neutral-700 rounded-2xl absolute inset-0">
          <span className="text-2xl text-neutral-0 font-semibold">
            Search for a location...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${
        isMediumMobile ? "w-105" : "w-75"
      }  sm:w-full md:w-full h-80 mx-auto sm:mx-0 rounded-2xl`}
    >
      <div className="absolute inset-0 bg-[url(/images/bg-today-small.svg)] bg-no-repeat bg-cover bg-center rounded-2xl sm:bg-[url(/images/bg-today-large.svg)] " />

      <div className="relative flex flex-col justify-center items-center  h-full text-white md:flex-row md:items-center md:justify-between md:px-5">
        <div className="items-start justify-center flex flex-col">
          <h1 className="font-bold text-3xl">
            {city}
            {data?.city?.country && `, ${getCountryName(data.city.country)}`}
          </h1>
          <p className="text-md opacity-90 ">
            {day}, {month} {monthDay}, {year}
          </p>
        </div>
        <div className="flex items-center justify-between gap-9 sm:gap-3 mt-4 md:flex-col lg:flex-row lg:mr-5">
          {todayWeather && (
            <img
              src={`/weatherImages/${weatherIcon}`}
              alt="Sunny day in Berlin, Germany"
              className="w-30 sm:w-35"
            />
          )}

          {currentTemp !== undefined && (
            <h1 className="text-7xl sm:text-8xl font-semibold italic">
              {currentTemp}°
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
