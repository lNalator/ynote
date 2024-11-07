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
import { Etudier } from './etudier.model';
import { Matiere } from './matiere.model';
import { Note } from './note.model';
import { Classe } from './classe.model';

@Table
export class Eleve extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  nom: string;

  @Column
  prenom: string;

  @Column
  moyenne: number;

  @ForeignKey(() => Classe)
  @Column
  classeId: number;

  @BelongsTo(() => Classe)
  classe: Classe;

  @BelongsToMany(() => Matiere, () => Etudier)
  matieres: Array<Matiere & {etudier: Etudier}>;

  @HasMany(() => Note)
  notes: Note[];

  
}
