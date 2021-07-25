/// <reference types="multer-s3" />
import { ShowcasesService } from './showcases.service';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { Style } from '../styles/entities/style.entity';
export declare class ShowcasesController {
    private readonly showcasesService;
    private readonly albumRepository;
    constructor(showcasesService: ShowcasesService);
    create(photo: Express.MulterS3.File, body: any): Promise<CreateShowcaseDto & import("./entities/showcase.entity").Showcase>;
    findAll(styleId: string): Promise<{
        accessURL: string;
        id: string;
        styleId: string;
        style: Style;
        photoName: string;
        priority: number;
        photoLocation: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: string;
    }[]>;
    getAvailableStyles(): Promise<any>;
    findOne(id: string): Promise<import("./entities/showcase.entity").Showcase>;
    update(id: string, updateShowcaseDto: UpdateShowcaseDto): Promise<string>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
