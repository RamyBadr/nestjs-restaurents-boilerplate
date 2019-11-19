import { IsInt, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @IsInt()
  @ApiModelProperty()
  readonly age: number;

  @IsString()
  @ApiModelProperty({type:String})
  readonly breed: string;
}
