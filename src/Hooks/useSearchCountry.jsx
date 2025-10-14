import {useState} from "react";
import {getCountryBySearch} from "../services/getCountryBySearch";

function useSearchCountry() {
  const [data, setData] = useState();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [error, setError] = useState(null);

  async function fetchSearch(query) {
    if (!query || query.length < 3) return; // guard clause
    setIsLoadingSearch(true);
    setError(null);

    try {
      const res = await getCountryBySearch(query);
      let resFiltered = [res[0]];

      res.slice(1).forEach((loc) => {
        if (
          !resFiltered.some(
            (filteredLoc) =>
              filteredLoc.name === loc.name &&
              filteredLoc.state === loc.state &&
              filteredLoc.country === loc.country
          )
        )
          resFiltered.push(loc);
      }); // This returns only different locations (had a bug where API was returning same location)

      setData(resFiltered);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingSearch(false);
    }
  }

  return {data, isLoadingSearch, error, fetchSearch};
}

export default useSearchCountry;
