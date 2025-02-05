import React from "react";
import { useState } from "react";
import { Coords } from "../types";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Coords | undefined>>;
};

const Controls = ({ setLocation }: Props) => {
  const [error, setError] = useState<string | null>();
  const { geolocation } = navigator;

  const handleClick = () => {
    if (!geolocation) {
      setError("Geolocation is not supported by the current browser");
      return;
    }
    geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
    setError(null);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button className={"px-8 py-3 bg-sky-400 text-neutral-50 rounded-sm text-lg font-bold"} onClick={handleClick}>
        Find Me
      </button>
    </div>
  );
};

export default Controls;
