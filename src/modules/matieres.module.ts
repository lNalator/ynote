import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Matiere } from '../models/matiere.model';
import { MatieresService } from '../services/matieres.service';
import { MatieresController } from '../controllers/matieres.controller';

@Module({
  imports: [SequelizeModule.forFeature([Matiere])],
  providers: [MatieresService],
  controllers: [MatieresController],
})
export class MatieresModule {}
