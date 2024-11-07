import { Inject, Injectable } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { EleveService } from '../services/eleve.service';
import { EleveController } from '../controllers/eleve.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Eleve } from 'src/models/eleve.model';
import { EtudierModule } from './etudier.module';
import { ClasseModule } from './classe.module';

@Module({
  imports: [SequelizeModule.forFeature([Eleve]), EtudierModule],
  controllers: [EleveController],
  providers: [EleveService],
  exports: [EleveService],
})
export class EleveModule {}
