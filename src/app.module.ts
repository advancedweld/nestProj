import { Module, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENVIRONMENT === 'production'
          ? path.join(process.cwd(), './env/.prod.env')
          : path.join(process.cwd(), './env/.dev.env'),
    }),

    // 接入mysql数据库
    /**
     * https://juejin.cn/post/7032079740982788132?searchId=20240616102034C250FD4DB9401182B9F0#heading-12
     * https://juejin.cn/post/7316202589603807259?searchId=20240616102034C250FD4DB9401182B9F0
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql', // 数据库类型
          entities: [], // 数据表实体
          host: configService.get('DB_HOST'), // 主机，默认为localhost
          port: configService.get<number>('DB_PORT', 3306), // 端口号
          username: configService.get('DB_USER', 'root'), // 用户名
          password: configService.get('DB_PASSWORD'), // 密码
          database: configService.get('DB_DATABASE'), //数据库名
          timezone: '+08:00', //服务器上配置的时区
          synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
          //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
          autoLoadEntities: true,
        };
      },
    }),
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
