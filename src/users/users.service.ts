import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';
import * as bcrypt from 'bcrypt';
// import { User } from './classes/user.class';
import { UserSchema } from './schemas/user.schema';
import { RegisterUserDto } from './dto/login-user.dto';
import { RoleType } from '../common/constants/role-type';
import { MongoException } from '../common/exceptions/mongodb.exception';

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
    let encryptedUser: IUser = {
      email: defaultUser.email,
      role: defaultUser.role,
      password: await bcrypt.hash(defaultUser.password, 10)
    };

    const createdAdmin = new UserModel(encryptedUser);
    await createdAdmin.save();
    console.log('admin user created');
    return;
  }
  async findOne(email: string): Promise<User | undefined> {
    let user = await this.userModel.findOne({ email: email }).exec();
    return <IUser>user;
  }
  async register(registerUserDto: RegisterUserDto) {
    let encryptedUser: IUser = {
      email: registerUserDto.email,
      role: RoleType.USER,
      password: await bcrypt.hash(registerUserDto.password, 10)
    };
    const createdUser = new this.userModel(encryptedUser);
    try {
      return await createdUser.save();
    } catch (error) {
      // console.log(error);

      throw new MongoException(error);
    }
  }
}
