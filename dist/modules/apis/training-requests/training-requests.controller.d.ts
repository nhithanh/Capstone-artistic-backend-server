/// <reference types="multer-s3" />
import { TrainingRequestsService } from './training-requests.service';
export declare class TrainingRequestsController {
    private readonly trainingRequestsService;
    private readonly producerService;
    private readonly s3Service;
    constructor(trainingRequestsService: TrainingRequestsService);
    create(data: any, photo: Express.MulterS3.File): Promise<{
        id: string;
        accessURL: string;
        contentWeight: number;
        lr: number;
        numOfIterations: number;
        relu12Weight: number;
        relu22Weight: number;
        relu33Weight: number;
        relu43Weight: number;
        saveStep: number;
        styleWeight: number;
    }>;
    findAll(): Promise<{
        accessURL: string;
        id: string;
        name: string;
        referenceStyleLocation: string;
        description: string;
        lr: number;
        saveStep: number;
        contentWeight: number;
        styleWeight: number;
        relu12Weight: number;
        relu22Weight: number;
        relu33Weight: number;
        relu43Weight: number;
        status: import("./entities/training-request.entity").STATUS;
        checkpoint: number;
        numOfIterations: number;
        createdAt: Date;
        deletedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        styleAccessURL: string;
        id: string;
        name: string;
        referenceStyleLocation: string;
        description: string;
        lr: number;
        saveStep: number;
        contentWeight: number;
        styleWeight: number;
        relu12Weight: number;
        relu22Weight: number;
        relu33Weight: number;
        relu43Weight: number;
        status: import("./entities/training-request.entity").STATUS;
        checkpoint: number;
        numOfIterations: number;
        createdAt: Date;
        deletedAt: Date;
    } | {
        id: string;
        status: string;
    }>;
    stop(id: string): Promise<{
        status: import("./entities/training-request.entity").STATUS.STOPPED;
        id: string;
        name: string;
        referenceStyleLocation: string;
        description: string;
        lr: number;
        saveStep: number;
        contentWeight: number;
        styleWeight: number;
        relu12Weight: number;
        relu22Weight: number;
        relu33Weight: number;
        relu43Weight: number;
        checkpoint: number;
        numOfIterations: number;
        createdAt: Date;
        deletedAt: Date;
    } & import("./entities/training-request.entity").TrainingRequest>;
    start(id: string): Promise<void>;
    completed(id: string): Promise<void>;
    remove(id: string): Promise<import("typeorm").UpdateResult>;
}
