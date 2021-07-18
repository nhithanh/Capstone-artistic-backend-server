import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import _ from 'lodash'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    console.log("New connection to socket")
  }

  @Inject()
  private socketService: SocketService;

  afterInit(server: Server) {
    this.socketService.server = server;
  }

}