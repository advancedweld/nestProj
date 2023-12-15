import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Header,
  Res,
} from '@nestjs/common';
import { TranslateService } from './translate.service';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import { Response } from 'express';
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  // 状态码/响应头什么的 在service里设置
  async create(
    @Body() createTranslateDto: CreateTranslateDto,
    @Res() res: Response,
  ) {
    const translate_result = await this.translateService.create(
      createTranslateDto,
    );
    res.status(200).setHeader('my-token', 'xiangshangzhi').send({
      content: translate_result,
    });
  }

  @Get()
  findAll() {
    return this.translateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslateDto: UpdateTranslateDto,
  ) {
    return this.translateService.update(+id, updateTranslateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translateService.remove(+id);
  }
}
