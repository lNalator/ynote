import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProfClasse } from 'src/models/profClasse.models';

@Injectable()
export class ProfClasseService {
  constructor(
    @InjectModel(ProfClasse)
    private profClasseModel: typeof ProfClasse,
  ) {}

  async findAll(): Promise<ProfClasse[]> {
    return this.profClasseModel.findAll();
  }

  async findOne(id: string): Promise<ProfClasse> {
    return this.profClasseModel.findByPk(id) as any;
  }

  async assignTo(professeurId: number, classeId: number): Promise<ProfClasse> {
    const diriger = {
      professeurId,
      classeId,
    };
    return this.profClasseModel.create(diriger as any);
  }

  async remove(id: string): Promise<void> {
    const diriger = await this.findOne(id);
    await diriger.destroy();
  }
}
