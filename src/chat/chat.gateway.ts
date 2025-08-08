import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatResponse } from 'src/common/interfaces/chat-response.interface';
import { ConfigService } from 'src/config/config.service';
import { ChatSessionService } from './session/chat-session.service';
import { Logger } from '@nestjs/common';

/**
 * @class ChatGateway
 * @description Puerta de enlace principal de WebSocket para gestionar la comunicación en tiempo real del chatbot.
 * Orquesta la interacción entre el cliente, el servicio de chat y el gestor de sesiones.
 * Implementa los hooks del ciclo de vida de los sockets para manejar conexiones y desconexiones.
 */
@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly configService: ConfigService,
    private readonly sessionService: ChatSessionService,
  ) {}

  /**
   * @method afterInit
   * @description Se ejecuta después de que el gateway ha sido inicializado.
   * Configura el servidor de Socket.IO en el `ConfigService` para permitir la emisión de eventos globales.
   * @param {Server} server - La instancia del servidor de Socket.IO.
   */
  afterInit(server: Server) {
    this.configService.setServer(server);
    this.logger.log('ChatGateway inicializado y servidor configurado.');
  }

  /**
   * @method handleConnection
   * @description Maneja las nuevas conexiones de clientes.
   * @param {Socket} client - El socket del cliente que se ha conectado.
   */
  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  /**
   * @method handleDisconnect
   * @description Maneja las desconexiones de clientes.
   * @param {Socket} client - El socket del cliente que se ha desconectado.
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
    // Opcional: Limpiar la sesión del usuario al desconectarse para liberar memoria.
    // this.sessionService.clearSession(client.id); // Esto requeriría usar el client.id como sessionId.
  }

  /**
   * @event user_message
   * @description Escucha los mensajes entrantes de los usuarios.
   * Recupera la sesión del usuario, procesa el mensaje a través del `ChatService` y emite la respuesta.
   * @param {object} data - El objeto de datos que contiene el ID de la sesión y el mensaje.
   * @param {string} data.sessionId - El ID de la sesión del usuario.
   * @param {ChatResponse} data.message - El mensaje enviado por el usuario.
   */
  @SubscribeMessage('user_message')
  async handleMessage(
    @MessageBody() data: { sessionId: string; message: ChatResponse },
  ): Promise<void> {
    this.configService.emit('loading', {
      loading: true,
      message: 'Escribiendo...',
    });
    const { sessionId, message } = data;
    const session = this.sessionService.getSession(sessionId);
    const processedMessage = await this.chatService.processMessage(
      session,
      message,
    );

    this.configService.emit('bot_reply', processedMessage);
    this.configService.emit('loading', {
      loading: false,
      message: '',
    });
  }
}
