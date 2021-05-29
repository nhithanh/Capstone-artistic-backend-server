import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
            uri: 'amqps://vkcupcps:7aZAQs_SrFQ8_xUtIsC_phHlwl_KpuLf@baboon.rmq.cloudamqp.com/vkcupcps',
            connectionInitOptions: { wait: false }
        })
    ],
    providers: [ProducerService],
    exports: [ProducerService]
})
export class ProducerModule {}
