export declare class ProducerService {
    private readonly VIDEO_EXCHANGE;
    private readonly PHOTO_EXCHANGE;
    private readonly amqpConnection;
    private UPDATE_MODEL_EXCHANGE;
    constructor();
    private emitMessage;
    emitTransferPhotoTask(data: any): Promise<void>;
    emitTransferVideoTask(data: any): Promise<void>;
    emitUpdateModel(routingKey: string, snapshotLocation: string): Promise<void>;
}
