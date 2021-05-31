import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProducerService {
    
    @Inject()
    private readonly amqpConnection: AmqpConnection

    private TRANSFER_PHOTO_EXCHANGE: string
    private UPDATE_MODEL_EXCHANGE: string
    
    constructor() {
      this.TRANSFER_PHOTO_EXCHANGE = process.env.EXCHANGE_TRANSFER_PHOTO
      this.UPDATE_MODEL_EXCHANGE = process.env.EXCHANGE_UPDATE_MODEL
    }

    private emitMessage(exchange: string, routingKey:string, data: any) {
      return this.amqpConnection.publish(exchange, routingKey, data)
    }

    public emitTransferPhotoTask(routingKey: string, data:any) {
      return this.emitMessage(this.TRANSFER_PHOTO_EXCHANGE, routingKey, data)
    }

    public emitUpdateModel(routingKey: string, snapshotLocation: string) {
      return this.emitMessage(this.UPDATE_MODEL_EXCHANGE, routingKey, {
        snapshotLocation
      })
    }

}
