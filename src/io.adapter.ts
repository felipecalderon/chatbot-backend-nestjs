import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server } from 'socket.io';
export class CustomIoAdapter extends IoAdapter {
  createIOServer(server: any, options?: ServerOptions) {
    const origin = process.env.DOMAIN_ALLOWED_CORS?.split(',').map((url) =>
      url.trim().replace(/;$/, ''),
    ) ?? ['*'];

    return super.createIOServer(server, {
      cors: { origin, methods: ['GET', 'POST'], credential: true },
      ...options,
    }) as Server;
  }
}
