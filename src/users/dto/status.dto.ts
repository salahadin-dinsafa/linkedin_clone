import { IsEnum, IsNotEmpty } from "class-validator";

import { Status } from "../types/status.enum";

export class StatusDto {
    @IsNotEmpty()
    @IsEnum(Status,
        {
            message: `status must be one of ${Status.ACCEPTED},${Status.DECLINED},${Status.PENDING}`
        })
    status: Status
}