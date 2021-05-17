import { IsOptional, IsString } from "class-validator";

export class CreateAiModelDto {
    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    styleId: string;

    @IsString()
    activateModelId: string;

    
}
