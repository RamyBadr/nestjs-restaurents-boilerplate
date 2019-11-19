import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
// import { User } from './classes/user.class';

export type User = IUser;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {
    // constructor() {
    //   this.users = [
    //     {
    //       _id: "5dd33e91dd31c1087889f513",
    //       username: 'john',
    //       password: 'changeme',
    //     },
    //     {
    //       _id: "5dd33e91dd31c1087889f512",
    //       username: 'chris',
    //       password: 'secret',
    //     },
    //     {
    //       _id: "5dd33e91dd31c1087889f511",
    //       username: 'maria',
    //       password: 'guess',
    //     },
    //   ];
    // }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async findOne(username: string): Promise<User | undefined> {
    let user = await this.userModel.findOne({ username: username }).exec();
    console.log(user, 'users.service: findOne db user');

    return <IUser>user;
    // return this.userModel.findOne(user => user.username === username);
  }
}
