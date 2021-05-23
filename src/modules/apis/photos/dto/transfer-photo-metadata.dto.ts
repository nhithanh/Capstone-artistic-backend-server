import { IsString } from "class-validator";

export class TransferPhotoMetadataDTO {
    @IsString()
    socketID: string;

    @IsString()
    photoLocation: string;
    
    @IsString()
    styleID: string;
}

export class TransferPhotoCompleteMetadatadDTO {
    @IsString()
    socketID: string;

    @IsString()
    transferPhotoName: string;
}