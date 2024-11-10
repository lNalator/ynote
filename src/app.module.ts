import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatieresModule } from './modules/matieres.module';
import { ClasseModule } from './modules/classe.module';
import { dataBaseConfig } from './database/database.provider';
import { NoteModule } from './modules/note.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './database/seeder.module';
import { UserModule } from './modules/user.module';
import { RoleModule } from './modules/role.module';
import { UserMatiereModule } from './modules/userMatiere.module';
import { UserClasseModule } from './modules/userClasse.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    SequelizeModule.forRoot(dataBaseConfig),
    MatieresModule,
    ClasseModule,
    NoteModule,
    UserModule,
    RoleModule,
    UserMatiereModule,
    UserClasseModule,
    AuthModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
