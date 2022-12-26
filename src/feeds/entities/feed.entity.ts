import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

import { UserEntity } from "../../users/entities/user.entity";

@Entity({ name: 'feeds' })
export class FeedEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, userEntity => userEntity.posts, { eager: true, onDelete: 'CASCADE' })
    author: UserEntity;
}