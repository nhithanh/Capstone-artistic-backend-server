import { Style } from "../../styles/entities/style.entity";
export declare class TransferVideoMetadataDto {
    styleId: Style;
    mediaId: string;
    albumId: string;
}
export declare class TransferVideoCompleteMetadata {
    userId: string;
    saveLocation: string;
    saveAlbumId: string;
    styleId: string;
}
