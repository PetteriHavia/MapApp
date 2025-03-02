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

export enum TabIndex {
  Location = 0,
  FindDevice = 1,
  RoutePlanner = 2,
}
