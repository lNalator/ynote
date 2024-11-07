import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Professeur } from './professeur.model';
import { Classe } from './classe.model';

@Table
export class Diriger extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Professeur)
  @Column
  professeurId: number;

  @ForeignKey(() => Classe)
  @Column
  classeId: number;
}
