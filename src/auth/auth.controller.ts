import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Body() signupDto: SignupDto): Promise<UserEntity> {
        return this.authService.signup(signupDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

}
