import {
  AutoIncrement,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Eleve } from './eleve.model';
import { ApiProperty } from '@nestjs/swagger';

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
}
