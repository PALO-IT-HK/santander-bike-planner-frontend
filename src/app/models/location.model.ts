export interface LatLong {
  lat: number;
  lng: number;
}

export interface MapLocation extends LatLong {
  commonName: string;
}

export interface MapBoundary {
  ne: LatLong;
  sw: LatLong;
}
