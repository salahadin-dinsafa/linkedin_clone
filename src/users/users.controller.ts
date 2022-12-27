import {
    Controller, Get, ParseIntPipe,
    Post, UseGuards, UseInterceptors,
    Logger
} from '@nestjs/common';
import { Param, Res, UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { AuthGuard } from '@nestjs/passport';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse
} from '@nestjs/swagger';


import { GetUser } from './decorators/get-user.decorator';
import { saveImageToStorage } from './helpers/image.storage';
import { Role } from '../auth/decorators/role.decorator';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { Roles } from './types/roles.enum'
import { UserResponse } from './types/user.type';
import {
    CustomeHttpExceptionResponseObject
} from '../common/types/http-exception-response.interface';

@ApiTags('User')
@Controller('user')
@ApiUnauthorizedResponse({ type: CustomeHttpExceptionResponseObject, description: 'User not authorized' })
@ApiUnprocessableEntityResponse({ type: CustomeHttpExceptionResponseObject, description: 'Unprocessable action' })
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    logger = new Logger('UsersController');
    constructor(private readonly userService: UsersService) { }

    @ApiNotFoundResponse({ type: CustomeHttpExceptionResponseObject, description: 'User or Image not found' })
    @ApiOkResponse({ type: 'Image', description: 'Image response' })
    @ApiOperation({ summary: 'Find uploded image', description: 'Finding users image [Auth Required]' })
    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.USER)
    @Get('image')
    async findImage(
        @GetUser('id') userId: number,
        @Res() res: Response
    ): Promise<any> {
        this.logger.verbose(`User retriveing Image`)
        const imagePath: string = await this.userService.findImage(userId);
        return res.sendFile(imagePath, { root: './images' })
    }

    @ApiOkResponse({ type: UserResponse, description: 'User Found' })
    @ApiNotFoundResponse({ type: CustomeHttpExceptionResponseObject, description: 'User not Found' })
    @ApiOperation({ summary: 'Get a user', description: 'Getting a single user [Auth Required]' })
    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.USER)
    @Get(':userId')
    findUserById(
        @Param('userId', ParseIntPipe) userId: number): Promise<UserEntity> {
        this.logger.verbose(`Finding uses with #ID: ${userId}`)
        return this.userService.getUser(userId);
    }

    @ApiCreatedResponse({ type: UserResponse, description: 'Image uploaded' })
    @ApiOperation({ summary: 'Update user image', description: 'Updating users image [Auth Required]' })
    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.USER)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    updateImage(
        @GetUser('id') userId: number,
        @UploadedFile() file: Express.Multer.File
    ): Promise<UserEntity> {
        this.logger.verbose(`Updating image with #File: ${JSON.stringify(file)}`)
        return this.userService.updateImage(userId, file)
    }


}
