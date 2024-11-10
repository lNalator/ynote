import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/resources/createRole.ressource';
import { Public } from 'src/auth/decorators/public.decorator';
import { RoleService } from 'src/services/role.service';
import { Role } from 'src/models/role.model';

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

  @ApiAcceptedResponse({ type: CreateRoleDto })
  @ApiResponse({ type: Role })
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
