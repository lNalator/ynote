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

import { ProfClasse } from './profClasse.models';
import { User } from './user.model';

@Table
export class Classe extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  libelle: string;

  //dans le cas ou l'user est un eleve
  @HasMany(() => User)
  eleves: User[];

  //dans le cas ou l'user est un professeur
  @BelongsToMany(() => User, () => ProfClasse)
  professeurs: Array<User & { diriger: ProfClasse }>;
}
