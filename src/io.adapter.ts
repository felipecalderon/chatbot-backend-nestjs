import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class CustomIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const cors = {
      origin: '*', // O ['http://localhost:5173']
      methods: ['GET', 'POST'],
      credentials: true,
    };
    return super.createIOServer(port, { ...options, cors });
  }
}
