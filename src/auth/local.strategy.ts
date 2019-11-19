import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  //email: string, password: string
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      email: email,
      password: password,
    });
    // console.log(user, 'user in local startegy');

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
