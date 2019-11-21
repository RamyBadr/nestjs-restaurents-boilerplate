import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelProperty({ example: 'admin@app.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  @ApiModelProperty({ example: '123456' })
  readonly password: string;
}
export class RegisterUserDto {
  @ApiModelProperty({ example: 'user@app.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  @ApiModelProperty()
  readonly password: string;

  @IsString()
  @ApiModelProperty({ example: 'ahmed badr' })
  readonly name: string;
}
