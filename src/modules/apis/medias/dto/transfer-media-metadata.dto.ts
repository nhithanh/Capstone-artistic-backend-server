import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Style } from "../../styles/entities/style.entity";

export class TransferMediaMetadataDTO {
    @IsNotEmpty()
    @IsString()
    socketId: string;

    @IsNotEmpty()
    @IsString()
    photoLocation: string;
    
    @IsNotEmpty()
    style: Style;
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