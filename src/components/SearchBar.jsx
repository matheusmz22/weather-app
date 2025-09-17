import useIsMobile from "../Hooks/useIsMobile";

import {TfiLocationPin} from "react-icons/tfi";

import {useGeolocation} from "../context/GeolocationContext";

function SearchBar() {
  const {isMediumMobile} = useIsMobile();
  const {_, isLoading, fetchLocation} = useGeolocation();

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-10 mb-2">
      <h1 className="text-neutral-0 text-4xl text-center font-semibold sm:mt-[-2rem]">
        How's the sky looking today?
      </h1>
      <div className="flex items-center justify-between flex-col sm:flex-row gap-3 mx-auto">
        <input
          placeholder="Search for a place..."
          type="text"
          className={`${
            isMediumMobile ? "w-105" : "w-full"
          } sm:w-100 md:w-115 lg:w-130 rounded-xl sm:h-13 h-12 mx-auto  bg-neutral-700 opacity-90 flex items-center p-5 gap-4 bg-[url(/src/assets/images/icon-search.svg)] bg-no-repeat bg-position-[center_left_15px] placeholder-neutral-200 px-12 text-neutral-0`}
        ></input>

        <div className="flex flex-row items-center justify-center gap-2">
          <button
            className={`${
              isMediumMobile ? "w-85" : "w-60"
            }  bg-myblue-500 text-neutral-0  h-12 text-xl sm:p-3 rounded-xl sm:w-28 cursor-pointer hover:bg-myblue-700 transition-all duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-myblue-500 flex items-center justify-center`}
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
              <img src="/src/assets/images/icon-loading.svg" alt="loading" />
            ) : (
              <TfiLocationPin />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
