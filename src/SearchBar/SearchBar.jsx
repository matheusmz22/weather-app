import useIsMobile from "../Hooks/useIsMobile";

import {TfiLocationPin} from "react-icons/tfi";

import {useGeolocation} from "../context/GeolocationContext";
import {useState} from "react";
import useSearchCountry from "../Hooks/useSearchCountry";
import {getCountryName} from "../helpers/getCountryNameByCode";

function SearchBar({setSelectedCoords, selectedSearch, setSelectedSearch}) {
  const [search, setSearch] = useState("");
  const {isMediumMobile} = useIsMobile();
  const {_, isLoading, fetchLocation} = useGeolocation();
  const {data, isLoadingSearch, error, fetchSearch} = useSearchCountry();
  const [isSearchClicked, setIsSearchClicked] = useState(false);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSearchClicked(true);
            fetchSearch(search);
          }}
        >
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search for a place..."
            type="text"
            className={`${
              isMediumMobile ? "w-105" : "w-full"
            } sm:w-100 md:w-115 lg:w-130 rounded-xl sm:h-13 h-12 mx-auto  bg-neutral-700 opacity-90 flex items-center p-5 gap-4 bg-[url(/images/icon-search.svg)] bg-no-repeat bg-position-[center_left_15px] placeholder-neutral-200 px-12 text-neutral-0`}
          />

          <div className="flex flex-row items-center justify-center gap-2 mt-2.5">
            <button
              type="submit"
              className={`${
                isMediumMobile ? "w-85" : "w-60"
              }  bg-myblue-500 text-neutral-0   h-12 text-xl sm:p-3 rounded-xl sm:w-28 cursor-pointer hover:bg-myblue-700 transition-all duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-myblue-500 flex items-center justify-center`}
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
        </form>
      </div>
      <div
        className={`${isMediumMobile ? "w-[388px]" : "w-60"} text-amber-50 bg-neutral-800 rounded-lg h-fit mb-2`}
      >
        <div
          className={`${isSearchClicked ? "" : "hidden"} list-none px-2 font-semibold flex flex-col`}
        >
          {isLoadingSearch ? (
            <div className="loader-search" />
          ) : (
            <>
              {data &&
                data.map((location) => {
                  return (
                    <button
                      key={location.lat} // Unique coordinates for key
                      className="my-2 p-2.5 hover:bg-neutral-600  bg-neutral-700 cursor-pointer rounded-lg text-start transition-colors flex justify-between items-center"
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
                        <p>
                          {location.state}, {getCountryName(location.country)}
                        </p>
                      ) : (
                        <p>{location.country}</p>
                      )}
                    </button>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
