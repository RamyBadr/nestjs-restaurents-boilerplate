import { IsInt, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelProperty()
  @IsString()
  readonly email: string;
  @IsString()
  @ApiModelProperty()
  readonly password: string;
}
