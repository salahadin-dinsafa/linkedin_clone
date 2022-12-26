import { Injectable } from '@nestjs/common';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common/exceptions';

import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { FeedEntity } from './entities/feed.entity';
import { FeedPost } from './types/feed-post.type';
import { PaginationType } from './types/pagination.type';

@Injectable()
export class FeedsService {
    constructor(
        @InjectRepository(FeedEntity)
        private readonly feedRepository: Repository<FeedEntity>,
    ) { }

    async findById(id: number): Promise<FeedEntity> {
        let post: FeedEntity;
        try {
            post = await this.feedRepository.findOne({ where: { id } });
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
        return post;
    }

    async createPost(user: UserEntity, feedPost: FeedPost): Promise<FeedEntity> {
        try {
            return await this.feedRepository
                .save({ ...feedPost, author: user })
                .then(post => {
                    delete post.author.password;
                    return post;
                });
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }

    async getPost(id: number): Promise<FeedEntity> {
        let post: FeedEntity = await this.findById(id);
        if (!post) throw new NotFoundException(`Post with #id: ${id} not found`);
        delete post.author.password;
        return post;
    }

    async getPosts(pagination: PaginationType): Promise<FeedEntity[]> {
        let { limit, offset } = pagination;

        limit ? limit : limit = 10;
        offset ? offset : offset = 0;
        try {
            return (await this.feedRepository
                .find({ take: limit, skip: offset }))
                .map(post => {
                    delete post.author.password;
                    return post;
                });
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)

        }
    }

    async updatePost(id: number, updatePost: FeedPost): Promise<FeedEntity> {
        let post: FeedEntity = await this.getPost(id);
        try {
            Object.assign(post, updatePost);
            return await this.feedRepository
                .save(post).then(post => {
                    delete post.author.password;
                    return post;
                });
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }

    async removePost(id: number): Promise<void> {
        let post: FeedEntity = await this.getPost(id);
        try {
            await this.feedRepository.remove(post);
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }

}
