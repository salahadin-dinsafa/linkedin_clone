import { Body, Controller, Post } from '@nestjs/common';

import {
    ApiCreatedResponse, ApiOperation,
    ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponse } from '../users/types/user.type';
import {
    CustomeHttpExceptionResponseObject
} from '../common/types/http-exception-response.interface';
import { Token } from './types/login.type';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiUnprocessableEntityResponse({ type: CustomeHttpExceptionResponseObject, description: 'Not successful' })
    @ApiCreatedResponse({ type: UserResponse, description: 'User Signed Up' })
    @ApiOperation({ summary: 'User Signup', description: 'User Registeration' })
    @Post('signup')
    signup(@Body() signupDto: SignupDto): Promise<UserEntity> {
        return this.authService.signup(signupDto);
    }

    @ApiUnauthorizedResponse({ type: CustomeHttpExceptionResponseObject, description: 'Unauthorized' })
    @ApiCreatedResponse({ type: Token, description: 'User logged In' })
    @ApiOperation({ summary: 'User Login', description: 'User login' })
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

}
