import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LocationDto {
  @ApiModelProperty({ example: 30.093064 })
  @IsNumber()
  readonly lat: number;
  @ApiModelProperty({ example: 31.274682 })
  @IsNumber()
  readonly lng: number;
}
