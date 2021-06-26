import { IsNotEmpty, IsString } from "class-validator";
import { Style } from "../../styles/entities/style.entity";

export class TransferVideoMetadataDto {
    @IsString()
    @IsNotEmpty()
    storageLocation: string;

    @IsNotEmpty()
    @IsString()
    styleId: Style;

    @IsNotEmpty()
    @IsString()
    mediaId: string;

    @IsNotEmpty()
    @IsString()
    saveAlbumId: string;
}

export class TransferVideoCompleteMetadata {
    @IsString()
    @IsNotEmpty()
    storageLocation: string;

    @IsString()
    @IsNotEmpty()
    saveAlbumId: string;

    @IsString()
    @IsNotEmpty()
    userId: string
}