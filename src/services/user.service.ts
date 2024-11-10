import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/resources/createUser.ressource';
import { Matiere } from 'src/models/matiere.model';
import { Classe } from 'src/models/classe.model';
import { Note } from 'src/models/note.model';
import { UserMatiereService } from './userMatiere.service';
import { User } from 'src/models/user.model';
import { Role } from 'src/models/role.model';
import { RoleService } from './role.service';
import * as bcrypt from 'bcrypt';
import { UserClasseService } from './userClasse.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly userMatierService: UserMatiereService,
    private readonly userClasseService: UserClasseService,
    private readonly roleService: RoleService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    //TODO : CHANGE TO INCLUDE BASED ON ROLE
    return this.userModel.findByPk(id, {
      include: [Role, Note, Classe],
    }) as any;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email: email,
      },
    }) as any;
  }

  async updateMoyenne(id: number): Promise<void> {
    const userToUpdate = await this.findOne(id);
    const role = await this.roleService.findOne(userToUpdate.roleId);

    if (role.name !== 'Eleve') return;
    const notes = await userToUpdate.$get('notes');
    let moyenne = 0;
    for (const note of notes) {
      moyenne += note.valeur;
    }
    moyenne /= notes.length;
    await userToUpdate.update({ moyenne });
  }

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const saltRound = 10;
    createUserDTO.password = await bcrypt.hash(
      createUserDTO.password,
      saltRound,
    );
    const newUser = await this.userModel.create(createUserDTO as any);
    const role = await this.roleService.findOne(createUserDTO.roleId);

    if (role.name === 'Eleve' && createUserDTO.matieresIds) {
      for (const matiereId of createUserDTO.matieresIds) {
        await this.userMatierService.assignTo(newUser.id, matiereId);
      }
    }

    if (role.name === 'Professeur' && createUserDTO.classesIds) {
      for (const classeId of createUserDTO.classesIds) {
        await this.userClasseService.assignTo(newUser.id, classeId);
      }
    }

    return newUser;
  }

  async remove(id: number): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
