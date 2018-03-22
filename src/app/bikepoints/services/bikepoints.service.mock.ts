import { LatLong } from '../../models';

export class BikePointsMockService {
  constructor() { }

  /**
   * Get all available bikepoints
   */
  public listBikePoints() {
    return;
  }

  /**
   * Get all bikepoints within a map boundary
   * @param northEast : LatLong coordinate of NorthEast corner of the map
   * @param southWest : LatLong coordinate of SouthWest corner of the map
   */
  public listBikePointsByBounds(northEast: LatLong, southWest: LatLong) {
    return ;
  }
}
