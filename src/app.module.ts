import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Matiere } from './models/matiere.model';
import { MatieresModule } from './modules/matieres.module';
import { EleveModule } from './modules/eleve.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      models: [Matiere],
      // autoLoadModels: true,
      // synchronize: true,
    }),
    MatieresModule,
    EleveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
