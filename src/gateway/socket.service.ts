import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {

    public server: Server = null;

    public clients: { [Key: string]: Socket } = {}

    public emitToSpecificClient(socketId: string, eventName: string, payload: any) {
        console.log(socketId)
        if(this.clients[socketId]) {
            this.clients[socketId].emit(eventName, payload)
        }
        else {
            this.server.to(socketId).emit(eventName, payload)
        }
    }

    public emitToSpecificUser(userId: string, payload: any) {
        this.server.emit(userId, payload)
    }

    public emitTransferVideoCompleted(userId: string, albumId: string) {
        this.server.emit(userId, {
            action: "TRANSFER_VIDEO_COMPLETE",
            albumId
        })
    }

}