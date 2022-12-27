import { ApiProperty } from "@nestjs/swagger";

import { ValidateNested } from "class-validator";

import { UserResponse } from "../../users/types/user.type";

export interface FeedPost {
    body?: string;
}

export class FeedResponse {
    @ApiProperty({ example: 'number' })
    id: number;

    @ApiProperty({ example: 'string' })
    body: string;

    @ApiProperty({ example: 'string' })
    createdAt: string;

    @ApiProperty({
        example: {
            id: 'number',
            firstName: 'string',
            lastName: 'string',
            email: 'string',
            imagePath: 'string',
            role: 'string'
        }
    })
    @ValidateNested()
    author: UserResponse;
}