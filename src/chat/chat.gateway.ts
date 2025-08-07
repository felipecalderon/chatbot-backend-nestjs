import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatResponse } from 'src/common/interfaces/chat-response.interface';
import { ConfigService } from 'src/config/config.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly configService: ConfigService,
  ) {}

  afterInit() {
    this.configService.setServer(this.server);
  }
  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('user_message')
  async handleMessage(@MessageBody() data: ChatResponse[]): Promise<void> {
    this.configService.emit('loading', {
      loading: true,
      message: 'Escribiendo...',
    });
    const processedMessage = await this.chatService.processMessage(data);
    this.configService.emit('bot_reply', processedMessage);
    this.configService.emit('loading', {
      loading: false,
      message: '',
    });
  }
}
