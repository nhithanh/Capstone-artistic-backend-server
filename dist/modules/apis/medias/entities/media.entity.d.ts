import { User } from "src/modules/apis/users/entities/user.entity";
import { Album } from "../../albums/entities/album.entity";
export declare enum MEDIA_TYPE {
    PHOTO = "PHOTO",
    VIDEO = "VIDEO"
}
export declare class Media {
    id: string;
    userId: string;
    user: User;
    albumId: string;
    album: Album;
    storageLocation: string;
    type: MEDIA_TYPE;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: string;
}
