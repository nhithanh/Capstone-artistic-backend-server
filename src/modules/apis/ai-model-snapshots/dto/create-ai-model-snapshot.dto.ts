import { IsOptional, IsString } from "class-validator";

export class CreateAiModelSnapshotDto {
    @IsString()
    @IsOptional()
    aiModelId: string;
}
