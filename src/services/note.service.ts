import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from '../models/note.model';
import { CreateNoteDto } from 'src/resources/createNote.ressource';
import { Matiere } from 'src/models/matiere.model';
import { UserService } from './user.service';
import { User } from 'src/models/user.model';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note)
    private readonly noteModel: typeof Note,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteModel.findAll();
  }

  findOne(id: number): Promise<Note> {
    return this.noteModel.findByPk(id, {
      include: [User, Matiere],
    }) as Promise<Note>;
  }

  async create(createNoteDTO: CreateNoteDto): Promise<Note> {
    const newNote = await this.noteModel.create(createNoteDTO as any);
    this.userService.updateMoyenne(createNoteDTO.eleveId);
    return newNote;
  }

  async update(id: number, note: Note): Promise<void> {
    const noteToUpdate = await this.findOne(id);
    await noteToUpdate.update(note);
    this.userService.updateMoyenne(noteToUpdate.eleveId);
  }

  async delete(id: number): Promise<void> {
    const note = await this.findOne(id);
    await note.destroy();
    this.userService.updateMoyenne(note.eleveId);
  }
}
