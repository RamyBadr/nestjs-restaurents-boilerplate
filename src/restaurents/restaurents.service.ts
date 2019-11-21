import {
  Injectable,
  UseFilters,
  Catch,
  HttpException,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import { Inject } from '@nestjs/common';

import { CreateRestaurentDto } from './dto/create-restaurent.dto';
import { Model } from 'mongoose';
// import { IRestaurent as Restaurent } from './interfaces/restaurent.interface';

import { MongoException } from '../common/exceptions/mongodb.exception';
import { QueryFailedFilter } from '../common/filters/query-failed.filter';
import { Restaurent, MongoRestaurent } from './classes/restaurent.class';
@Injectable()
export class RestaurentsService {
  constructor(
    @Inject('RESTAURENT_MODEL')
    private readonly restaurentModel: Model<Restaurent>
  ) {}

  @UseFilters(QueryFailedFilter)
  async create(createRestaurentDto: CreateRestaurentDto): Promise<Restaurent> {
    // console.log(createRestaurentDto, 'service createRestaurentDto');
    const createdRestaurent = new this.restaurentModel(createRestaurentDto);
    try {
      //convert location
      return await createdRestaurent.save();
    } catch (error) {
      console.log(error, typeof error);

      throw new MongoException(error);
    }
  }
  async findAll(
    restaurentFilterDto: CreateRestaurentDto | any
  ): Promise<MongoRestaurent[]> {
    let result = await this.restaurentModel.find(restaurentFilterDto).exec();

    return <MongoRestaurent[]>result;
  }
  async findById(id: String): Promise<MongoRestaurent> {
    return await this.restaurentModel.findById(id).exec();
  }
  async search(name: String): Promise<MongoRestaurent[]> {
    return await this.restaurentModel
      .find({
        name: {
          $regex: name,
          $options: 'i'
        }
      })
      .exec();
  }
  async nearest(lat: number, lng: number): Promise<MongoRestaurent[]> {
    return await this.restaurentModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            }
          }
        }
      })
      .exec();
  }
  async countByCity(): Promise<ICityCount[]> {
    return await this.restaurentModel
      .aggregate([
        {
          $group: {
            _id: '$cityId',
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'cities', // should be defined from CityModel.collection name
            localField: '_id',
            foreignField: '_id',
            as: 'city'
          }
        },
        {
          $unwind: '$city'
        },
        {
          $project: {
            name: '$city.name',
            count: 1
          }
        }
      ])
      .exec();
  }
}
export interface ICityCount {
  city: string;
  count: number;
}
