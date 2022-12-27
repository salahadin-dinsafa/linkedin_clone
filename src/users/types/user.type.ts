import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsNumber } from "class-validator";

import { Roles } from "./roles.enum";

export class UserResponse {
    @ApiProperty({
        example: 'number'
    })
    @IsNotEmpty()
    @IsNumber()
    id: number;
    
    @ApiProperty({
        example: 'string'
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @ApiProperty({
        example: 'string'
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;
    
    @ApiProperty({
        example: 'string'
    })
    @IsNotEmpty()
    @IsString()
    email: string;
    
    @ApiProperty({
        example: 'string'
    })
    @IsNotEmpty()
    @IsString()
    imagePath: string;
    
    @ApiProperty({
        example: 'string'
    })
    @IsNotEmpty()
    @IsEnum(Roles)
    role: Roles
}