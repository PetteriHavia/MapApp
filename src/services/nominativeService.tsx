const BASE_URL = "https://nominatim.openstreetmap.org";

export const getAddress = async (address: string) => {
  const response = await fetch(`${BASE_URL}/search?${address}`);
  const data = await response.json();
  return data.length > 0 ? data[0] : null;
};
