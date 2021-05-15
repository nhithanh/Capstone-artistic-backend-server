import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class CreateStyleDto {

    @IsString()
    @IsNotEmpty()
    styleId: string;

    @IsString()
    @IsNotEmpty()
    styleName: string;

    @IsBoolean()
    isGeneric: boolean;

    @IsString()
    description: string;
}
