import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Status } from "../types/status.enum";
import { UserEntity } from "./user.entity";

@Entity({ name: 'friend_request' })
export class FriendEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, userEntity => userEntity.sentFriendRequest)
    sender: UserEntity;

    @ManyToOne(() => UserEntity, userEntity => userEntity.recivedFriendRequest)
    reciver: UserEntity

    @Column({ type: 'enum', enum: Status, default: Status.PENDING })
    status: Status
}
