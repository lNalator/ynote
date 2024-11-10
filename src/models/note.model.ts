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
import { Matiere } from './matiere.model';
import { User } from './user.model';

@Table
export class Note extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Max(20)
  @Column
  valeur: number;

  @ForeignKey(() => User)
  @Column
  eleveId: number;

  @ForeignKey(() => Matiere)
  @Column
  matiereId: number;

  @BelongsTo(() => User)
  eleve: User;

  @BelongsTo(() => Matiere)
  matiere: Matiere;
}
