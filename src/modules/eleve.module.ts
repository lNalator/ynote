import { Module } from '@nestjs/common';
import { EleveService } from '../services/eleve.service';
import { EleveController } from '../controllers/eleve.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Eleve } from 'src/models/eleve.model';


@Module({
    imports: [SequelizeModule.forFeature([Eleve])],
    controllers: [EleveController],
    providers: [EleveService],
  })
  export class EleveModule {}
