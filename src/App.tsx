import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useState } from "react";
import Controls from "./components/Controls";
import { Coords } from "./types";
import LayerControlComponent from "./components/LayerControl";
import MapFlyTo from "./components/MapFlyTo";
import MapGeolocation from "./components/MapGeolocation";

function App() {
  const [location, setLocation] = useState<Coords>();

  return (
    <div className="w-full h-dvh flex justify-center items-center flex-col">
      <MapGeolocation setLocation={setLocation} />
      <Controls setLocation={setLocation} />
      <MapContainer center={[51.505, -0.09]} zoom={13} className="w-9/10 h-[800px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerControlComponent />
        <MapFlyTo location={location} />
        {location && (
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>Here i am</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
