import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
