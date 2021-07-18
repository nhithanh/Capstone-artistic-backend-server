import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrainingResultDto {
    @IsString()
    @IsNotEmpty()
    trainingRequestId: string;

    @IsString()
    @IsNotEmpty()
    resultPhotoLocation: string;

    @IsString()
    @IsNotEmpty()
    snapshotLocation: string;

    @IsString()
    @IsNotEmpty()
    step: string;
}
