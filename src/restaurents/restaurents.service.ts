import { Injectable, UseFilters, Catch, HttpException, ConflictException, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common';

import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { Model } from 'mongoose';
import { IRestaurent as Restaurent } from './interfaces/restaurent.interface';
import { MongoException } from '../common/exceptions/mongodb.exception';
import { QueryFailedFilter } from 'src/common/filters/query-failed.filter';
@Injectable()
export class restaurentsService {
  constructor(@Inject('RESTAURENT_MODEL') private readonly restaurentModel: Model<Restaurent>) {}
  

  @UseFilters(QueryFailedFilter)
  async create(createRestaurentDto: CreateRestaurentDto): Promise<Restaurent> {
    const createdRestaurent = new this.restaurentModel(createRestaurentDto);
    try {
      return await createdRestaurent.save();
    } catch (error) {
      throw new MongoException(error);
    }
    
  }

  async findAll(): Promise<Restaurent[]> {
    return await this.restaurentModel.find().exec();
  }
  async findById(id:String): Promise<Restaurent> {
    return await this.restaurentModel.findById(id).exec();
  }
}
