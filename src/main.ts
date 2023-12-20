import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api-x');
  // 应用全局中间件
  app.use(logger);
  await app.listen(3000);
  console.log('Server running on port 3000');
}
bootstrap();
