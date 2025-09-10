const tempHours = [
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function HourlyForecast() {
  const weekDayInNumber = new Date().getDay();

  const weekDay = weekDays[weekDayInNumber];

  return (
    <div className="bg-neutral-800 rounded-xl p-2 w-full md:w-fit lg:w-full relative">
      <div className="text-md font-semibold text-neutral-0 flex items-center justify-between md:gap-4 p-2">
        <h1 className="md:text-lef">Hourly forecast</h1>
        <details>
          <summary className="w-full h-9 bg-neutral-700 rounded-md cursor-pointer flex items-center justify-center gap-2 p-3 list-none hover:bg-neutral-600 transition-colors">
            <p className="text-sm">{weekDay}</p>
            <img src="src/assets/images/icon-dropdown.svg" />
          </summary>
          <div className="absolute md:w-45  flex flex-col items-start justify-center bg-neutral-800 font-normal mt-2 rounded-xl w-60 right-2 border-1 border-neutral-600 shadow-lg p-3 ">
            {weekDays.map((day) => (
              <button
                key={day}
                className={`${
                  day === weekDay ? "bg-neutral-600" : ""
                } hover:bg-neutral-600 text-left md:p-[5px] w-full p-2 mb-2 rounded-lg`}
              >
                {day}
              </button>
            ))}
          </div>
        </details>
      </div>
      <div>
        {tempHours.map((hour) => (
          <div
            key={hour}
            className="flex items-center justify-start text-neutral-100 w-full  h-13 border-2 border-neutral-600 bg-neutral-700 my-2 gap-2 px-3 rounded-md transition-colors duration-200 "
          >
            <img
              src="src/assets/images/icon-rain.webp"
              alt="It will be {CLIMATE} at {HOUR}"
              className="w-9"
            />
            <span className="">{hour}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
