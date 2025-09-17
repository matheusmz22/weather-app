import {useEffect, useState} from "react";
import {useTemperatureUnit} from "../context/UnitsContext";
import {getWeather} from "../services/getWeather";

function useDailyForecast(latitude, longitude) {
  const {activeTemperature} = useTemperatureUnit();
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

export default useDailyForecast;
