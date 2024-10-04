import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Matiere } from '../models/matiere.model';

@Injectable()
export class MatieresService {
  constructor(
    @InjectModel(Matiere)
    private userModel: typeof Matiere,
  ) {}

  async findAll(): Promise<Matiere[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<Matiere> {
    return this.userModel
      .findOne({
        where: {
          id,
        },
      })
      .then((result) => {
        if (!result) {
          throw new Error(`User with id ${id} not found`);
        }
        return result;
      });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
