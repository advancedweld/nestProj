import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Param,
  Body,
  Header,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(200)
  // @header 自定义响应头
  @Header('Cache-Control', 'none')
  @Header('my-token', 'xiangshangzhi')
  create(@Body() body: CreateCatDto): string {
    console.log(body);
    return 'This action adds a new cat';
  }

  @Get()
  // @req 装饰器获取请求头
  async findAll(@Req() request: Request): Promise<string> {
    // 抛出异常
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // 等待3s后resolve
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
    return 'This action returns all cats';
  }

  // 带参数路由
  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  // findOne(@Param('id') id: string): string {
  //   console.log(id);
  //   return `This action returns a #${id} cat`;
  // }
}
