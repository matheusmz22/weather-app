function SearchBar() {
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-neutral-0 text-4xl text-center font-semibold">
        How's the sky looking today?
      </h1>
      <div className="flex items-center justify-center gap-4">
        <input
          placeholder="Search for a place..."
          type="text"
          className="w-100 rounded-xl h-13 mx-auto bg-neutral-700 opacity-90 flex items-center p-5 gap-4 bg-[url(/src/assets/images/icon-search.svg)] bg-no-repeat bg-position-[center_left_15px] placeholder-neutral-200 px-12 text-neutral-0 "
        ></input>
        <button className="bg-myblue-500 text-neutral-0 p-3 rounded-xl w-28 cursor-pointer hover:bg-myblue-700 transition-all duration-150 focus:outline-2 focus:outline-offset-2 focus:outline-myblue-500">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

{
  /* <img src="src/assets/images/icon-search.svg" />
<input
  placeholder="Search for a place..."
  className="w-full placeholder-neutral-200"
></input> */
}
