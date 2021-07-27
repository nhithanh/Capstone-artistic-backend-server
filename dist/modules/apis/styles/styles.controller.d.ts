/// <reference types="multer-s3" />
import { Style } from './entities/style.entity';
export declare class StylesController {
    private readonly stylesService;
    private readonly snapshotsService;
    private readonly s3Service;
    create(styleIcon: Express.MulterS3.File, body: any): Promise<Style>;
    findAll(): Promise<{
        iconURL: string;
        id: string;
        styleName: string;
        isActive: boolean;
        activeSnapshotId: string;
        activeSnapshot: Promise<import("../snapshots/entities/snapshot.entity").Snapshot>;
        routingKey: string;
        isSupportVideo: boolean;
        demoVideoURL: string;
        priority: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    getAllStylesWithSnapshots(): Promise<any>;
    getAllStyles(): Promise<{
        iconURL: string;
        id: string;
        styleName: string;
        isActive: boolean;
        activeSnapshotId: string;
        activeSnapshot: Promise<import("../snapshots/entities/snapshot.entity").Snapshot>;
        routingKey: string;
        isSupportVideo: boolean;
        demoVideoURL: string;
        priority: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    getVideoSupportStyles(): Promise<{
        iconURL: string;
        demoVideoURL: string;
        id: string;
        styleName: string;
        isActive: boolean;
        activeSnapshotId: string;
        activeSnapshot: Promise<import("../snapshots/entities/snapshot.entity").Snapshot>;
        routingKey: string;
        isSupportVideo: boolean;
        priority: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    findOne(id: string): Promise<Style>;
    getStyleSnapshots(id: string): Promise<import("../snapshots/entities/snapshot.entity").Snapshot[]>;
    getStyleActiveModelDetail(id: string): Promise<{
        snapshotPath: string;
        id: string;
        styleName: string;
        iconURL: string;
        isActive: boolean;
        activeSnapshotId: string;
        activeSnapshot: Promise<import("../snapshots/entities/snapshot.entity").Snapshot>;
        routingKey: string;
        isSupportVideo: boolean;
        demoVideoURL: string;
        priority: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }>;
    updateWithFile(styleIcon: Express.MulterS3.File, body: any, id: string): Promise<Style>;
    update(styleIcon: Express.MulterS3.File, body: any, id: string): Promise<Style>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
