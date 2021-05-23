import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer.service';
import {GENERATOR_SERIVCE} from './constants'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: GENERATOR_SERIVCE,
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'test_queue'
                }
            }
        ])
    ],
    providers: [ProducerService],
    exports: [ProducerService]
})
export class ProducerModule {}
