import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { FeedEntity } from './entities/feed.entity';
import { IsOwnerGuard } from './decorators/owner.decorator';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedEntity]),
    UsersModule
  ],
  providers: [FeedsService, IsOwnerGuard],
  controllers: [FeedsController]
})
export class FeedModule { }
