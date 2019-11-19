import { Controller, Get, Request,Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginUserDto } from './users/dto/login-user.dto';


@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: 'login user' })
  @Post('auth/login')
  async login(
    @Request() req
    ) {
    return await this.authService.login(<LoginUserDto>req.body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
