import { Module } from '@nestjs/common';
import { LionsService } from './lions.service';
import { LionsController } from './lions.controller';

@Module({
  controllers: [LionsController],
  providers: [LionsService],
  // 共享模块 可以在其他几个模块中共享LionsService的一个实例
  // 所有导入LionsModule的模块都可以使用LionsService
  exports: [LionsService],
})
export class LionsModule {}
