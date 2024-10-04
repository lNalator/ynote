import {
  AutoIncrement,
  BelongsToMany,
  Column,
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
  id: string;

  @Column
  libelle: string;

  @HasMany(() => Eleve)
  eleves: Eleve[];

  @BelongsToMany(() => Professeur, () => Diriger)
  professeurs: Professeur[];

}
