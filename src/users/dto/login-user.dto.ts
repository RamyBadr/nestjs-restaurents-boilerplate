import { IsInt, IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelProperty({ example: 'admin@app.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ example: '123456' })
  readonly password: string;
}
