import { IsNotEmpty, IsString } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CreateTranferImageDto {
    @IsString()
    @IsNotEmpty()
    id : string;

    @IsString()
    user_id: string;

    @IsString()
    style_id: string

    @IsString()
    image_url: string;

    @IsString()
    upload_image_id: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}
