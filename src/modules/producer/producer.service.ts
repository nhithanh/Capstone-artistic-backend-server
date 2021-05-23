import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
    client: ClientProxy;
    
    constructor() {
        this.client = ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
              urls: ['amqp://localhost:5672'],
              queue: 'test_queue'
          }
        });
      }

    public sendQueueToGeneratorService(pattern: string, data: any) {
        return this.client.send(pattern, data).subscribe();
    }
}
