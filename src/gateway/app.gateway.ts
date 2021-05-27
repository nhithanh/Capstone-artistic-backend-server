import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import _ from 'lodash'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @Inject()
  private socketService: SocketService;

  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('AppGateway');


  afterInit(server: Server) {
    this.socketService.server = server;
  }

  handleDisconnect(client: Socket) {
    // this.socketService.clients = _.omit(this.socketService.clients, [client.id])
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log("client connect to server")
    this.socketService.clients[client.id] = client;
    console.log("client id:", client.id)
    client.emit('connection', {socketId: client.id})
    client.emit("TRANSFER_SUCCESS", "Hello from client instance")
    this.socketService.emitToSpecificClient(client.id, "TRANSFER_SUCCESS", "Hello from socket service")
  }
}