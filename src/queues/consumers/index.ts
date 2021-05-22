import { Injectable } from "@nestjs/common";
import { SqsConsumerEventHandler, SqsMessageHandler } from "@ssut/nestjs-sqs";

@Injectable()
export class QueueConsumerService {
  @SqsMessageHandler(/** name: */ 'queueName', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message) {
  }
  
  @SqsConsumerEventHandler(/** name: */ 'queueName', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    // report errors here
  }
}