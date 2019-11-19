import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
// import { User } from './../users/classes/user.class';

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
      if (user && user.password == loginUserDto.password) {
        let userCloned = JSON.parse(JSON.stringify(user));

        let validateUserResult = {
          username: userCloned.username,
          _id: userCloned._id,
          role: userCloned.role,
        };
        return validateUserResult;
      }
    } else {
      return null;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    let user = await this.validateUser(loginUserDto);
    if (!user) return;
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
