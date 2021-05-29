import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TransferPhotoMetadataDTO {
    @IsNotEmpty()
    @IsString()
    socketId: string;

    @IsNotEmpty()
    @IsString()
    photoLocation: string;
    
    @IsNotEmpty()
    @IsString()
    routingKey: string;
}

export class TransferPhotoCompleteMetadatadDTO {
    @IsNotEmpty()
    @IsString()
    socketId: string;

    @IsNotEmpty()
    @IsString()
    transferPhotoLocation: string;

    @IsOptional()
    @IsString()
    styleId: string;
}