import { User } from "src/modules/apis/users/entities/user.entity";
export declare class Album {
    id: string;
    userId: string;
    user: User;
    name: string;
    isDefault: boolean;
    thumbnailURL: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: string;
}
