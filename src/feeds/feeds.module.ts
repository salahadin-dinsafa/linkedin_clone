import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { FeedEntity } from './entities/feed.entity';
import { AuthModule } from '../auth/auth.module';
import { IsOwnerGuard } from './owner.decorator';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedEntity]),
    AuthModule
  ],
  providers: [FeedsService, IsOwnerGuard],
  controllers: [FeedsController]
})
export class FeedModule { }
