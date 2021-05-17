<<<<<<< HEAD
import { IsBoolean, IsOptional, IsString } from "class-validator";
=======
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
>>>>>>> 76964dcfe574393ed749f70f1b62a23c5e9884ce

export class CreateAiModelDto {
    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    styleId: string;

    @IsString()
    activateModelId: string;

    
}
