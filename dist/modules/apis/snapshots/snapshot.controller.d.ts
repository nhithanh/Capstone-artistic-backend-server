/// <reference types="multer-s3" />
import { SnapshotsService } from './snapshot.service';
import { UpdateSnapshotDTO } from './dto/update-snapshot.dto';
import { SnapshotQueryParams } from './dto/snapshot-query.params';
export declare class SnapshotsController {
    private readonly snapshotsService;
    constructor(snapshotsService: SnapshotsService);
    create(snapshotFile: Express.MulterS3.File, body: any): Promise<import("./entities/snapshot.entity").Snapshot>;
    findAll(queryParams: SnapshotQueryParams): Promise<any>;
    findOne(id: string): Promise<import("./entities/snapshot.entity").Snapshot>;
    update(id: string, updateSnapshotDTO: UpdateSnapshotDTO): string;
    remove(id: string): Promise<{
        id: string;
    }>;
}
