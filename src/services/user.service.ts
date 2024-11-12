import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/resources/createUser.ressource';
import { Matiere } from 'src/models/matiere.model';
import { Classe } from 'src/models/classe.model';
import { Note } from 'src/models/note.model';
import { UserMatiereService } from './userMatiere.service';
import { User } from 'src/models/user.model';
import { Role } from 'src/models/role.model';
import { Role as RoleEnum } from 'src/auth/decorators/role.decorator';
import { RoleService } from './role.service';
import * as bcrypt from 'bcrypt';
import { UserClasseService } from './userClasse.service';
import { CreateUserAdminDto } from 'src/resources/createUserAdmin.ressource';
import { ClasseService } from './classe.service';
import { MatieresService } from './matieres.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly userMatierService: UserMatiereService,
    private readonly userClasseService: UserClasseService,
    private readonly roleService: RoleService,
    private readonly classeService: ClasseService,
    private readonly materieService: MatieresService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    //TODO : CHANGE TO INCLUDE BASED ON ROLE
    return this.userModel.findByPk(id, {
      include: [Role, Note, Classe, Matiere],
    }) as any;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email: email,
      },
    }) as any;
  }

  async updateMoyenne(userId: number, matiereId: number): Promise<any> {
    const userToUpdate = await this.findOne(userId);
    const role = await this.roleService.findOne(userToUpdate.roleId);
    const isMatiereExist = await this.materieService.findOne(matiereId);

    if (!userToUpdate) return {errorMessage: 'User not found'};
    if (role.name !== RoleEnum.ELEVE) return {errorMessage: 'User is not an eleve'};
    if (!isMatiereExist) return {errorMessage: 'Matiere not found'};

    const notes = await userToUpdate.$get('notes');
    let moyenne = 0;
    for (const note of notes) {
      moyenne += note.valeur;
    }
    moyenne /= notes.length;
    return await userToUpdate.update({ moyenne });
  }

  async createAdmin(createUserAdminDto: CreateUserAdminDto): Promise<User> {
    const saltRound = 10;
    createUserAdminDto.password = await bcrypt.hash(
      createUserAdminDto.password,
      saltRound,
    );
    const isEmailExist = await this.findByEmail(createUserAdminDto.email);
    if (isEmailExist) {
      throw new Error('Email already exist');
    }
    return this.userModel.create(createUserAdminDto as any);
  }

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const saltRound = 10;
    createUserDTO.password = await bcrypt.hash(
      createUserDTO.password,
      saltRound,
    );
    const isEmailExist = await this.findByEmail(createUserDTO.email);
    if (isEmailExist) {
      throw new Error('Email already exist');
    }
    const newUser = await this.userModel.create(createUserDTO as any);

    if (createUserDTO.matieresIds) {
      for (const matiereId of createUserDTO.matieresIds) {
        const isMatiereExist = await this.materieService.findOne(matiereId);
        if (!isMatiereExist) {
          this.remove(newUser.id);
          throw new Error('Matiere ' + matiereId + ' not exist');
        }
        await this.userMatierService.assignTo(newUser.id, matiereId);
      }
    }

    if (createUserDTO.classesIds) {
      for (const classeId of createUserDTO.classesIds) {
        const isClasseExist = await this.classeService.findOne(classeId);
        if (!isClasseExist) {
          this.remove(newUser.id);
          throw new Error('Classe ' + classeId + ' doest not exist');
        }
        await this.userClasseService.assignTo(newUser.id, classeId);
      }
    }

    return newUser;
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<void> {
    const userToUpdate = await this.findOne(id);
  
    if (!userToUpdate) throw new Error('User not found');
  
    // Mettre à jour les champs de l'utilisateur
    await userToUpdate.update(updateUserDto);
  
    // Gestion des Matières
    if (updateUserDto.matieresIds) {
      const existingMatieres = await userToUpdate.$get('matieres');
      const existingMatiereIds = existingMatieres.map((m) => m.id);
      // Supprimer les matières non incluses dans la mise à jour
      const matieresToUnassign = existingMatiereIds.filter(id => !updateUserDto.matieresIds?.includes(id));
      for (const matiereId of matieresToUnassign) {
        await this.userMatierService.unassignFrom(userToUpdate.id, matiereId);
      }
      // Ajouter les nouvelles matières
      const matieresToAssign = updateUserDto.matieresIds.filter(id => !existingMatiereIds.includes(id));
      for (const matiereId of matieresToAssign) {
        await this.userMatierService.assignTo(userToUpdate.id, matiereId);
      }
    }
  
    // Gestion des Classes
    if (updateUserDto.classesIds) {
      const existingClasses = await userToUpdate.$get('classes');
      const existingClassIds = existingClasses.map((c) => c.id);
  
      // Supprimer les classes non incluses dans la mise à jour
      const classesToUnassign = existingClassIds.filter(id => !updateUserDto.classesIds?.includes(id));
      for (const classeId of classesToUnassign) {
        await this.userClasseService.unassignFrom(userToUpdate.id, classeId);
      }
  
      // Ajouter les nouvelles classes
      const classesToAssign = updateUserDto.classesIds.filter(id => !existingClassIds.includes(id));
      for (const classeId of classesToAssign) {
        await this.userClasseService.assignTo(userToUpdate.id, classeId);
      }
    }
  }
  

  async remove(id: number): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
