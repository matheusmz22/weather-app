import {useEffect, useState} from "react";
import {useTemperatureUnit} from "../context/UnitsContext";
import {getWeather} from "../services/getWeather";
import {useGeolocation} from "../context/GeolocationContext";

function useCurrentWeather(endpoint = "forecast") {
  const {activeTemperature} = useTemperatureUnit();
  const {coords} = useGeolocation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const latitude = coords?.latitude;
  const longitude = coords?.longitude;

  useEffect(() => {
    if (!latitude || !longitude) return;
    setIsLoading(true);

    const metricSystem =
      activeTemperature === "Celsius (°C)" ? "metric" : "imperial";

    getWeather(latitude, longitude, metricSystem, endpoint)
      .then((res) => setData(res))
      .finally(() => setIsLoading(false));
  }, [activeTemperature, latitude, endpoint, longitude]);

  return {data, isLoading};
}

export default useCurrentWeather;
