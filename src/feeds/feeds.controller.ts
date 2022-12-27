import {
    Body, Controller, UseGuards,
    Delete, Get, Param, Query,
    ParseIntPipe, Patch, Post,
    Logger
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport/dist';
import {
    ApiCreatedResponse, ApiForbiddenResponse,
    ApiNotFoundResponse, ApiOkResponse, ApiOperation,
    ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse
} from '@nestjs/swagger';

import { Role } from '../auth/decorators/role.decorator';
import { Roles } from '../users/types/roles.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { GetUser } from '../users/decorators/get-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { FeedPostDto } from './dto/feed-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { FeedEntity } from './entities/feed.entity';
import { FeedsService } from './feeds.service';
import { IsOwnerGuard } from './decorators/owner.decorator';
import {
    CustomeHttpExceptionResponseObject
} from '../common/types/http-exception-response.interface';
import { FeedResponse } from './types/feed-post.type';

@ApiTags('Feed')
@ApiUnauthorizedResponse({ type: CustomeHttpExceptionResponseObject, description: 'User not authorized' })
@ApiUnprocessableEntityResponse({ type: CustomeHttpExceptionResponseObject })
@Controller('feed')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FeedsController {
    logger = new Logger('FeedService');
    constructor(private readonly feedService: FeedsService) { }

    @ApiCreatedResponse({ type: FeedResponse, description: 'Post created' })
    @ApiOperation({ summary: 'Create post', description: 'Adding new post [Auth Required] only for Admin and Primium user' })
    @Role(Roles.ADMIN, Roles.PRIMIUM)
    @Post()
    createPost(
        @GetUser() user: UserEntity,
        @Body() feedPostDto: FeedPostDto
    ): Promise<FeedEntity> {
        this.logger.verbose(`Creating post with #Dto: ${JSON.stringify(feedPostDto)}`)
        return this.feedService.createPost(user, feedPostDto);
    }

    @ApiOkResponse({ type: FeedResponse, description: 'Post found' })
    @ApiOperation({ summary: 'Get post', description: 'Getting a single post [Auth Required]' })
    @ApiNotFoundResponse({ type: CustomeHttpExceptionResponseObject, description: 'Post not found' })
    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.USER)
    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number): Promise<FeedEntity> {
        this.logger.verbose(`Getting post with #Id: ${id}`)
        return this.feedService.getPost(id);
    }

    @ApiOkResponse({ type: FeedResponse, isArray: true, description: 'All posts' })
    @ApiOperation({ summary: 'Get all post', description: 'Getting all posts [Auth Required]' })
    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.USER)
    @Get()
    getPosts(@Query() paginationDto: PaginationDto): Promise<FeedEntity[]> {
        this.logger.verbose(`Getting posts`)
        return this.feedService.getPosts(paginationDto);
    }

    @ApiForbiddenResponse({ type: CustomeHttpExceptionResponseObject, description: 'User forbidden' })
    @ApiOkResponse({ type: FeedResponse, description: 'Post updated' })
    @ApiNotFoundResponse({ type: CustomeHttpExceptionResponseObject, description: 'Post not found' })
    @ApiOperation({ summary: 'Update a post', description: 'Updating a single post [Auth Required]' })
    @Role(Roles.ADMIN, Roles.PRIMIUM)
    @UseGuards(IsOwnerGuard, IsOwnerGuard)
    @Patch(':id')
    updatePost(
        @Body() updatePostDto: FeedPostDto,
        @Param('id', ParseIntPipe) id: number): Promise<FeedEntity> {
        this.logger.verbose(`Updating post with #Dto: ${JSON.stringify(updatePostDto)}`)
        return this.feedService.updatePost(id, updatePostDto);
    }

    @ApiNotFoundResponse({ type: CustomeHttpExceptionResponseObject, description: 'Post not found' })
    @ApiForbiddenResponse({ type: CustomeHttpExceptionResponseObject, description: 'User forbidden' })
    @ApiOperation({ summary: 'Delete a post', description: 'Deleting a single post [Auth Required]' })
    @Role(Roles.ADMIN, Roles.PRIMIUM)
    @UseGuards(IsOwnerGuard, IsOwnerGuard)
    @Delete(':id')
    removePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.logger.verbose(`Deleting post with #Id: ${id}`)
        return this.feedService.removePost(id);
    }
}
