import {useEffect, useRef, useState} from "react";
import {
  usePrecipitationUnit,
  useTemperatureUnit,
  useWindUnit,
} from "../../context/UnitsContext";

function Dropdown({isMetric, setIsMetric}) {
  const {activeTemperature, setActiveTemperature} = useTemperatureUnit();
  const {activeWindSpeed, setActiveWindSpeed} = useWindUnit();
  const {activePrecipitation, setActivePrecipitation} = usePrecipitationUnit();

  const [activeDropdown, setActiveDropdown] = useState(false);

  const ref = useRef(null);

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target))
          setActiveDropdown(false);
      }

      function handleKeyDown(e) {
        if (e.key === "Escape") setActiveDropdown(false);
      }

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClick, true);

      return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [setActiveDropdown]
  );

  function handleImperialClick() {
    setIsMetric((active) => !active);

    if (isMetric) {
      setActiveTemperature("Fahrenheit (°F)");
      setActiveWindSpeed("mph");
      setActivePrecipitation("Inches (in)");
    } else {
      setActiveTemperature("Celsius (°C)");
      setActiveWindSpeed("km/h");
      setActivePrecipitation("Millimeters (mm)");
    }
  }

  return (
    <div className="text-neutral-0 relative z-1" ref={ref}>
      <button
        onClick={() => setActiveDropdown((active) => !active)}
        className={`${
          activeDropdown ? "bg-neutral-600" : "bg-neutral-700"
        } cursor-pointer flex items-center gap-3 h-9 w-fit p-4 sm:p-2.5  sm:h-10 sm:w-30 opacity-95 rounded-lg list-none hover:bg-neutral-600 transition-colors duration-200 dropdown`}
      >
        <img src="src/assets/images/icon-units.svg" />
        <p>Units</p>
        <img src="src/assets/images/icon-dropdown.svg" />
      </button>
      {activeDropdown && (
        <div className="absolute bg-neutral-800 mt-2 rounded-xl w-60 -right-0.5 border-1 border-neutral-600 shadow-lg p-3 md:w-50 ">
          <button
            className="w-full text-left cursor-pointer rounded-md h-9 hover:bg-neutral-600 transition-colors duration-200 "
            onClick={handleImperialClick}
          >
            <span className="px-1.5 text-sm">
              {isMetric ? "Switch to Imperial" : "Switch to Metric System"}
            </span>
          </button>

          <DropdownContent
            title="Temperature"
            firstButtonText="Celsius (°C)"
            secondButtonText="Fahrenheit (°F)"
            activeOption={activeTemperature}
            setActiveOption={setActiveTemperature}
          />
          <div className="h-px bg-neutral-400 opacity-40 mt-3" />
          <DropdownContent
            title="Wind Speed"
            firstButtonText="km/h"
            secondButtonText="mph"
            activeOption={activeWindSpeed}
            setActiveOption={setActiveWindSpeed}
          />
          <div className="h-px bg-neutral-400 opacity-40 mt-3" />

          <DropdownContent
            title="Precipitation"
            firstButtonText="Millimeters (mm)"
            secondButtonText="Inches (in)"
            activeOption={activePrecipitation}
            setActiveOption={setActivePrecipitation}
          />
        </div>
      )}
    </div>
  );
}

export default Dropdown;

function DropdownContent({
  title,
  firstButtonText,
  secondButtonText,
  activeOption,
  setActiveOption,
}) {
  return (
    <div className="flex flex-col mt-2 gap-1">
      <p className="text-neutral-300 text-sm">{title}</p>
      <Button
        onClick={() => setActiveOption(firstButtonText)}
        isActive={activeOption === firstButtonText}
      >
        {firstButtonText}
      </Button>
      <Button
        onClick={() => setActiveOption(secondButtonText)}
        isActive={activeOption === secondButtonText}
      >
        {secondButtonText}
      </Button>
    </div>
  );
}

// Button Component Only used for dropdown
function Button({isActive, children, onClick}) {
  return (
    <button
      onClick={onClick}
      className={` ${
        isActive
          ? "bg-neutral-600 bg-[url(/src/assets/images/icon-checkmark.svg)] bg-no-repeat bg-position-[center_right_15px]"
          : ""
      } w-full h-10 hover:bg-neutral-600 rounded-md cursor-pointer transition-colors duration-200 text-left `}
    >
      <span className="ml-2">{children}</span>
    </button>
  );
}
