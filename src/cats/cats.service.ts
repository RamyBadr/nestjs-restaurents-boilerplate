import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ICat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { Model } from 'mongoose';
import { ICat as Cat } from './interfaces/cat.interface';


// @Injectable()
// export class CatsService {
//   private readonly cats: ICat[] = [];

//   create(cat: ICat) {
//     this.cats.push(cat);
//   }

//   findAll(): ICat[] {
//     return this.cats;
//   }
// }
@Injectable()
export class CatsService {
  constructor(@Inject('CAT_MODEL') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    
    
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
  async findById(id:String): Promise<Cat> {
    return await this.catModel.findById(id).exec();
  }
}