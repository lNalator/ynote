import {
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Etudier } from './etudier.model';
import { Eleve } from './eleve.model';
import { Note } from './note.model';

@Table
export class Matiere extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string;

  @Column
  nom: string;

  @BelongsToMany(() => Eleve, () => Etudier)
  etudiants: Eleve[];

  @HasMany(() => Note)
  notes: Note[];
}
