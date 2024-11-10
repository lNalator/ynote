import { Module } from '@nestjs/common';
import { NoteController } from '../controllers/note.controller';
import { NoteService } from '../services/note.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from '../models/note.model';
import { MatieresModule } from './matieres.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Note]),
    UserModule,
    MatieresModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
