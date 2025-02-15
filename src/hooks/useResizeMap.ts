import { useEffect } from "react";
import { useMap } from "react-leaflet";

const useResizeMap = (drawerToggle: boolean) => {
  const map = useMap();

  useEffect(() => {
    const timerId = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => clearTimeout(timerId);
  }, [drawerToggle, map]);
};

export default useResizeMap;
