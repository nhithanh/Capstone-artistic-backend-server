import { IsString } from "class-validator";

export class CreateAiModelSnapshotDto {
    @IsString()
    aiModelId: string;
}
