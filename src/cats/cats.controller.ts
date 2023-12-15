import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Param,
  Header,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(200)
  // @header 自定义响应头
  @Header('Cache-Control', 'none')
  @Header('my-token', 'xiangshangzhi')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  // @req 装饰器获取请求头
  findAll(@Req() request: Request): string {
    console.log('@@@request', request.body);
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
