import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Classe } from 'src/models/classe.model';

@Injectable()
export class ClasseService {
  constructor(
    @InjectModel(Classe)
    private classeModel: typeof Classe,
  ) {}

  async findAll(): Promise<Classe[]> {
    return this.classeModel.findAll();
  }

  async findOne(id: string): Promise<Classe> {
    return this.classeModel
      .findOne({
        where: {
          id,
        },
      })
      .then((result) => {
        if (!result) {
          throw new Error(`Classe with id ${id} not found`);
        }
        return result;
      });
  }

  async remove(id: string): Promise<void> {
    const classe = await this.findOne(id);
    await classe.destroy();
  }
}
