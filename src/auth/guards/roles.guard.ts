import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/entities/user.entity';
// 角色装饰器定义
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取当前处理器上的角色元数据  也就是  @Roles('admin') 这种方式附加的，数组形式
    const roles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    console.log(
      '🚀 ~ file: roles.guard.ts:26 ~ RolesGuard ~ canActivate ~ roles:',
      roles,
    );

    if (!roles) {
      return true; // 如果路由没有角色限制，直接放行
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = this.jwtService.verify(token);
      console.log(
        '🚀 ~ file: roles.guard.ts:44 ~ RolesGuard ~ canActivate ~ decoded:',
        decoded,
      );
      request.user = decoded;

      if (!roles.includes(decoded.role)) {
        throw new ForbiddenException('Insufficient permissions');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('没有权限');
    }
  }
}
