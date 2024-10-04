import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Etudier } from './etudier.model';
import { Eleve } from './eleve.model';

@Table
export class Matiere extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nom: string;

  @BelongsToMany(() => Eleve, () => Etudier)
  etudiants: Eleve[];
}
