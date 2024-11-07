import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfesseurController } from 'src/controllers/professeur.controller';
import { Professeur } from 'src/models/professeur.model';
import { ProfesseurService } from 'src/services/professeur.service';
import { DirigerModule } from './diriger.module';

@Module({
    imports: [SequelizeModule.forFeature([Professeur]), DirigerModule],
    controllers: [ProfesseurController],
    providers: [ProfesseurService],
    exports: [ProfesseurService],
  })
  export class ProfesseurModule {}