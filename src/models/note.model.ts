import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Max,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Eleve } from './eleve.model';
import { Matiere } from './matiere.model';
import { Professeur } from './professeur.model';

@Table
export class Note extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Max(20)
  @Column
  valeur: number;

  @ForeignKey(() => Eleve)
  @Column
  eleveId: number;

  @ForeignKey(() => Matiere)
  @Column
  matiereId: number;

  @ForeignKey(() => Professeur)
  @Column
  professeurId: number;

  @BelongsTo(() => Eleve)
  eleve: Eleve;

  @BelongsTo(() => Professeur)
  professeur: Professeur;

  @BelongsTo(() => Matiere)
  matiere: Matiere;
}
