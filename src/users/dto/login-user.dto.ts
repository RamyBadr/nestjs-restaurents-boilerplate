import { IsInt, IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelProperty({description:"admin@app.com"})
  @IsNotEmpty() 
  @IsEmail()
  @IsString()  
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({description:"123456"})
  readonly password: string;
}
