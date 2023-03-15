import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { TelegrafModule } from 'nestjs-telegraf';
import { join } from 'path'
import * as LocalSession from 'telegraf-session-local';
import { AppService } from './app.service';
import { AppUpdate } from 'src/app.update';
import { ConfigService } from 'src/config/config.service';
import { TaskEntity } from './task.entity'
import { AppController } from './app.controller';

const sessions = new LocalSession({  database: 'session_db.json'});
const conf = new ConfigService;

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: conf.get('TOKEN'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'todo-app-tg-bot',
      username: 'postgres',
      password: '007',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
      synchronize: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([TaskEntity])
  ],
  controllers: [AppController],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
