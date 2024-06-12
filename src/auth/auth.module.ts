import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
// import { LocalStratage } from './local.stratage';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
const jwtModule = JwtModule.register({
  secret: 'test123456',
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,

    /**
     * 这里用来配置全局守卫，在appmodule中引入authmodule后，
     * authguard中就能拿到jwtservice了
     */
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  /**
   * 导出JwtModule，这样其他模块就可以使用jwtModule了
   */
  exports: [JwtModule],
})
export class AuthModule {}
