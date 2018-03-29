import { MapLocation } from './location.model';

export interface BikePointOccupancy {
  total: number;
  bike: number;
  vacant: number;
}

export interface BikePointIdOccupancy {
  id: string;
  occupancy: BikePointOccupancy;
}

export interface BikePoint extends MapLocation {
  id: string;
  occupancy?: BikePointOccupancy;
}
