import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Matiere extends Model {
  @Column
  nom: string;
}
