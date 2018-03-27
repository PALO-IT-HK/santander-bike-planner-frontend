import { LatLong } from './location.model';

export interface Journey {
  duration: number;
  startAt: Date;
  endAt: Date;
  path: LatLong[];
}
