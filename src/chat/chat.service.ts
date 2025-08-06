import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { ProductsService } from '../products/products.service';
import { ChatResponse } from '../common/interfaces/chat-response.interface';

@Injectable()
export class ChatService {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly productsService: ProductsService,
  ) {}

  /**
   * Procesa un mensaje entrante, lo envía a OpenAI para obtener una intención
   * y genera una respuesta, buscando productos si es necesario.
   * @param message - El historial de chat actual, incluyendo el último mensaje del usuario.
   * @returns Una promesa que se resuelve en un objeto ChatResponse con la respuesta del asistente y/o los productos encontrados.
   */
  async processMessage(message: ChatResponse[]): Promise<ChatResponse> {
    const botResponse = await this.openaiService.generateResponse(message);

    // Caso 1: OpenAI decide llamar a una tool (buscar productos)
    if (botResponse?.response.tool_calls) {
      const toolCall = botResponse.response.tool_calls[0];
      const { query } = JSON.parse(toolCall.function.arguments) as {
        query: string;
      };

      console.log(`Tool call detectada: ${toolCall.function.name}`);
      console.log(`Argumentos: ${query}`);

      const products = await this.productsService.searchProducts(query);

      // TODO: Generar una respuesta de texto más elaborada con los resultados
      return {
        response: {
          role: 'assistant',
          content: `Encontré: ${products.length} productos, espero te sirvan y sino me avisas porfavor, gracias!`,
          refusal: null,
        },
        products,
      };
    }

    // Caso 2: Respuesta de texto normal de OpenAI
    if (botResponse) {
      return botResponse;
    }

    // Caso 3: Error general
    return {
      response: {
        role: 'assistant',
        refusal: null,
        content:
          'Lo siento mucho, el sistema está fallando, no puedo leer el chat ni generar respuestas :(',
      },
      products: [],
    };
  }
}
