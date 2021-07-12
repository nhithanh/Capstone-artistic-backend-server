import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSnapshotDTO {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    styleId: string;

    @IsString()
    @IsNotEmpty()
    location: string;
}
