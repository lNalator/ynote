import { Module } from '@nestjs/common';
import { NoteController } from '../controllers/note.controller';
import { NoteService } from '../services/note.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from '../models/note.model';
import { EleveModule } from './eleve.module';
import { ProfesseurModule } from './professeur.module';
import { MatieresModule } from './matieres.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Note]),
    EleveModule,
    ProfesseurModule,
    MatieresModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
