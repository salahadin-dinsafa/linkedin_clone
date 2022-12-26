import {
    Controller, Get, Request,
    Post, UseGuards, UseInterceptors
} from '@nestjs/common';
import { Res, UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';

import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { GetUser } from './decorators/get-user.decorator';

import { saveImageToStorage } from './helpers/image.storage';
import { UsersService } from './users.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', saveImageToStorage))
    updateImage(
        @GetUser('id') userId: number,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.userService.updateImage(userId, file)
    }

    @Get('image')
    async findImage(
        @GetUser('id') userId: number,
        @Res() res: Response
    ): Promise<any> {
        const imagePath: string = await this.userService.findImage(userId);
        return res.sendFile(imagePath, { root: './images' })
    }
}
