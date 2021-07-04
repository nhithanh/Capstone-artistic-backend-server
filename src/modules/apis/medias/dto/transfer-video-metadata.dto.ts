import { IsNotEmpty, IsString } from "class-validator";
import { Style } from "../../styles/entities/style.entity";

export class TransferVideoMetadataDto {
    @IsNotEmpty()
    @IsString()
    styleId: Style;

    @IsNotEmpty()
    @IsString()
    mediaId: string;

    @IsNotEmpty()
    @IsString()
    albumId: string;
}

export class TransferVideoCompleteMetadata {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    saveLocation: string;

    @IsNotEmpty()
    @IsString()
    saveAlbumId: string;

    @IsNotEmpty()
    @IsString()
    styleId: string;
}