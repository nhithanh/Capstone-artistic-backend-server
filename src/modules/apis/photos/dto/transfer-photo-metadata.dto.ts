import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Style } from "../../styles/entities/style.entity";

export class TransferPhotoMetadataDTO {
    @IsNotEmpty()
    @IsString()
    socketId: string;

    @IsNotEmpty()
    @IsString()
    photoLocation: string;
    
    @IsNotEmpty()
    style: Style;
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