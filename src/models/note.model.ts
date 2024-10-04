import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Eleve } from './eleve.model';
import { Matiere } from './matiere.model';
import { Professeur } from './professeur.model';

@Table
export class Note extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: string;

    @Column
    valeur: number;

    @ForeignKey(() => Eleve)
    @Column
    eleveId: string;

    @ForeignKey(() => Matiere)
    @Column
    matiereId: string;

    @ForeignKey(() => Professeur)
    @Column
    professeurId: string;

}