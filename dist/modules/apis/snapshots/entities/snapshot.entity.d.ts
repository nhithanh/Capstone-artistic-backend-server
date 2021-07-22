import { Style } from "../../styles/entities/style.entity";
export declare class Snapshot {
    id: string;
    styleId: string;
    name: string;
    style: Style;
    location: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
