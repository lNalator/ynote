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
import { Matiere } from './matiere.model';
import { Note } from './note.model';

@Table
export class Eleve extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string;

  @Column
  nom: string;

  @Column
  prenom: string;

  @Column
  moyenne: number;

  @BelongsToMany(() => Matiere, () => Etudier)
  matieres: Matiere[];

  @HasMany(() => Note)
  notes: Note[];
}
