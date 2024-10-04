import { Module } from '@nestjs/common';
import { EleveService } from './eleve.service';
import { EleveController } from './eleve.controller';


@Module({
    controllers: [EleveController],
    providers: [EleveService],
    exports: [EleveService],
  })
  export class EleveModule {}