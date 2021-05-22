import { SqsProducerOptions } from "@ssut/nestjs-sqs/dist/sqs.types";
import * as AWS from 'aws-sdk'

export const producers: SqsProducerOptions[] = [{
    name: 'test',
    queueUrl: 'https://sqs.ap-southeast-1.amazonaws.com/553984049832/artisan-queue-test',
    sqs: new AWS.SQS({
      accessKeyId: 'AKIAYB7AFYKUMNDEZT4L',
      secretAccessKey: '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',
      region: 'ap-southest-1'
    })
  }]
  