import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { json } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true }); // Cors para que se pueda acceder desde cualquier lado

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { // Ruta de las imagenes
    prefix: '/uploads/',
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
    .addTag('list')
    .build();

  const document = SwaggerModule.createDocument(app, config); // Documentación
  SwaggerModule.setup('api', app, document); // Documentación

  // Validación de datos
  await app.listen(PORT);
}
bootstrap();
