import { Injectable, UseFilters, Catch, HttpException, ConflictException, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ICity } from './interfaces/city.interface';
import { CreateCityDto } from './dto/create-city.dto';
import { Model } from 'mongoose';
import { ICity as City } from './interfaces/city.interface';
import { MongoException } from '../common/exceptions/mongodb.exception';
import { QueryFailedFilter } from 'src/common/filters/query-failed.filter';
@Injectable()
export class CitiesService {
  constructor(@Inject('CITY_MODEL') private readonly cityModel: Model<City>) {}
  

  @UseFilters(QueryFailedFilter)
  async create(createCityDto: CreateCityDto): Promise<City> {
    const createdCity = new this.cityModel(createCityDto);
    try {
      return await createdCity.save();
    } catch (error) {
      throw new MongoException();
    }
    
  }

  async findAll(): Promise<City[]> {
    return await this.cityModel.find().exec();
  }
  async findById(id:String): Promise<City> {
    return await this.cityModel.findById(id).exec();
  }
}
