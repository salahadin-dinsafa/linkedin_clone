import { FeedEntity } from "src/feeds/entities/feed.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Roles } from "../types/roles.enum";

@Entity({ name: 'users' })
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

    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    role: Roles

    @OneToMany(() => FeedEntity, feedEntity => feedEntity.author, { eager: false, cascade: ['remove'] })
    posts: FeedEntity[]
}