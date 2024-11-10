import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Matiere } from '../models/matiere.model';
import { CreateMatiereDTO } from 'src/resources/createMatiere.ressource';
import { Note } from 'src/models/note.model';
import { User } from 'src/models/user.model';

@Injectable()
export class MatieresService {
  constructor(
    @InjectModel(Matiere)
    private matiereModel: typeof Matiere,
  ) {}

  async findAll(): Promise<Matiere[]> {
    return this.matiereModel.findAll();
  }

  async findOne(id: number): Promise<Matiere> {
    return this.matiereModel.findByPk(id, { include: [Note, User] }) as any;
  }

  async create(createMatiereDTO: CreateMatiereDTO): Promise<Matiere> {
    return this.matiereModel.create(createMatiereDTO as any);
  }

  async remove(id: number): Promise<void> {
    const matiere = await this.findOne(id);
    await matiere.destroy();
  }
}
