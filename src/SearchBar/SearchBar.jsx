import useIsMobile from "../Hooks/useIsMobile";

import {TfiLocationPin} from "react-icons/tfi";

import {useGeolocation} from "../context/GeolocationContext";
import {useEffect, useRef, useState} from "react";
import useSearchCountry from "../Hooks/useSearchCountry";
import {getCountryName} from "../helpers/getCountryNameByCode";

function SearchBar({setSelectedCoords, setSelectedSearch}) {
  const [search, setSearch] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const ref = useRef(null);

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target))
          setIsSearchClicked(false);
      }

      function handleKeyDown(e) {
        if (e.key === "Escape") setIsSearchClicked(false);
      }

      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleClick, true);

      return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [setIsSearchClicked]
  );

  const {isMediumMobile} = useIsMobile();
  const {_, isLoading, fetchLocation} = useGeolocation();
  const {data, isLoadingSearch, error, fetchSearch} = useSearchCountry();

  function handleSearchedLocationClick(lat, lon, name, state, country) {
    setSelectedCoords({lat, lon});
    setSelectedSearch(`${name}, ${state} - ${country}`);
    setSearch("");
    setIsSearchClicked(false);
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-5">
      <h1 className="text-neutral-0 text-4xl text-center font-semibold">
        How's the sky looking today?
      </h1>
      <div className="flex items-center justify-between flex-col sm:flex-row gap-2 mx-auto mt-3">
        <div className="flex items-center justify-center gap-2 relative">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search for a place..."
            type="text"
            className={`${
              isMediumMobile ? "w-105" : "w-full"
            } sm:w-100 md:w-115 lg:w-130 rounded-xl sm:h-13 h-12 mx-auto  bg-neutral-700 opacity-90 flex items-center p-5 gap-4 bg-[url(/images/icon-search.svg)] bg-no-repeat bg-position-[center_left_15px] placeholder:text-sm placeholder-neutral-200 px-12 text-neutral-0`}
          />
          {isSearchClicked && (
            <div
              ref={ref}
              className="absolute top-full left-0 mt-2 w-full bg-neutral-800 rounded-lg shadow-lg z-10 text-neutral-0 font-bold px-3"
            >
              {isLoadingSearch ? (
                <div className="loader-search" />
              ) : error ? (
                <p className="p-3 text-neutral-300">
                  Something went wrong. Please try again.
                </p>
              ) : (
                <>
                  {data && !data.some((el) => el === undefined) ? (
                    data.map((location) => (
                      <button
                        key={location.lat}
                        className="my-3 p-2.5 hover:bg-neutral-600 bg-neutral-700 cursor-pointer rounded-lg text-start transition-colors flex justify-between items-center text-[16px] w-full"
                        onClick={() =>
                          handleSearchedLocationClick(
                            location.lat,
                            location.lon,
                            location.name,
                            location.state,
                            getCountryName(location.country)
                          )
                        }
                      >
                        <p>{location.name}</p>
                        {location.state ? (
                          <p className="text-end">
                            {location.state}, {getCountryName(location.country)}
                          </p>
                        ) : (
                          <p>{location.country}</p>
                        )}
                      </button>
                    ))
                  ) : (
                    <p className="p-3 text-neutral-300">
                      No results found for{" "}
                      <span className="font-semibold">{search}</span>.
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          <div className="flex flex-row items-center justify-center gap-2">
            <button
              onClick={() => {
                setIsSearchClicked(true);
                fetchSearch(search);
              }}
              className={`${
                isMediumMobile && "w-85"
              }  bg-myblue-500 text-neutral-0   h-12 text-xl p-2 sm:p-3 rounded-xl sm:w-28 cursor-pointer hover:bg-myblue-700 transition-all duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-myblue-500 flex items-center justify-center`}
            >
              <span>Search</span>
            </button>
            <button
              className={`${
                isMediumMobile ? "w-12" : "w-10"
              } bg-neutral-700 text-neutral-0  h-12 text-xl sm:p-3 rounded-xl w-12 cursor-pointer hover:bg-neutral-600 transition-all duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-neutral-600 flex items-center justify-center`}
              onClick={fetchLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <img src="/images/icon-loading.svg" alt="loading" />
              ) : (
                <TfiLocationPin />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
