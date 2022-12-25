import { IsOptional, IsString } from "class-validator";

export class FeedPostDto {
    @IsOptional()
    @IsString()
    body?: string;
}