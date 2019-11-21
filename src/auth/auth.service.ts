import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/users/interfaces/user.interface';
import { RoleType } from 'src/common/constants/role-type';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne(loginUserDto.email);
    if (user) {
      // use bcrypt.compare
      const validPassword = await bcrypt.compare(
        loginUserDto.password,
        user.password
      );
      if (validPassword) {
        let userCloned = JSON.parse(JSON.stringify(user));

        let validateUserResult = {
          email: userCloned.email,
          _id: userCloned._id,
          role: userCloned.role
        };
        if (!validateUserResult) {
          throw new UserNotFoundException('invalid password!!');
        }
        return validateUserResult;
      }
    } else {
      throw new UserNotFoundException('user not found');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    let user = await this.validateUser(loginUserDto);
    if (!user) throw new UserNotFoundException('invalid password');
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
  async register(registerUserDto: RegisterUserDto) {
    const isFound = await this.usersService.findOne(registerUserDto.email);
    if (isFound) {
      throw new UserIsFoundException('user email is used before');
    }
    const user = await this.usersService.register(registerUserDto);
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}

export class UserNotFoundException extends UnauthorizedException {
  constructor(error?: string) {
    super('error', error);
  }
}
export class UserIsFoundException extends UnauthorizedException {
  constructor(error?: string) {
    super('error', error);
  }
}
