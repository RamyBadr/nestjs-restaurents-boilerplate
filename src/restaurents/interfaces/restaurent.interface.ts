import { ILocationPoint } from '../../shared/location/point.interface';

export interface IRestaurent {
  _id: string;
  cityId: string;
  name: string;
  email: string;
  location: ILocationPoint;
}
