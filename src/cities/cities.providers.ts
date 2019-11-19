import { Connection } from 'mongoose';
import { CitySchema } from './schemas/city.schema';

export const citiesProviders = [
  {
    provide: 'CAT_MODEL',
    useFactory: (connection: Connection) => connection.model('City', CitySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
