import { ApiModelProperty } from '@nestjs/swagger';
import {IRestaurent} from '../interfaces/restaurent.interface'
export class Restaurent implements IRestaurent  {
  @ApiModelProperty({ example: '5dd2e923e0447405d0c999e4', description: 'The _id of the Restaurent' })
  _id:string
  @ApiModelProperty({ example: 'Kitty', description: 'The name of the Restaurent' })
  name: string;

}
