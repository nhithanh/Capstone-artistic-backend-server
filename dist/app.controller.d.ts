import { RmqContext } from '@nestjs/microservices';
export declare class AppController {
    constructor();
    execute(data: any, context: RmqContext): Promise<void>;
}
