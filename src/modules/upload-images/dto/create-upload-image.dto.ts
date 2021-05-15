import { IsNotEmpty, IsString } from "class-validator";

export class CreateUploadImageDto {
    @IsString()
    @IsNotEmpty()
    id : string;

    @IsString()
    user_id: string;

    @IsString()
    image_url: string;
}
