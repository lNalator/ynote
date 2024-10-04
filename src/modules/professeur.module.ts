import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfesseurController } from 'src/controllers/professeur.controller';
import { Professeur } from 'src/models/professeur.model';
import { ProfesseurService } from 'src/services/professeur.service';

@Module({
    imports: [SequelizeModule.forFeature([Professeur])],
    controllers: [ProfesseurController],
    providers: [ProfesseurService],
  })
  export class ProfesseurModule {}