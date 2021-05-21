import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {Server} from 'ws'

@WebSocketGateway()
export class HelloGateway {

  @WebSocketServer() socket: Server;


  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
    this.socket.emit('Hello')
    return 'Hello world!';
  }
}
