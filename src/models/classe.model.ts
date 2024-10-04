import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Eleve } from './eleve.model';

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


}
