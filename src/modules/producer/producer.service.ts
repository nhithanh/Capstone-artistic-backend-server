import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
    client: ClientProxy;
    
    constructor() {
        this.client = ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
              urls: ['amqps://vkcupcps:7aZAQs_SrFQ8_xUtIsC_phHlwl_KpuLf@baboon.rmq.cloudamqp.com/vkcupcps'],
              queue: 'GENERATOR_SERVICE'
          }
        });
      }

    public sendQueueToGeneratorService(pattern: string, data: any) {
        return this.client.send(pattern, data).subscribe();
    }
}
