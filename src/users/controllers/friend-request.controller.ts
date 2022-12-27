import {
    Controller, Post, Param, Patch,
    ParseIntPipe, Get, UseGuards, Body,
    Logger
} from "@nestjs/common";

import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

import { FriendRequestService } from '../services/friend-request.service';
import { GetUser } from "../decorators/get-user.decorator";
import { FriendEntity } from "../entities/friend.entity";
import { Roles } from "../types/roles.enum";
import { Role } from "../../auth/decorators/role.decorator";
import { Status, StatusResponse } from "../types/status.enum";
import { StatusDto } from "../dto/status.dto";
import {
    CustomeHttpExceptionResponseObject
} from "../../common/types/http-exception-response.interface";
import { AllFriendRequestsResponse, FriendRequestResponse } from "../types/friend-reqest.type";

@ApiTags('Friend Request')
@Controller('friend-request')
@ApiUnauthorizedResponse({ type: CustomeHttpExceptionResponseObject, description: 'Unathorized' })
@ApiUnprocessableEntityResponse({ type: CustomeHttpExceptionResponseObject })
@ApiNotFoundResponse({ type: CustomeHttpExceptionResponseObject, description: 'User not found' })
@UseGuards(AuthGuard('jwt'))
export class FriendRequestController {
    logger = new Logger('FriendRequestController');
    constructor(private readonly friendRequestService: FriendRequestService) { }

    @ApiCreatedResponse({ type: FriendRequestResponse, description: 'Friend Request Sent' })
    @ApiOperation({ summary: 'Send Friend Request', description: 'Sending friend request [Auth Required]' })
    @Role(Roles.ADMIN, Roles.USER, Roles.PRIMIUM)
    @Post('send/:userId')
    sendFriendRequest(
        @GetUser('id') currentUserId: number,
        @Param('userId', ParseIntPipe) userId: number): Promise<FriendEntity> {
        this.logger.verbose(`User with #id: ${currentUserId} sending request to user with #Id: ${userId}`)
        return this.friendRequestService.sendFriendRequest(currentUserId, userId);
    }

    @ApiOkResponse({ type: FriendRequestResponse, description: 'Friend request' })
    @ApiOperation({ summary: 'Respond To Request', description: 'Repsonding to friend request [Auth Required]' })
    @Role(Roles.ADMIN, Roles.USER, Roles.PRIMIUM)
    @Patch('send/:userId')
    requestResponse(
        @GetUser('id') currentUserId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Body() statusDto: StatusDto
    ): Promise<FriendEntity> {
        this.logger.verbose(`Response friend request with #Status: ${JSON.stringify(statusDto)}`)
        return this.friendRequestService.requestResponse(currentUserId, userId, statusDto);
    }

    @ApiOkResponse({ type: AllFriendRequestsResponse, isArray: true, description: 'Friend request' })
    @ApiOperation({ summary: 'Get Requests', description: 'Getting requests [Auth Required]' })
    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.PRIMIUM)
    @Get('requests')
    friendRequests(
        @GetUser('id') userId: number): Promise<FriendEntity[]> {
        this.logger.verbose(`Getting all requests`)
        return this.friendRequestService.friendRequests(userId);
    }

    @ApiOkResponse({ type: StatusResponse, description: 'Status Found' })
    @ApiOperation({ summary: 'Get status of request', description: 'Getting request Status of other user [Auth Required]' })
    @Role(Roles.ADMIN, Roles.USER, Roles.PRIMIUM)
    @Get('status/:userId')
    findStatus(
        @GetUser('id') currentUserId: number,
        @Param('userId', ParseIntPipe) userId: number
    ): Promise<{ status: Status }> {
        this.logger.verbose(`Getting request status of user with #Id: ${userId}`)
        return this.friendRequestService.findRequestStatus(currentUserId, userId);
    }


}

