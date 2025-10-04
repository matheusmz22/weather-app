import {useEffect, useRef, useState} from "react";
import useCurrentWeather from "../../Hooks/useCurrentWeather";
import {formatHour} from "../../helpers/formatHour";
import {mapWeatherToIcon} from "../../helpers/mapWeatherToIcon";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const today = weekDays[new Date().getDay()];

function HourlyForecast({isMetric}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(today);
  const ref = useRef(null);

  const {data, isLoading} = useCurrentWeather();
  const forecast = data?.list;

  // Get available hours for weather info (today)
  const todayHoursFromApi = forecast?.filter(
    (day) => weekDays[new Date(day.dt * 1000).getDay()] === selectedDay
  );

  // Get up to what day the API returns
  const uniqueDayNumbers = [
    ...new Set(forecast?.map((day) => new Date(day.dt * 1000).getDay())),
  ];

  // Transform day number to day name
  const daysFromApi = uniqueDayNumbers.map((num) => weekDays[num]);

  // Get all days available from API
  const daysArray = [today, ...daysFromApi.filter((d) => d !== today)];

  // Handle opening and closing the hourly forecast dropdown using Escape and Clicking
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") setOpenDropdown(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-neutral-800 rounded-xl p-4 w-fit mx-auto md:w-fit lg:w-full relative h-fit b-6">
      <div className="text-md font-semibold text-neutral-0 flex items-center  justify-between md:gap-4 p-2">
        <h1 className="md:text-lef">Hourly forecast</h1>
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpenDropdown((open) => !open)}
            className="w-full h-9 bg-neutral-700 rounded-md cursor-pointer flex items-center justify-center gap-2 p-4 list-none hover:bg-neutral-600 transition-colors"
          >
            <p className="text-md">{selectedDay}</p>
            <img src="/images/icon-dropdown.svg" />
          </button>
          {openDropdown && (
            <div className="absolute md:w-45  flex flex-col items-start justify-center bg-neutral-800 font-normal mt-2 rounded-xl sm:w-60 w-40 -right-5 sm:right-2 border-1 border-neutral-600 shadow-lg p-1.5 ">
              {daysArray.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setOpenDropdown(false);
                    setSelectedDay(day);
                  }}
                  className={`${
                    day === selectedDay ? "bg-neutral-600" : ""
                  } hover:bg-neutral-600 md:p-[4px] w-full cursor-pointer p-2 text-left mb-2 rounded-lg `}
                >
                  <span className="ml-2">{day}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={`${todayHoursFromApi?.length === 0 ? " text-center my-10 " : "grid h-full gap-5 mt-2"}`}
        style={{gridTemplateRows: `repeat(${todayHoursFromApi?.length}, 1fr)`}}
      >
        {todayHoursFromApi?.length < 2 ? (
          <span className="text-neutral-100 h-13 md:text-md lg:text-lg xl:text-xl text-sm ">
            There is no Hourly Forecast available yet for{" "}
            <strong>{selectedDay}</strong>
          </span>
        ) : (
          todayHoursFromApi?.map((day) => (
            <div
              key={day.dt}
              className="flex items-center justify-between text-neutral-100 w-full h-13 border-2 border-neutral-600 bg-neutral-700 gap-2 px-3 rounded-md transition-colors duration-200 "
            >
              {isLoading || !forecast || (
                <>
                  <img
                    src={`/weatherImages/${mapWeatherToIcon({
                      main: day.weather[0].main,
                      clouds: day.clouds,
                    })}`}
                    alt="It will be {CLIMATE} at {HOUR}"
                    className="w-9"
                  />
                  <span className="">{formatHour(day.dt_txt, isMetric)}</span>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HourlyForecast;
