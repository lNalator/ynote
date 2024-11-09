// src/database/database-seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProfesseurService } from '../services/professeur.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly professeurService: ProfesseurService) {}

  async onModuleInit() {
    const existingUser = await this.professeurService.findByUsername('Admin');
    if (!existingUser) {
      await this.professeurService.create({
        nom: 'Admin',
        prenom: 'Admin',
        classesIds: [],
      });
      console.log('Admin user created. ');
    }
  }
}
