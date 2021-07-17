"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerService = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
let ProducerService = class ProducerService {
    constructor() {
        this.VIDEO_EXCHANGE = "EXCHANGE_TRANSFER_VIDEO";
        this.PHOTO_EXCHANGE = "TRANSFER_PHOTO_EXCHANGE";
        this.UPDATE_MODEL_EXCHANGE = process.env.EXCHANGE_UPDATE_MODEL;
    }
    emitMessage(exchange, routingKey, data) {
        return this.amqpConnection.publish(exchange, routingKey, data);
    }
    emitTransferPhotoTask(data) {
        return this.emitMessage(this.PHOTO_EXCHANGE, "", data);
    }
    emitTransferVideoTask(data) {
        return this.emitMessage(this.VIDEO_EXCHANGE, "", data);
    }
    emitUpdateModel(routingKey, snapshotLocation) {
        return this.emitMessage(this.UPDATE_MODEL_EXCHANGE, routingKey, {
            snapshotLocation
        });
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", nestjs_rabbitmq_1.AmqpConnection)
], ProducerService.prototype, "amqpConnection", void 0);
ProducerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ProducerService);
exports.ProducerService = ProducerService;
//# sourceMappingURL=producer.service.js.map