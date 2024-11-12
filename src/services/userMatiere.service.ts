import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserMatiere } from 'src/models/userMatiere.model';

@Injectable()
export class UserMatiereService {
  constructor(
    @InjectModel(UserMatiere)
    private userMatiereModel: typeof UserMatiere,
  ) {}

  async findAll(): Promise<UserMatiere[]> {
    return this.userMatiereModel.findAll();
  }

  async findOne(id: string): Promise<UserMatiere> {
    return this.userMatiereModel.findByPk(id) as any;
  }

  async assignTo(userId: number, matiereId: number): Promise<UserMatiere> {
    const userMatiere = {
      userId,
      matiereId,
    };
    return this.userMatiereModel.create(userMatiere as any);
  }

  async unassignFrom(userId: number, matiereId: number): Promise<void> {
    const userMatiere = await this.userMatiereModel.findOne({
      where: {
        userId,
        matiereId,
      },
    });
    if (userMatiere) await userMatiere.destroy();
  }

  async remove(id: string): Promise<void> {
    const userMatiere = await this.findOne(id);
    await userMatiere.destroy();
  }
}
