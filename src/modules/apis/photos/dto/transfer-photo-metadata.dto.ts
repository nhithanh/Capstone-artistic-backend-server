import { IsString } from "class-validator";

export class TransferPhotoMetadataDTO {
    @IsString()
    socketId: string;

    @IsString()
    photoLocation: string;
    
    @IsString()
    styleId: string;
}

export class TransferPhotoCompleteMetadatadDTO {
    @IsString()
    socketId: string;

    @IsString()
    transferPhotoName: string;

    @IsString()
    styleId: string;
}