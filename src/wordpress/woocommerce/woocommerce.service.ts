import { Injectable } from '@nestjs/common';
import { WoocommerceClient } from './woocommerce.client';
import { Product } from 'src/products/interfaces/product.interface';

@Injectable()
export class WoocommerceService {
  constructor(private readonly wooClient: WoocommerceClient) {}

  async findProductsByName(query: string): Promise<Product[]> {
    // Por ahora, buscaremos productos que coincidan con el título.
    // WooCommerce usa 'search' para buscar en título, contenido y SKU.
    return this.wooClient.get('products', { search: query });
  }

  async getProductById(id: number): Promise<Product> {
    return this.wooClient.get(`products/${id}`);
  }
}
