import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Matiere } from '../models/matiere.model';
import { CreateMatiereDTO } from 'src/resources/createMatiere.ressource';

@Injectable()
export class MatieresService {
  constructor(
    @InjectModel(Matiere)
    private matiereModel: typeof Matiere,
  ) {}

  async findAll(): Promise<Matiere[]> {
    return this.matiereModel.findAll();
  }

  async findOne(id: string): Promise<Matiere> {
    return this.matiereModel.findOne({ where: { id } }).then((result) => {
      if (!result) {
        throw new Error(`Matiere with id ${id} not found`);
      }
      return result;
    });
  }

  // async create(createMatiereDTO: CreateMatiereDTO): Promise<Matiere> {
  //   return this.matiereModel.create(createMatiereDTO);
  // }

  async remove(id: string): Promise<void> {
    const matiere = await this.findOne(id);
    await matiere.destroy();
  }
}
