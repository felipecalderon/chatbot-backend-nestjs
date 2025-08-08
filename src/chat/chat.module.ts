import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { OpenaiModule } from '../openai/openai.module';
import { ProductsModule } from '../products/products.module';
import { ConfigService } from 'src/config/config.service';
import { ChatSessionService } from './session/chat-session.service';

@Module({
  imports: [OpenaiModule, ProductsModule],
  providers: [ChatGateway, ChatService, ConfigService, ChatSessionService],
  exports: [ChatSessionService],
})
export class ChatModule {}
