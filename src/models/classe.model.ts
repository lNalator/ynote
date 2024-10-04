import {
  AutoIncrement,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Eleve } from './eleve.model';
import { Professeur } from './professeur.model';
import { Diriger } from './diriger.models';

@Table
export class Classe extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  libelle: string;

  @ForeignKey(() => Eleve)
  elevesIds: number[];

  @HasMany(() => Eleve)
  eleves: Eleve[];

  @BelongsToMany(() => Professeur, () => Diriger)
  professeurs: Professeur[];

}
