import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateModelDTO {
    @IsOptional()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    styleID: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    activeSnapshotID: string;
}
