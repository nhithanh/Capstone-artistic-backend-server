import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class ModelQueryParams {
    @IsString()
    @IsOptional()
    styleId: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    page: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    offset: number;
}
