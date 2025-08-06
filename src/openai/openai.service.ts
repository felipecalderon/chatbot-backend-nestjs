import { Injectable } from '@nestjs/common';
import { OpenaiClient } from './openai.client';
import { systemPrompt } from './prompts/system';
import { ChatCompletionMessage } from 'openai/resources';

@Injectable()
export class OpenaiService {
  constructor(private readonly openaiClient: OpenaiClient) {}

  private async getCompletion(
    prompt: string,
  ): Promise<ChatCompletionMessage | null> {
    try {
      const completion = await this.openaiClient.openai.chat.completions.create(
        {
          messages: [systemPrompt, { role: 'user', content: prompt }],
          model: 'gpt-4o-mini',
        },
      );
      return completion.choices[0].message;
    } catch (error) {
      console.error('Error getting completion from OpenAI:', error);
      return null; // Devolvemos null para que el servicio que lo llama pueda manejar el error
    }
  }

  async generateResponse(
    prompt: string,
  ): Promise<ChatCompletionMessage | null> {
    return this.getCompletion(prompt);
  }
}
