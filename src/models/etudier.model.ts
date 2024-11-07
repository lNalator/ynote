import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Eleve } from './eleve.model';
import { Matiere } from './matiere.model';

@Table
export class Etudier extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Eleve)
  @Column
  eleveId: number;

  @ForeignKey(() => Matiere)
  @Column
  matiereId: number;
}
