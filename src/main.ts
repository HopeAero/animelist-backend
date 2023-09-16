import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const PORT = process.env.PORT || 3000; 
  const app = await NestFactory.create(AppModule, { // Creación de la app
    cors: true,  // Cors
  });

  app.use(json({ limit: '500mb' })); // Tamaño máximo de los datos (60mb)

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder() // Documentación
    .addBearerAuth()
    .setTitle('AnimeList API')
    .setDescription('Esta es la api de AnimeList')
    .addTag('users')
    .addTag('anime')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config); // Documentación
  SwaggerModule.setup('api', app, document); // Documentación

  // Validación de datos
  await app.listen(PORT);
}
bootstrap();
