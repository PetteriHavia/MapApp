export interface Coords {
  lat: number;
  lon: number;
}

export interface RouteCoords {
  start: Coords;
  end: Coords;
}

export interface RoutePoints {
  start: string;
  end: string;
}
