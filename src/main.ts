import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionsFilter } from './middleware/globalExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalFilters(new GlobalExceptionsFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
