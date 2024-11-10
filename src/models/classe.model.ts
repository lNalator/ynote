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

import { User } from './user.model';
import { UserClasse } from './userClasse.models';

@Table
export class Classe extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  libelle: string;

  //dans le cas ou l'user est un professeur
  @BelongsToMany(() => User, () => UserClasse)
  users: Array<User & { userClasse: UserClasse }>;
}
