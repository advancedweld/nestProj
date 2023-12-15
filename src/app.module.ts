import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { TranslateController } from './mytranslate/translate.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TranslateModule } from './translate/translate.module';
import { LionsModule } from './lions/lions.module';

@Module({
  imports: [UsersModule, TranslateModule, LionsModule],
  // 控制器始终属于一个模块，这就是我们在 @Module() 装饰器中包含 controllers 数组的原因。 由于我们还没有定义除根 AppModule 之外的任何其他模块，我们将使用它来引入 CatsController
  controllers: [AppController, CatsController, TranslateController],
  providers: [AppService],
})
export class AppModule {}
