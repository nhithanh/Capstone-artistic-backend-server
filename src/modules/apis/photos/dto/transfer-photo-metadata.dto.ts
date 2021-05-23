import { IsString } from "class-validator";

export class TransferPhotoMetadata {
    @IsString()
    socketId: string;

    @IsString()
    photoLocation: string;
    
    @IsString()
    styleID: string;
}
