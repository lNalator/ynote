import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Etudier } from 'src/models/etudier.model';

@Injectable()
export class EtudierService {
  constructor(
    @InjectModel(Etudier)
    private etudierModel: typeof Etudier,
  ) {}

  async findAll(): Promise<Etudier[]> {
    return this.etudierModel.findAll();
  }

  async findOne(id: string): Promise<Etudier> {
    return this.etudierModel.findOne({ where: { id } }).then((result) => {
      if (!result) {
        throw new Error(`Etudier with id ${id} not found`);
      }
      return result;
    });
  }

//   async create(createEtudierDTO: CreateEtudierDTO): Promise<Etudier> {
//     return this.etudierModel.create(createEtudierDTO);
//   }

  async remove(id: string): Promise<void> {
    const etudier = await this.findOne(id);
    await etudier.destroy();
  }
}
