import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import {
  ILocationPoint,
  IMongoPointType,
  IMongoPoint,
  IHasLocation,
  IHasMongoPointLocation
} from './point.interface';
import { json } from 'body-parser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { type } from 'os';

@Injectable()
export class LocationToMongoPipe implements PipeTransform<IHasLocation> {
  private readonly key: string;
  constructor(key: string) {
    this.key = key;
  }
  transform(value: any, metadata: ArgumentMetadata): IHasMongoPointLocation {
    console.log(value, 'pipe val');
    if (!value.location) {
      throw new BadRequestException('Location Validation failed');
    }

    let transformed = JSON.parse(JSON.stringify(value));
    // delete transformed[this.key];
    return {
      ...value,
      [this.key]: {
        type: 'Point',
        coordinates: [value.location.lng, value.location.lat]
      }
    };
  }
}
type TMongoPoint = {
  readonly type: IMongoPointType;
  readonly coordinates: [number, number];
};

export type TLocationPoint = {
  readonly lat: number;
  readonly lng: number;
};
type IHasTLocationPoint = {
  location: TLocationPoint;
};
type HasTMongoPoint = {
  location: TMongoPoint;
};
// @Injectable()
// export class MongoPointToLocation
//   implements NestInterceptor<[HasTMongoPoint], [IHasTLocationPoint]> {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<[HasTMongoPoint]>
//   ): Observable<[IHasTLocationPoint]> {
//     return next.handle().pipe(
//       map(records => {
//         return records.map(data => ({ ...data,location:{lat:0,lng:0} }))
//         // let result = [];
//         // return {
//         //   ...records,
//         //   location: {
//         //     lat: 0,
//         //     lng: 0
//         //   }
//         // };
//       })
//     );
//   }
// }
