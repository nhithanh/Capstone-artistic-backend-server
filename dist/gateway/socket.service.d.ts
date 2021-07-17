import { Server } from 'socket.io';
export declare class SocketService {
    server: Server;
    emitToSpecificUser(userId: string, payload: any): void;
    emitTransferVideoCompleted(userId: string, albumId: string): void;
}
