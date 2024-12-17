import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateStasticDto } from './dto/create-stastic.dto';
import { UpdateStasticDto } from './dto/update-stastic.dto';
import { ApiLatency } from './entities/api-latency.entity';
import { Error } from './entities/error.entity';
import { FPS } from './entities/fps.entity';
import { NetworkDelay } from './entities/network-delay.entity';
import { Stastics } from './entities/stastic.entity';

@Injectable()
export class StasticsService {
  constructor(
    @InjectRepository(Stastics)
    private stasticsRepository: Repository<Stastics>,
    @InjectRepository(ApiLatency)
    private apiLatencyRepository: Repository<ApiLatency>,
    @InjectRepository(FPS)
    private fpsRepository: Repository<FPS>,
    @InjectRepository(NetworkDelay)
    private networkDelayRepository: Repository<NetworkDelay>,
    @InjectRepository(Error)
    private errorRepository: Repository<Error>,
    private dataSource: DataSource,
  ) {}

  // 处理上报的统计数据并保存
  async create(createStasticDto: CreateStasticDto) {
    // 开始一个数据库事务
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // 创建一个新的 Statistics 实体
      const stastics = this.stasticsRepository.create();

      // 保存 NetworkDelay 数据
      const networkDelays = createStasticDto.networkDelay.map((data) =>
        this.networkDelayRepository.create({
          performanceData: data.performanceData,
          performanceType: data.performanceType,
          performancePaint: data.performancePaint,
        }),
      );

      // 保存 ApiLatency 数据
      const apiLatencies = createStasticDto.apiLatency.map((data) =>
        this.apiLatencyRepository.create({
          url: data.url,
          latency: data.latency,
        }),
      );

      // 保存 FPS 数据
      const fps = createStasticDto.fps.map((data) => {
        const res = this.fpsRepository.create({
          url: data.url,
          timeStamp: new Date(data.timeStamp), // 确保转换为 Date 类型
          value: data.value,
        });
        // console.log('🚀 ~ fps ~ res:', res);
        return res;
      });
      // 保存 Error 数据
      const errors = createStasticDto.error.map((data) =>
        this.errorRepository.create({
          id: data.id,
          message: data.message,
          // errorType: data.errorType,
        }),
      );

      // 使用事务保存数据
      await queryRunner.manager.save(networkDelays);
      await queryRunner.manager.save(apiLatencies);
      await queryRunner.manager.save(fps);
      await queryRunner.manager.save(errors);

      // 将保存的数据关联到 Statistics
      stastics.networkDelay = networkDelays;
      stastics.apiLatency = apiLatencies;
      stastics.fps = fps;
      stastics.error = errors;

      // 保存 Statistics 实体
      await queryRunner.manager.save(stastics);

      // 提交事务
      await queryRunner.commitTransaction();

      return stastics; // 返回保存后的 Statistics 实体
    } catch (error) {
      console.error('Error saving data:', error);
      // 如果出现错误，则回滚事务
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 释放查询运行器
      await queryRunner.release();
    }
  }

  findAll() {
    return this.stasticsRepository.find();
  }

  findOne(id: number) {
    return this.stasticsRepository.findOne({ where: { id } });
  }

  update(id: number, updateStasticDto: UpdateStasticDto) {
    return this.stasticsRepository.update(id, updateStasticDto);
  }

  remove(id: number) {
    return this.stasticsRepository.delete(id);
  }
}
