/// <reference types="multer" />
import { MEDIA_TYPE } from '../medias/entities/media.entity';
export declare class VideosController {
    private readonly S3_ABSOLUTE_PATH;
    private readonly mediasService;
    private readonly s3Service;
    constructor();
    uploadVideo(file: Express.Multer.File, req: any, body: any): Promise<{
        thumbnailURL: string;
        originalVideoURL: string;
        m3u8_720p_playlsit: string;
        m3u8_480p_playlsit: string;
        m3u8_360p_playlsit: string;
        id: string;
        userId: string;
        user: import("../users/entities/user.entity").User;
        albumId: string;
        album: import("../albums/entities/album.entity").Album;
        storageLocation: string;
        type: MEDIA_TYPE;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    }>;
}
