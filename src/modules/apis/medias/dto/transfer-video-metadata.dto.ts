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
    saveAlbumId: string;
}