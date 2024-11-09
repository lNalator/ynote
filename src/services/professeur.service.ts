import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
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

  async findByUsername(username: string): Promise<Professeur> {
    return this.professeurModel.findOne({
      where: {
        prenom: username,
      },
    }) as any;
  }

  async create(createProfDTO: CreateProfesseurDto): Promise<Professeur> {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(createProfDTO.nom, saltRound);
    const newProf = await this.professeurModel.create({
      ...createProfDTO,
      password: hashedPassword,
    } as any);

    if (createProfDTO.classesIds) {
      for (const classeId of createProfDTO.classesIds) {
        await this.dirigerService.assignTo(newProf.id, classeId);
      }
    }

    return newProf;
  }

  async delete(id: number): Promise<void> {
    const professeur = await this.findOne(id);
    await professeur.destroy();
  }
}
