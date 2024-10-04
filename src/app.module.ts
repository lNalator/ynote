import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MatieresModule } from './modules/matieres.module';
import { EleveModule } from './modules/eleve.module';
import { ClasseModule } from './modules/classe.module';
import { dataBaseConfig } from './database/database.provider';
import { EtudierModule } from './modules/etudier.module';
@Module({
  imports: [
    MatieresModule,
    ClasseModule,
    EleveModule,
    EtudierModule,
    SequelizeModule.forRoot(dataBaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
