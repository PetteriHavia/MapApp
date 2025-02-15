import { Coords } from "../types";
import { RouteCoords } from "../types";
import { Marker, TileLayer, Popup } from "react-leaflet";
import LayerControlComponent from "./LayerControl";
import MapFlyTo from "./MapFlyTo";
import RoutingMachine from "./RoutingMachine";
import useResizeMap from "../hooks/useResizeMap";

type Props = {
  location: Coords | undefined;
  route: RouteCoords | undefined;
  altRoute: boolean;
  drawerToggle: boolean;
};

const MapWrapper = ({ location, route, altRoute, drawerToggle }: Props) => {
  useResizeMap(drawerToggle);
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayerControlComponent />
      <MapFlyTo location={location} />
      {route && <RoutingMachine route={route} altRoute={altRoute} />}
      {location && (
        <Marker position={[location.lat, location.lon]}>
          <Popup>Here i am</Popup>
        </Marker>
      )}
    </>
  );
};

export default MapWrapper;
