import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, user-id',
  });

  await app.listen(5000);
}
bootstrap();
