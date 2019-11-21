import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UseFilters,
  Query
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

import { RestaurentsService, ICityCount } from './restaurents.service';
import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { IRestaurent } from './interfaces/restaurent.interface';
import { Restaurent, MongoRestaurent } from './classes/restaurent.class';
import { RoleType } from '../common/constants/role-type';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
  ApiModelProperty
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryFailedFilter } from '../common/filters/query-failed.filter';
import { LocationToMongoPipe } from '../shared/location/location.providers';
import { ILocationPoint } from '../shared/location/point.interface';

@ApiUseTags('restaurents')
@Controller('restaurents')
// @UseInterceptors(MongoPointToLocation)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class RestaurentsController {
  constructor(private readonly restaurentsService: RestaurentsService) {}

  @ApiBearerAuth()
  @UseFilters(QueryFailedFilter)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Roles(RoleType.ADMIN)
  @ApiOperation({
    title: 'Create restaurent',
    description:
      'Please test this method on postman,\n I had to declate createRestaurentDto as any'
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Restaurent
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body(new LocationToMongoPipe('location'))
    createRestaurentDto: CreateRestaurentDto
  ): Promise<IRestaurent> {
    console.log(createRestaurentDto, 'controller createRestaurentDto');
    return this.restaurentsService.create(createRestaurentDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(MongoPointToLocation)
  @Get()
  @Roles(RoleType.ADMIN, RoleType.USER)
  async findAll(
    restaurentFilterDto: CreateRestaurentDto
  ): Promise<Restaurent[]> {
    //Bad solution I should use interceptors to convert types
    let result = await this.restaurentsService.findAll(restaurentFilterDto);
    let formattedResult = JSON.parse(JSON.stringify(result));
    formattedResult.forEach(record => {
      record.location = {
        lng: record.location.coordinates[0],
        lat: record.location.coordinates[1]
      };
    });
    return <Restaurent[]>formattedResult;
  }
  // @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(MongoPointToLocation)
  @ApiOperation({ title: 'Search restaurents By Name' })
  @Get('/search')
  @Roles(RoleType.ADMIN, RoleType.USER)
  async search(@Query('name') name: string): Promise<Restaurent[]> {
    //Bad solution I should use interceptors to convert types
    // also violating DRY , but just to get things done for now
    let result = await this.restaurentsService.search(name);
    let formattedResult = JSON.parse(JSON.stringify(result));
    formattedResult.forEach(record => {
      record.location = {
        lng: record.location.coordinates[0],
        lat: record.location.coordinates[1]
      };
    });
    return <Restaurent[]>formattedResult;
  }

  @ApiOperation({ title: 'Get nearest restauents' })
  @Get('/nearst')
  @Roles(RoleType.ADMIN, RoleType.USER)
  async nearest(
    @Query('lat') lat: number,
    @Query('lng') lng: number
  ): Promise<Restaurent[]> {
    //Bad solution I should use interceptors to convert types
    // also violating DRY , but just to get things done for now
    let result = await this.restaurentsService.nearest(lat, lng);
    let formattedResult = JSON.parse(JSON.stringify(result));
    formattedResult.forEach(record => {
      record.location = {
        lng: record.location.coordinates[0],
        lat: record.location.coordinates[1]
      };
    });
    return <Restaurent[]>formattedResult;
  }
  @ApiOperation({ title: 'Get restauents count per city' })
  @Get('/statistics')
  @Roles(RoleType.ADMIN, RoleType.USER)
  async countByCity(): Promise<ICityCount[]> {
    //Bad solution I should use interceptors to convert types
    // also violating DRY , but just to get things done for now
    return await this.restaurentsService.countByCity();
  }
}
