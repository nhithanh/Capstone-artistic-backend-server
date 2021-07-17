import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class AppGateway implements OnGatewayInit {
    private socketService;
    afterInit(server: Server): void;
}
