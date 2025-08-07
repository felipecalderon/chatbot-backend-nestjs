import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Server } from 'socket.io';

@Injectable()
export class ConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  get(key: string): string | undefined {
    return this.nestConfigService.get<string>(key);
  }

  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  emit(event: string, data: any): void {
    if (!this.server) return;
    this.server.emit(event, data);
  }
}
