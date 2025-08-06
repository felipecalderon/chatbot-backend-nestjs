import { ChatCompletionTool } from 'openai/resources';

export class ToolsFactory {
  /**
   * Devuelve un arreglo de todas las tools (funciones) disponibles para el modelo de OpenAI.
   * @returns Un arreglo de objetos ChatCompletionTool.
   */
  static getTools(): ChatCompletionTool[] {
    return [
      {
        type: 'function',
        function: {
          name: 'search_products',
          description:
            'Busca productos en la tienda de WooCommerce cuando el usuario pregunta explícitamente por uno o más artículos.',
          parameters: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description:
                  'La consulta de búsqueda del usuario para encontrar productos. Ejemplo: "zapatillas deportivas para correr", "café de colombia"',
              },
            },
            required: ['query'],
          },
        },
      },
    ];
  }
}
