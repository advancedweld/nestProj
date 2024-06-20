import { Injectable } from '@nestjs/common';
import { CreateStasticDto } from './dto/create-stastic.dto';
import { UpdateStasticDto } from './dto/update-stastic.dto';

@Injectable()
export class StasticsService {
  // {
  //   networkDelay: [
  //     {
  //       performanceData: [Object],
  //       performanceType: [Object],
  //       performancePaint: [Object]
  //     }
  //   ],
  //   apiLatency: [
  //     { url: '/api-x/user/all', latency: 24.799999997019768 },
  //     { url: '/api-x/user/all', latency: 10.799999997019768 },
  //     { url: '/api-x/user/all', latency: 9.300000004470348 },
  //     { url: '/api-x/user/all', latency: 11.100000001490116 },
  //   ],
  //   fps: [
  //     50, 58, 60, 61, 61, 61, 61, 61, 60, 61, 61, 61,
  //     61, 61, 61, 61, 60, 60, 61, 61, 61, 60, 61, 60,
  //     60, 61, 60, 61, 61, 61, 61, 61, 60, 57, 60, 61,
  //   ],
  //   error: []
  // }

  create(createStasticDto: CreateStasticDto) {
    // 将上报数据写入数据库
    return 'This action adds a new stastic';
  }

  findAll() {
    return `This action returns all stastics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stastic`;
  }

  update(id: number, updateStasticDto: UpdateStasticDto) {
    return `This action updates a #${id} stastic`;
  }

  remove(id: number) {
    return `This action removes a #${id} stastic`;
  }
}
