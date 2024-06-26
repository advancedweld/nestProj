import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
// import { JwtService } from '@nestjs/jwt';

import { API_PREFIX } from './config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new HttpExceptionFilter());

  // 应用全局管道
  app.useGlobalPipes(new ValidationPipe());

  // 应用全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 应用全局中间件

  app.use(logger);
  app.setGlobalPrefix(API_PREFIX);

  // 处理 text/plain 请求体
  app.use(bodyParser.text({ type: 'text/plain' }));

  await app.listen(3000);
  console.log('Server running on port 3000');
}
bootstrap();
