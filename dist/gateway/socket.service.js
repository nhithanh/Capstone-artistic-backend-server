"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
let SocketService = class SocketService {
    constructor() {
        this.server = null;
    }
    emitToSpecificUser(userId, payload) {
        this.server.emit(userId, payload);
    }
    emitTransferVideoCompleted(userId, albumId) {
        this.server.emit(userId, {
            action: "TRANSFER_VIDEO_COMPLETED",
            albumId
        });
    }
    emitStopTraining() {
        console.log("emit stop training baby");
        this.server.emit('stop-training', {
            requestId: "hehehe"
        });
    }
    emitUpdateTrainingRequestToAdmin(updatedTrainingRequest) {
        this.server.emit('ADMIN', {
            action: "UPDATE_TRAINING_REQUEST",
            updatedTrainingRequest
        });
    }
};
SocketService = __decorate([
    common_1.Injectable()
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map