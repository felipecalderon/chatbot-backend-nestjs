import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { ProductsService } from '../products/products.service';
import { ChatResponse } from '../common/interfaces/chat-response.interface';
import { ConfigService } from 'src/config/config.service';
import { ChatSessionService } from './session/chat-session.service';
import { ChatSession } from './session/chat-session.interface';

@Injectable()
export class ChatService {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
    private readonly sessionService: ChatSessionService,
  ) {}

  /**
   * Procesa el mensaje de un usuario dentro de una sesión específica.
   *
   * @param {ChatSession} session - El estado actual de la sesión de chat del usuario.
   * @param {ChatResponse} userMessage - El último mensaje enviado por el usuario.
   * @returns {Promise<ChatResponse>} Una promesa que se resuelve en la respuesta del chatbot,
   * que puede incluir texto y/o una lista de productos.
   */
  async processMessage(
    session: ChatSession,
    userMessage: ChatResponse,
  ): Promise<ChatResponse> {
    // Paso 1: Actualizar la sesión con el nuevo mensaje del usuario.
    session.messages.push(userMessage.response);

    const botResponse = await this.openaiService.generateResponse(
      session.messages,
    );

    // Caso 1: OpenAI decide llamar a una herramienta (tool).
    if (botResponse?.tool_calls) {
      this.configService.emit('loading', {
        loading: true,
        message: 'Buscando productos...', // Correctly escaped string
      });
      const toolCall = botResponse.tool_calls[0];

      if (toolCall.function.name === 'search_products') {
        // Paso 1.1: Buscar los productos de la API.
        const { response, products } =
          await this.productsService.searchProductTool(
            toolCall.function.arguments,
          );

        // Paso 1.2: Actualizar la sesión con los resultados de la búsqueda y el mensaje del asistente.
        this.sessionService.updateSession(session.sessionId, {
          messages: [...session.messages, response],
          lastSearch: {
            currentPage: 1,
            totalResults: products.length,
            products: products, // Mantener los objetos de producto completos.
          },
        });

        return { response, products };
      }

      // Caso de respaldo para otras llamadas a herramientas no implementadas.
      return {
        response: {
          role: 'assistant',
          content: `Genial! ¿Hay algo más en lo que te pueda ayudar?`, // Correctly escaped string
        },
        products: [],
      };
    }

    // Caso 2: Respuesta de texto normal de OpenAI (sin llamada a herramienta).
    if (botResponse) {
      this.sessionService.updateSession(session.sessionId, {
        messages: [...session.messages, botResponse],
      });
      return {
        response: botResponse,
        products: [],
      };
    }

    // Caso 3: Error general o respuesta inesperada.
    return {
      response: {
        role: 'assistant',
        content:
          'Lo siento mucho, el sistema está fallando, no puedo leer el chat ni generar respuestas :(', // Correctly escaped string
      },
      products: [],
    };
  }
}
