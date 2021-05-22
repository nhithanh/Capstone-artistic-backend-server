import { Inject } from "@nestjs/common";
import { SqsService } from "@ssut/nestjs-sqs";

export class QueueProducerService {
    @Inject()
    private readonly sqsService: SqsService;

    public async sendToQueue(queueName: string, payload: any) {
        await this.sqsService.send(queueName, payload)
    }
}