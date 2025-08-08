import { Injectable } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { WoocommerceService } from '../wordpress/woocommerce/woocommerce.service';
import { ChatCompletionMessageParam } from 'openai/resources';
import { toSingular } from 'src/common/utils/text-format.util';

@Injectable()
export class ProductsService {
  constructor(private readonly woocommerceService: WoocommerceService) {}

  /**
   * Busca productos en WooCommerce que coincidan con un término de búsqueda.
   * @param query - El término de búsqueda para encontrar productos. Ejemplo: "camiseta".
   * @returns Una promesa que se resuelve en un arreglo de ProductDto.
   */
  async searchProducts(query: string): Promise<ProductDto[]> {
    console.log(`Buscando productos en WooCommerce con la consulta: ${query}`);
    const wooProducts = await this.woocommerceService.findProductsByName(
      toSingular(query),
    );
    return wooProducts;
  }

  async searchProductTool(argumentos: string) {
    const { query } = JSON.parse(argumentos) as {
      query: string;
    };
    const products = await this.searchProducts(query);
    if (!products.length) {
      const content = `Oh, no encuentro nada con: "${query}", puede ser que esté con otro nombre o quizás no lo trabajamos :C`;
      const assistantMessage: ChatCompletionMessageParam = {
        role: 'assistant',
        content,
      };

      return { response: assistantMessage, products };
    }
    // Paso 2: Formatear la lista de productos en un texto para la respuesta del asistente.
    const productListText = products
      .map((p, i) => `${i + 1}. **${p.name}** - ${p.price}`)
      .join('\n'); // Correctly escaped newline

    const content = `¡Claro! Encontré estos productos basados en tu búsqueda "${query}":\n${productListText}\n¿Te gustaría ver más detalles de alguno?`; // Correctly escaped quotes and newlines

    const assistantMessage: ChatCompletionMessageParam = {
      role: 'assistant',
      content,
    };

    return { response: assistantMessage, products };
  }
}
