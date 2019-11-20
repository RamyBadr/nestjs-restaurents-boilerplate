import { IsString, IsMongoId, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LocationDto } from './location.dto';

export class CreateRestaurentDto {
  @ApiModelProperty({ example: '5dd45ec2db202c119430b397' })
  @IsMongoId()
  readonly cityId: string;
  @ApiModelProperty()
  @IsString()
  readonly name: string;
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;
  @ApiModelProperty()
  readonly location: LocationDto;
}
