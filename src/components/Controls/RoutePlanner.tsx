import React from "react";
import { RouteCoords, RoutePoints } from "../../types";

type Props = {
  setAltRoute: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: () => Promise<void>;
  setRoute: React.Dispatch<React.SetStateAction<RouteCoords | undefined>>;
  setRoutePoints: React.Dispatch<React.SetStateAction<RoutePoints>>;
  routePoints: RoutePoints;
};

const RoutePlanner = ({ setAltRoute, onSearch, setRoutePoints, routePoints }: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRoutePoints((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <input
          className="input-primary"
          name="start"
          placeholder="Start"
          value={routePoints.start}
          onChange={handleInputChange}
        />
        <input
          className="input-primary"
          name="end"
          placeholder="End"
          value={routePoints.end}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input name="alternative route" type="checkbox" onChange={() => setAltRoute((prev) => !prev)} />
        <label className="ml-2">Show alternative routes</label>
      </div>
      <button className="btn-primary" onClick={onSearch}>
        Check Route
      </button>
    </div>
  );
};

export default RoutePlanner;
