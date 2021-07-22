export declare class ProducerService {
    private readonly VIDEO_EXCHANGE;
    private readonly PHOTO_EXCHANGE;
    private readonly UPDATE_WEIGHT_EXCHANGE;
    private readonly TRAINING_REQUEST_EXCHANGE;
    private readonly STOP_TRAINING_EXCHANGE;
    private readonly connection;
    private readonly channelWrapper;
    private awaitRequests;
    constructor();
    private deliveryMessage;
    private emitMessage;
    emitTransferPhotoTask(data: any): any;
    emitTransferVideoTask(data: any): any;
    emitUpdatePhotoWeight(data: any): any;
    emitTrainingRequest(data: any): any;
    emitStopTraining(trainingRequestId: string): any;
}
