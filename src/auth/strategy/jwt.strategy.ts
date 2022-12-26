import { Injectable, UnauthorizedException } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { UsersService } from "../../users/users.service";
import { UserEntity } from "../../users/entities/user.entity";
import { Payload } from "../types/payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(paylod: Payload): Promise<UserEntity> {
        let user: UserEntity = await this.userService.findByEmail(paylod.email);
        if (!user)
            throw new UnauthorizedException('Unauthorized');
        return user;
    }
} 