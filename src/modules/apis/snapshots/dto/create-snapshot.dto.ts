import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSnapshotDTO {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsNotEmpty()
    modelID: string;

    @IsString()
    @IsNotEmpty()
    location: string;
}
