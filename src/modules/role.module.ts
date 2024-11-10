import { Inject, Injectable } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from '../models/role.model';
import { RoleController } from '../controllers/role.controller';
import { RoleService } from '../services/role.service';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
