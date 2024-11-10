import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserClasse } from 'src/models/userClasse.models';
import { UserClasseService } from 'src/services/userClasse.service';

@Module({
  imports: [SequelizeModule.forFeature([UserClasse])],
  providers: [UserClasseService],
  exports: [UserClasseService],
})
export class UserClasseModule {}
