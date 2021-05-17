import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateAiModelDto {
    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    style_id: string;

    @IsString()
    activate_model_id: string;

    
}
