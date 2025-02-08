import { Coords } from "../types";

const BASE_URL = "https://nominatim.openstreetmap.org";

export const getAddress = async (address: string): Promise<Coords | null> => {
  const params = new URLSearchParams({
    q: address,
    limit: "1",
    format: "json",
  });
  const response = await fetch(`${BASE_URL}/search?${params.toString()}`);
  const data: Coords[] = await response.json();
  return data.length > 0 ? data[0] : null;
};
