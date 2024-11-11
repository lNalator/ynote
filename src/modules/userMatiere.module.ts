import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserMatiere } from 'src/models/userMatiere.model';
import { UserMatiereService } from 'src/services/userMatiere.service';
import { UserModule } from './user.module';
import { MatieresModule } from './matieres.module';

@Module({
  imports: [SequelizeModule.forFeature([UserMatiere])],
  providers: [UserMatiereService],
  exports: [UserMatiereService],
})
export class UserMatiereModule {}
