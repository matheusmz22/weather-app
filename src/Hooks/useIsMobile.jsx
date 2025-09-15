import {useMediaQuery} from "react-responsive";

function useIsMobile() {
  const isGalaxy = useMediaQuery({maxWidth: 360});
  const isMediumMobile = useMediaQuery({minWidth: 523, maxWidth: 639});

  return {isGalaxy, isMediumMobile};
}

export default useIsMobile;
