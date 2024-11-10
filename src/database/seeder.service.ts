// src/database/database-seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
// import { ProfesseurService } from '../services/professeur.service';
import { RoleService } from 'src/services/role.service';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from 'src/resources/createUser.ressource';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/auth/decorators/role.decorator';

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
        name: Role.ADMIN,
      });
      console.log('Admin role created. ');
    }

    const profRole = await this.roleService.findOne(2);
    if (!profRole) {
      await this.roleService.create({
        name: Role.PROFESSEUR,
      });
      console.log('Prof role created. ');
    }

    const eleveRole = await this.roleService.findOne(3);
    if (!eleveRole) {
      await this.roleService.create({
        name: Role.ELEVE,
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
        roleId: 1,
      } as CreateUserDto);
      console.log('Admin user created. ');
    }
  }
}
