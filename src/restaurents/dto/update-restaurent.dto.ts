import {
  IsString,
  IsMongoId,
  IsEmail,
  IsOptional,
  IsEmpty
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LocationDto } from '../../shared/location/location.dto';
import {
  IHasLocation,
  ILocationPoint
} from '../../shared/location/point.interface';
import { LocationPoint } from '../../shared/location/location.class';
import { IRestaurent } from '../interfaces/restaurent.interface';
import { isNull } from 'util';

export class UpdateRestaurentDto {
  @ApiModelProperty({ example: '5dd45ec2db202c119430b397' })
  @IsOptional()
  @IsMongoId()
  readonly cityId: string;
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  readonly name: string;
  @ApiModelProperty({ example: 'test@mail.com' })
  @IsEmail()
  @IsOptional()
  readonly email: string;
  @ApiModelProperty()
  @IsOptional()
  readonly location: LocationPoint;
}
