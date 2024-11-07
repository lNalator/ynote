import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Diriger } from 'src/models/diriger.models';

@Injectable()
export class DirigerService {
  constructor(
    @InjectModel(Diriger)
    private dirigerModel: typeof Diriger,
  ) {}

  async findAll(): Promise<Diriger[]> {
    return this.dirigerModel.findAll();
  }

  async findOne(id: string): Promise<Diriger> {
    return this.dirigerModel.findByPk(id) as any;
  }

  async assignTo(professeurId: number, classeId: number): Promise<Diriger> {
    const diriger = {
      professeurId,
      classeId,
    };
    return this.dirigerModel.create(diriger as any);
  }

  async remove(id: string): Promise<void> {
    const diriger = await this.findOne(id);
    await diriger.destroy();
  }
}
