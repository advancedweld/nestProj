import { Controller, Get, Post, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(200)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    console.log('@@@request', request.body);
    return 'This action returns all cats';
  }
}
