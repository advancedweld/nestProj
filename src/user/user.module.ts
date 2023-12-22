/*
 * @Author: xiangshangzhi
 * @Date: 2023-12-22 12:53:43
 * @FilePath: \nest-proj\src\user\user.module.ts
 * @Description:参考 https://note.buging.cn/nest/2.html
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
