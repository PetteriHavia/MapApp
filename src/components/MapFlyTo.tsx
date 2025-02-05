import { useEffect } from "react";
import { Coords } from "../types";
import { useMap } from "react-leaflet";

const MapFlyTo = ({ location }: { location?: Coords }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.latitude, location.longitude], 13);
    }
  }, [location, map]);
  return null;
};

export default MapFlyTo;
