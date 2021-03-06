import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';
export class User implements IUser {
  @ApiModelProperty({
    example: '5dd33e91dd31c1087889f511',
    description: 'The _id of the User'
  })
  _id: string;
  @ApiModelProperty({
    example: 'admin@app.com',
    description: 'The email of the User'
  })
  email: string;

  @ApiModelProperty({ example: '123456', description: 'The user password' })
  password: string;

  @ApiModelProperty({ example: 'admin', description: 'The user role' })
  role: string;
  @ApiModelProperty({ example: 'ramy', description: 'The user name' })
  name: string;
}
