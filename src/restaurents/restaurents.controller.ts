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

import { restaurentsService } from './restaurents.service';
import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { IRestaurent } from './interfaces/restaurent.interface';
import { Restaurent } from './classes/restaurent.class';
import {RoleType} from '../common/constants/role-type'


import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryFailedFilter } from '../common/filters/query-failed.filter';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('restaurents api')
@Controller('restaurents')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class RestaurentsController {
  constructor(private readonly restaurentsService: restaurentsService) {}

  // @UseFilters(QueryFailedFilter)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create restaurent' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Restaurent
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createRestaurentDto: CreateRestaurentDto) {
    this.restaurentsService.create(createRestaurentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Roles(RoleType.ADMIN)
  async findAll(): Promise<IRestaurent[]> {
    return this.restaurentsService.findAll();
  }
}
