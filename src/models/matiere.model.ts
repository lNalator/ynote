import {
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Note } from './note.model';
import { UserMatiere } from './userMatiere.model';
import { User } from './user.model';

@Table
export class Matiere extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nom: string;

  @BelongsToMany(() => User, () => UserMatiere)
  etudiants: Array<User & { userMatiere: UserMatiere }>;

  @HasMany(() => Note)
  notes: Note[];
}
