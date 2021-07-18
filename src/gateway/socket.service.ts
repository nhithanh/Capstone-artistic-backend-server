import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {

    public server: Server = null;

    public emitToSpecificUser(userId: string, payload: any) {
        this.server.emit(userId, payload)
    }

    public emitTransferVideoCompleted(userId: string, albumId: string) {
        this.server.emit(userId, {
            action: "TRANSFER_VIDEO_COMPLETED",
            albumId
        })
    }

    public emitStopTraining() {
        console.log("emit stop training baby")
        this.server.emit('stop-training', {
            requestId: "hehehe"
        })
    }

}