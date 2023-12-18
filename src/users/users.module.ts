import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  // 供别的地方导入
  // 在如果我们在 UserHttpModule 中导入 UsersModule，我们就可以在UserHttpModule的provider序中使用 UsersService。
  exports: [TypeOrmModule],
})
export class UsersModule {}
