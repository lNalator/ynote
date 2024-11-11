import { Inject, Injectable } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { UserMatiereModule } from './userMatiere.module';

import { User } from '../models/user.model';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { RoleModule } from './role.module';
import { UserClasseModule } from './userClasse.module';
import { MatieresModule } from './matieres.module';
import { ClasseModule } from './classe.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    UserMatiereModule,
    RoleModule,
    UserClasseModule,
    MatieresModule,
    ClasseModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
