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

  async processMessage(message: string): Promise<ChatResponse | null> {
    console.log(`Processing message in ChatService: ${message}`);
    const genericResponse = await this.openaiService.generateResponse(message);
    return { response: genericResponse, products: [] };
  }
}
