import { Connection } from 'mongoose';
import { RestaurentSchema } from './schemas/restaurent.schema';

export const RestaurentsProviders = [
  {
    provide: 'RESTAURENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Restaurent', RestaurentSchema),
    inject: ['DATABASE_CONNECTION']
  }
];
