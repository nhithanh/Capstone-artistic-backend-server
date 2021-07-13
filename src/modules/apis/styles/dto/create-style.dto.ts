import { IsNotEmpty, IsOptional, IsString } from "class-validator"
export class CreateStyleDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsNotEmpty()
    @IsString()
    styleName: string;

    @IsNotEmpty()
    @IsString()
    routingKey: string;

    @IsString()
    @IsOptional()
    iconURL: string;

    @IsString()
    @IsOptional()
    description: string;
}
