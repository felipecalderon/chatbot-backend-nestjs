import { Injectable } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { WoocommerceService } from '../wordpress/woocommerce/woocommerce.service';

@Injectable()
export class ProductsService {
  constructor(private readonly woocommerceService: WoocommerceService) {}

  async searchProducts(query: string): Promise<ProductDto[]> {
    console.log(`Buscando productos en WooCommerce con la consulta: ${query}`);

    const wooProducts = await this.woocommerceService.findProductsByName(query);

    // Mapeamos la respuesta de WooCommerce a nuestro DTO normalizado
    return wooProducts;
  }
}
