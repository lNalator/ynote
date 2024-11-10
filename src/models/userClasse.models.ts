import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Classe } from './classe.model';
import { User } from './user.model';

@Table
export class UserClasse extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  profId: number;

  @ForeignKey(() => Classe)
  @Column
  classeId: number;
}
