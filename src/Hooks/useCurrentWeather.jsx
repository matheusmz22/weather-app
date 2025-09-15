import {useEffect, useState} from "react";
import {useUnits} from "../context/UnitsContext";
import {getWeather} from "../services/getWeather";

function useCurrentWeather(latitude, longitude) {
  const {activeTemperature} = useUnits();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (!latitude || !longitude) return;
    setIsLoading(true);

    const metricSystem =
      activeTemperature === "Celsius (°C)" ? "metric" : "imperial";

    getWeather(latitude, longitude, metricSystem)
      .then((res) => setData(res))
      .finally(() => setIsLoading(false));
  }, [activeTemperature, latitude, longitude]);

  return {data, isLoading};
}

export default useCurrentWeather;
