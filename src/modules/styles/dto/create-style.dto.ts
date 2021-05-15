import { IsBoolean, IsString } from "class-validator"

export class CreateStyleDto {
    @IsString()
    id: string;

    @IsString()
    style_id: string;

    @IsString()
    style_name: string;

    @IsBoolean()
    is_generic: boolean;

    @IsString()
    description: string;
}
