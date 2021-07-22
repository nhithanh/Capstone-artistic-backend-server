import { Snapshot } from "../../snapshots/entities/snapshot.entity";
export declare class Style {
    id: string;
    styleName: string;
    iconURL: string;
    isActive: boolean;
    activeSnapshotId: string;
    activeSnapshot: Promise<Snapshot>;
    routingKey: string;
    isSupportVideo: boolean;
    demoVideoURL: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
