import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Diriger } from 'src/models/diriger.models';
import { DirigerService } from 'src/services/diriger.service';

@Module({
  imports: [SequelizeModule.forFeature([Diriger])],
  providers: [DirigerService],
  exports: [DirigerService],
})
export class DirigerModule {}
