import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {

    public server: Server = null;

    public clients: { [Key: string]: Socket } = {}

    public emitToSpecificClient(socketId: string, eventName: string, payload: any) {
        this.clients[socketId].emit(eventName, payload)
    }

    public emitToSpecificUserId(userId: string, payload: any) {
        console.log(userId)
        this.server.emit(userId, payload)
    }

}