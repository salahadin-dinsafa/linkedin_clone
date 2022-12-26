import {
    Controller, Post, Param, Patch,
    ParseIntPipe, Get, UseGuards, Body
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

import { FriendRequestService } from '../services/friend-request.service';
import { GetUser } from "../decorators/get-user.decorator";
import { FriendEntity } from "../entities/friend.entity";
import { Roles } from "../types/roles.enum";
import { Role } from "../../auth/decorators/role.decorator";
import { Status } from "../types/status.enum";
import { StatusDto } from "../dto/status.dto";
import { UserEntity } from "../entities/user.entity";

@Controller('friend-request')
@UseGuards(AuthGuard('jwt'))
export class FriendRequestController {
    constructor(private readonly friendRequestService: FriendRequestService) { }

    @Role(Roles.ADMIN, Roles.USER, Roles.PRIMIUM)
    @Post('send/:userId')
    sendFriendRequest(
        @GetUser('id') currentUserId: number,
        @Param('userId', ParseIntPipe) userId: number): Promise<FriendEntity> {
        return this.friendRequestService.sendFriendRequest(currentUserId, userId);
    }

    @Role(Roles.ADMIN, Roles.USER, Roles.PRIMIUM)
    @Patch('send/:userId')
    requestResponse(
        @GetUser('id') currentUserId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Body() statusDto: StatusDto
    ): Promise<FriendEntity> {
        return this.friendRequestService.requestResponse(currentUserId, userId, statusDto);
    }

    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.PRIMIUM)
    @Get('requests')
    friendRequests(
        @GetUser('id') userId: number): Promise<FriendEntity[]> {
        return this.friendRequestService.friendRequests(userId);
    }

    @Role(Roles.ADMIN, Roles.USER, Roles.PRIMIUM)
    @Get('status/:userId')
    findStatus(
        @GetUser('id') currentUserId: number,
        @Param('userId', ParseIntPipe) userId: number
    ): Promise<{ status: Status }> {
        return this.friendRequestService.findRequestStatus(currentUserId, userId);
    }


}

