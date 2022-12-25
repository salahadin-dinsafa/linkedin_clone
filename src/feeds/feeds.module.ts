import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { FeedEntity } from './entities/feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  providers: [FeedsService],
  controllers: [FeedsController]
})
export class FeedModule { }
