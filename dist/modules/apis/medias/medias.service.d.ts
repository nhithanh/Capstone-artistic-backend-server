import { CreateMediaDTO } from './dto/create-media.dto';
import { MediasQueryParams } from './dto/medias.query';
import { UpdateMediaDTO } from './dto/upload-media.dto';
import { Media } from './entities/media.entity';
import { S3Service } from 'src/s3/s3.service';
import { User } from '../users/entities/user.entity';
export declare class MediasService {
    s3Service: S3Service;
    private readonly userRepository;
    private readonly mediaRepository;
    private checkUserAccessRight;
    create(createPhotoDTO: CreateMediaDTO): Promise<Media>;
    findAll(queryParams: MediasQueryParams): Promise<any>;
    findOne(id: string): Promise<Media>;
    movePhotoToAnotherAlbum(id: string, user: User, updateUploadImageDto: UpdateMediaDTO): Promise<{
        albumId: string;
        id: string;
        userId: string;
        user: User;
        album: import("../albums/entities/album.entity").Album;
        storageLocation: string;
        type: import("./entities/media.entity").MEDIA_TYPE;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    } & Media>;
    remove(user: User, id: string): Promise<{
        id: string;
    }>;
    findByAlbumId(albumId: string, limit: number): Promise<{
        count: number;
        medias: any[];
    }>;
}
