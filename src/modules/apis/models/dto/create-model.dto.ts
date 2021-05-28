import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ModelType } from "../entities/model.entity";

export class CreateModelDTO {
    @IsOptional()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    styleId: string;

    @IsNotEmpty()
    @IsString()
    type: ModelType;

    @IsOptional()
    @IsString()
    activeSnapshotId: string;
}
