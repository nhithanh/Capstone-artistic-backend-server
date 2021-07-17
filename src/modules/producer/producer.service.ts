import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProducerService {

    private readonly VIDEO_EXCHANGE = "EXCHANGE_TRANSFER_VIDEO"
    private readonly PHOTO_EXCHANGE = "TRANSFER_PHOTO_EXCHANGE"
    private readonly UPDATE_WEIGHT_EXCHANGE = "UPDATE_WEIGHT_EXCHANGE"
    
    @Inject()
    private readonly amqpConnection: AmqpConnection

    
    constructor() {}

    private emitMessage(exchange: string, routingKey:string, data: any) {
      return this.amqpConnection.publish(exchange, routingKey, data)
    }

    public emitTransferPhotoTask(data: any) {
      return this.emitMessage(this.PHOTO_EXCHANGE, "", data)
    }

    public emitTransferVideoTask(data:any) {
      return this.emitMessage(this.VIDEO_EXCHANGE, "", data)
    }

    public emitUpdatePhotoWeight(data: any) {
      return this.emitMessage(this.UPDATE_WEIGHT_EXCHANGE, "", data)
    }

}
