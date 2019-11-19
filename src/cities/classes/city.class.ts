import { ApiModelProperty } from '@nestjs/swagger';
import {ICity} from '../interfaces/city.interface'
export class City implements ICity  {
  @ApiModelProperty({ example: '5dd2e923e0447405d0c999e4', description: 'The _id of the City' })
  _id:string
  @ApiModelProperty({ example: 'Kitty', description: 'The name of the City' })
  name: string;

}
