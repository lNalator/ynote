import { Module } from '@nestjs/common';
import { EleveService } from '../services/eleve.service';
import { EleveController } from '../controllers/eleve.controller';


@Module({
    controllers: [EleveController],
    providers: [EleveService],
    exports: [EleveService],
  })
  export class EleveModule {}