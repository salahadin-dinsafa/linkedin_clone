import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { Roles } from "src/users/types/roles.enum";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'Password must contain at least 1 character, 1 number , 1 alphabet  ',
    })
    password: string;

    @IsOptional()
    @IsEnum(Roles, { message: 'role must be a one of ADMIN, USER or PRIMIUM'})
    role: Roles
}