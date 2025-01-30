import React from "react";
import { useState } from "react";
import { Coords } from "../types";

type Props = {
  setUserLocation: React.Dispatch<React.SetStateAction<Coords | undefined>>;
};

const Controls = ({ setUserLocation }: Props) => {
  const [error, setError] = useState<string | null>();
  const { geolocation } = navigator;

  const handleClick = () => {
    if (!geolocation) {
      setError("Geolocation is not supported by the current browser");
      return;
    }
    geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    });
    setError(null);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Find Me</button>
    </div>
  );
};

export default Controls;
