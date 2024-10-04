import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Ynote API')
  .setDescription(
    'Here lies the API of Ynote, needed for the weel-being of the Ynote app.',
  )
  .setVersion('0.1')
  .addTag('Matieres')
  .addTag('Classes')
  .addTag('Eleves')
  .build();
