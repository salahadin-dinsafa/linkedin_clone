import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendRequestController } from './controllers/friend-request.controller';
import { FriendRequestService } from './services/friend-request.service';
import { FriendEntity } from './entities/friend.entity';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FriendEntity])
  ],
  controllers: [UsersController, FriendRequestController],
  providers: [UsersService, FriendRequestService],
  exports: [UsersService]
})
export class UsersModule { }
