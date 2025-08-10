import { ChatCompletionTool } from 'openai/resources';

export class ToolsFactory {
  /**
   * Devuelve un arreglo de todas las tools (funciones) disponibles para el modelo de OpenAI.
   * @returns Un arreglo de objetos ChatCompletionTool.
   */
  static getTools(): ChatCompletionTool[] {
    return [ToolsFactory.searchProducts];
  }

  static searchProducts: ChatCompletionTool = {
    type: 'function',
    function: {
      name: 'search_products',
      description:
        'Busca productos en la tienda de WooCommerce cuando el usuario pregunta explícitamente por un artículo, el producto devuelto siempre será en singular.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description:
              'La consulta de búsqueda del usuario para encontrar productos en singular. Ej: si el usuario buscó "cables", la consulta será "cable"',
          },
        },
        required: ['query'],
      },
    },
  };

  static getUserData: ChatCompletionTool = {
    type: 'function',
    function: {
      name: 'get_user_data',
      description: 'El usuario entregó uno o varios datos personales',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nombre del usuario, ejemplo: Juan José Pingao',
          },
          email: {
            type: 'string',
            description: 'correo del usuario: ejemplo: juan@yahoo.com',
          },
          phone: {
            type: 'string',
            description:
              'Teléfono del usuario, formato de ejemplo: +569 8877 6655',
          },
          interests: {
            type: 'string',
            description:
              'Arreglo de string, productos o categorías que le interesan al usuario: Ej: [pinturas, mallas, osb]',
          },
        },
        required: [],
      },
    },
  };
}
