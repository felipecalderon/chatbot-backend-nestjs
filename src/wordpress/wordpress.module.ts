import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WoocommerceClient } from './woocommerce/woocommerce.client';
import { WoocommerceService } from './woocommerce/woocommerce.service';

@Module({
  imports: [
    HttpModule, // Necesario para las llamadas HTTP del cliente
    ConfigModule, // Para acceder a las variables de entorno
  ],
  providers: [WoocommerceClient, WoocommerceService],
  exports: [WoocommerceService], // Exportamos el servicio para que otros módulos puedan usarlo
})
export class WordpressModule {}
