import { FeedEntity } from "../../feeds/entities/feed.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Roles } from "../types/roles.enum";
import { FriendEntity } from "./friend.entity";

@Entity({ name: 'linkedin_users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: '' })
    imagePath: string;

    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    role: Roles

    @OneToMany(() => FeedEntity, feedEntity => feedEntity.author, { eager: false, cascade: ['remove'] })
    posts: FeedEntity[]

    @OneToMany(() => FriendEntity, friendEntity => friendEntity.sender)
    sentFriendRequest: FriendEntity[];

    @OneToMany(() => FriendEntity, friendEntity => friendEntity.reciver)
    recivedFriendRequest: FriendEntity[];
}