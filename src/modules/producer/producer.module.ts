import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProducerService } from './producer.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        RabbitMQModule.forRoot(RabbitMQModule, {
            uri: process.env.RABBITMQ_ENDPOINT,
            connectionInitOptions: { wait: false }
        })
    ],
    providers: [ProducerService],
    exports: [ProducerService]
})
export class ProducerModule {}
