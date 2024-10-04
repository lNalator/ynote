import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { EleveModule } from 'src/Eleve/eleve.module';

@Module({
  imports: [EleveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
