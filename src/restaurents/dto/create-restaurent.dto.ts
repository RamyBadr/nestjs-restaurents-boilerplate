import { IsInt, IsString, IsArray, IsMongoId, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateRestaurentDto {
  @ApiModelProperty()
  @IsMongoId()  
  readonly cityId: string;
  @ApiModelProperty()
  @IsString()
  readonly name: string;
  @ApiModelProperty()
  @IsString()
  readonly email: string;
  @ApiModelProperty({description:'[lat,lng]'})
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => Number)
  readonly location: [number];
}
