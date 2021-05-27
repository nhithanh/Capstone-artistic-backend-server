import { IsOptional, IsString } from "class-validator";

export class CreateSnapshotDTO {
    @IsString()
    @IsOptional()
    modelID: string;
}
