import { ApiProperty } from "@nestjs/swagger";

export enum Status {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DECLINED = 'DECLINED'
}

export class StatusResponse {
    @ApiProperty({
        example: 'string'
    })
    status: string;
}