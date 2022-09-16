import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageWsService } from './message-ws.service';

@WebSocketGateway({ cors: true })
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly messageWsService: MessageWsService
  ) {}
  
  handleDisconnect(client: Socket) {
    this.messageWsService.registerClient(client);
    console.log(`Number of clients: ${this.messageWsService.getConnectedClients()}`);
  }
  
  handleConnection(client: Socket) {
    this.messageWsService.removeClient(client.id);
  }
}
