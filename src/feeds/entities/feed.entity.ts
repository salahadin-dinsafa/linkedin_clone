import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: 'feeds' })
export class FeedEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    body: string;

    @CreateDateColumn()
    createdAt: Date;
}