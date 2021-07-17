export declare class ProducerService {
    private readonly VIDEO_EXCHANGE;
    private readonly PHOTO_EXCHANGE;
    private readonly UPDATE_WEIGHT_EXCHANGE;
    private readonly amqpConnection;
    constructor();
    private emitMessage;
    emitTransferPhotoTask(data: any): Promise<void>;
    emitTransferVideoTask(data: any): Promise<void>;
    emitUpdatePhotoWeight(data: any): Promise<void>;
}
