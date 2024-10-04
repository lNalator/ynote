import { Module } from '@nestjs/common';
import { EleveService } from '../services/eleve.service';
import { EleveController } from '../controllers/eleve.controller';
import { Eleve } from 'src/models/eleve.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Eleve])],
  providers: [EleveService],
  controllers: [EleveController],
})
export class EleveModule {}
