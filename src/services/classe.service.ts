import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Classe } from 'src/models/classe.model';
import { Eleve } from 'src/models/eleve.model';
import { Professeur } from 'src/models/professeur.model';
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
      include: [Eleve, Professeur],
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
