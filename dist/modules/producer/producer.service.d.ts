export declare class ProducerService {
    private readonly VIDEO_EXCHANGE;
    private readonly amqpConnection;
    private TRANSFER_PHOTO_EXCHANGE;
    private UPDATE_MODEL_EXCHANGE;
    constructor();
    private emitMessage;
    emitTransferPhotoTask(routingKey: string, data: any): Promise<void>;
    emitTransferVideoTask(data: any): Promise<void>;
    emitUpdateModel(routingKey: string, snapshotLocation: string): Promise<void>;
}
