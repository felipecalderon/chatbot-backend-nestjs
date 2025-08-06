import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ChatModule } from './chat/chat.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule, ChatModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
