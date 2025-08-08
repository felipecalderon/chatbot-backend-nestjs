import { ChatCompletionMessageParam } from 'openai/resources';

/**
 * @interface ChatSession
 * @description Define la estructura para la sesión de chat de un usuario.
 * Mantiene el historial de mensajes y el estado de la última búsqueda de productos,
 * permitiendo preguntas de seguimiento contextuales como "muéstrame más" o "¿qué tal el segundo?".
 */
export interface ChatSession {
  /**
   * @property {string} sessionId - Un identificador único para la sesión de chat.
   */
  sessionId: string;

  /**
   * @property {ChatCompletionMessageParam[]} messages - Un arreglo de mensajes intercambiados
   * entre el usuario y el asistente, que proporciona el contexto de la conversación.
   * Utiliza el tipo `ChatCompletionMessageParam` para acomodar de manera flexible todos los roles
   * y estructuras de mensajes (`user`, `assistant`, `system`, `tool`) que se envían a OpenAI.
   */
  messages: ChatCompletionMessageParam[];

  /**
   * @property {object} [lastSearch] - Opcional. Almacena el contexto de la última búsqueda de productos
   * realizada por el usuario. Esto es crucial para manejar resultados paginados o consultas
   * que se refieren a elementos mostrados anteriormente.
   */
  lastSearch?: {
    /**
     * @property {number} currentPage - El número de página actual de los resultados de búsqueda que se ha mostrado.
     */
    currentPage: number;
    /**
     * @property {number} totalResults - El número total de productos encontrados para la consulta.
     */
    totalResults: number;
    /**
     * @property {any[]} products - Un arreglo de los productos del último resultado de búsqueda mostrado al usuario.
     * Almacenar esto permite al chatbot saber a qué se refiere "el segundo".
     */
    products: any[];
  };
}
