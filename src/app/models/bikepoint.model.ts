import { MapLocation } from './location.model';

export interface BikePoint extends MapLocation {
  id: string;
  occupancy?: BikePointOccupancy;
}

export interface BikePointOccupancy {
  total: number;
  bike: number;
  vacant: number;
}
