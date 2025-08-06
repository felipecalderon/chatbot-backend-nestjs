import { ChatCompletionMessage } from 'openai/resources';
import { ProductDto } from 'src/products/dtos/product.dto';

export interface ChatResponse {
  response: ChatCompletionMessage | null;
  products: ProductDto[];
}
