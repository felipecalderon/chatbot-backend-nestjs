import { Injectable } from '@nestjs/common';
import { OpenaiClient } from './openai.client';
import { systemPrompt } from './prompts/system';
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from 'openai/resources';
import { ChatResponse } from 'src/common/interfaces/chat-response.interface';
import { ToolsFactory } from './tools/tools.factory';

@Injectable()
export class OpenaiService {
  constructor(private readonly openaiClient: OpenaiClient) {}

  /**
   * Obtiene una completación de chat de OpenAI basada en un historial de mensajes.
   * Este método privado maneja la lógica de la llamada a la API.
   * @param messages - Un arreglo de mensajes que representa la conversación actual.
   * @returns Una promesa que se resuelve en un objeto ChatResponse o null si ocurre un error.
   */
  private async getCompletion(
    messages: ChatCompletionMessageParam[],
  ): Promise<ChatCompletionMessage> {
    try {
      const completion = await this.openaiClient.openai.chat.completions.create(
        {
          messages: [systemPrompt, ...messages],
          model: 'gpt-4o-mini',
          tools: ToolsFactory.getTools(), // <--- AÑADIMOS LAS TOOLS
          tool_choice: 'auto', // <--- DEJAMOS QUE OPENAI DECIDA
        },
      );

      const responseAI = completion.choices[0].message;
      return responseAI;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error getting completion from OpenAI:');
    }
  }

  /**
   * Genera una respuesta de chat utilizando el servicio de OpenAI.
   * Es el método público que consumirán otros servicios.
   * @param messages - El historial de la conversación.
   * @returns Una promesa que se resuelve en un objeto ChatResponse o null en caso de error.
   */
  async generateResponse(
    messages: ChatCompletionMessageParam[],
  ): Promise<ChatCompletionMessage | null> {
    return this.getCompletion(messages);
  }
}
