import { IsString, IsMongoId, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { LocationDto } from '../../shared/location/location.dto';
import {
  IHasLocation,
  ILocationPoint
} from '../../shared/location/point.interface';
import { LocationPoint } from '../../shared/location/location.class';
import { IRestaurent } from '../interfaces/restaurent.interface';

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
  public location: LocationPoint;
}
