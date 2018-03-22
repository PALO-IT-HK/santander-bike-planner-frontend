export interface Location extends LatLong {
  commonName: string;
}

export interface LatLong {
  lat: number;
  lng: number;
}
