export interface MapLocation extends LatLong {
  commonName: string;
}

export interface LatLong {
  lat: number;
  lng: number;
}
