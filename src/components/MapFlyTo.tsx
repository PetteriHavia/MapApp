import { useEffect } from "react";
import { Coords } from "../types";
import { useMap } from "react-leaflet";

const MapFlyTo = ({ userLocation }: { userLocation?: Coords }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.flyTo([userLocation.latitude, userLocation.longitude], 13);
    }
  }, [userLocation, map]);
  return null;
};

export default MapFlyTo;
