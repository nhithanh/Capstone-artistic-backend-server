import { Style } from "../../styles/entities/style.entity";
export declare class TransferMediaMetadataDTO {
    socketId: string;
    photoLocation: string;
    style: Style;
}
export declare class TransferMediaCompleteMetadatadDTO {
    userId: string;
    transferPhotoLocation: string;
    styleId: string;
}
