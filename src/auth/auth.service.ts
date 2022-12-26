import {
    Injectable, UnauthorizedException,
    UnprocessableEntityException
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { LoginType } from './types/login.type';
import { Payload } from './types/payload.type';
import { SignupType } from './types/signup.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async signup(signup: SignupType): Promise<UserEntity> {
        let user: UserEntity = await this.userService.findByEmail(signup.email);
        if (user)
            throw new UnprocessableEntityException(`User with #Email: ${signup.email} already exsit`);
        try {
            user = this.userRepository.create({
                ...signup,
                password: hashSync(signup.password, 15),
            })
            return await this.userRepository.save(user);
        } catch (error) {
            throw new UnprocessableEntityException(`${error.message}`)
        }
    }

    async login(login: LoginType): Promise<{ token: string }> {
        let user: UserEntity = await this.userService.findByEmail(login.email);
        if (!user)
            throw new UnauthorizedException('Invalid Creadential');
        const isValidPass: boolean = compareSync(login.password, user.password);
        if (!isValidPass)
            throw new UnauthorizedException('Invalid Creadential');
        const payload: Payload = { email: user.email };
        const token: string = await
            this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET });
        return { token };

    }
}
