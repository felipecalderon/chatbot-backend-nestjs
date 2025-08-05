import { Injectable } from '@nestjs/common';
import { OpenaiClient } from './openai.client';

@Injectable()
export class OpenaiService {
  constructor(private readonly openaiClient: OpenaiClient) {}

  async generateResponse(prompt: string): Promise<string | null> {
    try {
      const completion = await this.openaiClient.openai.chat.completions.create(
        {
          messages: [{ role: 'user', content: prompt }],
          model: 'gpt-4o-mini',
        },
      );
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response from OpenAI:', error);
      throw new Error('Failed to generate response from OpenAI.');
    }
  }
}
