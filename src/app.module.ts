import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { TranslateController } from './mytranslate/translate.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TranslateModule } from './translate/translate.module';
import { LionsModule } from './lions/lions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware, logger } from './middleware/logger.middleware';
import { PhotosModule } from './photos/photos.module';
@Module({
  imports: [
    // 接入mysql数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [],
      // 生产环境不应该使用 synchronize: true，否则可能丢失数据
      synchronize: true,
    }),
    UsersModule,
    TranslateModule,
    LionsModule,
    PhotosModule,
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
    consumer.apply(logger).forRoutes(CatsController);
  }
}
