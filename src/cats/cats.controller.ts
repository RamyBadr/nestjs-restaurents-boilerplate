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
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ICat } from './interfaces/cat.interface';
import { Cat } from './classes/cat.class';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@ApiUseTags('cats')
@Controller('cats')
//
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ title: 'Create cat' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Cat,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }
}
