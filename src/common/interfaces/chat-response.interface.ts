import { ChatCompletionAssistantMessageParam } from 'openai/resources';
import { ProductDto } from 'src/products/dtos/product.dto';

/**
 * @interface ChatResponse
 * @description Define la estructura estandarizada para una respuesta enviada desde el chatbot al cliente.
 * Esto asegura consistencia ya sea que el bot envíe un mensaje de texto simple, una lista de productos,
 * o confirme una llamada a una herramienta (tool call).
 */
export interface ChatResponse {
  /**
   * @property {ChatCompletionAssistantMessageParam} response - El mensaje principal del asistente.
   * Usar `ChatCompletionAssistantMessageParam` provee la flexibilidad para manejar respuestas
   * que contienen texto (`content`), llamadas a herramientas (`tool_calls`), o ambos. Esto es crucial
   * para alinearse con la estructura de la API de OpenAI y nuestra lógica interna.
   */
  response: ChatCompletionAssistantMessageParam;

  /**
   * @property {ProductDto[]} [products] - Opcional. Un arreglo de objetos de transferencia de datos de productos.
   * Este payload es utilizado por el frontend para renderizar la información de los productos cuando se realiza una búsqueda.
   * Solo está presente en respuestas que involucran resultados de productos.
   */
  products?: ProductDto[];
}
