import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from '../models/note.model';
import { CreateNoteDto } from 'src/resources/createNote.ressource';
import { EleveService } from './eleve.service';
import { Eleve } from 'src/models/eleve.model';
import { Professeur } from 'src/models/professeur.model';
import { Matiere } from 'src/models/matiere.model';
import { ProfesseurService } from './professeur.service';
import { MatieresService } from './matieres.service';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private readonly noteModel: typeof Note,
    private readonly eleveService: EleveService,
    private readonly professeurService: ProfesseurService,
    private readonly matiereService: MatieresService,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteModel.findAll();
  }

  findOne(id: number): Promise<Note> {
    return this.noteModel.findByPk(id, {
      include: [Eleve, Professeur, Matiere],
    }) as Promise<Note>;
  }

  async create(createNoteDTO: CreateNoteDto): Promise<Note> {
    const newNote = await this.noteModel.create(createNoteDTO as any);
    this.eleveService.updateMoyenne(createNoteDTO.eleveId);
    return newNote;
  }

  async update(id: number, note: Note): Promise<void> {
    const noteToUpdate = await this.findOne(id);
    await noteToUpdate.update(note);
    this.eleveService.updateMoyenne(noteToUpdate.eleveId);
  }

  async delete(id: number): Promise<void> {
    const note = await this.findOne(id);
    await note.destroy();
    this.eleveService.updateMoyenne(note.eleveId);
  }
}
