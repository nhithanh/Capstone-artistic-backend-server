export declare enum STATUS {
    WAITING = "WAITING",
    IN_PROGRESS = "IN PROGRESS",
    STOPPED = "STOPPED",
    COMPLETED = "COMPLETED",
    DELETED = "DELETED"
}
export declare class TrainingRequest {
    id: string;
    name: string;
    referenceStyleLocation: string;
    snapshotLocation: string;
    description: string;
    lr: number;
    saveStep: number;
    contentWeight: number;
    styleWeight: number;
    relu12Weight: number;
    relu22Weight: number;
    relu33Weight: number;
    relu43Weight: number;
    status: STATUS;
    checkpoint: number;
    numOfIterations: number;
    createdAt: Date;
    deletedAt: Date;
}
