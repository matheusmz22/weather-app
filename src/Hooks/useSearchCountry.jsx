import {useEffect, useState} from "react";
import {getCountryBySearch} from "../services/getCountryBySearch";

function useSearchCountry(search) {
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (search.length >= 3) {
      setIsLoadingSearch(true);

      getCountryBySearch(search)
        .then((res) => setData(res))
        .finally(() => setIsLoadingSearch(false));
    } else setData(undefined);
  }, [search]);

  return {data, isLoadingSearch};
}

export default useSearchCountry;
