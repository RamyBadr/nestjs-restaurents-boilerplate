import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ICity } from './interfaces/city.interface';
import { CreateCityDto } from './dto/create-city.dto';
import { Model } from 'mongoose';
import { ICity as City } from './interfaces/city.interface';


// @Injectable()
// export class CitiesService {
//   private readonly cities: ICity[] = [];

//   create(city: ICity) {
//     this.cities.push(city);
//   }

//   findAll(): ICity[] {
//     return this.cities;
//   }
// }
@Injectable()
export class CitiesService {
  constructor(@Inject('CAT_MODEL') private readonly cityModel: Model<City>) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    
    
    const createdCity = new this.cityModel(createCityDto);
    return await createdCity.save();
  }

  async findAll(): Promise<City[]> {
    return await this.cityModel.find().exec();
  }
  async findById(id:String): Promise<City> {
    return await this.cityModel.findById(id).exec();
  }
}