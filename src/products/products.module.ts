import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { WordpressModule } from '../wordpress/wordpress.module';

@Module({
  imports: [WordpressModule],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
