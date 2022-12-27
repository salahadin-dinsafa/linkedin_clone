import { ApiProperty } from "@nestjs/swagger";

export interface LoginType {
    email: string;
    password: string;
}

export class Token {
    @ApiProperty({
        example: 'string'
    })
    token: string;
}