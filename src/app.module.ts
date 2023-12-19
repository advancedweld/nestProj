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

// import { User } from './users/entities/user.entity';
// import { Photo } from './photos/entities/photo.entity';
@Module({
  imports: [
    // 接入mysql数据库
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      host: '8.140.248.120', //host
      port: 3306,
      username: 'root', //账号
      password: '*****', //密码
      database: 'monitoring', //库名
      // entities: [User, Photo],
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库，实体类如果定义好了设置为 false 不然会导致实体的强替换，清空修改过的属性列中的数据
      //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
      autoLoadEntities: true,
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
