import { Module } from '@nestjs/common';
import { StasticsService } from './stastics.service';
import { StasticsController } from './stastics.controller';

@Module({
  controllers: [StasticsController],
  providers: [StasticsService],
})
export class StasticsModule {}
