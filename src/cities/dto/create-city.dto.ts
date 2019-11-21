import { IsInt, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;
  // readonly testKey: string;
}
