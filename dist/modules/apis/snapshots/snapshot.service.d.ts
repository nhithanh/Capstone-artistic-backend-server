import { CreateSnapshotDTO } from './dto/create-snapshot.dto';
import { UpdateSnapshotDTO } from './dto/update-snapshot.dto';
import { Snapshot } from './entities/snapshot.entity';
export declare class SnapshotsService {
    private readonly snapshotRepository;
    create(createSnapshotDTO: CreateSnapshotDTO): Promise<Snapshot>;
    findAll(queryParams: any): Promise<any>;
    findOne(id: string): Promise<Snapshot>;
    update(id: number, updateAiModelSnapshotDto: UpdateSnapshotDTO): string;
    remove(id: string): Promise<{
        id: string;
    }>;
}
