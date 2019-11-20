import { ILocationPoint } from './point.interface';

export interface IRestaurent {
  _id: string;
  cityId: string;
  name: string;
  email: string;
  location: ILocationPoint;
}
