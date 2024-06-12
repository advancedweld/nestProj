/*
 * @Author: xiangshangzhi
 * @Date: 2024-06-12 11:36:25
 * @FilePath: \nestProj\src\auth\auth.guard.ts
 * @Description:https://juejin.cn/post/7281570246111576120?searchId=202406121135174412BF9344744A38FB72#heading-15
 https://juejin.cn/post/7295681529606832138
*/

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { API_PREFIX } from '../config';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // 如果是请求路由是白名单中的，则直接放行
    const _whiteList = this.whiteList.map((url) => `/${API_PREFIX}${url}`);

    if (_whiteList.includes(req.url)) return true;

    const request = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: auth.guard.ts:34 ~ AuthGuard ~ canActivate ~ request:',
      request.headers,
    );
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const jwtService = new JwtService();
      const decoded = jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private whiteList: string[] = ['/auth/register', '/auth/login', '/user/all'];
}
