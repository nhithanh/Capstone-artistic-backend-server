import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {

    public server: Server = null;

    public emitToSpecificUser(userId: string, payload: any) {
        this.server.emit(userId, payload)
    }

    public emitTransferVideoCompleted(userId: string, albumId: string, media: any) {
        this.server.emit(userId, {
            action: "TRANSFER_VIDEO_COMPLETED",
            albumId,
            media
        })
    }

    public emitStopTraining() {
        this.server.emit('stop-training', {
            requestId: "hehehe"
        })
    }

    public emitUpdateTrainingRequestToAdmin(updatedTrainingRequest) {
        this.server.emit('ADMIN', {
            action: "UPDATE_TRAINING_REQUEST",
            updatedTrainingRequest
        })
    }

}