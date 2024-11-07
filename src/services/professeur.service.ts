import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Professeur } from 'src/models/professeur.model';
import { DirigerService } from './diriger.service';
import { CreateProfesseurDto } from 'src/resources/createProfesseur.ressource';
import { Classe } from 'src/models/classe.model';
import { Note } from 'src/models/note.model';

@Injectable()
export class ProfesseurService {
  constructor(
    @InjectModel(Professeur)
    private professeurModel: typeof Professeur,
    private readonly dirigerService: DirigerService,
  ) {}

  async findAll(): Promise<Professeur[]> {
    return this.professeurModel.findAll();
  }

  async findOne(id: number): Promise<Professeur> {
    return this.professeurModel.findByPk(id, {
      include: [Classe, Note],
    }) as any;
  }

  async create(createProfDTO: CreateProfesseurDto): Promise<Professeur> {
    const newProf = await this.professeurModel.create(createProfDTO as any);
    for (const classeId of createProfDTO.classesIds) {
      await this.dirigerService.assignTo(newProf.id, classeId);
    }
    return newProf;
  }

  async delete(id: number): Promise<void> {
    const professeur = await this.findOne(id);
    await professeur.destroy();
  }
}
