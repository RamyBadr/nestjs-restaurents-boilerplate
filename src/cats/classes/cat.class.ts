import { ApiModelProperty } from '@nestjs/swagger';
import {ICat} from '../interfaces/cat.interface'
export class Cat implements ICat  {
  @ApiModelProperty({ example: '5dd2e923e0447405d0c999e4', description: 'The _id of the Cat' })
  _id:string
  @ApiModelProperty({ example: 'Kitty', description: 'The name of the Cat' })
  name: string;

  @ApiModelProperty({ example: 1, description: 'The age of the Cat' })
  age: number;

  @ApiModelProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;
}
