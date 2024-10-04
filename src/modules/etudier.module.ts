import { Module } from '@nestjs/common';
import { Etudier } from 'src/models/etudier.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EtudierService } from 'src/services/etudier.service';

@Module({
  imports: [SequelizeModule.forFeature([Etudier])],
  providers: [EtudierService],
})
export class EtudierModule {}
