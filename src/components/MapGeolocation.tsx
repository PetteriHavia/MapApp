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
      const params = {
        q: address,
        limit: "1",
        format: "json",
      };
      const format = new URLSearchParams(params).toString();
      const searchAddress = await getAddress(format);
      if (!searchAddress) {
        setError("Location not found, Please try another address");
        return;
      }
      setLocation({
        latitude: Number(searchAddress.lat),
        longitude: Number(searchAddress.lon),
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
