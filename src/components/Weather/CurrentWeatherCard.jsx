import {useGeolocation} from "../../context/GeolocationContext";
import {mapWeatherToIcon} from "../../helpers/mapWeatherToIcon";
import useCurrentWeather from "../../Hooks/useCurrentWeather";
import useIsMobile from "../../Hooks/useIsMobile";

const regionNames = new Intl.DisplayNames(["en"], {type: "region"});
function getCountryName(countryCode) {
  return regionNames.of(countryCode);
}

function CurrentWeatherCard() {
  const {isMediumMobile} = useIsMobile();
  const {coords, city} = useGeolocation();
  const {data, isLoading} = useCurrentWeather(
    coords?.latitude,
    coords?.longitude
  );

  const todayWeather = data?.list[0];
  const currentTemp = Math.ceil(todayWeather?.main?.temp);
  const weatherIcon = mapWeatherToIcon({
    main: todayWeather?.weather[0]?.main,
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

  if (!coords || !data) {
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
      <div className="absolute inset-0 bg-[url(src/assets/images/bg-today-small.svg)] bg-no-repeat bg-cover bg-center rounded-2xl sm:bg-[url(src/assets/images/bg-today-large.svg)] " />

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
              src={`/src/assets/images/${weatherIcon}`}
              alt="Sunny day in Berlin, Germany"
              className="w-20 sm:w-35"
            />
          )}
          {currentTemp !== undefined && (
            <h1 className="text-5xl sm:text-8xl font-semibold italic">
              {currentTemp}°
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
