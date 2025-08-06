import { Injectable } from '@nestjs/common';
import { WoocommerceClient } from './woocommerce.client';
import { Product } from 'src/products/interfaces/product.interface';
import { toSingular } from 'src/common/utils/text-format.util';

@Injectable()
export class WoocommerceService {
  constructor(private readonly wooClient: WoocommerceClient) {}

  async findProductsByName(query: string): Promise<Product[]> {
    const singularQuery = toSingular(query);
    // Por ahora, buscaremos productos que coincidan con el título.
    // WooCommerce usa 'search' para buscar en título, contenido y SKU.
    return this.wooClient.get('products', { search: singularQuery });
  }

  async getProductById(id: number): Promise<Product> {
    return this.wooClient.get(`products/${id}`);
  }
}
