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
export class Diriger extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column
    id:string;
    
    @ForeignKey(() => Professeur)
    @Column
    professeurId: string;

    @ForeignKey(() => Classe)
    @Column
    classeId: string;
}