/*
 * @Author: xiangshangzhi
 * @Date: 2024-06-12 11:36:25
 * @FilePath: \nestProj\src\auth\guards\auth.guard.ts
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
import { API_PREFIX } from '../../config';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // 如果是请求路由是白名单中的，则直接放行
    const _whiteList = this.whiteList.map((url) => `/${API_PREFIX}${url}`);

    if (_whiteList.includes(req.url)) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = this.jwtService.verify(token);
      // console.log(
      //   '🚀 ~ file: auth.guard.ts:43 ~ AuthGuard ~ canActivate ~ decoded:',
      //   decoded,
      // );

      request.user = decoded;
      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.guard.ts:47 ~ AuthGuard ~ canActivate ~ error:',
        error,
      );

      throw new UnauthorizedException('Invalid token');
    }
  }

  private whiteList: string[] = ['/auth/login', '/user/register'];
}
