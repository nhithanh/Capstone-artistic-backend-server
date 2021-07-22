import { User } from '../users/entities/user.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
export declare class AlbumsService {
    private readonly s3Service;
    private readonly albumRepository;
    private readonly mediasService;
    private checkUserAccessRight;
    create(createAlbumDto: CreateAlbumDto): Promise<{
        isDefault: true;
        id?: string;
        userId: string;
        name: string;
        thumbnailURL?: string;
    } & Album>;
    createNewAlbum(createAlbumDto: CreateAlbumDto, user: User): Promise<{
        userId: string;
        id?: string;
        name: string;
        thumbnailURL?: string;
    } & Album>;
    findAll(user: User): Promise<{
        total: number;
        data: any;
    }>;
    findOne(id: string): Promise<{
        count: number;
        medias: any[];
        id: string;
        userId: string;
        user: User;
        name: string;
        isDefault: boolean;
        thumbnailURL: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    }>;
    update(id: string, user: User, updateAlbumDto: UpdateAlbumDto): Promise<{
        thumbnailURL: string;
        id: string;
        userId: string;
        name: string;
        count: number;
        medias: any[];
        user: User;
        isDefault: boolean;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    }>;
    remove(id: string, user: User): Promise<{
        id: string;
    }>;
}
