/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useState} from "react";

// Temperature Units Context
const TemperatureUnitContext = createContext();
export function TemperatureUnitProvider({children}) {
  const [activeTemperature, setActiveTemperature] = useState("Celsius (°C)");
  return (
    <TemperatureUnitContext.Provider
      value={{activeTemperature, setActiveTemperature}}
    >
      {children}
    </TemperatureUnitContext.Provider>
  );
}
export function useTemperatureUnit() {
  const context = useContext(TemperatureUnitContext);
  if (!context)
    throw new Error("TemperatureUnitContext was used outside of UnitsProvider");
  return context;
}

// Wind Units Context
const WindUnitContext = createContext();
export function WindUnitProvider({children}) {
  const [activeWindSpeed, setActiveWindSpeed] = useState("km/h");

  return (
    <WindUnitContext.Provider value={{activeWindSpeed, setActiveWindSpeed}}>
      {children}
    </WindUnitContext.Provider>
  );
}
export function useWindUnit() {
  const context = useContext(WindUnitContext);
  if (!context)
    throw new Error("WindUnitContext was used outside of UnitsProvider");
  return context;
}

// Precipitation Units Context
const PrecipitationUnitContext = createContext();
export function PrecipitationUnitProvider({children}) {
  const [activePrecipitation, setActivePrecipitation] =
    useState("Millimeters (mm)");

  return (
    <PrecipitationUnitContext.Provider
      value={{activePrecipitation, setActivePrecipitation}}
    >
      {children}
    </PrecipitationUnitContext.Provider>
  );
}
export function usePrecipitationUnit() {
  const context = useContext(PrecipitationUnitContext);
  if (!context)
    throw new Error(
      "PrecipitationUnitContext was used outside of UnitsProvider"
    );
  return context;
}
