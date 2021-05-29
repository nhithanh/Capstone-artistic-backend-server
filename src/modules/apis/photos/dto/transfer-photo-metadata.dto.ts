import { IsNotEmpty, IsString } from "class-validator";

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
    transferPhotoName: string;

    @IsNotEmpty()
    @IsString()
    styleId: string;
}