import { TrainingRequest } from '../training-requests/entities/training-request.entity';
import { CreateTrainingResultDto } from './dto/create-training-result.dto';
import { UpdateTrainingResultDto } from './dto/update-training-result.dto';
import { TrainingResult } from './entities/training-result.entity';
export declare class TrainingResultsService {
    private readonly trainingResultRepository;
    private readonly trainingRequestReposiory;
    private readonly s3Service;
    private readonly socketService;
    create(createTrainingResultDto: CreateTrainingResultDto): Promise<TrainingResult>;
    findAll(id: string): Promise<{
        photoAccessURL: string;
        snapshotAccessURL: string;
        id: string;
        step: number;
        trainingRequestId: string;
        trainingRequest: TrainingRequest;
        resultPhotoLocation: string;
        snapshotLocation: string;
        createdAt: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateTrainingResultDto: UpdateTrainingResultDto): string;
    remove(id: number): string;
    getTrainingResultByTrainingRequestId(id: string): Promise<{
        photoAccessURL: string;
        snapshotAccessURL: string;
        id: string;
        step: number;
        trainingRequestId: string;
        trainingRequest: TrainingRequest;
        resultPhotoLocation: string;
        snapshotLocation: string;
        createdAt: Date;
    }[]>;
}
