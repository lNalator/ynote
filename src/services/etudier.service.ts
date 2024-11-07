import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Etudier } from 'src/models/etudier.model';

@Injectable()
export class EtudierService {
  constructor(
    @InjectModel(Etudier)
    private readonly etudierModel: typeof Etudier,
  ) {}

  async findAll(): Promise<Etudier[]> {
    return this.etudierModel.findAll();
  }

  async findOne(id: string): Promise<Etudier> {
    return this.etudierModel.findByPk(id) as any;
  }

  async assignTo(eleveId: number, matiereId: number): Promise<Etudier> {
    const etudier = {
      eleveId,
      matiereId,
    };
    return this.etudierModel.create(etudier as any);
  }

  async remove(id: string): Promise<void> {
    const etudier = await this.findOne(id);
    await etudier.destroy();
  }
}
