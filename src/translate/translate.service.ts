import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';

@Injectable()
export class TranslateService {
  create(createTranslateDto: CreateTranslateDto, res: Response) {
    console.log('@@@requestlalal', createTranslateDto);
    // service里设置状态码。响应头
    res
      .status(200)
      .setHeader('my-token', 'xiangshangzhi')
      .send({
        content: 'i am translate result' + createTranslateDto.content,
      });
  }

  findAll() {
    return `This action returns all translate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translate`;
  }

  update(id: number, updateTranslateDto: UpdateTranslateDto) {
    return `This action updates a #${id} translate`;
  }

  remove(id: number) {
    return `This action removes a #${id} translate`;
  }
}
