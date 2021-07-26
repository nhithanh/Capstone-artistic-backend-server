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
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
var amqp = require('amqp-connection-manager');
let ProducerService = class ProducerService {
    constructor() {
        this.VIDEO_EXCHANGE = "EXCHANGE_TRANSFER_VIDEO";
        this.PHOTO_EXCHANGE = "TRANSFER_PHOTO_EXCHANGE";
        this.UPDATE_WEIGHT_EXCHANGE = "UPDATE_WEIGHT_EXCHANGE";
        this.TRAINING_REQUEST_EXCHANGE = "TRAINING_EXCHANGE";
        this.STOP_TRAINING_EXCHANGE = "STOP_TRAINING_EXCHANGE";
        this.CONVERT_VIDEO_EXCHANGE = "CONVERT_VIDEO_EXCHANGE";
        this.connection = amqp.connect([config_1.QUEUE_HOST]);
        this.channelWrapper = this.connection.createChannel();
        this.awaitRequests = [];
        setInterval(() => {
            if (this.awaitRequests.length > 0) {
                const waitingRequests = this.awaitRequests;
                this.awaitRequests = [];
                for (let awaitRequest of waitingRequests) {
                    const { data, action } = awaitRequest;
                    this.deliveryMessage(action, data);
                }
            }
        }, 2000);
    }
    deliveryMessage(action, data) {
        switch (action) {
            case "TRANSFER_PHOTO":
                this.emitTransferPhotoTask(data);
                break;
            case "TRANSFER_VIDEO":
                this.emitTransferVideoTask(data);
                break;
            case "UPDATE_WEIGHT":
                this.emitUpdatePhotoWeight(data);
                break;
            case "START_TRAINING":
                this.emitTrainingRequest(data);
                break;
            case "STOP_TRAINING":
                this.emitStopTraining(data);
                break;
            case "CONVERT_VIDEO":
                this.emitConvertVideoTask(data);
        }
    }
    emitMessage(exchange, routingKey, data, action) {
        const buffer = Buffer.from(JSON.stringify(data));
        return this.channelWrapper.publish(exchange, routingKey, buffer).catch(err => {
            console.log("ERR:", err);
            this.awaitRequests.push({
                data,
                action
            });
        });
    }
    emitConvertVideoTask(data) {
        console.log("Emit convert video");
        return this.emitMessage(this.CONVERT_VIDEO_EXCHANGE, "", data, "CONVERT_VIDEO");
    }
    emitTransferPhotoTask(data) {
        return this.emitMessage(this.PHOTO_EXCHANGE, "", data, "TRANSFER_PHOTO");
    }
    emitTransferVideoTask(data) {
        return this.emitMessage(this.VIDEO_EXCHANGE, "", data, "TRANSFER_VIDEO");
    }
    emitUpdatePhotoWeight(data) {
        return this.emitMessage(this.UPDATE_WEIGHT_EXCHANGE, "", data, "UPDATE_WEIGHT");
    }
    emitTrainingRequest(data) {
        return this.emitMessage(this.TRAINING_REQUEST_EXCHANGE, "", data, "START_TRAINING");
    }
    emitStopTraining(trainingRequestId) {
        const data = {
            trainingRequestId,
            action: "STOP"
        };
        return this.emitMessage(this.STOP_TRAINING_EXCHANGE, "", data, "STOP_TRAINING");
    }
};
ProducerService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ProducerService);
exports.ProducerService = ProducerService;
//# sourceMappingURL=producer.service.js.map