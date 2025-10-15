import {useGeolocation} from "../../context/GeolocationContext";
import useCurrentWeather from "../../Hooks/useCurrentWeather";
import useIsMobile from "../../Hooks/useIsMobile";

function StatCard({title, content, lat, lon}) {
  const {isGalaxy, isMediumMobile} = useIsMobile();
  const {coords} = useGeolocation();
  const {_, isLoading} = useCurrentWeather();

  const hasCoords = (lat && lon) || coords;

  return (
    <div
      className={`${isGalaxy ? "w-35" : "w-37"} ${
        isMediumMobile && "w-50"
      } sm:min-w-[8.5rem] lg:w-50 md:w-20 sm:max-w-[15rem] h-30 bg-neutral-700 border-2 border-neutral-600 rounded-2xl flex flex-col items-start px-3 gap-4 justify-center `}
    >
      <header className="text-xl text-neutral-300">{title}</header>
      <p className="text-3xl text-neutral-200">
        {isLoading || !hasCoords ? <span>&mdash;</span> : content}
      </p>
    </div>
  );
}

export default StatCard;
