import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/resources/createUser.ressource';
import { Matiere } from 'src/models/matiere.model';
import { Classe } from 'src/models/classe.model';
import { Note } from 'src/models/note.model';
import { UserMatiererService } from './userMatiere.service';
import { User } from 'src/models/user.model';
import { Role } from 'src/models/role.model';
import { RoleService } from './role.service';
import * as bcrypt from 'bcrypt';
import { ProfClasseService } from './profClasse.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly userMatierService: UserMatiererService,
    private readonly profClasseService: ProfClasseService,
    private readonly roleService: RoleService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    //TODO : CHANGE TO INCLUDE BASED ON ROLE
    return this.userModel.findByPk(id, {
      include: [Role],
    }) as any;
    // .then((user: User) => {
    //   if (user.role.name === 'Eleve') {
    //     return this.userModel.findByPk(id, {
    //       include: [Role, Note],
    //     }) as any;
    //   } else if (user.role.name === 'Professeur') {
    //     return this.userModel.findByPk(id, {
    //       include: [Role, Classe],
    //     }) as any;
    //   } else {
    //     return this.userModel.findByPk(id, {
    //       include: [Role],
    //     }) as any;
    //   }
    // }) as Promise<User>;
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
    if (userToUpdate.role.name !== 'Eleve') return;
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
    const roleName = newUser.role.$get('name') as unknown as string;

    if (roleName === 'Eleve' && createUserDTO.matieresIds) {
      for (const matiereId of createUserDTO.matieresIds) {
        await this.userMatierService.assignTo(newUser.id, matiereId);
      }
    }

    if (roleName === 'Professeur' && createUserDTO.classesIds) {
      for (const classeId of createUserDTO.classesIds) {
        await this.profClasseService.assignTo(newUser.id, classeId);
      }
    }

    return newUser;
  }

  async remove(id: number): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
