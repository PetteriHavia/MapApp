import { useState } from "react";
import { getAddress } from "../services/nominativeService";
import { Coords } from "../types";

type Props = {
  setLocation: React.Dispatch<React.SetStateAction<Coords | undefined>>;
};

const MapGeolocation = ({ setLocation }: Props) => {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSearchAddress = async () => {
    try {
      setError(null);
      const searchAddress = await getAddress(address);
      if (!searchAddress) {
        setError("Location not found, Please try another address");
        return;
      }
      setLocation({
        lat: Number(searchAddress.lat),
        lon: Number(searchAddress.lon),
      });
    } catch (error) {
      setError("Failed to fetch location. Please try again");
      console.log("Error fetching address: ", error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <input type="text" placeholder="Type address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button onClick={handleSearchAddress}>Search</button>
    </div>
  );
};

export default MapGeolocation;
