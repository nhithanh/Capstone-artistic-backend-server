import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TransferMediaMetadataDTO {
    @IsNotEmpty()
    @IsString()
    photoLocation: string;
    
    @IsNotEmpty()
    @IsString()
    styleId: string;
}

export class TransferMediaCompleteMetadatadDTO {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    transferPhotoLocation: string;

    @IsOptional()
    @IsString()
    styleId: string;
}