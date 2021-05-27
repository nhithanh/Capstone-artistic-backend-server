import { IsOptional, IsString } from "class-validator";

export class CreatePhoToDTO {
    @IsString()
    @IsOptional()
    id? : string;

    @IsString()
    userId: string;

    @IsString()
    photoLocation: string;

    @IsString()
    photoName: string;
}
