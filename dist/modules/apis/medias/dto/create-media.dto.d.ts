import { MEDIA_TYPE } from '../entities/media.entity';
export declare class CreateMediaDTO {
    id?: string;
    userId?: string;
    storageLocation?: string;
    type?: MEDIA_TYPE;
    albumId?: string;
}
