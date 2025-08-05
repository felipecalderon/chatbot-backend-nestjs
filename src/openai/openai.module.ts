import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiClient } from './openai.client';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [OpenaiService, OpenaiClient],
  exports: [OpenaiService],
})
export class OpenaiModule {}
