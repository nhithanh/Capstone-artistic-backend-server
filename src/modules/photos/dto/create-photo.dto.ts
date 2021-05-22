import { IsOptional, IsString } from "class-validator";

export class CreatePhoToDTO {
    @IsString()
    @IsOptional()
    id? : string;

    @IsString()
    userID: string;

    @IsString()
    imageURL: string;

    @IsString()
    photoName: string;
}
