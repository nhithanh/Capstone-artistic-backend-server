import { TrainingResultsService } from './training-results.service';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
export declare class TrainingResultsController {
    private readonly trainingResultsService;
    constructor(trainingResultsService: TrainingResultsService);
    create(createTrainingResultDto: CreateTrainingResultDto): Promise<import("./entities/training-result.entity").TrainingResult>;
    getTrainingResultByTrainingRequestId(id: string): Promise<{
        photoAccessURL: string;
        snapshotAccessURL: string;
        id: string;
        step: number;
        trainingRequestId: string;
        trainingRequest: import("../training-requests/entities/training-request.entity").TrainingRequest;
        resultPhotoLocation: string;
        snapshotLocation: string;
        createdAt: Date;
    }[]>;
    remove(id: string): string;
}
