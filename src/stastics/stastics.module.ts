import { Module } from '@nestjs/common';
import { StasticsService } from './stastics.service';
import { StasticsController } from './stastics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Stastics } from './entities/stastic.entity';
import { NetworkDelay } from './entities/network-delay.entity';
import { ApiLatency } from './entities/api-latency.entity';
import { FPS } from './entities/fps.entity';
import { Error } from './entities/error.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Stastics, NetworkDelay, ApiLatency, FPS, Error]),
  ],
  controllers: [StasticsController],
  providers: [StasticsService],
})
export class StasticsModule {}
