import { IsOptional, IsString } from "class-validator";

export class CreateUploadImageDto {
    @IsString()
    @IsOptional()
    id : string;

    @IsString()
    user_id: string;

    @IsString()
    image_url: string;
}
