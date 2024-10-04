import {
    AutoIncrement,
  BelongsTo,
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
  id: string;

  @ForeignKey(() => Eleve)
  @Column
  eleveId: string;

  @ForeignKey(() => Matiere)
  @Column
  matiereId: string;
}
