import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

import { Photo } from './entities/photo.entity';
@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}
  async create(createPhotoDto: CreatePhotoDto) {
    // return 'This action adds a new photo';
    const photo = new Photo();
    photo.name = createPhotoDto.name;
    photo.description = createPhotoDto.description;
    photo.filename = createPhotoDto.filename;
    photo.totalPages = createPhotoDto.totalPages;
    photo.views = 100 * Math.random();
    photo.isPublished = true;
    await this.photoRepository.save(photo);
    return 'save success';
  }

  async findAll(pageNo: number, pageSize: number) {
    const photos = await this.photoRepository.find({
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
    });
    const count = await this.photoRepository.count();
    return { photos, totalCount: count };
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  async update(updatePhotoDto: UpdatePhotoDto) {
    const { id, name, description, filename, totalPages, isPublished } =
      updatePhotoDto;
    if (id === undefined) {
      throw new BadRequestException('ID is missing in the request');
    }
    // 查找要更新的照片对象
    const photoToUpdate = await this.photoRepository.findOneBy({
      id,
    });

    if (!photoToUpdate) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }

    // 应用更新
    photoToUpdate.name = name || photoToUpdate.name;
    photoToUpdate.description = description || photoToUpdate.description;
    photoToUpdate.filename = filename || photoToUpdate.filename;
    photoToUpdate.totalPages = totalPages || photoToUpdate.totalPages;
    photoToUpdate.isPublished =
      isPublished !== undefined ? isPublished : photoToUpdate.isPublished;

    // 保存更改到数据库
    await this.photoRepository.save(photoToUpdate);

    return `Photo with ID ${id} updated successfully`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
