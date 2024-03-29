import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { TranslateController } from './mytranslate/translate.controller';
import { AppService } from './app.service';
import { TranslateModule } from './translate/translate.module';
import { LionsModule } from './lions/lions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';
import { PhotosModule } from './photos/photos.module';

import { config } from './ormconfig';

import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    // 接入mysql数据库
    TypeOrmModule.forRoot(config),
    TranslateModule,
    LionsModule,
    PhotosModule,
    AuthorModule,
    UserModule,
    AuthModule,
    ChatModule,
  ],
  // 控制器始终属于一个模块，这就是我们在 @Module() 装饰器中包含 controllers 数组的原因。 由于我们还没有定义除根 AppModule 之外的任何其他模块，我们将使用它来引入 CatsController
  controllers: [AppController, CatsController, TranslateController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 针对所有路由都生效
    consumer.apply(LoggerMiddleware).forRoutes('*');

    // 应用功能中间件
    // consumer.apply(logger).forRoutes(CatsController);
  }
}
