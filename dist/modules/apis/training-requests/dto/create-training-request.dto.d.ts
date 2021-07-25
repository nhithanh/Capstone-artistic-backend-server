export declare class CreateTrainingRequestDto {
    name: string;
    referenceStyleLocation: string;
    snapshotLocation?: string;
    lr?: number;
    contentWeight?: number;
    styleWeight?: number;
    saveStep?: number;
    relu12Weight?: number;
    relu22Weight?: number;
    relu33Weight?: number;
    relu43Weight?: number;
    numOfIterations?: number;
    description?: string;
}
