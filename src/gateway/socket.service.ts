import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {

    public server: Server = null;

    public clients: { [Key: string]: Socket }

    public emitToSpecificClient(socketID, eventName, payload) {
        this.clients[socketID].emit(eventName, payload)
    }

}