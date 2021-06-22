import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class MediasQueryParams {
    @IsString()
    @IsOptional()
    userId: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    page: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}
