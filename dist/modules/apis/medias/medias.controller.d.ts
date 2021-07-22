/// <reference types="multer-s3" />
import { HttpStatus } from '@nestjs/common';
import { TransferMediaMetadataDTO, TransferMediaCompleteMetadatadDTO } from './dto/transfer-media-metadata.dto';
import { S3Service } from 'src/s3/s3.service';
import { MediasQueryParams } from './dto/medias.query';
import { SaveMediaToAlbumDto } from './dto/save-media-to-album.dto';
import { MEDIA_TYPE } from './entities/media.entity';
import { TransferVideoCompleteMetadata, TransferVideoMetadataDto } from './dto/transfer-video-metadata.dto';
import { UpdateMediaDTO } from './dto/upload-media.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class MediasController {
    s3Service: S3Service;
    notficationsService: NotificationsService;
    private readonly socketService;
    private readonly producerService;
    private readonly mediasService;
    private readonly styleService;
    constructor();
    transferPhoto(transferPhotoMetadata: TransferMediaMetadataDTO, req: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    transferVideo(transferVideoMetadata: TransferVideoMetadataDto, req: any): Promise<{
        payload: {
            videoLocation: string;
            styleId: import("../styles/entities/style.entity").Style;
            userId: any;
            saveAlbumId: string;
        };
        status: HttpStatus;
        message: string;
    } | {
        message: string;
        payload?: undefined;
        status?: undefined;
    }>;
    transferVideoCompleted(metadata: TransferVideoCompleteMetadata): Promise<import("./entities/media.entity").Media>;
    transferPhotoCompleted(transferPhotoCompleteMetadataDTO: TransferMediaCompleteMetadatadDTO): {
        status: HttpStatus;
        message: string;
    };
    uploadFile(req: any, media: Express.MulterS3.File, body: any): Promise<{
        accessURL: string;
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
        action: string;
    }>;
    savePhotoToAlbum(req: any, saveToAlbumDto: SaveMediaToAlbumDto): Promise<{
        accessURL: string;
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
    findAll(queryParams: MediasQueryParams): Promise<any>;
    findOne(id: string): Promise<import("./entities/media.entity").Media>;
    remove(req: any, id: string): Promise<{
        id: string;
    }>;
    changeMediaAlbum(req: any, id: string, updateMediaDTO: UpdateMediaDTO): Promise<{
        albumId: string;
        id: string;
        userId: string;
        user: import("../users/entities/user.entity").User;
        album: import("../albums/entities/album.entity").Album;
        storageLocation: string;
        type: MEDIA_TYPE;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    } & import("./entities/media.entity").Media>;
}
