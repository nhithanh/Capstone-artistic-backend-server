import { User } from "../../users/entities/user.entity";
export declare class Notification {
    id: string;
    userId: string;
    user: User;
    message: string;
    isReaded: boolean;
    createdAt: Date;
}
