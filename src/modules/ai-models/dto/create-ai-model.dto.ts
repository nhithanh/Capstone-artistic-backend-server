import { IsBoolean, IsString } from "class-validator";

export class CreateAiModelDto {
    @IsString()
    id: string;

    @IsString()
    style_id: string;

    @IsString()
    activate_model_id: string;

    
}
