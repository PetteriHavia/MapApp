import { useState } from "react";
import { RouteCoords, RoutePoints } from "../../types";
import { getAddress } from "../../services/nominativeService";
import { memo } from "react";
import ErrorMessage from "../ErrorMessage";
import useDebounce from "../../hooks/useDebounce";

type Props = {
  setAltRoute: React.Dispatch<React.SetStateAction<boolean>>;
  setRoute: React.Dispatch<React.SetStateAction<RouteCoords | undefined>>;
};

const RoutePlanner = memo(({ setAltRoute, setRoute }: Props) => {
  const [error, setError] = useState<null | string>(null);
  const [routePoints, setRoutePoints] = useState<RoutePoints>({
    start: "",
    end: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRoutePoints((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchAddresses = async () => {
    try {
      const [startLocation, endLocation] = await Promise.all([
        getAddress(routePoints.start),
        getAddress(routePoints.end),
      ]);
      if (!startLocation || !endLocation) {
        throw new Error("Invalid address. Please check your inputs.");
      }
      setRoute({
        start: { lat: startLocation.lat, lon: startLocation.lon },
        end: { lat: endLocation.lat, lon: endLocation.lon },
      });
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occured");
    }
  };

  const debouncedHandleSearch = useDebounce(handleSearchAddresses, 1000);

  return (
    <>
      {error && <ErrorMessage message={error} />}
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
        <button className="btn-primary" onClick={debouncedHandleSearch}>
          Check Route
        </button>
      </div>
    </>
  );
});

export default RoutePlanner;
