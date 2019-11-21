import {
  Controller,
  Get,
  Request,
  Body,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './users/dto/login-user.dto';
import { Strategies } from './common/decorators/strategies.decorator';

@ApiUseTags('auth')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ title: 'login user' })
  @Post('auth/login')
  // @UseGuards(AuthGuard('local'))
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @ApiOperation({ title: 'register user' })
  @Post('auth/register')
  // @UseGuards(AuthGuard('local'))
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'user profile' })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
