import React from "react";
import { useState } from "react";
import { Coords, RouteCoords } from "../types";
import { getAddress } from "../services/nominativeService";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Coords | undefined>>;
  setRoute: React.Dispatch<React.SetStateAction<RouteCoords | undefined>>;
};

const Controls = ({ setLocation, setRoute }: Props) => {
  const [error, setError] = useState<string | null>();
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
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
    const [startLocation, endLocation] = await Promise.all([getAddress(start), getAddress(end)]);
    if (!startLocation || !endLocation) {
      console.log("An error has occured");
      return;
    }
    setRoute({
      start: { lat: startLocation.lat, lon: startLocation.lon },
      end: { lat: endLocation.lat, lon: endLocation.lon },
    });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button className={"px-8 py-3 bg-sky-400 text-neutral-50 rounded-sm text-lg font-bold"} onClick={handleClick}>
        Find Me
      </button>
      <input placeholder="Start" value={start} onChange={(e) => setStart(e.target.value)} />
      <input placeholder="End" value={end} onChange={(e) => setEnd(e.target.value)} />
      <button onClick={handleSearchAddresses}>Check route</button>
    </div>
  );
};

export default Controls;
