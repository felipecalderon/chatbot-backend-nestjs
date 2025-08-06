import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { OpenaiModule } from '../openai/openai.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [OpenaiModule, ProductsModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
