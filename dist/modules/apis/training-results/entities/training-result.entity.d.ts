import { TrainingRequest } from "../../training-requests/entities/training-request.entity";
export declare class TrainingResult {
    id: string;
    step: number;
    trainingRequestId: string;
    trainingRequest: TrainingRequest;
    resultPhotoLocation: string;
    snapshotLocation: string;
    createdAt: Date;
}
