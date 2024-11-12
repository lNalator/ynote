import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/resources/createRole.ressource';
import { Public } from 'src/auth/decorators/public.decorator';
import { RoleService } from 'src/services/role.service';
import { Role } from 'src/models/role.model';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role as RoleEnum } from '../auth/decorators/role.decorator';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Public()
  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<void> {
    return this.roleService.update(id, createRoleDto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
