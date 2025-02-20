import React from "react";
import { useState } from "react";
import { Coords, RouteCoords, RoutePoints } from "../../types";
import { getAddress } from "../../services/nominativeService";
import MapGeolocation from "./MapGeolocation";
import FindDevice from "./FindDevice";
import RoutePlanner from "./RoutePlanner";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Coords | undefined>>;
  setRoute: React.Dispatch<React.SetStateAction<RouteCoords | undefined>>;
  setAltRoute: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawerToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Controls = ({ setLocation, setRoute, setAltRoute, setDrawerToggle }: Props) => {
  const [error, setError] = useState<string | null>();
  const [routePoints, setRoutePoints] = useState<RoutePoints>({
    start: "",
    end: "",
  });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { geolocation } = navigator;

  const handleClick = () => {
    if (!geolocation) {
      setError("Geolocation is not supported by the current browser");
      return;
    }
    geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lon: longitude });
    });
    setError(null);
  };

  const handleSearchAddresses = async () => {
    const [startLocation, endLocation] = await Promise.all([
      getAddress(routePoints.start),
      getAddress(routePoints.end),
    ]);
    if (!startLocation || !endLocation) {
      console.log("An error has occured");
      return;
    }
    setRoute({
      start: { lat: startLocation.lat, lon: startLocation.lon },
      end: { lat: endLocation.lat, lon: endLocation.lon },
    });
  };

  const tabs = [
    { index: 0, label: "Location", content: <MapGeolocation setLocation={setLocation} /> },
    { index: 1, label: "Find Device", content: <FindDevice handleClick={handleClick} /> },
    {
      index: 2,
      label: "Route Planner",
      content: (
        <RoutePlanner
          setRoutePoints={setRoutePoints}
          routePoints={routePoints}
          setRoute={setRoute}
          onSearch={handleSearchAddresses}
          setAltRoute={setAltRoute}
        />
      ),
    },
  ];

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="flex mr-5 justify-end mr-5">
        <button className="relative cursor-pointer" onClick={() => setDrawerToggle((prev) => !prev)}>
          <span className="absolute bg-stone-950 block h-[2px] w-5 rotate-45"></span>
          <span className="absolute bg-stone-950 block h-[2px] w-5 -rotate-45"></span>
        </button>
      </div>
      <div className="flex gap-4 mb-5 mt-5">
        {tabs.map((tab) => (
          <p
            key={tab.index}
            onClick={() => setTabIndex(tab.index)}
            className={`pb-1 ${tabIndex === tab.index ? "border-b-3 rounded-xs border-sky-400" : ""}`}
          >
            {tab.label}
          </p>
        ))}
      </div>
      {tabs[tabIndex].content}
    </div>
  );
};

export default Controls;
