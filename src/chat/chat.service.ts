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

  async processMessage(message: ChatResponse[]): Promise<ChatResponse> {
    const genericResponse = await this.openaiService.generateResponse(message);

    if (genericResponse) {
      return genericResponse;
    }

    return {
      response: {
        role: 'assistant',
        refusal: null,
        content:
          'Lo siento mucho, el sistema está fallando, no puedo ver el chat ni generar respuestas :(',
      },
      products: [],
    };
  }
}
