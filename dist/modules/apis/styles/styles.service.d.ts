import { Snapshot } from '../snapshots/entities/snapshot.entity';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { Style } from './entities/style.entity';
export declare class StylesService {
    private readonly s3Service;
    private readonly producerService;
    private readonly snapshotsRepository;
    private readonly stylesRepository;
    create(createStyleDto: CreateStyleDto): Promise<Style>;
    getAllStyles(): Promise<{
        iconURL: string;
        id: string;
        styleName: string;
        isActive: boolean;
        activeSnapshotId: string;
        activeSnapshot: Promise<Snapshot>;
        routingKey: string;
        isSupportVideo: boolean;
        demoVideoURL: string;
        priority: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    findAll(): Promise<{
        iconURL: string;
        id: string;
        styleName: string;
        isActive: boolean;
        activeSnapshotId: string;
        activeSnapshot: Promise<Snapshot>;
        routingKey: string;
        isSupportVideo: boolean;
        demoVideoURL: string;
        priority: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    getAllStylesWithSnapshotPath(): Promise<any>;
    findAllVideoSupportedStyles(): Promise<{
        iconURL: string;
        id: string;
        styleName: string;
        isActive: boolean;
        activeSnapshotId: string;
        activeSnapshot: Promise<Snapshot>;
        routingKey: string;
        isSupportVideo: boolean;
        demoVideoURL: string;
        priority: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }[]>;
    findOne(id: string): Promise<Style>;
    findStyleSnapshots(id: string): Promise<Snapshot[]>;
    update(id: string, updateStyleDto: UpdateStyleDto): Promise<{
        activeSnapshotId?: string;
        isActive?: boolean;
        id: string;
        styleName?: string;
        routingKey?: string;
        iconURL?: string;
        description?: string;
    } & Style>;
    remove(id: string): Promise<{
        id: string;
    }>;
    checkIsStyleSupport(styleId: string): Promise<Boolean>;
}
