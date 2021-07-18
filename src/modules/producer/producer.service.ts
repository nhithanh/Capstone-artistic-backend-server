import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProducerService {

    private readonly VIDEO_EXCHANGE = "EXCHANGE_TRANSFER_VIDEO"
    private readonly PHOTO_EXCHANGE = "TRANSFER_PHOTO_EXCHANGE"
    private readonly UPDATE_WEIGHT_EXCHANGE = "UPDATE_WEIGHT_EXCHANGE"
    private readonly TRAINING_REQUEST_EXCHANGE = "TRAINING_EXCHANGE"
    private readonly STOP_TRAINING_EXCHANGE = "STOP_TRAINING_EXCHANGE"

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

    public emitTrainingRequest(data: any) {
      console.log("EMit training request baby")
      return this.emitMessage(this.TRAINING_REQUEST_EXCHANGE, "", data)
    }

    public emitStopTraining(trainingRequestId: string) {
      console.log("emit event stop")
      return this.emitMessage(this.STOP_TRAINING_EXCHANGE, "", {
        trainingRequestId,
        action: "STOP"
      })
    }
}
