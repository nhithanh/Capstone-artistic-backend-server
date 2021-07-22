import { OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection {
    handleConnection(client: any, ...args: any[]): void;
    private socketService;
    afterInit(server: Server): void;
}
