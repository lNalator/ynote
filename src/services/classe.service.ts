import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Classe } from 'src/models/classe.model';
import { Matiere } from 'src/models/matiere.model';
import { User } from 'src/models/user.model';

import { CreateClasseDTO } from 'src/resources/createClasse.ressource';

@Injectable()
export class ClasseService {
  constructor(
    @InjectModel(Classe)
    private classeModel: typeof Classe,
  ) {}

  async findAll(): Promise<Classe[]> {
    return this.classeModel.findAll();
  }

  async findOne(id: number): Promise<Classe> {
    return this.classeModel.findByPk(id, {
      include: [User],
    }) as any;
  }

  async create(createClasseDTO: CreateClasseDTO): Promise<Classe> {
    return this.classeModel.create(createClasseDTO as any);
  }

  async remove(id: number): Promise<void> {
    const classe = await this.findOne(id);
    await classe.destroy();
  }
}
