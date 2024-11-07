import { Module } from '@nestjs/common';
import { Etudier } from 'src/models/etudier.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EtudierService } from 'src/services/etudier.service';
import { EleveModule } from './eleve.module';

@Module({
  imports: [SequelizeModule.forFeature([Etudier])],
  providers: [EtudierService],
  exports: [EtudierService],
})
export class EtudierModule {}
