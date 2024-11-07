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
  id: number;

  @Column
  nom: string;

  @BelongsToMany(() => Eleve, () => Etudier)
  etudiants: Array<Eleve & { etudier: Etudier }>;

  @HasMany(() => Note)
  notes: Note[];
}
