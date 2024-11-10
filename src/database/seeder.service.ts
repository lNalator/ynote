// src/database/database-seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
// import { ProfesseurService } from '../services/professeur.service';
import { RoleService } from 'src/services/role.service';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from 'src/resources/createUser.ressource';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const adminRole = await this.roleService.findOne(1);
    if (!adminRole) {
      await this.roleService.create({
        name: 'Admin',
      });
      console.log('Admin role created. ');
    }
    const profRole = await this.roleService.findOne(2);
    if (!profRole) {
      await this.roleService.create({
        name: 'Prof',
      });
      console.log('Prof role created. ');
    }
    const eleveRole = await this.roleService.findOne(3);
    if (!eleveRole) {
      await this.roleService.create({
        name: 'Eleve',
      });
      console.log('Eleve role created. ');
    }
    const existingUser = await this.userService.findByEmail('admin@ynote.io');
    if (!existingUser) {
      await this.userService.create({
        email: 'admin@ynote.io',
        prenom: 'Admin',
        nom: 'Admin',
        password: this.configService.get('ADMIN_PASSWORD') as string,
        roles: [1],
      } as CreateUserDto);
      console.log('Admin user created. ');
    }
  }
}
