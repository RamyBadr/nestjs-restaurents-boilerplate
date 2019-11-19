import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne(loginUserDto.username);
    if (user) {
      // use bcrypt.compare      
      const validPassword = await bcrypt.compare(loginUserDto.password,user.password);      
      if (validPassword) {
        let userCloned = JSON.parse(JSON.stringify(user));

        let validateUserResult = {
          username: userCloned.username,
          _id: userCloned._id,
          role: userCloned.role,
        };
        if(!validateUserResult){
          throw new BadRequestException("invalid password");
          
        }
        return validateUserResult;
      }
    } else {
      throw new UserNotFoundException("user not found");
    }
  }

  async login(loginUserDto: LoginUserDto) {
    let user = await this.validateUser(loginUserDto);
    if (!user) throw new UserNotFoundException();
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
      super('error.user_not_found', error);
  }
}