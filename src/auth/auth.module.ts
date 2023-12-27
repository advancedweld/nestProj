import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
import { LocalStorage } from './local.stratage';

import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  secret: 'test123456',
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage],
  exports: [JwtModule],
})
export class AuthModule {}
