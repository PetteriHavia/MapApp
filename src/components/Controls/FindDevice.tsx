import { useState } from "react";
import { Coords } from "../../types";
import ErrorMessage from "../ErrorMessage";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Coords | undefined>>;
};

const FindDevice = ({ setLocation }: Props) => {
  const [error, setError] = useState<null | string>(null);
  const { geolocation } = navigator;

  const handleClick = () => {
    setError(null);
    if (!geolocation) {
      setError("Geolocation is not supported by the current browser.");
      return;
    }
    geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      (error) => {
        setError(error.message || "Failed to retrieve location.");
      }
    );
  };

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <button className="btn-primary w-full" onClick={handleClick}>
        Find My Device
      </button>
    </>
  );
};

export default FindDevice;
