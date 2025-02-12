import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useState } from "react";
import Controls from "./components/Controls/Controls";
import { Coords, RouteCoords } from "./types";
import LayerControlComponent from "./components/LayerControl";
import MapFlyTo from "./components/MapFlyTo";
import RoutingMachine from "./components/RoutingMachine";

function App() {
  const [location, setLocation] = useState<Coords>();
  const [route, setRoute] = useState<RouteCoords>();
  const [altRoute, setAltRoute] = useState<boolean>(false);

  return (
    <div className="flex">
      <div className="w-full max-w-sm -xs p-5">
        <Controls setLocation={setLocation} setRoute={setRoute} setAltRoute={setAltRoute} />
      </div>
      <MapContainer center={[51.505, -0.09]} zoom={13} className="w-full h-full h-screen">
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
      </MapContainer>
    </div>
  );
}

export default App;
