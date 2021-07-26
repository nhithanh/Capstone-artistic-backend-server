/// <reference types="multer-s3" />
import { MEDIA_TYPE } from '../medias/entities/media.entity';
export declare class VideosController {
    private readonly S3_ABSOLUTE_PATH;
    private readonly mediasService;
    private readonly s3Service;
    private readonly producerService;
    private readonly notificationsService;
    private readonly socketsService;
    constructor();
    uploadVideo(media: Express.MulterS3.File, req: any, body: any): Promise<{
        thumbnailURL: string;
        originalVideoURL: string;
        playlist: string;
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
    handleTransferVideoComplete(media: Express.MulterS3.File, req: any, body: any): Promise<import("../medias/entities/media.entity").Media>;
}
