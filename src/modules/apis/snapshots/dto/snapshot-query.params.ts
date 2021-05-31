import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class SnapshotQueryParams {
    @IsString()
    @IsOptional()
    modelId: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    page: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}
