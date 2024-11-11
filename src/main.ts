import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionsFilter } from './middleware/globalExceptionsFilter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          fontSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'", "'unsafe-inline'", "ws://*.ynote.com", "wss://*.ynote.com"],
          frameSrc: ["'self'", "'unsafe-inline'"],
          workerSrc: ["'self'", "'unsafe-inline'"],
          objectSrc: ["'self'", "'unsafe-inline'"],
          mediaSrc: ["'self'", "'unsafe-inline'"],
          childSrc: ["'self'", "'unsafe-inline'"],
          upgradeInsecureRequests: [],
        },
      },
      hidePoweredBy: true,
      xssFilter: true,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      crossOriginEmbedderPolicy: { policy: 'credentialless' },
    })
  );

  app.useGlobalFilters(new GlobalExceptionsFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
