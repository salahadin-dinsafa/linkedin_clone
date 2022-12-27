import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { Roles } from "./roles.enum"
import { UserResponse } from "./user.type";

export class FriendRequestResponse {
    @ApiProperty({
        example: 'number'
    })
    id: number;

    @ApiProperty({
        example: 'string'
    })
    status: Roles;

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
    sender: UserResponse;

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
    receiver: UserResponse;

}

export class AllFriendRequestsResponse {
    @ApiProperty({
        example: 'number'
    })
    id: number;

    @ApiProperty({
        example: 'string'
    })
    status: string;
}