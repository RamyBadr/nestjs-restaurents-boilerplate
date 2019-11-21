import { ApiModelProperty } from '@nestjs/swagger';
import { IRestaurent } from '../interfaces/restaurent.interface';
import { ILocationPoint } from '../../shared/location/point.interface';
import { LocationPoint } from '../../shared/location/location.class';
export class Restaurent {
  @ApiModelProperty({
    example: '5dd2e923e0447405d0c999e4',
    description: 'The _id of the Restaurent'
  })
  _id: string;
  @ApiModelProperty({
    example: 'Al-tahrir',
    description: 'The name of the Restaurent'
  })
  name: string;
  @ApiModelProperty({
    example: '5dd45ec2db202c119430b397',
    description: 'The _id of the City that reaturent belongs to'
  })
  cityId: string;
  @ApiModelProperty({
    description: 'The email of the restaurent'
  })
  email: string;
  @ApiModelProperty({ default: { lat: 0, lng: 0 } })
  location: LocationPoint;
}
