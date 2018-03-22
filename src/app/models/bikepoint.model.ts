import { Location } from './location.model';

export interface BikePoint extends Location {
  id: string;
  occupancy?: BikePointOccupancy;
}

export interface BikePointOccupancy {
  total: number;
  bike: number;
  vacant: number;
}
