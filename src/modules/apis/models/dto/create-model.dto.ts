import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateModelDTO {
    @IsOptional()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    styleId: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    activeSnapshotId: string;
}
