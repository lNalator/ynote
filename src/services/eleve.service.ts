import { Injectable } from '@nestjs/common';
import { Eleve } from '../models/eleve.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EleveService {
  constructor(
    @InjectModel(Eleve)
    private eleveModel: typeof Eleve,
  ) {}

  async findAll(): Promise<Eleve[]> {
    return this.eleveModel.findAll();
  }

  async findOne(id: string): Promise<Eleve> {
    return this.eleveModel.findOne({ where: { id } }).then((result) => {
      if (!result) {
        throw new Error(`Eleve with id ${id} not found`);
      }
      return result;
    });
  }

  // async create(eleve: Eleve): Promise<Eleve> {
  //     return this.eleveModel.create(eleve);
  // }

  async remove(id: string): Promise<void> {
    await this.eleveModel.destroy({ where: { id } });
  }
}
