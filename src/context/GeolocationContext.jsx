import {createContext, useContext, useState} from "react";
import {getCoords} from "../services/getCoords";
import {getCityName} from "../services/getCityName";

const GeolocationContext = createContext();

function GeolocationProvider({children}) {
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(null);

  async function fetchLocation() {
    setIsLoading(true);
    setError(null);

    try {
      const position = await getCoords();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const data = await getCityName(latitude, longitude);
      const city = data.city;

      setCoords({latitude, longitude});
      setCity(city);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <GeolocationContext.Provider
      value={{coords, city, isLoading, error, fetchLocation}}
    >
      {children}
    </GeolocationContext.Provider>
  );
}
function useGeolocation() {
  const context = useContext(GeolocationContext);

  if (context === undefined)
    throw new Error(
      "GeolocationContext was used outside of GeolocationProvider"
    );

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export {GeolocationProvider, useGeolocation};
