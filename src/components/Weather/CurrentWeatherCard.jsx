function CurrentWeatherCard() {
  return (
    <div className="relative w-full h-80 mx-auto mt-5 sm:mx-0 rounded-2xl">
      <div className="absolute inset-0 bg-[url(src/assets/images/bg-today-small.svg)] bg-no-repeat bg-cover bg-center rounded-2xl sm:bg-[url(src/assets/images/bg-today-large.svg)] " />

      <div className="relative flex flex-col justify-center items-center h-full text-white md:flex-row md:items-center md:justify-between md:px-5">
        <div className="items-start justify-center flex flex-col">
          {/* TODO make it responsive to what is the search */}
          <h1 className="font-bold text-3xl">Berlin, Germany</h1>
          <p className="text-md opacity-90 ">Tuesday, Aug 5, 2025</p>
        </div>
        <div className="flex items-center justify-between gap-9 sm:gap-0 mt-4 md:flex-col lg:flex-row">
          <img
            src="/src/assets/images/icon-sunny.webp"
            alt="Sunny day in Berlin, Germany"
            className="w-20 sm:w-24"
          />
          <h1 className="text-5xl sm:text-6xl font-semibold italic">68°</h1>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
