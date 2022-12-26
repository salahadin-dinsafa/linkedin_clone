import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";

import { InjectRepository } from "@nestjs/typeorm";
import { join } from "path";
import { DataSource, Repository } from "typeorm";

import { UserEntity } from "../users/entities/user.entity";
import { FriendEntity } from "./entities/friend.entity";
import { isFileExtensionSafe, removeFile } from "./helpers/image.storage";
import { Status } from "./types/status.enum";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }
    // todo: when user deleted image mustbe deleted together

    async findById(id: number): Promise<UserEntity> {
        let user: UserEntity;
        try {
            user = await this.userRepository.findOne({ where: { id } });
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
        return user;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        let user: UserEntity;
        try {
            user = await this.userRepository.findOne({ where: { email } });
        } catch (error) {

            throw new UnprocessableEntityException(`${error.message}`)
        }
        return user;
    }

    async getUser(userId: number): Promise<UserEntity> {
        let user: UserEntity = await this.findById(userId);
        if (!user)
            throw new NotFoundException(`User with #id: ${userId} not found`);
        delete user.password;
        return user;
    }

    async updateImage(id: number, file: Express.Multer.File): Promise<UserEntity> {
        const fileName: string = file?.filename;
        // cheack file is image
        if (!fileName)
            throw new UnprocessableEntityException(`File mustbe a png, jpg/jpeg`);

        const imageFolderPath = join(process.cwd(), 'images');
        const fullImagePath = join(imageFolderPath + '/', fileName);

        // cheack if file content is image
        // if not remove from our system
        const isExtentionSafe: boolean = await isFileExtensionSafe(fullImagePath);

        if (!isExtentionSafe) {
            removeFile(fullImagePath);
            throw new UnprocessableEntityException(`File content does not match extension`);
        }
        const imagePath: string = fileName;
        let user: UserEntity = await this.getUser(id);
        // if user have already image remove that from our file
        if (user.imagePath) {
            const userImagePath: string =
                join(process.cwd(), 'images', '/', user.imagePath);
            removeFile(userImagePath);
        }
        try {
            user.imagePath = imagePath;
            return await user.save();

        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }

    async findImage(id: number): Promise<string> {
        let user: UserEntity = await this.getUser(id);
        if (!user.imagePath)
            throw new NotFoundException(`User not uploded image yet`)
        try {
            return user.imagePath;
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }
}
