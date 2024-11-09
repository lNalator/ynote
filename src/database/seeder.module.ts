import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ProfesseurModule } from 'src/modules/professeur.module';

@Module({
  imports: [ProfesseurModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
