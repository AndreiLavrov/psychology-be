import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';

import { AppUpdate } from 'src/app.update';
import { ConfigService } from 'src/config/config.service';
import { sessionMiddleware } from 'src/middleware/session.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const conf = new ConfigService;

@Module({
  imports: [
    AppUpdate,
    TelegrafModule.forRoot({
      botName: 'psychology_the_best_bot',
      token: conf.get('TOKEN'),
      middlewares: [sessionMiddleware],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
