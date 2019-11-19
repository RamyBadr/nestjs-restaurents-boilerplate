import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';
// import { User } from './classes/user.class';
import { UserSchema } from './schemas/user.schema';

export type User = IUser;

@Injectable()
export class UsersService {
  static configService: ConfigService;
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}
  async findAll(filter: any): Promise<User[]> {
    return await this.userModel.find(filter).exec();
  }
  static async initAdmin(defaultUser: IUser) {
    const UserModel = new mongoose.model('User', UserSchema);
    // let userModel = new Model(UserSchema);
    let adminUser = await UserModel.findOne({ role: 'admin' });
    // console.log(defaultUser, 'defaultAdmin');
    if (adminUser) {
      console.log('admin user found');
      return;
    }
    const createdAdmin = new UserModel(defaultUser);
    await createdAdmin.save();
    console.log('admin user created');
    return;
  }
  async findOne(username: string): Promise<User | undefined> {
    let user = await this.userModel.findOne({ username: username }).exec();
    return <IUser>user;
  }
}
