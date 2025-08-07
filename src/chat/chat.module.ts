import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { OpenaiModule } from '../openai/openai.module';
import { ProductsModule } from '../products/products.module';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [OpenaiModule, ProductsModule],
  providers: [ChatGateway, ChatService, ConfigService],
})
export class ChatModule {}
