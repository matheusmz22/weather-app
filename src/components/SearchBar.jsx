function SearchBar() {
  return (
    <div className="flex flex-col items-center gap-6 sm:gap-10 mb-2">
      <h1 className="text-neutral-0 text-4xl text-center font-semibold sm:mt-[-2rem]">
        How's the sky looking today?
      </h1>
      <form className="flex items-center justify-between flex-col sm:flex-row gap-3 mx-auto">
        <input
          placeholder="Search for a place..."
          type="text"
          className="sm:w-100 md:w-115 lg:w-130 rounded-xl sm:h-13 h-12 mx-auto w-full bg-neutral-700 opacity-90 flex items-center p-5 gap-4 bg-[url(/src/assets/images/icon-search.svg)] bg-no-repeat bg-position-[center_left_15px] placeholder-neutral-200 px-12 text-neutral-0 "
        ></input>
        <button className="bg-myblue-500 text-neutral-0 w-80 h-12 text-xl sm:p-3 rounded-xl sm:w-28 cursor-pointer hover:bg-myblue-700 transition-all duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-myblue-500">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
