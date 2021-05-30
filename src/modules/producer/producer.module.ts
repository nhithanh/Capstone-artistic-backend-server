import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
            uri: process.env.RABBITMQ_ENDPOINT,
            connectionInitOptions: { wait: false }
        })
    ],
    providers: [ProducerService],
    exports: [ProducerService]
})
export class ProducerModule {}
