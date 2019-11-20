import { ApiModelProperty } from '@nestjs/swagger';
import { IRestaurent } from '../interfaces/restaurent.interface';
import { ILocationPoint } from '../interfaces/point.interface';
import { LocationPoint } from './location.class';
export class Restaurent implements IRestaurent {
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
    description: 'The geo location of the restaurent'
  })
  @ApiModelProperty({
    description: 'The email of the restaurent'
  })
  email: string;
  location: LocationPoint;
}
