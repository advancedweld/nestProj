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
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const result = await this.authService.authLogin(loginUserDto);
    if ('accessToken' in result) {
      res.cookie('customer_token', 'xiangshangzhi6666', {
        httpOnly: true,
        // secure: true,
        sameSite: 'none',

        maxAge: 3600000,
      });
      return res.json({
        userName: result.userName,
        role: result.role,
      });
    } else {
      return res.status(401).json(result);
    }
  }
}
