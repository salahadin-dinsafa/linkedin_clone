import { Injectable, UnprocessableEntityException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

import { FriendEntity } from "../entities/friend.entity";
import { UserEntity } from "../entities/user.entity";
import { StatusType } from "../types/status.type";
import { UsersService } from "../users.service";

@Injectable()
export class FriendRequestService {
    constructor(

        @InjectRepository(FriendEntity)
        private readonly friendRepository: Repository<FriendEntity>,
        private readonly datasource: DataSource,
        private readonly userService: UsersService
    ) { }

    private async findFriend(
        currentUserId: number, userId: number): Promise<FriendEntity> {
        try {
            const queryBuilder = this.datasource
                .getRepository(FriendEntity)
                .createQueryBuilder('friend')
                .leftJoinAndSelect('friend.sender', 'sender')
                .leftJoinAndSelect('friend.reciver', 'reciver')
            queryBuilder.andWhere(
                '(sender.id = :currentUserId AND reciver.id = :userId) OR (sender.id = :userId AND reciver.id = :currentUserId)',
                { currentUserId, userId }
            )
            let friends: FriendEntity[] = await queryBuilder.getMany();

            if (friends.length === 0)
                return null;
            return friends[0];

        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }

    private async sentRequest(
        currentUserId: number, userId: number): Promise<FriendEntity> {

        let friend: FriendEntity =
            await this.findFriend(currentUserId, userId);
        if (!friend)
            throw new UnprocessableEntityException(`Request not sent yet to user with #id: ${userId}`);
        return friend;
    }

    async sendFriendRequest(
        currentUserId: number, userId: number): Promise<FriendEntity> {
        if (currentUserId === userId)
            throw new UnprocessableEntityException(`You can't send request to yourself`);

        let friend: FriendEntity =
            await this.findFriend(currentUserId, userId);
        if (friend)
            throw new UnprocessableEntityException(`Request sent already`);

        let currentUser: UserEntity = await this.userService.getUser(currentUserId);
        let recivedUser: UserEntity = await this.userService.getUser(userId);

        try {
            let request: FriendEntity = this.friendRepository.create({
                sender: currentUser,
                reciver: recivedUser
            })

            return await request.save();
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }

    async findRequestStatus(
        currentUserId: number, userId: number): Promise<StatusType> {
        if (currentUserId === userId)
            throw new UnprocessableEntityException(`No status to yourself`);

        await this.userService.getUser(currentUserId);
        await this.userService.getUser(userId);

        let friend: FriendEntity = await this.sentRequest(currentUserId, userId);

        return { status: friend.status };
    }

    async requestResponse(
        currentUserId: number, userId: number, statusType: StatusType
    ): Promise<FriendEntity> {
        if (currentUserId === userId)
            throw new UnprocessableEntityException(`No Request to yourself`)
        // cheack exsitance of user
        await this.userService.getUser(currentUserId);
        await this.userService.getUser(userId);
        // cheack whether friend requested or not 
        let friend: FriendEntity =
            await this.sentRequest(currentUserId, userId);
        try {
            friend.status = statusType.status;
            return await friend.save();
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`);
        }
    }

    async friendRequests(userId: number): Promise<FriendEntity[]> {
        await this.userService.getUser(userId);
        try {
            return await this.friendRepository
                .find({ where: { reciver: { id: userId } } })
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }
}