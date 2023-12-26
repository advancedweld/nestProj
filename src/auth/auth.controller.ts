import {
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Get,
  Body,
  Req,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from '../user/dto/login-user.dto';
// @ApiTags('验证')
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginUserDto, @Req() req: any) {
    return req.user;
  }
}
