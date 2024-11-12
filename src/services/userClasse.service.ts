import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserClasse } from 'src/models/userClasse.models';

@Injectable()
export class UserClasseService {
  constructor(
    @InjectModel(UserClasse)
    private userClasseModel: typeof UserClasse,
  ) {}

  async findAll(): Promise<UserClasse[]> {
    return this.userClasseModel.findAll();
  }

  async findOne(id: string): Promise<UserClasse> {
    return this.userClasseModel.findByPk(id) as any;
  }

  async assignTo(userId: number, classeId: number): Promise<UserClasse> {
    const userClass = {
      userId,
      classeId,
    };
    console.log(userClass);
    return this.userClasseModel.create(userClass as any);
  }

  async unassignFrom(userId: number, classeId: number): Promise<void> {
    const userClass = await this.userClasseModel.findOne({
      where: {
        userId,
        classeId,
      },
    });
    if (userClass) await userClass.destroy();
  }

  async remove(id: string): Promise<void> {
    const diriger = await this.findOne(id);
    await diriger.destroy();
  }
}
