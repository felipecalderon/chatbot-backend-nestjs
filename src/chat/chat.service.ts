import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class ChatService {
  constructor(private readonly openaiService: OpenaiService) {}

  async processMessage(message: string): Promise<string | null> {
    console.log(`Processing message in ChatService: ${message}`);
    const aiResponse = await this.openaiService.generateResponse(message);
    return aiResponse;
  }
}
