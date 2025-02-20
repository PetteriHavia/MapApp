import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet";
import { useState } from "react";
import Controls from "./components/Controls/Controls";
import { Coords, RouteCoords } from "./types";
import MapWrapper from "./components/MapWrapper";

function App() {
  const [location, setLocation] = useState<Coords>();
  const [route, setRoute] = useState<RouteCoords>();
  const [altRoute, setAltRoute] = useState<boolean>(false);
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);

  return (
    <div className="flex relative">
      <div className={`absolute left-20 bg-white z-2 mt-[10px] ${drawerToggle ? "hidden" : ""}`}>
        <button className="btn-primary" onClick={() => setDrawerToggle((prev) => !prev)}>
          OPEN NAVIGATION
        </button>
      </div>
      <div
        className={`transition-transform duration-300 transition-max-w ease-in-out z-3 flex-shrink-0 bg-white w-full
         ${drawerToggle ? "translate-x-0 max-w-[350px] p-5" : "-translate-x-full max-w-0 overflow-hidden p-0"}`}
      >
        <Controls
          setLocation={setLocation}
          setRoute={setRoute}
          setAltRoute={setAltRoute}
          setDrawerToggle={setDrawerToggle}
        />
      </div>
      <MapContainer center={[51.505, -0.09]} zoom={13} className="w-full h-full h-screen z-1">
        <MapWrapper location={location} route={route} altRoute={altRoute} drawerToggle={drawerToggle} />
      </MapContainer>
    </div>
  );
}

export default App;
