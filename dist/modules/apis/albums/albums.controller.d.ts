/// <reference types="multer-s3" />
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
export declare class AlbumsController {
    private readonly albumsService;
    constructor(albumsService: AlbumsService);
    create(req: any, createAlbumDto: CreateAlbumDto): Promise<{
        userId: string;
        id?: string;
        name: string;
        thumbnailURL?: string;
    } & import("./entities/album.entity").Album>;
    findAll(req: any): Promise<{
        total: number;
        data: any;
    }>;
    findOne(id: string): Promise<{
        count: number;
        medias: any[];
        id: string;
        userId: string;
        user: import("../users/entities/user.entity").User;
        name: string;
        isDefault: boolean;
        thumbnailURL: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    }>;
    update(id: string, updateAlbumDto: UpdateAlbumDto, req: any): Promise<{
        thumbnailURL: string;
        id: string;
        userId: string;
        name: string;
        count: number;
        medias: any[];
        user: import("../users/entities/user.entity").User;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    }>;
    updateBackgroundWithFileUpload(id: any, req: any, photo: Express.MulterS3.File, body: any): Promise<{
        thumbnailURL: string;
        id: string;
        userId: string;
        name: string;
        count: number;
        medias: any[];
        user: import("../users/entities/user.entity").User;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    }>;
    remove(id: string, req: any): Promise<{
        id: string;
    }>;
}
