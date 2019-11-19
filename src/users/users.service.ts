import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
// import { User } from './classes/user.class';

export type User = IUser;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async findOne(username: string): Promise<User | undefined> {
    let user = await this.userModel.findOne({ username: username }).exec();
    return <IUser>user;
  }
}
