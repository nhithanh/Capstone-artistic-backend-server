import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { Showcase } from './entities/showcase.entity';
export declare class ShowcasesService {
    private readonly s3Service;
    private readonly showCaseRepository;
    create(createShowcaseDto: CreateShowcaseDto): Promise<CreateShowcaseDto & Showcase>;
    findAll(styleId: string): Promise<{
        accessURL: string;
        id: string;
        styleId: string;
        style: import("../styles/entities/style.entity").Style;
        photoName: string;
        priority: number;
        photoLocation: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    }[]>;
    findOne(id: string): Promise<Showcase>;
    update(id: string, updateShowcaseDto: UpdateShowcaseDto): string;
    remove(id: string): Promise<{
        id: string;
    }>;
    getAvailableStyles(): Promise<any>;
}
