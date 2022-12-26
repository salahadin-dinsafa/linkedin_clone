import { UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { UserEntity } from "../../users/entities/user.entity";
import { AuthService } from "../auth.service";
import { Payload } from "../types/payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(paylod: Payload): Promise<UserEntity> {
        let user: UserEntity = await this.authService.findByEmail(paylod.email);
        if (!user)
            throw new UnauthorizedException('Unauthorized');
        return user;
    }
} 