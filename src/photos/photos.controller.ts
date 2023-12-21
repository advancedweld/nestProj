import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Response } from 'express';
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('create')
  async create(@Body() createPhotoDto: CreatePhotoDto, @Res() res: Response) {
    await this.photosService.create(createPhotoDto);
    res.status(200).setHeader('my-token', 'xiangshangzhi').send({
      message: '操作成功！',
    });
  }
  @Post('update')
  async update(@Body() updatePhotoDto: UpdatePhotoDto, @Res() res: Response) {
    await this.photosService.update(updatePhotoDto);
    res.status(200).setHeader('my-token', 'xiangshangzhi').send({
      message: '更新成功！',
    });
  }

  @Get()
  async findAll(
    @Query('pageNo') pageNo: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    const result = await this.photosService.findAll(pageNo, pageSize);
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.photosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.photosService.remove(id);
  }
}
