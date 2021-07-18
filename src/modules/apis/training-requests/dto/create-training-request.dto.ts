import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTrainingRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    referenceStyleLocation: string

    @IsNumber()
    @IsOptional()
    lr?: number

    @IsNumber()
    @IsOptional()
    contentWeight?: number

    @IsNumber()
    @IsOptional()
    styleWeight?: number

    @IsNumber()
    @IsOptional()
    saveStep?: number

    @IsNumber()
    @IsOptional()
    relu12Weight?: number

    @IsNumber()
    @IsOptional()
    relu22Weight?: number

    @IsNumber()
    @IsOptional()
    relu33Weight?: number

    @IsNumber()
    @IsOptional()
    relu43Weight?: number

    @IsNumber()
    @IsOptional()
    epochs?: number

    @IsString()
    @IsOptional()
    description?: string
}
