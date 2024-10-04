import { AutoIncrement, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Note } from './note.model';
import { Classe } from './classe.model';
import { Diriger } from './diriger.models';

@Table
export class Professeur extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: string;

    @Column
    nom: string;

    @Column
    prenom: string;

    @BelongsToMany(() => Classe, () => Diriger)
    classes: Classe[];

    @HasMany(() => Note)
    notes: Note[];
}
