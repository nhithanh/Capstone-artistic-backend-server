import { IsString } from "class-validator";

export class CreateAiModelSnapshotDto {
    @IsString()
    model_id: string;
}
