import { IsBoolean, IsOptional, IsString } from "class-validator"

export class CreateStyleDto {
    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    style_id: string;

    @IsString()
    styleName: string;

    @IsBoolean()
    isGeneric: boolean;

    @IsString()
    icon_url: string;

    @IsString()
    description: string;
}
