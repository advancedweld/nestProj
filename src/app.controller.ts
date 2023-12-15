import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('xiang')
  getXiang(): any {
    return {
      name: 'xiang',
      age: 18,
      sex: 'male',
      hobbies: ['swimming', 'reading', 'coding'],
    };
  }
}
