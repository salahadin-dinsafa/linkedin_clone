import {
    Body, Controller,
    Delete, Get, Param, Query,
    ParseIntPipe, Patch, Post
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist';


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

@Controller('feed')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FeedsController {
    constructor(private readonly feedService: FeedsService) { }

    @Role(Roles.ADMIN, Roles.PRIMIUM)
    @Post()
    createPost(
        @GetUser() user: UserEntity,
        @Body() feedPostDto: FeedPostDto
    ): Promise<FeedEntity> {
        return this.feedService.createPost(user, feedPostDto);
    }

    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number): Promise<FeedEntity> {
        return this.feedService.getPost(id);
    }

    @Get()
    getPosts(@Query() paginationDto: PaginationDto): Promise<FeedEntity[]> {
        return this.feedService.getPosts(paginationDto);
    }

    @UseGuards(IsOwnerGuard, IsOwnerGuard)
    @Patch(':id')
    updatePost(
        @Body() updatePostDto: FeedPostDto,
        @Param('id', ParseIntPipe) id: number): Promise<FeedEntity> {
        return this.feedService.updatePost(id, updatePostDto);
    }

    @UseGuards(IsOwnerGuard, IsOwnerGuard)
    @Delete(':id')
    removePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.feedService.removePost(id);
    }
}
