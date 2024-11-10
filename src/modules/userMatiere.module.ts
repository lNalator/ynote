import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserMatiere } from 'src/models/userMatiere.model';
import { UserMatiererService } from 'src/services/userMatiere.service';

@Module({
  imports: [SequelizeModule.forFeature([UserMatiere])],
  providers: [UserMatiererService],
  exports: [UserMatiererService],
})
export class UserMatiereModule {}
