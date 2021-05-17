import { IsBoolean, IsOptional, IsString } from "class-validator"

export class CreateStyleDto {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    style_id: string;

    @IsString()
    style_name: string;

    @IsBoolean()
    is_generic: boolean;

    @IsString()
    icon_url: string;

    @IsString()
    description: string;
}
