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

  app.enableVersioning({  // Versionamiento
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder() // Documentación
    .addBearerAuth()
    .setTitle('AnimeList API')
    .setDescription('Esta es la api de AnimeList')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config); // Documentación
  SwaggerModule.setup('documentation', app, document); // Documentación

  app.useGlobalPipes(new ValidationPipe()); // Validación de datos
  await app.listen(PORT);
}
bootstrap();
