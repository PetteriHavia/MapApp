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
      <div
        className={`absolute left-20 bg-white z-2 mt-[10px] transition-all duration-500 transition-top ${
          drawerToggle ? "-translate-y-20" : ""
        }`}
      >
        <button className="btn-primary" onClick={() => setDrawerToggle((prev) => !prev)}>
          OPEN NAVIGATION
        </button>
      </div>
      <div
        className={`whitespace-nowrap transition-all duration-500 transition-w ease-in-out z-3 bg-white pt-5
         ${drawerToggle ? "w-full max-w-[350px] p-5 overflow-hidden" : "w-0 max-w-0 overflow-hidden"}`}
      >
        <Controls
          setLocation={setLocation}
          setRoute={setRoute}
          setAltRoute={setAltRoute}
          setDrawerToggle={setDrawerToggle}
        />
      </div>
      <MapContainer center={[51.505, -0.09]} zoom={13} className=" size-full h-screen z-1">
        <MapWrapper location={location} route={route} altRoute={altRoute} drawerToggle={drawerToggle} />
      </MapContainer>
    </div>
  );
}

export default App;
