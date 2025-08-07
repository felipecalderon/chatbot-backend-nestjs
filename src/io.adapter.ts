import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class CustomIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const originDomains = process.env.DOMAIN_ALLOWED_CORS?.split(',').map(
      (url) => url.trim().replace(/;$/, ''),
    ) ?? ['*'];
    const cors = {
      origin: originDomains, // O ['http://localhost:5173']
      methods: ['GET', 'POST'],
      credentials: true,
    };
    console.log('cors WS:', originDomains);
    return super.createIOServer(port, { ...options, cors });
  }
}
