import {
  Controller,
  Get,
  Request,
  Body,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from './users/dto/login-user.dto';

@ApiUseTags('login')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) // private readonly appService: AppService
  {}
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ title: 'login user' })
  @Post('auth/login')
  async login(
    // @Request() req
    @Body() loginUserDto: LoginUserDto
  ) {
    return await this.authService.login(loginUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'user profile' })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
