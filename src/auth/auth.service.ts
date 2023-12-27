import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const existUser = await this.userRepository.findOne({
      where: { userName },
    });
    if (!existUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const hashPwd = existUser.password;
    const isOK = bcryptjs.compareSync(password, hashPwd);
    if (!isOK) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    } else {
      // 登录
      return existUser;
    }
  }

  async authLogin(user: LoginUserDto) {
    // 准备jwt需要的负载
    const payload = { username: user.userName, sub: user.password };

    const authResult = await this.validateUser(user.userName, user.password);

    console.log('@@@@@@@authResult', authResult);
    //验证是否是有效用户
    if (authResult) {
      return {
        code: '200',
        access_token: this.jwtService.sign(payload), // 配合存储着用户信息的负载 payload 来生成一个包含签名的JWT令牌(access_token)。。
        msg: '登录成功',
      };
    } else {
      return {
        code: '1002',
        msg: '请检查用户名或密码是否正确',
      };
    }
  }

  // 认证token是否合法
  async verifyToken(token: string): Promise<any> {
    try {
      if (!token) return false;
      const tokenUserInfo = this.jwtService.verify(
        token.replace('Bearer ', ''),
      );

      return tokenUserInfo;
    } catch (e) {
      console.log('token不合法 或者 1h的token过期！！！');
      return false;
    }
  }
}
