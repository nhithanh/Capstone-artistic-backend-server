import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateAiModelDto {
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    styleId: string;

    @IsString()
    activateModelId: string;

    
}
