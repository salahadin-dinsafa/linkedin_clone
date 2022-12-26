import {
    Controller, Get,
    ParseIntPipe,
    Post, UseGuards, UseInterceptors
} from '@nestjs/common';
import { Param, Res, UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { AuthGuard } from '@nestjs/passport';

import { GetUser } from './decorators/get-user.decorator';
import { saveImageToStorage } from './helpers/image.storage';
import { Role } from '../auth/decorators/role.decorator';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { Roles } from './types/roles.enum'

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.USER)
    @Get('image')
    async findImage(
        @GetUser('id') userId: number,
        @Res() res: Response
    ): Promise<any> {
        const imagePath: string = await this.userService.findImage(userId);
        return res.sendFile(imagePath, { root: './images' })
    }

    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.USER)
    @Get(':userId')
    findUserById(
        @Param('userId', ParseIntPipe) userId: number): Promise<UserEntity> {
        return this.userService.getUser(userId);
    }

    @Role(Roles.ADMIN, Roles.PRIMIUM, Roles.USER)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    updateImage(
        @GetUser('id') userId: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.userService.updateImage(userId, file)
    }


}
