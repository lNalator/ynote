import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserMatiere } from 'src/models/userMatiere.model';
import { UserMatiereService } from 'src/services/userMatiere.service';

@Module({
  imports: [SequelizeModule.forFeature([UserMatiere])],
  providers: [UserMatiereService],
  exports: [UserMatiereService],
})
export class UserMatiereModule {}
