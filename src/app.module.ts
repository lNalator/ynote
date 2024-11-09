import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatieresModule } from './modules/matieres.module';
import { EleveModule } from './modules/eleve.module';
import { ClasseModule } from './modules/classe.module';
import { dataBaseConfig } from './database/database.provider';
import { EtudierModule } from './modules/etudier.module';
import { ProfesseurModule } from './modules/professeur.module';
import { NoteModule } from './modules/note.module';
import { DirigerModule } from './modules/diriger.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './database/seeder.module';
import { UserModule } from './modules/user.module';
import { RoleModule } from './modules/role.module';
import { RoleUserModule } from './modules/roleUser.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    SequelizeModule.forRoot(dataBaseConfig),
    MatieresModule,
    ClasseModule,
    EleveModule,
    EtudierModule,
    ProfesseurModule,
    NoteModule,
    DirigerModule,
    UserModule,
    RoleModule,
    RoleUserModule,
    AuthModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
