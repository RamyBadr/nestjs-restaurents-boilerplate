import {
  IsString,
  IsMongoId,
  IsEmail,
  IsObject,
  ValidateNested,
  IsNotEmpty
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LocationDto } from '../../shared/location/location.dto';
import {
  IHasLocation,
  ILocationPoint
} from '../../shared/location/point.interface';
import { LocationPoint } from '../../shared/location/location.class';
import { IRestaurent } from '../interfaces/restaurent.interface';
import { Type } from 'class-transformer';

export class CreateRestaurentDto {
  @ApiModelProperty({ example: '5dd45ec2db202c119430b397' })
  @IsMongoId()
  readonly cityId: string;
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty({ example: 'test@mail.com' })
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  // @IsObject().
  @ValidateNested()
  @Type(() => LocationDto)
  readonly location: LocationDto;
}
