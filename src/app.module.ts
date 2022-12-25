import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from './common/db/ormconfig.datasource';

@Module({
  imports: [
    // todo: joi config
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig })
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
