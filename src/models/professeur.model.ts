import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Professeur extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nom: string;

  @Column
  prenom: string;
}
