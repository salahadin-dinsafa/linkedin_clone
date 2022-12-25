import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { ormConfig } from './common/db/ormconfig.datasource';

@Module({
  imports: [
    // todo: joi config
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig })
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule { }
