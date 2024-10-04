import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClasseController } from 'src/controllers/classe.controller';
import { Classe } from 'src/models/classe.model';
import { ClasseService } from 'src/services/classe.service';

@Module({
  imports: [SequelizeModule.forFeature([Classe])],
  providers: [ClasseService],
  controllers: [ClasseController],
})
export class ClasseModule {}
