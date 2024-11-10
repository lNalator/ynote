import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfClasse } from 'src/models/profClasse.models';
import { ProfClasseService } from 'src/services/profClasse.service';

@Module({
  imports: [SequelizeModule.forFeature([ProfClasse])],
  providers: [ProfClasseService],
  exports: [ProfClasseService],
})
export class ProfClasseModule {}
