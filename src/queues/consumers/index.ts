import { Injectable } from "@nestjs/common";
import { SqsConsumerEventHandler, SqsMessageHandler } from "@ssut/nestjs-sqs";
import { SqsConsumerOptions } from "@ssut/nestjs-sqs/dist/sqs.types";
import * as AWS from 'aws-sdk'

export const consumers: SqsConsumerOptions[] = [{
    name: 'test',
    queueUrl: 'https://sqs.ap-southeast-1.amazonaws.com/553984049832/artisan-queue-test',
    sqs: new AWS.SQS({
        accessKeyId: 'AKIAYB7AFYKUMNDEZT4L',
        secretAccessKey: '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',
        region: 'ap-southest-1'
    })
}]

@Injectable()
export class AppMessageHandler {
  @SqsMessageHandler('test', false)
  public async handleMessage(message: AWS.SQS.Message) {
      console.log(message)
  }
  
  @SqsConsumerEventHandler(/** name: */ 'queueName', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: AWS.SQS.Message) {
    // report errors here
  }
}