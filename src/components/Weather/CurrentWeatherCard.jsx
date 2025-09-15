import {useGeolocation} from "../../context/GeolocationContext";
import useCurrentWeather from "../../Hooks/useCurrentWeather";
import useIsMobile from "../../Hooks/useIsMobile";

const regionNames = new Intl.DisplayNames(["en"], {type: "region"});
function getCountryName(countryCode) {
  return regionNames.of(countryCode);
}

function CurrentWeatherCard() {
  const {isMediumMobile} = useIsMobile();
  const {coords} = useGeolocation();
  const {data, isLoading} = useCurrentWeather(
    coords?.latitude,
    coords?.longitude
  );
  console.log(data?.city);

  if (!isLoading) {
    return (
      <div
        className={`relative ${
          isMediumMobile ? "w-105" : "w-75"
        }  sm:w-full md:w-full h-80 mx-auto sm:mx-0 rounded-2xl`}
      >
        <div className="absolute inset-0 rounded-2xl bg-neutral-700 " />

        <div className="relative flex flex-col justify-center items-center  h-full text-white md:flex-row md:items-center md:justify-between md:px-5">
          <div className="items-start justify-center flex flex-col">
            <span className="loader" />
            <span>Loading</span>
          </div>
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
            {data?.city?.name}
            {data?.city?.country && `, ${getCountryName(data.city.country)}`}
          </h1>
          <p className="text-md opacity-90 ">Tuesday, Aug 5, 2025</p>
        </div>
        <div className="flex items-center justify-between gap-9 sm:gap-0 mt-4 md:flex-col lg:flex-row">
          <img
            src="/src/assets/images/icon-sunny.webp"
            alt="Sunny day in Berlin, Germany"
            className="w-20 sm:w-24"
          />
          <h1 className="text-5xl sm:text-6xl font-semibold italic">68°</h1>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
