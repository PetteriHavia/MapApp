import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import Controls from "./components/Controls";
import { Coords } from "./types";
import LayerControlComponent from "./components/LayerControl";

function App() {
  const [userLocation, setUserLocation] = useState<Coords>();
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo([userLocation.latitude, userLocation.longitude], 13);
    }
  }, [userLocation]);

  return (
    <div className="w-full h-dvh flex justify-center items-center flex-col">
      <Controls setUserLocation={setUserLocation} />
      <MapContainer center={[51.505, -0.09]} zoom={13} className="w-9/10 h-[800px]" ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerControlComponent />
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>Here i am</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
