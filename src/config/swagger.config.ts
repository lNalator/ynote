import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .setTitle('Ynote API')
  .setDescription(
    'Here lies the API of Ynote, needed for the weel-being of the Ynote app.',
  )
  .setVersion('0.1')
  .addTag('Authentification')
  .addTag('Matieres')
  .addTag('Classes')
  .addTag('Eleves')
  .addTag('Professeurs')
  .addTag('Notes')
  .build();
