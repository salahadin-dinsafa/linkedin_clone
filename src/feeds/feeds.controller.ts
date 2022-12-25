import {
    Body, Controller,
    Delete, Get, Param, Query,
    ParseIntPipe, Patch, Post
} from '@nestjs/common';


import { FeedPostDto } from './dto/feed-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { FeedEntity } from './entities/feed.entity';
import { FeedsService } from './feeds.service';

@Controller('feed')
export class FeedsController {
    constructor(private readonly feedService: FeedsService) { }

    @Post()
    createPost(@Body() feedPostDto: FeedPostDto): Promise<FeedEntity> {
        return this.feedService.createPost(feedPostDto);
    }

    @Get(':id')
    getPost(@Param('id', ParseIntPipe) id: number): Promise<FeedEntity> {
        return this.feedService.getPost(id);
    }

    @Get()
    getPosts(@Query() paginationDto: PaginationDto): Promise<FeedEntity[]> {
        return this.feedService.getPosts(paginationDto);
    }

    @Patch(':id')
    updatePost(
        @Body() updatePostDto: FeedPostDto,
        @Param('id', ParseIntPipe) id: number): Promise<FeedEntity> {
        return this.feedService.updatePost(id, updatePostDto);
    }

    @Delete(':id')
    removePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.feedService.removePost(id);
    }
}
