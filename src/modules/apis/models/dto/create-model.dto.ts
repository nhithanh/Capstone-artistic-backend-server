import { IsOptional, IsString } from "class-validator";

export class CreateModelDTO {
    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    styleId: string;

    @IsString()
    activateModelId: string;

    
}
