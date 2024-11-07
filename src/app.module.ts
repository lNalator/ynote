import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MatieresModule } from './modules/matieres.module';
import { EleveModule } from './modules/eleve.module';
import { ClasseModule } from './modules/classe.module';
import { dataBaseConfig } from './database/database.provider';
import { EtudierModule } from './modules/etudier.module';
import { ProfesseurModule } from './modules/professeur.module';
import { NoteModule } from './modules/note.module';
import { DirigerModule } from './modules/diriger.module';
@Module({
  imports: [
    SequelizeModule.forRoot(dataBaseConfig),
    MatieresModule,
    ClasseModule,
    EleveModule,
    ProfesseurModule,
    NoteModule,
    DirigerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
