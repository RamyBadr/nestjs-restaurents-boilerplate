import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common';
import {
  ILocationPoint,
  IMongoPointType,
  IMongoPoint,
  IHasLocation,
  IHasMongoPoint
} from './point.interface';
import { json } from 'body-parser';

@Injectable()
export class LocationToMongo implements PipeTransform<IHasLocation> {
  private readonly key: string;
  constructor(key: string) {
    this.key = key;
  }
  transform(value: any, metadata: ArgumentMetadata): IHasMongoPoint {
    // console.log(value, 'pipe val');
    if (!value.location) {
      throw new BadRequestException('Location Validation failed');
    }

    let transformed = JSON.parse(JSON.stringify(value));
    // delete transformed[this.key];
    return {
      ...value,
      [this.key]: {
        type: 'Point',
        coordinates: [value.location.lng, value.location.lng]
      }
    };
  }
}
@Injectable()
export class LocationFromMongo implements PipeTransform<IHasMongoPoint> {
  private readonly key: string;
  constructor(key: string) {
    this.key = key;
  }
  transform(value: any, metadata: ArgumentMetadata): IHasLocation {
    // console.log(value, 'pipe val');
    if (!value.location) {
      throw new BadRequestException('Location Validation failed');
    }

    let transformed = JSON.parse(JSON.stringify(value));
    // delete transformed[this.key];
    return {
      ...value,
      [this.key]: {
        lat: value[this.key].coordinates[0],
        lng: value[this.key].coordinates[1]
      }
    };
  }
}
