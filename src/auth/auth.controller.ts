import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Get,
  Body,
  Req,
  Res,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from '../user/dto/login-user.dto';

// @ApiTags('验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.authService.authLogin(loginUserDto);
    return result;
  }
}
