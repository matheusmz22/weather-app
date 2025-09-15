/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useState} from "react";

const UnitsContext = createContext();

function UnitsProvider({children}) {
  const [activeTemperature, setActiveTemperature] = useState("Celsius (°C)");
  const [activeWindSpeed, setActiveWindSpeed] = useState("km/h");
  const [activePrecipitation, setActivePrecipitation] =
    useState("Millimeters (mm)");
  const [isMetric, setIsMetric] = useState(true);

  return (
    <UnitsContext.Provider
      value={{
        activeTemperature,
        setActiveTemperature,
        activeWindSpeed,
        setActiveWindSpeed,
        activePrecipitation,
        setActivePrecipitation,
        isMetric,
        setIsMetric,
      }}
    >
      {children}
    </UnitsContext.Provider>
  );
}

function useUnits() {
  const context = useContext(UnitsContext);

  if (!context)
    throw new Error("UnitsContext was used outside of UnitsProvider");

  return context;
}

export {UnitsProvider, useUnits};
