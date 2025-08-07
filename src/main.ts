import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomIoAdapter } from './io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde cualquier origen.
  const originDomains = process.env.DOMAIN_ALLOWED_CORS?.split(',').map((url) =>
    url.trim().replace(/;$/, ''),
  ) ?? ['*'];
  app.enableCors({
    origin: originDomains, // O un array de dominios: ['http://example.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Usar un ValidationPipe global para validar automáticamente los DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza un error si se reciben propiedades no esperadas
      transform: true, // Transforma el payload a una instancia del DTO
    }),
  );

  app.useWebSocketAdapter(new CustomIoAdapter(app));

  console.log('sirviendo en puerto:', process.env.PORT);
  console.log('cors:', originDomains);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
