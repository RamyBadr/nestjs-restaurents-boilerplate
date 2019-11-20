import { ILocationPoint } from '../interfaces/point.interface';
import { ApiModelProperty } from '@nestjs/swagger';

export class LocationPoint implements ILocationPoint {
  @ApiModelProperty({
    description: 'lattitude'
  })
  lat: number;
  @ApiModelProperty({
    description: 'longtitude'
  })
  lng: number;
}
