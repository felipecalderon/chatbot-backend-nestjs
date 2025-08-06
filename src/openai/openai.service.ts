import { Injectable } from '@nestjs/common';
import { OpenaiClient } from './openai.client';
import { systemPrompt } from './prompts/system';
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from 'openai/resources';
import { ChatResponse } from 'src/common/interfaces/chat-response.interface';

@Injectable()
export class OpenaiService {
  constructor(private readonly openaiClient: OpenaiClient) {}

  private async getCompletion(
    messages: ChatResponse[],
  ): Promise<ChatResponse | null> {
    try {
      const messagesOpenAI: ChatCompletionMessage[] = messages.map(
        (message) => ({
          role: message.response.role,
          content: message.response.content,
          refusal: null,
        }),
      );

      const completion = await this.openaiClient.openai.chat.completions.create(
        {
          messages: [systemPrompt, ...messagesOpenAI],
          model: 'gpt-4o-mini',
        },
      );

      const responseAI = completion.choices[0].message;
      return { response: responseAI, products: [] };
    } catch (error) {
      console.error('Error getting completion from OpenAI:', error);
      return null;
    }
  }

  async generateResponse(
    messages: ChatResponse[],
  ): Promise<ChatResponse | null> {
    return this.getCompletion(messages);
  }
}
