import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UseFilters
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { ICity } from './interfaces/city.interface';
import { City } from './classes/city.class';
import {RoleType} from '../common/constants/role-type'


import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryFailedFilter } from 'src/common/filters/query-failed.filter';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('cities')
@Controller('cities')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  // @UseFilters(QueryFailedFilter)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create city' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: City
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCityDto: CreateCityDto) {
    this.citiesService.create(createCityDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Roles(RoleType.ADMIN)
  async findAll(): Promise<ICity[]> {
    return this.citiesService.findAll();
  }
}
