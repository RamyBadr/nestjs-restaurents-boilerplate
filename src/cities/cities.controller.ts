import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { ICity } from './interfaces/city.interface';
import {  City } from './classes/city.class';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('cities')
@Controller('cities')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)

export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ title: 'Create city' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: City,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCityDto: CreateCityDto) {
    this.citiesService.create(createCityDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Roles('admin')
  async findAll(): Promise<ICity[]> {
    return this.citiesService.findAll();
  }
}



