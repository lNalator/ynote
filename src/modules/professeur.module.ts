import { Module } from '@nestjs/common';
import { ProfesseurController } from 'src/controllers/professeur.controller';
import { ProfesseurService } from 'src/services/professeur.service';

@Module({
    controllers: [ProfesseurController],
    providers: [ProfesseurService],
    exports: [ProfesseurService],
  })
  export class ProfesseurModule {}