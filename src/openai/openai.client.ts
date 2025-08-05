import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import OpenAI from 'openai';

@Injectable()
export class OpenaiClient {
  public readonly openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }
}
