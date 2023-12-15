import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';

@Controller('translate')
export class TranslateController {
  @Post()
  @HttpCode(200)
  translateContent(@Req() request: Request): string {
    console.log('@@@request', request.body);
    return 'This action returns all cats';
  }
}
