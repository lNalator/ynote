import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/models/role.model';
import { CreateRoleDto } from 'src/resources/createRole.ressource';
import { User } from 'src/models/user.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll();
  }

  async findOne(id: number): Promise<Role> {
    return this.roleModel.findByPk(id, {
      include: [User],
    }) as Promise<Role>;
  }

  async create(createRoleDTO: CreateRoleDto): Promise<Role> {
    return await this.roleModel.create(createRoleDTO as any);
  }

  async update(id: number, role: Partial<CreateRoleDto>): Promise<void> {
    const roleToUpdate = await this.findOne(id);
    await roleToUpdate.update(role);
  }

  async remove(id: number): Promise<void> {
    await this.roleModel.destroy({ where: { id } });
  }
}
