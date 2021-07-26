import { Injectable } from '@nestjs/common';
import {QUEUE_HOST} from '../../config'

var amqp = require('amqp-connection-manager');

const enum ACTIONS {
  TRANSFER_PHOTO = "TRANSFER_PHOTO",
  TRANSFER_VIDEO = "TRANSFER_VIDEO",
  UPDATE_WEIGHT = "UPDATE_WEIGHT",
  START_TRAINING = "START_TRAINING",
  STOP_TRAINING = "STOP_TRAINING",
  CONVERT_VIDEO = "CONVERT_VIDEO"
}

@Injectable()
export class ProducerService {

    private readonly VIDEO_EXCHANGE = "EXCHANGE_TRANSFER_VIDEO"
    private readonly PHOTO_EXCHANGE = "TRANSFER_PHOTO_EXCHANGE"
    private readonly UPDATE_WEIGHT_EXCHANGE = "UPDATE_WEIGHT_EXCHANGE"
    private readonly TRAINING_REQUEST_EXCHANGE = "TRAINING_EXCHANGE"
    private readonly STOP_TRAINING_EXCHANGE = "STOP_TRAINING_EXCHANGE"
    private readonly CONVERT_VIDEO_EXCHANGE = "CONVERT_VIDEO_EXCHANGE"

    private readonly connection = amqp.connect([QUEUE_HOST]);
    private readonly channelWrapper = this.connection.createChannel();
    private awaitRequests = []
    
    constructor() {
      setInterval(() => {
        if(this.awaitRequests.length > 0) {
          const waitingRequests = this.awaitRequests
          this.awaitRequests = []
          for(let awaitRequest of waitingRequests) {
            const {data, action} = awaitRequest
            this.deliveryMessage(action, data)
          }
        }
      }, 2000)
    }

    private deliveryMessage(action, data) {
      switch(action) {
        case ACTIONS.TRANSFER_PHOTO:
          this.emitTransferPhotoTask(data)
          break;
        case ACTIONS.TRANSFER_VIDEO:
          this.emitTransferVideoTask(data)
          break;
        case ACTIONS.UPDATE_WEIGHT:
          this.emitUpdatePhotoWeight(data)
          break;
        case ACTIONS.START_TRAINING:
          this.emitTrainingRequest(data)
          break;
        case ACTIONS.STOP_TRAINING:
          this.emitStopTraining(data)
          break
        case ACTIONS.CONVERT_VIDEO:
          this.emitConvertVideoTask(data)
      }
    }

    private emitMessage(exchange: string, routingKey: string, data: any, action: string) {
      const buffer = Buffer.from(JSON.stringify(data));
      return this.channelWrapper.publish(exchange, routingKey, buffer).catch(err => {
        console.log("ERR:", err)
        this.awaitRequests.push({
          data,
          action
        })
      })
    }

    public emitConvertVideoTask(data: any) {
      console.log("Emit convert video")
      return this.emitMessage(this.CONVERT_VIDEO_EXCHANGE, "", data, ACTIONS.CONVERT_VIDEO)
    }

    public emitTransferPhotoTask(data: any) {
      return this.emitMessage(this.PHOTO_EXCHANGE, "", data, ACTIONS.TRANSFER_PHOTO)
    }

    public emitTransferVideoTask(data:any) {
      return this.emitMessage(this.VIDEO_EXCHANGE, "", data, ACTIONS.TRANSFER_VIDEO)
    }

    public emitUpdatePhotoWeight(data: any) {
      return this.emitMessage(this.UPDATE_WEIGHT_EXCHANGE, "", data, ACTIONS.UPDATE_WEIGHT)
    }

    public emitTrainingRequest(data: any) {
      return this.emitMessage(this.TRAINING_REQUEST_EXCHANGE, "", data, ACTIONS.START_TRAINING)
    }

    public emitStopTraining(trainingRequestId: string) {
      const data = {
        trainingRequestId,
        action: "STOP"
      }
      return this.emitMessage(this.STOP_TRAINING_EXCHANGE, "", data, ACTIONS.STOP_TRAINING)
    }
}
