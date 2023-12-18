import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // 这么写会报错，MissingDriverError: Wrong driver: "undefined" given.

  // imports: [TypeOrmModule.forRoot({})],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {
  constructor(private dataSource: DataSource) {}
}
