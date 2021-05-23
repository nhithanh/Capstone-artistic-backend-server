import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GENERATOR_SERIVCE } from './constants';

@Injectable()
export class ProducerService {
    @Inject(GENERATOR_SERIVCE)
    private readonly generatorServiceClient: ClientProxy

    public sendQueueToGeneratorService(pattern: string, data: any) {
        return this.generatorServiceClient.send(pattern, data).subscribe();
    }
}
