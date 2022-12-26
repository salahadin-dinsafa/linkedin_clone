import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Roles } from "../../users/types/roles.enum";
import { UserEntity } from "../../users/entities/user.entity";
import { FeedEntity } from "../entities/feed.entity";
import { FeedsService } from "../feeds.service";
import { UsersService } from "../../users/users.service";

@Injectable()
export class IsOwnerGuard implements CanActivate {

    constructor(
        private readonly userService: UsersService,
        private readonly feedService: FeedsService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user, params }: { user: UserEntity, params: { id: number } } = request;

        if (!user || !params) return false;
        if (user.role === Roles.ADMIN) return true;

        const userId: number = user.id;
        const postId: number = params.id;

        const currentUser: UserEntity =
            await this.userService.findById(userId);
        if (!currentUser) return false;

        const post: FeedEntity =
            await this.feedService.findById(postId);
        if (!post) return false;

        return post.author.id === currentUser.id;
    }

}