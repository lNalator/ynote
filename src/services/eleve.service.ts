import { Injectable } from '@nestjs/common';
import { Eleve } from '../models/eleve.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEleveDto } from 'src/resources/createEleve.ressource';
import { EtudierService } from './etudier.service';
import { Matiere } from 'src/models/matiere.model';
import { Classe } from 'src/models/classe.model';
import { Note } from 'src/models/note.model';

@Injectable()
export class EleveService {
  constructor(
    @InjectModel(Eleve)
    private readonly eleveModel: typeof Eleve,
    private readonly etudierService: EtudierService,
  ) {}

  async findAll(): Promise<Eleve[]> {
    return this.eleveModel.findAll();
  }

  async findOne(id: number): Promise<Eleve> {
    return this.eleveModel.findByPk(id, {
      include: [Matiere, Classe, Note],
    }) as Promise<Eleve>;
  }

  async updateMoyenne(id: number): Promise<void> {
    const eleveToUpdate = await this.findOne(id);
    const notes = await eleveToUpdate.$get('notes');
    let moyenne = 0;
    for (const note of notes) {
      moyenne += note.valeur;
    }
    moyenne /= notes.length;
    await eleveToUpdate.update({ moyenne });
  }

  async create(createEleveDTO: CreateEleveDto): Promise<Eleve> {
    const newEleve = await this.eleveModel.create(createEleveDTO as any);
    for (const matiereId of createEleveDTO.matieresIds) {
      await this.etudierService.assignTo(newEleve.id, matiereId);
    }
    return newEleve;
  }

  async remove(id: number): Promise<void> {
    await this.eleveModel.destroy({ where: { id } });
  }
}
