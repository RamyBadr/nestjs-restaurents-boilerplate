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
import { Model, Types } from 'mongoose';
type ObjectId = Types.ObjectId;
// import { IRestaurent as Restaurent } from './interfaces/restaurent.interface';

import { MongoException } from '../common/exceptions/mongodb.exception';
import { QueryFailedFilter } from '../common/filters/query-failed.filter';
import { Restaurent, MongoRestaurent } from './classes/restaurent.class';
import { UpdateRestaurentDto } from './dto/update-restaurent.dto';
import { type } from 'os';
import { types } from '@babel/core';
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
      let created = await createdRestaurent.save();
      return <Restaurent>convertMongoLocation(created);
    } catch (error) {
      // console.log(error, typeof error);
      throw new MongoException(error);
    }
  }
  @UseFilters(QueryFailedFilter)
  async update(
    _id: ObjectId,
    updateRestaurentDto: UpdateRestaurentDto
  ): Promise<Restaurent> {
    // console.log(createRestaurentDto, 'service createRestaurentDto');
    // const createdRestaurent =
    try {
      //convert location
      console.log(_id, '_id', updateRestaurentDto, 'updateRestaurentDto');

      let updated = await this.restaurentModel.findOneAndUpdate(
        { _id: _id },
        updateRestaurentDto,
        { new: true, upsert: false }
      );

      return <Restaurent>convertMongoLocation(updated);
    } catch (error) {
      // console.log(error, typeof error);

      throw new MongoException(error);
    }
  }
  async findAll(
    restaurentFilterDto: CreateRestaurentDto | any
  ): Promise<MongoRestaurent[]> {
    let result = await this.restaurentModel.find(restaurentFilterDto).exec();

    for (let i = 0; i < result.length; i++) {
      const record = result[i];
    }
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
function convertMongoLocation(record) {
  let formatted = JSON.parse(JSON.stringify(record));
  formatted.location = {
    lng: formatted.location.coordinates[0],
    lat: formatted.location.coordinates[1]
  };
  return formatted;
}
