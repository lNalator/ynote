import {
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';

import { Note } from './note.model';
import { Classe } from './classe.model';
import { Role } from './role.model';
import { Matiere } from './matiere.model';
import { UserMatiere } from './userMatiere.model';
import { UserClasse } from './userClasse.models';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  email: string;

  @Column
  prenom: string;

  @Column
  nom: string;

  @Column
  password: string;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  //dans le cas ou l'user est un eleve
  @Column
  moyenne: number;

  //dans le cas ou l'user est un eleve
  @HasMany(() => Note)
  notes: Note[];

  //dans le cas ou l'user est un eleve
  @BelongsToMany(() => Matiere, () => UserMatiere)
  matieres: Array<Matiere & { userMatiere: UserMatiere }>;

  //dans le cas ou l'user est un eleve -> l'array ne possede qu'un seul element
  //dans le cas ou l'user est un prof -> l'array peut contenir plusieurs elements
  @BelongsToMany(() => Classe, () => UserClasse)
  classes: Array<Classe & { userClasse: UserClasse }>;
}
