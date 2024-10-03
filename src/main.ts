import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { config } from './swaggerConfig';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
