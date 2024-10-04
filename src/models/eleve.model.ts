import {
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Etudier } from './etudier.model';
import { Matiere } from './matiere.model';
import { Note } from './note.model';
import { Classe } from './classe.model';

@Table
export class Eleve extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nom: string;

  @Column
  prenom: string;

  @Column
  moyenne: number;

  @ForeignKey(() => Classe)
  classeId: number;

  @HasOne(() => Classe)
  classe: Classe;

  @BelongsToMany(() => Matiere, () => Etudier)
  matieres: Matiere[];

  @HasMany(() => Note)
  notes: Note[];
}
