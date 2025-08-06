import { Injectable } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { WoocommerceService } from '../wordpress/woocommerce/woocommerce.service';

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

    const wooProducts = await this.woocommerceService.findProductsByName(query);
    return wooProducts;
  }
}
